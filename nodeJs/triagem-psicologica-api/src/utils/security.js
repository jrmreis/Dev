/**
 * 🔒 Utilitários de Segurança
 * LGPD Compliance e proteção de dados sensíveis
 */

const crypto = require('crypto');
const logger = require('./logger');

/**
 * 🔐 Configurações de segurança
 */
const SECURITY_CONFIG = {
  HASH_ALGORITHM: process.env.ENCRYPTION_ALGORITHM || 'sha256',
  SECRET_KEY: process.env.HASH_SECRET_KEY || 'default-secret-key-change-in-production',
  IP_SALT: 'ip-anonymization-salt-2024',
  SESSION_SALT: 'session-salt-2024'
};

/**
 * 🔒 Anonimiza endereço IP para compliance LGPD
 * @param {string} ip - Endereço IP original
 * @returns {string} - Hash SHA-256 do IP
 */
function anonymizeIP(ip) {
  try {
    if (!ip || ip === '::1' || ip === '127.0.0.1') {
      return 'localhost-anonymous';
    }

    // Remove os últimos octetos para IPv4 ou segmentos para IPv6
    let maskedIP;
    if (ip.includes('.')) {
      // IPv4: mantém apenas os 2 primeiros octetos
      const parts = ip.split('.');
      maskedIP = `${parts[0]}.${parts[1]}.xxx.xxx`;
    } else if (ip.includes(':')) {
      // IPv6: mantém apenas os 4 primeiros segmentos
      const parts = ip.split(':');
      maskedIP = `${parts.slice(0, 4).join(':')}::xxxx`;
    } else {
      maskedIP = 'unknown-format';
    }

    // Gera hash do IP mascarado
    const hash = crypto
      .createHash(SECURITY_CONFIG.HASH_ALGORITHM)
      .update(maskedIP + SECURITY_CONFIG.IP_SALT)
      .digest('hex');

    // Retorna apenas os primeiros 16 caracteres para reduzir tamanho
    return `ip_${hash.substring(0, 16)}`;

  } catch (error) {
    logger.error('❌ Erro ao anonimizar IP:', error);
    return 'anonymization-error';
  }
}

/**
 * 🆔 Gera hash seguro para identificadores
 * @param {string} data - Dados para hash
 * @param {string} salt - Salt adicional
 * @returns {string} - Hash seguro
 */
function generateSecureHash(data, salt = '') {
  try {
    return crypto
      .createHash(SECURITY_CONFIG.HASH_ALGORITHM)
      .update(data + salt + SECURITY_CONFIG.SECRET_KEY)
      .digest('hex');
  } catch (error) {
    logger.error('❌ Erro ao gerar hash seguro:', error);
    throw new Error('Falha na geração de hash');
  }
}

/**
 * 🔑 Gera token de sessão seguro
 * @returns {string} - Token de sessão
 */
function generateSessionToken() {
  try {
    const timestamp = Date.now().toString();
    const randomBytes = crypto.randomBytes(16).toString('hex');
    const data = timestamp + randomBytes;
    
    return generateSecureHash(data, SECURITY_CONFIG.SESSION_SALT);
  } catch (error) {
    logger.error('❌ Erro ao gerar token de sessão:', error);
    throw new Error('Falha na geração de token');
  }
}

/**
 * 🛡️ Sanitiza dados de entrada
 * @param {any} input - Dados de entrada
 * @returns {any} - Dados sanitizados
 */
