/**
 * 🏥 Health Check Routes
 * Monitoramento de saúde da aplicação e dependências
 */

const express = require('express');
const router = express.Router();
const notionService = require('../services/notionService');
const logger = require('../utils/logger');
const { getAPIMetrics } = require('../middleware/requestLogger');
const { getErrorStats } = require('../middleware/errorHandler');

/**
 * 🔍 Health check básico
 */
router.get('/', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {},
      system: getSystemHealth(),
      responseTime: `${Date.now() - startTime}ms`
    };

    // Verificação rápida do Notion (sem chamadas pesadas)
    try {
      const notionHealthy = await Promise.race([
        notionService.testConnection(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        )
      ]);
      
      healthData.services.notion = {
        status: notionHealthy ? 'healthy' : 'unhealthy',
        responseTime: `${Date.now() - startTime}ms`
      };
    } catch (error) {
      healthData.services.notion = {
        status: 'unhealthy',
        error: 'Connection failed or timeout',
        responseTime: `${Date.now() - startTime}ms`
      };
      healthData.status = 'degraded';
    }

    // Status geral
    const isHealthy = Object.values(healthData.services).every(
      service => service.status === 'healthy'
    );

    if (!isHealthy && healthData.status === 'healthy') {
      healthData.status = 'degraded';
    }

    const statusCode = healthData.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(healthData);

  } catch (error) {
    logger.error('❌ Health check failed:', error);
    
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      responseTime: `${Date.now() - startTime}ms`
    });
  }
});

/**
 * 🔧 Health check detalhado
 */
router.get('/detailed', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const detailedHealth = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      
      // Informações do sistema
      system: getDetailedSystemHealth(),
      
      // Métricas da API
      api: getAPIMetrics(),
      
      // Estatísticas de erros
      errors: getErrorStats(),
      
      // Logs
      logs: logger.getLogMetrics(),
      
      // Verificação de serviços
      services: await checkAllServices(),
      
      // Configurações (sem dados sensíveis)
      config: getConfigStatus(),
      
      responseTime: `${Date.now() - startTime}ms`
    };

    // Determina status geral
    const hasUnhealthyServices = Object.values(detailedHealth.services).some(
      service => service.status === 'unhealthy'
    );

    if (hasUnhealthyServices) {
      detailedHealth.status = 'degraded';
    }

    // Verifica se sistema está sobrecarregado
    if (detailedHealth.system.memory.usage > 90 || 
        detailedHealth.system.cpu.usage > 95) {
      detailedHealth.status = 'degraded';
      detailedHealth.warnings = detailedHealth.warnings || [];
      detailedHealth.warnings.push('High resource usage detected');
    }

    const statusCode = detailedHealth.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(detailedHealth);

  } catch (error) {
    logger.error('❌ Detailed health check failed:', error);
    
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Detailed health check failed',
      responseTime: `${Date.now() - startTime}ms`
    });
  }
});

/**
 * 📊 Informações básicas do sistema
 */
function getSystemHealth() {
  const memUsage = process.memoryUsage();
  
  return {
    nodeVersion: process.version,
    platform: process.platform,
    memory: {
      used: Math.round(memUsage.heapUsed / 1024 / 1024),
      total: Math.round(memUsage.heapTotal / 1024 / 1024),
      usage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100)
    },
    uptime: process.uptime()
  };
}

/**
 * 🔍 Informações detalhadas do sistema
 */
function getDetailedSystemHealth() {
  const memUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  
  return {
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    pid: process.pid,
    
    memory: {
      rss: Math.round(memUsage.rss / 1024 / 1024),
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
      external: Math.round(memUsage.external / 1024 / 1024),
      usage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100)
    },
    
    cpu: {
      user: cpuUsage.user,
      system: cpuUsage.system,
      usage: getCPUUsage()
    },
    
    uptime: {
      process: process.uptime(),
      system: require('os').uptime()
    },
    
    loadAverage: require('os').loadavg(),
    
    network: {
      hostname: require('os').hostname(),
      networkInterfaces: Object.keys(require('os').networkInterfaces())
    }
  };
}

/**
 * 🖥️ Calcula uso de CPU (aproximado)
 */
let lastCpuUsage = process.cpuUsage();
let lastHrtime = process.hrtime();

function getCPUUsage() {
  const currentCpuUsage = process.cpuUsage(lastCpuUsage);
  const currentHrtime = process.hrtime(lastHrtime);
  
  const totalTime = currentHrtime[0] * 1e6 + currentHrtime[1] / 1e3;
  const cpuPercent = (currentCpuUsage.user + currentCpuUsage.system) / totalTime * 100;
  
  lastCpuUsage = process.cpuUsage();
  lastHrtime = process.hrtime();
  
  return Math.round(cpuPercent);
}

/**
 * 🔍 Verifica todos os serviços
 */
