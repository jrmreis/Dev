/**
 * ⚠️ Error Handler Global
 * Tratamento centralizado de erros com logging seguro
 */

const logger = require('../utils/logger');
const { sanitizeForLogging } = require('../utils/security');

/**
 * 🏥 Classe para erros específicos de saúde mental
 */
class HealthDataError extends Error {
  constructor(message, statusCode = 400, code = 'HEALTH_DATA_ERROR') {
    super(message);
    this.name = 'HealthDataError';
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

/**
 * 🗄️ Classe para erros do Notion
 */
class NotionServiceError extends Error {
  constructor(message, statusCode = 503, originalError = null) {
    super(message);
    this.name = 'NotionServiceError';
    this.statusCode = statusCode;
    this.code = 'NOTION_SERVICE_ERROR';
    this.originalError = originalError;
    this.isOperational = true;
  }
}

/**
 * 🔐 Classe para erros de validação
 */
class ValidationError extends Error {
  constructor(message, field = null, statusCode = 400) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = statusCode;
    this.code = 'VALIDATION_ERROR';
    this.field = field;
    this.isOperational = true;
  }
}

/**
 * 🚫 Classe para erros de autorização
 */
class AuthorizationError extends Error {
  constructor(message = 'Acesso negado', statusCode = 403) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = statusCode;
    this.code = 'AUTHORIZATION_ERROR';
    this.isOperational = true;
  }
}

/**
 * ⏰ Classe para erros de timeout
 */
class TimeoutError extends Error {
  constructor(message = 'Operação expirou', statusCode = 408) {
    super(message);
    this.name = 'TimeoutError';
    this.statusCode = statusCode;
    this.code = 'TIMEOUT_ERROR';
    this.isOperational = true;
  }
}

/**
 * 🚦 Middleware principal de tratamento de erros
 */
function errorHandler(err, req, res, next) {
  // Previne exposição de dados sensíveis
  const sanitizedError = sanitizeForLogging({
    message: err.message,
    stack: err.stack,
    code: err.code,
    statusCode: err.statusCode
  });

  // Log do erro com contexto sanitizado
  const errorContext = {
    method: req.method,
    url: req.originalUrl.replace(/\/[^\/]+$/g, '/***'), // Anonimiza IDs
    userAgent: req.get('user-agent')?.substring(0, 100),
    ip: 'anonymized', // IP já foi anonimizado anteriormente
    timestamp: new Date().toISOString(),
    requestId: req.requestId || 'unknown',
    ...sanitizedError
  };

  // Determina o nível de log baseado na severidade
  if (err.statusCode >= 500) {
    logger.error('🚨 Server Error', errorContext);
  } else if (err.statusCode >= 400) {
    logger.warn('⚠️ Client Error', errorContext);
  } else {
    logger.info('ℹ️ Handled Error', errorContext);
  }

  // Log específico para erros de dados de saúde mental
  if (err instanceof HealthDataError) {
    logger.logSecurityEvent('health_data_error', {
      message: err.message,
      code: err.code,
      endpoint: req.originalUrl
    });
  }

  // Resposta baseada no tipo de erro
  let statusCode = err.statusCode || 500;
  let response = {
    success: false,
    error: getErrorMessage(err),
    timestamp: new Date().toISOString(),
    requestId: req.requestId
  };

  // Adiciona informações específicas por tipo de erro
  switch (err.constructor) {
    case ValidationError:
      response.field = err.field;
      response.code = 'VALIDATION_ERROR';
      break;
      
    case NotionServiceError:
      response.code = 'SERVICE_UNAVAILABLE';
      response.retryAfter = '60 seconds';
      break;
      
    case HealthDataError:
      response.code = 'HEALTH_DATA_ERROR';
      response.supportContact = 'suporte@triagem.com';
      break;
      
    case AuthorizationError:
      response.code = 'UNAUTHORIZED';
      break;
      
    case TimeoutError:
      response.code = 'TIMEOUT';
      response.suggestion = 'Tente novamente em alguns momentos';
      break;
      
    default:
      if (statusCode >= 500) {
        response.code = 'INTERNAL_ERROR';
        response.message = 'Erro interno do servidor';
      }
  }

  // Remove stack trace em produção
  if (process.env.NODE_ENV === 'production') {
    delete response.stack;
  } else {
    response.stack = err.stack;
  }

  // Adiciona headers apropriados
  res.set({
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY'
  });

  // Headers específicos para diferentes tipos de erro
  if (err instanceof TimeoutError) {
    res.set('Retry-After', '60');
  }

  if (err instanceof NotionServiceError) {
    res.set('Service-Unavailable', 'true');
  }

  // Log de caso crítico se necessário
  if (statusCode >= 500 && req.originalUrl.includes('/triagem/')) {
    logger.logCriticalCase(
      req.params.sessionId || 'unknown',
      req.originalUrl.split('/')[4] || 'unknown',
      0,
      { errorType: err.constructor.name, severity: 'high' }
    );
  }

  res.status(statusCode).json(response);
}