function sanitizeInput(input) {
  if (typeof input === 'string') {
    return input
      .trim()
      .replace(/[<>\"\'%;()&+]/g, '') // Remove caracteres perigosos
      .substring(0, 1000); // Limita tamanho
  }
  
  if (typeof input === 'number') {
    return Math.max(-999999, Math.min(999999, input)); // Limita range
  }
  
  if (Array.isArray(input)) {
    return input.slice(0, 100).map(sanitizeInput); // Limita array e sanitiza elementos
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized = {};
    Object.keys(input).slice(0, 50).forEach(key => { // Limita número de propriedades
      const sanitizedKey = sanitizeInput(key);
      sanitized[sanitizedKey] = sanitizeInput(input[key]);
    });
    return sanitized;
  }
  
  return input;
}

/**
 * 🔍 Valida e sanitiza parâmetros de URL
 * @param {string} param - Parâmetro da URL
 * @returns {string} - Parâmetro sanitizado
 */
function sanitizeUrlParam(param) {
  if (!param || typeof param !== 'string') {
    return '';
  }
  
  return param
    .replace(/[^a-zA-Z0-9\-_]/g, '') // Permite apenas alfanuméricos, hífen e underscore
    .substring(0, 100); // Limita tamanho
}

/**
 * 🚫 Detecta tentativas de injeção SQL básicas
 * @param {string} input - String de entrada
 * @returns {boolean} - True se suspeita de SQL injection
 */
function detectSQLInjection(input) {
  if (!input || typeof input !== 'string') {
    return false;
  }
  
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
    /(--|\/\*|\*\/|;|'|")/,
    /(\bOR\b|\bAND\b).*[=<>]/i,
    /\b(SCRIPT|JAVASCRIPT|VBSCRIPT)\b/i
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * ⚠️ Detecta tentativas de XSS básicas
 * @param {string} input - String de entrada
 * @returns {boolean} - True se suspeita de XSS
 */
function detectXSS(input) {
  if (!input || typeof input !== 'string') {
    return false;
  }
  
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe\b/i,
    /<object\b/i,
    /<embed\b/i
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * 🔢 Gera código de verificação numérico
 * @param {number} length - Comprimento do código
 * @returns {string} - Código numérico
 */
function generateVerificationCode(length = 6) {
  const digits = '0123456789';
  let code = '';
  
  for (let i = 0; i < length; i++) {
    code += digits[crypto.randomInt(0, digits.length)];
  }
  
  return code;
}

/**
 * 🕐 Cria timestamp seguro com informações limitadas
 * @returns {object} - Objeto com timestamp seguro
 */
function createSecureTimestamp() {
  const now = new Date();
  
  return {
    iso: now.toISOString(),
    unix: Math.floor(now.getTime() / 1000),
    date: now.toISOString().split('T')[0], // Apenas data, sem hora específica
    hour: now.getHours() // Apenas hora, sem minutos/segundos
  };
}

/**
 * 🗂️ Remove dados sensíveis de logs
 * @param {object} data - Dados originais
 * @returns {object} - Dados sanitizados para log
 */
function sanitizeForLogging(data) {
  const sensitive = ['password', 'token', 'ip', 'email', 'phone', 'cpf', 'rg'];
  
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  
  const sanitized = { ...data };
  
  Object.keys(sanitized).forEach(key => {
    const lowerKey = key.toLowerCase();
    
    if (sensitive.some(pattern => lowerKey.includes(pattern))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeForLogging(sanitized[key]);
    }
  });
  
  return sanitized;
}

/**
 * 🔐 Encripta dados sensíveis para armazenamento
 * @param {string} data - Dados para encriptar
 * @returns {string} - Dados encriptados
 */
function encryptSensitiveData(data) {
  try {
    const algorithm = 'aes-256-gcm';
    const key = crypto.scryptSync(SECURITY_CONFIG.SECRET_KEY, 'salt', 32);
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipher(algorithm, key);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    logger.error('❌ Erro ao encriptar dados:', error);
    throw new Error('Falha na encriptação');
  }
}

/**
 * 🔓 Descriptografa dados sensíveis
 * @param {string} encryptedData - Dados encriptados
 * @returns {string} - Dados originais
 */
function decryptSensitiveData(encryptedData) {
  try {
    const [ivHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const key = crypto.scryptSync(SECURITY_CONFIG.SECRET_KEY, 'salt', 32);
    
    const decipher = crypto.createDecipher('aes-256-gcm', key);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    logger.error('❌ Erro ao descriptografar dados:', error);
    throw new Error('Falha na descriptografia');
  }
}

/**
 * 🏥 Verifica integridade de dados de saúde mental
 * @param {object} data - Dados da triagem
 * @returns {boolean} - True se dados são íntegros
 */
function validateHealthDataIntegrity(data) {
  try {
    // Verifica estrutura mínima
    if (!data || typeof data !== 'object') {
      return false;
    }
    
    // Verifica campos obrigatórios
    const requiredFields = ['sessionId', 'type', 'timestamp'];
    const hasRequiredFields = requiredFields.every(field => 
      data[field] !== undefined && data[field] !== null
    );
    
    if (!hasRequiredFields) {
      return false;
    }
    
    // Verifica tipos válidos de triagem
    const validTypes = ['bipolar', 'narcisismo', 'mitomania'];
    if (!validTypes.includes(data.type)) {
      return false;
    }
    
    // Verifica se pontuações estão em ranges válidos
    if (data.pontuacaoGeral !== undefined) {
      if (typeof data.pontuacaoGeral !== 'number' || 
          data.pontuacaoGeral < 0 || 
          data.pontuacaoGeral > 100) {
        return false;
      }
    }
    
    return true;
    
  } catch (error) {
    logger.error('❌ Erro na validação de integridade:', error);
    return false;
  }
}

module.exports = {
  anonymizeIP,
  generateSecureHash,
  generateSessionToken,
  sanitizeInput,
  sanitizeUrlParam,
  detectSQLInjection,
  detectXSS,
  generateVerificationCode,
  createSecureTimestamp,
  sanitizeForLogging,
  encryptSensitiveData,
  decryptSensitiveData,
  validateHealthDataIntegrity
};