async function checkAllServices() {
  const services = {};
  
  // Notion API
  try {
    const startTime = Date.now();
    const notionHealthy = await Promise.race([
      notionService.testConnection(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      )
    ]);
    
    services.notion = {
      status: notionHealthy ? 'healthy' : 'unhealthy',
      responseTime: `${Date.now() - startTime}ms`,
      databases: {
        bipolar: !!process.env.NOTION_DATABASE_BIPOLAR,
        depression: !!process.env.NOTION_DATABASE_DEPRESSION,
        anxiety: !!process.env.NOTION_DATABASE_ANXIETY,
        adhd: !!process.env.NOTION_DATABASE_ADHD,
        narcisismo: !!process.env.NOTION_DATABASE_NARCISISMO,
        mitomania: !!process.env.NOTION_DATABASE_MITOMANIA
      }
    };
  } catch (error) {
    services.notion = {
      status: 'unhealthy',
      error: error.message,
      responseTime: 'timeout'
    };
  }
  
  // Verificação de variáveis de ambiente críticas
  const criticalEnvVars = [
    'NOTION_API_KEY',
    'NOTION_DATABASE_BIPOLAR',
    'NOTION_DATABASE_DEPRESSION',
    'NOTION_DATABASE_ANXIETY',
    'NOTION_DATABASE_ADHD',
    'NOTION_DATABASE_NARCISISMO',
    'NOTION_DATABASE_MITOMANIA'
  ];
  
  const missingEnvVars = criticalEnvVars.filter(
    varName => !process.env[varName]
  );
  
  services.environment = {
    status: missingEnvVars.length === 0 ? 'healthy' : 'unhealthy',
    missingVariables: missingEnvVars,
    configuredVariables: criticalEnvVars.length - missingEnvVars.length
  };
  
  return services;
}

/**
 * ⚙️ Status das configurações
 */
function getConfigStatus() {
  return {
    rateLimit: {
      enabled: !!process.env.RATE_LIMIT_MAX_REQUESTS,
      maxRequests: process.env.RATE_LIMIT_MAX_REQUESTS || 'default',
      windowMs: process.env.RATE_LIMIT_WINDOW_MS || 'default'
    },
    
    logging: {
      level: process.env.LOG_LEVEL || 'info',
      fileLogging: process.env.NODE_ENV === 'production'
    },
    
    security: {
      helmet: true,
      cors: !!process.env.ALLOWED_ORIGINS,
      ipAnonymization: true
    },
    
    databases: {
      bipolar: !!process.env.NOTION_DATABASE_BIPOLAR,
      depression: !!process.env.NOTION_DATABASE_DEPRESSION,
      anxiety: !!process.env.NOTION_DATABASE_ANXIETY,
      adhd: !!process.env.NOTION_DATABASE_ADHD,
      narcisismo: !!process.env.NOTION_DATABASE_NARCISISMO,
      mitomania: !!process.env.NOTION_DATABASE_MITOMANIA
    }
  };
}

/**
 * 🚀 Readiness probe (para Kubernetes)
 */
router.get('/ready', async (req, res) => {
  try {
    // Verifica se aplicação está pronta para receber tráfego
    const isReady = await Promise.race([
      notionService.testConnection(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 2000)
      )
    ]);
    
    if (isReady) {
      res.status(200).json({
        status: 'ready',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({
        status: 'not ready',
        reason: 'External services unavailable',
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    res.status(503).json({
      status: 'not ready',
      reason: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * ❤️ Liveness probe (para Kubernetes)
 */
router.get('/live', (req, res) => {
  // Verifica se aplicação está viva (não travada)
  const memUsage = process.memoryUsage();
  const memoryUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
  
  if (memoryUsagePercent < 95) {
    res.status(200).json({
      status: 'alive',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } else {
    res.status(503).json({
      status: 'unhealthy',
      reason: 'High memory usage',
      memoryUsage: `${Math.round(memoryUsagePercent)}%`,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * 📊 Métricas simples (formato Prometheus-like)
 */
router.get('/metrics', (req, res) => {
  const metrics = getAPIMetrics();
  const errors = getErrorStats();
  const system = getDetailedSystemHealth();
  
  const prometheusMetrics = `
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total ${metrics.totalRequests}

# HELP http_request_duration_seconds Average HTTP request duration in seconds
# TYPE http_request_duration_seconds gauge
http_request_duration_seconds ${metrics.averageResponseTime / 1000}

# HELP http_errors_total Total number of HTTP errors
# TYPE http_errors_total counter
http_errors_total ${errors.total}

# HELP memory_usage_bytes Memory usage in bytes
# TYPE memory_usage_bytes gauge
memory_usage_bytes ${system.memory.heapUsed * 1024 * 1024}

# HELP process_uptime_seconds Process uptime in seconds
# TYPE process_uptime_seconds gauge
process_uptime_seconds ${process.uptime()}
`.trim();
  
  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.send(prometheusMetrics);
});

module.exports = router;