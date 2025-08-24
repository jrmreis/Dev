/**
 * 🔍 Validação de Variáveis de Ambiente
 * Garante que todas as configurações necessárias estão presentes
 */

const { z } = require('zod');

/**
 * 📋 Schema de validação para variáveis de ambiente
 */
const envSchema = z.object({
  // 🔐 Configurações do servidor
  PORT: z.string().regex(/^\d+$/, 'PORT deve ser um número').default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // 🗄️ Notion API - OBRIGATÓRIAS
  NOTION_API_KEY: z.string().min(1, 'NOTION_API_KEY é obrigatória'),
  NOTION_DATABASE_BIPOLAR: z.string().min(1, 'NOTION_DATABASE_BIPOLAR é obrigatória'),
  NOTION_DATABASE_NARCISISMO: z.string().min(1, 'NOTION_DATABASE_NARCISISMO é obrigatória'),
  NOTION_DATABASE_MITOMANIA: z.string().min(1, 'NOTION_DATABASE_MITOMANIA é obrigatória'),
  
  // 🛡️ Segurança e Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().regex(/^\d+$/).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().regex(/^\d+$/).default('100'),
  RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS: z.string().default('true'),
  
  // 🔒 Hash e Criptografia
  HASH_SECRET_KEY: z.string().min(32, 'HASH_SECRET_KEY deve ter pelo menos 32 caracteres'),
  ENCRYPTION_ALGORITHM: z.string().default('sha256'),
  
  // 📊 Configurações de Scoring
  BIPOLAR_SCORE_MULTIPLIER: z.string().regex(/^\d+\.?\d*$/).default('2.5'),
  NARCISISMO_SCORE_MULTIPLIER: z.string().regex(/^\d+\.?\d*$/).default('2.38'),
  MITOMANIA_SCORE_MULTIPLIER: z.string().regex(/^\d+\.?\d*$/).default('1.82'),
  
  // ⚠️ Thresholds de Risco
  RISK_LOW_THRESHOLD: z.string().regex(/^\d+$/).default('30'),
  RISK_MODERATE_THRESHOLD: z.string().regex(/^\d+$/).default('50'),
  RISK_HIGH_THRESHOLD: z.string().regex(/^\d+$/).default('70'),
  RISK_CRITICAL_THRESHOLD: z.string().regex(/^\d+$/).default('85'),
  
  // 📝 Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FILE_PATH: z.string().optional(),
  LOG_MAX_FILES: z.string().regex(/^\d+$/).default('5'),
  LOG_MAX_SIZE: z.string().default('10m'),
  
  // 🌐 CORS
  ALLOWED_ORIGINS: z.string().optional(),
  CORS_CREDENTIALS: z.string().default('true'),
  
  // 🕒 Session e Timeouts
  SESSION_TIMEOUT_MINUTES: z.string().regex(/^\d+$/).default('30'),
  MAX_QUESTION_TIME_SECONDS: z.string().regex(/^\d+$/).default('60'),
  
  // 📧 Notificações (opcionais)
  WEBHOOK_URL_CRITICAL_CASES: z.string().url().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  
  // 🔄 Retry Configuration
  NOTION_RETRY_ATTEMPTS: z.string().regex(/^\d+$/).default('3'),
  NOTION_RETRY_DELAY_MS: z.string().regex(/^\d+$/).default('1000'),
  
  // 📱 Mobile/API
  MOBILE_API_VERSION: z.string().default('v1'),
  MOBILE_MIN_VERSION: z.string().default('1.0.0'),
  
  // 🧪 Development/Testing
  DEV_SKIP_IP_ANONYMIZATION: z.string().default('false'),
  DEV_MOCK_NOTION_API: z.string().default('false'),
  TEST_DATABASE_PREFIX: z.string().default('test_'),
  
  // 📊 Analytics
  ENABLE_ANALYTICS: z.string().default('true'),
  ANALYTICS_SAMPLING_RATE: z.string().regex(/^0\.\d+$|^1\.0$/).default('0.1'),
  
  // 💾 Cache
  CACHE_TTL_SECONDS: z.string().regex(/^\d+$/).default('300'),
  CACHE_MAX_SIZE: z.string().regex(/^\d+$/).default('100'),
  
  // 🌍 Localização
  DEFAULT_TIMEZONE: z.string().default('America/Sao_Paulo'),
  DEFAULT_LOCALE: z.string().default('pt-BR'),
  
  // 🔧 Performance
  MAX_PAYLOAD_SIZE: z.string().default('1mb'),
  REQUEST_TIMEOUT_MS: z.string().regex(/^\d+$/).default('30000'),
  KEEP_ALIVE_TIMEOUT_MS: z.string().regex(/^\d+$/).default('65000')
});

/**
 * 🔍 Validações customizadas
 */
