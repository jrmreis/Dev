const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/app.log' })
  ]
});

// Add all missing methods for compatibility
logger.logTriagemEvent = (type, event, metadata) => {
  logger.info(`Triagem ${type}: ${event}`, metadata);
};

logger.logCriticalCase = (sessionId, type, score, metadata) => {
  logger.error(`Critical case: ${type} - Score: ${score}`, metadata);
};

logger.logSecurityEvent = (event, details) => {
  logger.warn(`Security: ${event}`, details);
};

logger.logRetryAttempt = (operation, attempt, maxAttempts, error) => {
  logger.warn(`Retry ${attempt}/${maxAttempts} for ${operation}: ${error.message}`);
};

logger.logPerformance = (operation, duration, metadata) => {
  logger.info(`Performance: ${operation} took ${duration}ms`, metadata);
};

logger.logNotionOperation = (operation, success, duration, metadata) => {
  logger.info(`Notion ${operation}: ${success ? 'success' : 'failed'} (${duration}ms)`, metadata);
};

module.exports = logger;
