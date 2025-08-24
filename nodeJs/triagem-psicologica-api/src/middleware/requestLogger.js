/**
 * 📊 Request Logger Middleware
 * Logging detalhado e seguro de requisições HTTP
 */

const logger = require('../utils/logger');
const { anonymizeIP, sanitizeForLogging } = require('../utils/security');
const { v4: uuidv4 } = require('uuid');

/**
 * 📝 Middleware principal de logging de requests
 */
function requestLogger(req, res, next) {
  const startTime = Date.now();
  const requestId = uuidv4().split('-')[0]; // ID curto para o request
  
  // Adiciona ID único ao request
  req.requestId = requestId;
  
  // Adiciona header de rastreamento
  res.set('X-Request-ID', requestId);
  
  // Intercepta o método res.json para capturar a resposta
  const originalJson = res.json;
  let responseBody = null;
  
  res.json = function(body) {
    responseBody = body;
    return originalJson.call(this, body);
  };
  
  // Intercepta o final da resposta
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logData = createLogData(req, res, duration, responseBody);
    
    // Log baseado no status code
    if (res.statusCode >= 500) {
      logger.error('HTTP Request - Server Error', logData);
    } else if (res.statusCode >= 400) {
      logger.warn('HTTP Request - Client Error', logData);
    } else {
      logger.info('HTTP Request - Success', logData);
    }
    
    // Log específico para operações de triagem
    if (req.originalUrl.includes('/triagem/')) {
      logTriagemRequest(req, res, duration, logData);
    }
    
    // Log de performance para requests lentos
    if (duration > 5000) {
      logger.logPerformance('slow_request', duration, {
        endpoint: logData.endpoint,
        method: req.method,
        statusCode: res.statusCode
      });
    }
  });
  
  next();
}

/**
 * 🏗️ Cria dados de log estruturados
 */
function createLogData(req, res, duration, responseBody) {
  const logData = {
    requestId: req.requestId,
    method: req.method,
    endpoint: sanitizeEndpoint(req.originalUrl),
    statusCode: res.statusCode,
    duration: `${duration}ms`,
    userAgent: sanitizeUserAgent(req.get('user-agent')),
    ip: anonymizeIP(req.ip),
    timestamp: new Date().toISOString(),
    contentLength: res.get('content-length') || 0,
    referrer: req.get('referrer') || 'direct'
  };
  
  // Adiciona informações de query parameters (sanitizadas)
  if (Object.keys(req.query).length > 0) {
    logData.queryParams = sanitizeForLogging(req.query);
  }
  
  // Adiciona informações de headers importantes (sanitizadas)
  logData.headers = {
    contentType: req.get('content-type'),
    accept: req.get('accept'),
    acceptLanguage: req.get('accept-language')?.substring(0, 50),
    acceptEncoding: req.get('accept-encoding')?.substring(0, 50)
  };
  
  // Para requests POST/PUT, adiciona informações do body (sanitizadas)
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
    logData.bodySize = JSON.stringify(req.body).length;
    logData.bodyKeys = Object.keys(req.body);
  }
  
  // Adiciona informações da resposta (sem dados sensíveis)
  if (responseBody && typeof responseBody === 'object') {
    logData.responseType = responseBody.success ? 'success' : 'error';
    if (responseBody.error) {
      logData.errorType = responseBody.code || 'unknown';
    }
  }
  
  return logData;
}

/**
 * 🧠 Log específico para operações de triagem
 */
function logTriagemRequest(req, res, duration, logData) {
  const urlParts = req.originalUrl.split('/');
  const triagemType = urlParts[4]; // /api/v1/triagem/{type}/...
  const operation = urlParts[5]; // iniciar, responder, finalizar, etc.
  
  if (['bipolar', 'narcisismo', 'mitomania'].includes(triagemType)) {
    const triagemLogData = {
      ...logData,
      triagemType,
      operation,
      sessionId: req.params.sessionId ? 
        req.params.sessionId.substring(0, 8) + '***' : // Anonimiza session ID
        null
    };
    
    logger.logTriagemEvent(triagemType, operation, {
      statusCode: res.statusCode,
      duration,
      success: res.statusCode < 400
    });
    
    // Log especial para finalizações de triagem
    if (operation === 'finalizar' && res.statusCode === 200) {
      logger.logTriagemEvent(triagemType, 'triagem_completed', {
        duration,
        sessionCompleted: true
      });
    }
    
    // Log para casos de abandono (sessões interrompidas)
    if (res.statusCode === 408 || res.statusCode === 404) {
      logger.logTriagemEvent(triagemType, 'session_abandoned', {
        reason: res.statusCode === 408 ? 'timeout' : 'not_found',
        operation
      });
    }
  }
}

/**
 * 🧹 Sanitiza endpoint removendo dados sensíveis
 */
function sanitizeEndpoint(originalUrl) {
  return originalUrl
    .replace(/\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi, '/***') // UUIDs
    .replace(/\/[A-Z]{2}-\d+-[a-zA-Z0-9]+/g, '/***') // Session IDs
    .replace(/\/\d{10,}/g, '/***') // Timestamps longos
    .replace(/\?.*$/, ''); // Remove query parameters para logs
}