function customValidations(env) {
  const errors = [];
  
  // Valida se thresholds de risco estão em ordem crescente
  const lowThreshold = parseInt(env.RISK_LOW_THRESHOLD);
  const moderateThreshold = parseInt(env.RISK_MODERATE_THRESHOLD);
  const highThreshold = parseInt(env.RISK_HIGH_THRESHOLD);
  const criticalThreshold = parseInt(env.RISK_CRITICAL_THRESHOLD);
  
  if (lowThreshold >= moderateThreshold) {
    errors.push('RISK_LOW_THRESHOLD deve ser menor que RISK_MODERATE_THRESHOLD');
  }
  
  if (moderateThreshold >= highThreshold) {
    errors.push('RISK_MODERATE_THRESHOLD deve ser menor que RISK_HIGH_THRESHOLD');
  }
  
  if (highThreshold >= criticalThreshold) {
    errors.push('RISK_HIGH_THRESHOLD deve ser menor que RISK_CRITICAL_THRESHOLD');
  }
  
  // Valida se multiplicadores de score são positivos
  const bipolarMultiplier = parseFloat(env.BIPOLAR_SCORE_MULTIPLIER);
  const narcisismoMultiplier = parseFloat(env.NARCISISMO_SCORE_MULTIPLIER);
  const mitomaniaMultiplier = parseFloat(env.MITOMANIA_SCORE_MULTIPLIER);
  
  if (bipolarMultiplier <= 0) {
    errors.push('BIPOLAR_SCORE_MULTIPLIER deve ser positivo');
  }
  
  if (narcisismoMultiplier <= 0) {
    errors.push('NARCISISMO_SCORE_MULTIPLIER deve ser positivo');
  }
  
  if (mitomaniaMultiplier <= 0) {
    errors.push('MITOMANIA_SCORE_MULTIPLIER deve ser positivo');
  }
  
  // Valida formato dos IDs de database do Notion
  const databaseIds = [
    env.NOTION_DATABASE_BIPOLAR,
    env.NOTION_DATABASE_NARCISISMO,
    env.NOTION_DATABASE_MITOMANIA
  ];
  
  const uuidRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
  
  databaseIds.forEach((id, index) => {
    const dbNames = ['BIPOLAR', 'NARCISISMO', 'MITOMANIA'];
    if (!uuidRegex.test(id.replace(/-/g, ''))) {
      errors.push(`NOTION_DATABASE_${dbNames[index]} deve ser um UUID válido`);
    }
  });
  
  // Valida Notion API Key
  if (!env.NOTION_API_KEY.startsWith('secret_')) {
    errors.push('NOTION_API_KEY deve começar com "secret_"');
  }
  
  // Valida configurações de produção
  if (env.NODE_ENV === 'production') {
    if (env.HASH_SECRET_KEY === 'default-secret-key-change-in-production') {
      errors.push('HASH_SECRET_KEY deve ser alterada para produção');
    }
    
    if (!env.ALLOWED_ORIGINS) {
      errors.push('ALLOWED_ORIGINS é obrigatória em produção');
    }
    
    if (env.LOG_LEVEL === 'debug') {
      errors.push('LOG_LEVEL não deve ser "debug" em produção');
    }
  }
  
  return errors;
}

/**
 * 🚨 Validações de segurança
 */
function securityValidations(env) {
  const warnings = [];
  
  // Verifica se configurações de desenvolvimento estão ativas em produção
  if (env.NODE_ENV === 'production') {
    if (env.DEV_SKIP_IP_ANONYMIZATION === 'true') {
      warnings.push('⚠️ DEV_SKIP_IP_ANONYMIZATION está ativa em produção');
    }
    
    if (env.DEV_MOCK_NOTION_API === 'true') {
      warnings.push('⚠️ DEV_MOCK_NOTION_API está ativa em produção');
    }
  }
  
  // Verifica configurações de rate limiting
  const maxRequests = parseInt(env.RATE_LIMIT_MAX_REQUESTS);
  if (maxRequests > 1000) {
    warnings.push('⚠️ RATE_LIMIT_MAX_REQUESTS muito alto (> 1000)');
  }
  
  // Verifica timeout de sessão
  const sessionTimeout = parseInt(env.SESSION_TIMEOUT_MINUTES);
  if (sessionTimeout > 60) {
    warnings.push('⚠️ SESSION_TIMEOUT_MINUTES muito alto (> 60 min)');
  }
  
  return warnings;
}

/**
 * ✅ Função principal de validação
 */
function validateEnv() {
  try {
    // Validação do schema Zod
    const validatedEnv = envSchema.parse(process.env);
    
    // Validações customizadas
    const customErrors = customValidations(validatedEnv);
    if (customErrors.length > 0) {
      throw new Error(`Erros de configuração:\n${customErrors.join('\n')}`);
    }
    
    // Validações de segurança (apenas warnings)
    const securityWarnings = securityValidations(validatedEnv);
    if (securityWarnings.length > 0) {
      console.warn('Avisos de segurança:');
      securityWarnings.forEach(warning => console.warn(warning));
    }
    
    // Atualiza process.env com valores validados e defaults
    Object.assign(process.env, validatedEnv);
    
    return {
      isValid: true,
      env: validatedEnv,
      warnings: securityWarnings
    };
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => {
        const path = err.path.join('.');
        return `${path}: ${err.message}`;
      });
      
      throw new Error(`Variáveis de ambiente inválidas:\n${errorMessages.join('\n')}`);
    }
    
    throw error;
  }
}

