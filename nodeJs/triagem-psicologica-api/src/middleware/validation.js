/**
 * 🛡️ Middleware de Validação
 * Validação rigorosa de entrada usando Zod
 */

const { z } = require('zod');
const logger = require('../utils/logger');

/**
 * 📝 Schema de validação para respostas de triagem
 */
const triagemInputSchema = z.object({
  questionId: z.string()
    .min(1, 'ID da pergunta é obrigatório')
    .max(50, 'ID da pergunta muito longo'),
  
  response: z.union([
    z.number().min(0).max(10), // Escala numérica 0-10
    z.enum([
      'nunca', 'raramente', 'às vezes', 'frequentemente', 'sempre',
      'discordo totalmente', 'discordo', 'neutro', 'concordo', 'concordo totalmente',
      'não', 'talvez', 'sim'
    ]) // Escalas categóricas
  ]).refine(val => val !== undefined && val !== null, {
    message: 'Resposta é obrigatória'
  }),
  
  subescale: z.enum([
    // Transtorno Bipolar
    'mania', 'hipomania', 'depressao', 'ansiedade', 'irritabilidade', 
    'impulsividade', 'ciclosHumor', 'funcionamento',
    
    // Narcisismo
    'grandiosidade', 'necessidadeAdmiracao', 'faltaEmpatia', 'exploracaoOutros',
    'arrogancia', 'autoridade', 'autossuficiencia',
    
    // Mitomania
    'frequenciaMentiras', 'complexidadeMentiras', 'controleComportamento',
    'motivacaoMentir', 'conscienciaMentiras', 'impactoRelacoes',
    'diferenciacaoRealidade', 'padroesCompulsivos'
  ]),
  
  metadata: z.object({
    timeSpent: z.number().min(0).max(300).optional(), // Tempo em segundos
    confidence: z.number().min(1).max(5).optional(),  // Nível de confiança
    comments: z.string().max(500).optional()          // Comentários opcionais
  }).optional()
});

/**
 * 🆔 Schema para validação de Session ID
 */
const sessionIdSchema = z.string()
  .min(10, 'Session ID muito curto')
  .max(100, 'Session ID muito longo')
  .regex(/^[A-Z]{2}-\d+-[a-zA-Z0-9]+$/, 'Formato de Session ID inválido');

/**
 * 📊 Schema para dados de analytics
 */
const analyticsSchema = z.object({
  type: z.enum(['bipolar', 'narcisismo', 'mitomania']),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  filters: z.object({
    riskLevel: z.enum(['Baixo', 'Moderado', 'Alto', 'Crítico']).optional(),
    minScore: z.number().min(0).max(100).optional(),
    maxScore: z.number().min(0).max(100).optional()
  }).optional()
});

/**
 * ✅ Middleware para validação de entrada da triagem
 */
const validateTriagemInput = (req, res, next) => {
  try {
    const validatedData = triagemInputSchema.parse(req.body);
    
    // Validações adicionais específicas
    if (validatedData.metadata?.timeSpent < 5) {
      logger.warn(`⚠️ Resposta muito rápida detectada: ${validatedData.metadata.timeSpent}s`);
    }
    
    // Adiciona dados validados ao request
    req.validatedBody = validatedData;
    next();
    
  } catch (error) {
    logger.warn('❌ Validação de entrada falhou:', error.errors);
    
    return res.status(400).json({
      success: false,
      error: 'Dados de entrada inválidos',
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        received: err.received
      }))
    });
  }
};

/**
 * 🆔 Middleware para validação de Session ID
 */
const validateSessionId = (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    const validatedSessionId = sessionIdSchema.parse(sessionId);
    
    // Verifica se o prefixo corresponde ao tipo de triagem
    const type = req.params.type || req.path.split('/')[1];
    const expectedPrefixes = {
      'bipolar': 'BI',
      'narcisismo': 'NA', 
      'mitomania': 'MI'
    };
    
    if (type && expectedPrefixes[type]) {
      const prefix = validatedSessionId.substring(0, 2);
      if (prefix !== expectedPrefixes[type]) {
        return res.status(400).json({
          success: false,
          error: 'Session ID não corresponde ao tipo de triagem',
          expected: expectedPrefixes[type],
          received: prefix
        });
      }
    }
    
    req.validatedSessionId = validatedSessionId;
    next();
    
  } catch (error) {
    logger.warn('❌ Validação de Session ID falhou:', error.errors);
    
    return res.status(400).json({
      success: false,
      error: 'Session ID inválido',
      details: error.errors?.map(err => err.message) || ['Formato inválido']
    });
  }
};