/**
 * 🔍 Sanitiza User Agent
 */
function sanitizeUserAgent(userAgent) {
  if (!userAgent) return 'unknown';
  
  // Remove informações muito específicas mantendo informações úteis
  return userAgent
    .substring(0, 200) // Limita tamanho
    .replace(/\([^)]*\)/g, '(...)') // Remove detalhes entre parênteses
    .replace(/\d+\.\d+\.\d+\.\d+/g, 'x.x.x.x'); // Remove versões específicas
}

/**
 * 📊 Middleware para métricas de API
 */
let apiMetrics = {
  totalRequests: 0,
  requestsByMethod: {},
  requestsByEndpoint: {},
  requestsByStatus: {},
  averageResponseTime: 0,
  slowRequests: 0,
  errorRate: 0,
  lastReset: new Date()
};

function metricsMiddleware(req, res, next) {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    updateMetrics(req, res, duration);
  });
  
  next();
}

function updateMetrics(req, res, duration) {
  apiMetrics.totalRequests++;
  
  // Por método
  const method = req.method;
  apiMetrics.requestsByMethod[method] = (apiMetrics.requestsByMethod[method] || 0) + 1;
  
  // Por endpoint (generalizado)
  const endpoint = sanitizeEndpoint(req.originalUrl).split('?')[0];
  apiMetrics.requestsByEndpoint[endpoint] = (apiMetrics.requestsByEndpoint[endpoint] || 0) + 1;
  
  // Por status code
  const statusGroup = `${Math.floor(res.statusCode / 100)}xx`;
  apiMetrics.requestsByStatus[statusGroup] = (apiMetrics.requestsByStatus[statusGroup] || 0) + 1;
  
  // Tempo de resposta médio
  apiMetrics.averageResponseTime = (
    (apiMetrics.averageResponseTime * (apiMetrics.totalRequests - 1) + duration) / 
    apiMetrics.totalRequests
  );
  
  // Requests lentos (> 2 segundos)
  if (duration > 2000) {
    apiMetrics.slowRequests++;
  }
  
  // Taxa de erro
  if (res.statusCode >= 400) {
    apiMetrics.errorRate = (
      Object.keys(apiMetrics.requestsByStatus)
        .filter(status => status.startsWith('4') || status.startsWith('5'))
        .reduce((sum, status) => sum + apiMetrics.requestsByStatus[status], 0)
    ) / apiMetrics.totalRequests;
  }
}

/**
 * 📈 Obtém métricas da API
 */
function getAPIMetrics() {
  return {
    ...apiMetrics,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  };
}

/**
 * 🔄 Reset das métricas
 */
function resetAPIMetrics() {
  apiMetrics = {
    totalRequests: 0,
    requestsByMethod: {},
    requestsByEndpoint: {},
    requestsByStatus: {},
    averageResponseTime: 0,
    slowRequests: 0,
    errorRate: 0,
    lastReset: new Date()
  };
}

/**
 * 🚨 Middleware para detectar ataques
 */
function securityMiddleware(req, res, next) {
  const suspiciousPatterns = [
    /(\.\.|%2e%2e)/i,  // Path traversal
    /(script|javascript|vbscript)/i,  // XSS
    /(union|select|insert|delete|drop)/i,  // SQL injection
    /(<|%3c)(script|iframe|object)/i,  // HTML injection
    /(eval|exec|system|cmd)/i  // Code injection
  ];
  
  const url = decodeURIComponent(req.originalUrl);
  const userAgent = req.get('user-agent') || '';
  const body = JSON.stringify(req.body || {});
  
  const issuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(url) || pattern.test(userAgent) || pattern.test(body)
  );
  
  if (issuspicious) {
    logger.logSecurityEvent('suspicious_request', {
      url: sanitizeEndpoint(req.originalUrl),
      userAgent: sanitizeUserAgent(userAgent),
      method: req.method,
      ip: anonymizeIP(req.ip),
      threat: 'potential_injection'
    });
    
    // Rate limit mais restritivo para requests suspeitos
    res.set('X-Security-Warning', 'Request flagged for review');
  }
  
  next();
}

/**
 * ⏱️ Middleware para timeout de requests
 */
function timeoutMiddleware(timeoutMs = 30000) {
  return (req, res, next) => {
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        logger.warn('Request Timeout', {
          requestId: req.requestId,
          method: req.method,
          endpoint: sanitizeEndpoint(req.originalUrl),
          timeout: `${timeoutMs}ms`
        });
        
        res.status(408).json({
          success: false,
          error: 'Request timeout',
          code: 'TIMEOUT_ERROR',
          timeout: `${timeoutMs}ms`
        });
      }
    }, timeoutMs);
    
    res.on('finish', () => {
      clearTimeout(timeout);
    });
    
    next();
  };
}

module.exports = {
  requestLogger,
  metricsMiddleware,
  securityMiddleware,
  timeoutMiddleware,
  getAPIMetrics,
  resetAPIMetrics
};