/**
 * 📝 Obtém mensagem de erro apropriada
 */
function getErrorMessage(err) {
  // Mensagens amigáveis para o usuário
  const userFriendlyMessages = {
    'VALIDATION_ERROR': 'Dados fornecidos são inválidos',
    'NOTION_SERVICE_ERROR': 'Serviço temporariamente indisponível',
    'HEALTH_DATA_ERROR': 'Erro ao processar dados de saúde',
    'AUTHORIZATION_ERROR': 'Acesso não autorizado',
    'TIMEOUT_ERROR': 'Operação demorou mais que o esperado',
    'NETWORK_ERROR': 'Problema de conectividade',
    'RATE_LIMIT_ERROR': 'Muitas solicitações. Tente novamente em alguns minutos'
  };

  if (err.code && userFriendlyMessages[err.code]) {
    return userFriendlyMessages[err.code];
  }

  // Em produção, não expor detalhes técnicos
  if (process.env.NODE_ENV === 'production') {
    if (err.statusCode >= 500) {
      return 'Erro interno do servidor';
    }
    return err.message || 'Erro desconhecido';
  }

  return err.message || 'Erro desconhecido';
}

/**
 * 🔍 Handler para 404 - Not Found
 */
function notFoundHandler(req, res, next) {
  const error = new Error(`Endpoint não encontrado: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  error.code = 'NOT_FOUND';
  
  logger.warn('404 - Not Found', {
    method: req.method,
    url: req.originalUrl,
    userAgent: req.get('user-agent'),
    timestamp: new Date().toISOString()
  });
  
  next(error);
}

/**
 * ⚡ Handler para Promise rejections não tratadas
 */
function handleUnhandledRejection(reason, promise) {
  logger.error('🚨 Unhandled Promise Rejection', {
    reason: reason.toString(),
    stack: reason.stack,
    timestamp: new Date().toISOString()
  });
  
  // Em produção, encerra o processo graciosamente
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
}

/**
 * 💥 Handler para exceções não capturadas
 */
function handleUncaughtException(error) {
  logger.error('🚨 Uncaught Exception', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  
  // Encerra o processo
  process.exit(1);
}

/**
 * 🔄 Middleware para async/await error handling
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * 🚨 Handler específico para erros de triagem críticos
 */
function handleCriticalTriagemError(sessionId, type, error, req) {
  logger.logCriticalCase(sessionId, type, 0, {
    errorType: error.constructor.name,
    errorMessage: error.message,
    endpoint: req.originalUrl,
    severity: 'critical',
    requiresIntervention: true
  });
  
  // Notifica sistema de alertas se configurado
  if (process.env.WEBHOOK_URL_CRITICAL_CASES) {
    notifyCriticalCase(sessionId, type, error).catch(err => {
      logger.error('Falha ao notificar caso crítico:', err);
    });
  }
}

/**
 * 📢 Notifica casos críticos via webhook
 */
async function notifyCriticalCase(sessionId, type, error) {
  try {
    const payload = {
      alert: 'critical_triagem_error',
      sessionId: sessionId.substring(0, 8) + '***',
      type,
      timestamp: new Date().toISOString(),
      severity: 'high',
      message: 'Erro crítico durante triagem psicológica'
    };
    
    // Implementar chamada HTTP para webhook aqui
    // await fetch(process.env.WEBHOOK_URL_CRITICAL_CASES, {...})
    
  } catch (notificationError) {
    logger.error('Falha na notificação de caso crítico:', notificationError);
  }
}

/**
 * 📊 Coleta estatísticas de erros
 */
let errorStats = {
  total: 0,
  byType: {},
  byEndpoint: {},
  byHour: {},
  lastReset: new Date()
};

function trackError(err, req) {
  errorStats.total++;
  
  // Por tipo
  const errorType = err.constructor.name;
  errorStats.byType[errorType] = (errorStats.byType[errorType] || 0) + 1;
  
  // Por endpoint
  const endpoint = req.originalUrl.split('/').slice(0, 4).join('/');
  errorStats.byEndpoint[endpoint] = (errorStats.byEndpoint[endpoint] || 0) + 1;
  
  // Por hora
  const hour = new Date().getHours();
  errorStats.byHour[hour] = (errorStats.byHour[hour] || 0) + 1;
}

function getErrorStats() {
  return { ...errorStats };
}

function resetErrorStats() {
  errorStats = {
    total: 0,
    byType: {},
    byEndpoint: {},
    byHour: {},
    lastReset: new Date()
  };
}

// Configura handlers globais
process.on('unhandledRejection', handleUnhandledRejection);
process.on('uncaughtException', handleUncaughtException);

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler,
  handleCriticalTriagemError,
  trackError,
  getErrorStats,
  resetErrorStats,
  
  // Classes de erro customizadas
  HealthDataError,
  NotionServiceError,
  ValidationError,
  AuthorizationError,
  TimeoutError
};