/**
 * 📋 Lista todas as variáveis obrigatórias
 */
function getRequiredEnvVars() {
  return [
    'NOTION_API_KEY',
    'NOTION_DATABASE_BIPOLAR',
    'NOTION_DATABASE_NARCISISMO',
    'NOTION_DATABASE_MITOMANIA',
    'HASH_SECRET_KEY'
  ];
}

/**
 * 📊 Gera relatório de configuração
 */
function getConfigReport() {
  const env = process.env;
  
  return {
    server: {
      port: env.PORT,
      environment: env.NODE_ENV,
      timezone: env.DEFAULT_TIMEZONE,
      locale: env.DEFAULT_LOCALE
    },
    
    notion: {
      configured: !!env.NOTION_API_KEY,
      databases: {
        bipolar: !!env.NOTION_DATABASE_BIPOLAR,
        narcisismo: !!env.NOTION_DATABASE_NARCISISMO,
        mitomania: !!env.NOTION_DATABASE_MITOMANIA
      },
      retryAttempts: env.NOTION_RETRY_ATTEMPTS
    },
    
    security: {
      rateLimit: {
        maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
        windowMs: env.RATE_LIMIT_WINDOW_MS
      },
      sessionTimeout: env.SESSION_TIMEOUT_MINUTES,
      corsConfigured: !!env.ALLOWED_ORIGINS
    },
    
    scoring: {
      thresholds: {
        low: env.RISK_LOW_THRESHOLD,
        moderate: env.RISK_MODERATE_THRESHOLD,
        high: env.RISK_HIGH_THRESHOLD,
        critical: env.RISK_CRITICAL_THRESHOLD
      },
      multipliers: {
        bipolar: env.BIPOLAR_SCORE_MULTIPLIER,
        narcisismo: env.NARCISISMO_SCORE_MULTIPLIER,
        mitomania: env.MITOMANIA_SCORE_MULTIPLIER
      }
    },
    
    logging: {
      level: env.LOG_LEVEL,
      fileLogging: !!env.LOG_FILE_PATH,
      maxFiles: env.LOG_MAX_FILES
    },
    
    features: {
      analytics: env.ENABLE_ANALYTICS === 'true',
      webhooks: !!env.WEBHOOK_URL_CRITICAL_CASES,
      mobile: env.MOBILE_API_VERSION
    }
  };
}

/**
 * 🔧 Exemplo de arquivo .env
 */
function generateEnvExample() {
  return `# 🔐 CONFIGURAÇÕES DO SERVIDOR
PORT=3000
NODE_ENV=development

# 🗄️ NOTION API CONFIGURATION (OBRIGATÓRIAS)
NOTION_API_KEY=secret_sua_chave_notion_aqui
NOTION_DATABASE_BIPOLAR=cea70b52-2dd1-4b61-8744-10cabf296478
NOTION_DATABASE_NARCISISMO=78581d17-c6e3-42be-9ba1-2d3c4058ce52
NOTION_DATABASE_MITOMANIA=b4ab5e54-6051-403d-aeb2-02bdabdc0818

# 🛡️ SEGURANÇA E RATE LIMITING
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=true

# 🔒 HASH E CRIPTOGRAFIA (MUDE EM PRODUÇÃO!)
HASH_SECRET_KEY=sua_chave_secreta_muito_forte_aqui_32_chars_min
ENCRYPTION_ALGORITHM=sha256

# 📊 CONFIGURAÇÕES DE SCORING
BIPOLAR_SCORE_MULTIPLIER=2.5
NARCISISMO_SCORE_MULTIPLIER=2.38
MITOMANIA_SCORE_MULTIPLIER=1.82

# ⚠️ THRESHOLDS DE RISCO
RISK_LOW_THRESHOLD=30
RISK_MODERATE_THRESHOLD=50
RISK_HIGH_THRESHOLD=70
RISK_CRITICAL_THRESHOLD=85

# 📝 LOGGING
LOG_LEVEL=info
LOG_FILE_PATH=./logs/app.log
LOG_MAX_FILES=5
LOG_MAX_SIZE=10m

# 🌐 CORS CONFIGURATION
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
CORS_CREDENTIALS=true

# 🕒 SESSION TIMEOUTS
SESSION_TIMEOUT_MINUTES=30
MAX_QUESTION_TIME_SECONDS=60

# 📧 NOTIFICAÇÕES (opcional)
WEBHOOK_URL_CRITICAL_CASES=https://your-webhook-url.com/critical
ADMIN_EMAIL=admin@yourdomain.com

# Outras configurações... (ver arquivo completo)
`;
}

module.exports = {
  validateEnv,
  getRequiredEnvVars,
  getConfigReport,
  generateEnvExample
};