/**
 * 📊 Middleware para validação de analytics
 */
const validateAnalyticsInput = (req, res, next) => {
  try {
    const validatedData = analyticsSchema.parse(req.body);
    
    // Validação de intervalo de datas
    if (validatedData.startDate && validatedData.endDate) {
      const start = new Date(validatedData.startDate);
      const end = new Date(validatedData.endDate);
      
      if (start >= end) {
        return res.status(400).json({
          success: false,
          error: 'Data de início deve ser anterior à data de fim'
        });
      }
      
      // Limita intervalo máximo a 1 ano
      const maxInterval = 365 * 24 * 60 * 60 * 1000; // 1 ano em ms
      if (end - start > maxInterval) {
        return res.status(400).json({
          success: false,
          error: 'Intervalo de datas não pode exceder 1 ano'
        });
      }
    }
    
    req.validatedBody = validatedData;
    next();
    
  } catch (error) {
    logger.warn('❌ Validação de analytics falhou:', error.errors);
    
    return res.status(400).json({
      success: false,
      error: 'Parâmetros de analytics inválidos',
      details: error.errors?.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }
};

/**
 * 🔒 Middleware para validação de headers de segurança
 */
const validateSecurityHeaders = (req, res, next) => {
  const requiredHeaders = ['user-agent'];
  const missingHeaders = [];
  
  requiredHeaders.forEach(header => {
    if (!req.get(header)) {
      missingHeaders.push(header);
    }
  });
  
  if (missingHeaders.length > 0) {
    logger.warn('❌ Headers de segurança ausentes:', missingHeaders);
    return res.status(400).json({
      success: false,
      error: 'Headers de segurança obrigatórios ausentes',
      missing: missingHeaders
    });
  }
  
  // Validação básica de User-Agent
  const userAgent = req.get('user-agent');
  if (userAgent.length < 10 || userAgent.length > 500) {
    return res.status(400).json({
      success: false,
      error: 'User-Agent inválido'
    });
  }
  
  next();
};

/**
 * 🎯 Middleware para validação de Content-Type
 */
const validateContentType = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const contentType = req.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(415).json({
        success: false,
        error: 'Content-Type deve ser application/json',
        received: contentType || 'undefined'
      });
    }
  }
  
  next();
};

/**
 * 📏 Middleware para validação de tamanho do payload
 */
const validatePayloadSize = (req, res, next) => {
  const maxSize = 1024 * 1024; // 1MB
  const contentLength = parseInt(req.get('content-length') || '0');
  
  if (contentLength > maxSize) {
    logger.warn(`❌ Payload muito grande: ${contentLength} bytes`);
    return res.status(413).json({
      success: false,
      error: 'Payload muito grande',
      maxSize: '1MB',
      received: `${Math.round(contentLength / 1024)}KB`
    });
  }
  
  next();
};

/**
 * 🚫 Middleware para prevenir ataques de XSS básicos
 */
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (typeof obj === 'string') {
      // Remove caracteres potencialmente perigosos
      return obj.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+=/gi, '');
    }
    
    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        obj[key] = sanitize(obj[key]);
      });
    }
    
    return obj;
  };
  
  if (req.body) {
    req.body = sanitize(req.body);
  }
  
  if (req.query) {
    req.query = sanitize(req.query);
  }
  
  next();
};

/**
 * ⏰ Middleware para validação de timeout de sessão
 */
const validateSessionTimeout = (activeSessions) => {
  return (req, res, next) => {
    const { sessionId } = req.params;
    
    if (sessionId && activeSessions.has(sessionId)) {
      const session = activeSessions.get(sessionId);
      const timeoutMs = (parseInt(process.env.SESSION_TIMEOUT_MINUTES) || 30) * 60 * 1000;
      
      if (Date.now() - session.startTime > timeoutMs) {
        activeSessions.delete(sessionId);
        logger.warn(`⏰ Sessão expirada: ${sessionId}`);
        
        return res.status(408).json({
          success: false,
          error: 'Sessão expirada',
          message: 'Por favor, inicie uma nova triagem',
          timeoutMinutes: parseInt(process.env.SESSION_TIMEOUT_MINUTES) || 30
        });
      }
    }
    
    next();
  };
};

module.exports = {
  validateTriagemInput,
  validateSessionId,
  validateAnalyticsInput,
  validateSecurityHeaders,
  validateContentType,
  validatePayloadSize,
  sanitizeInput,
  validateSessionTimeout
};