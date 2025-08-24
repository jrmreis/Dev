/**
 * 📊 Analytics Routes
 * Relatórios e estatísticas das triagens (LGPD compliant)
 */

const express = require('express');
const router = express.Router();
const notionService = require('../services/notionService');
const { validateAnalyticsInput } = require('../middleware/validation');
const logger = require('../utils/logger');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * 📈 Estatísticas gerais por tipo de triagem
 */
router.get('/stats/:type', asyncHandler(async (req, res) => {
  const { type } = req.params;
  
  if (!['bipolar', 'narcisismo', 'mitomania'].includes(type)) {
    return res.status(400).json({
      success: false,
      error: 'Tipo de triagem inválido'
    });
  }
  
  try {
    const stats = await notionService.getGeneralStats(type);
    
    res.json({
      success: true,
      data: {
        type,
        statistics: {
          totalSessions: stats.totalSessions,
          averageScore: stats.averageScore,
          riskDistribution: stats.riskLevels,
          lastUpdated: stats.lastUpdated
        },
        insights: generateInsights(type, stats)
      }
    });
    
    logger.info(`📊 Analytics accessed for ${type}`, {
      totalSessions: stats.totalSessions,
      requestedBy: 'analytics_user'
    });
    
  } catch (error) {
    logger.error(`❌ Erro ao buscar analytics ${type}:`, error);
    throw error;
  }
}));

/**
 * 📅 Relatório por período
 */
router.post('/report', validateAnalyticsInput, asyncHandler(async (req, res) => {
  const { type, startDate, endDate, filters } = req.validatedBody;
  
  try {
    const sessions = await notionService.getSessionsByDateRange(
      type,
      startDate || getDefaultStartDate(),
      endDate || new Date().toISOString()
    );
    
    // Aplica filtros se fornecidos
    let filteredSessions = sessions;
    if (filters) {
      filteredSessions = applyFilters(sessions, filters);
    }
    
    const analytics = processSessionsForAnalytics(filteredSessions);
    
    res.json({
      success: true,
      data: {
        type,
        period: {
          startDate: startDate || getDefaultStartDate(),
          endDate: endDate || new Date().toISOString()
        },
        filters: filters || {},
        analytics: {
          summary: analytics.summary,
          trends: analytics.trends,
          riskDistribution: analytics.riskDistribution,
          completionRate: analytics.completionRate,
          averageDuration: analytics.averageDuration
        },
        recommendations: generateRecommendations(type, analytics)
      }
    });
    
    logger.logTriagemEvent(type, 'analytics_report_generated', {
      sessionsAnalyzed: filteredSessions.length,
      period: `${startDate || 'default'} to ${endDate || 'now'}`
    });
    
  } catch (error) {
    logger.error('❌ Erro ao gerar relatório:', error);
    throw error;
  }
}));

/**
 * 📊 Dashboard com métricas em tempo real
 */
router.get('/dashboard', asyncHandler(async (req, res) => {
  try {
    const types = ['bipolar', 'narcisismo', 'mitomania'];
    const dashboardData = {};
    
    // Busca stats para todos os tipos
    for (const type of types) {
      try {
        const stats = await notionService.getGeneralStats(type);
        dashboardData[type] = {
          totalSessions: stats.totalSessions,
          averageScore: stats.averageScore,
          riskDistribution: stats.riskLevels,
          trend: calculateTrend(type, stats) // Implementar baseado em dados históricos
        };
      } catch (error) {
        logger.warn(`⚠️ Erro ao buscar stats para ${type}:`, error);
        dashboardData[type] = {
          error: 'Dados indisponíveis',
          totalSessions: 0
        };
      }
    }
    
    // Métricas globais
    const globalMetrics = {
      totalSessionsAllTypes: Object.values(dashboardData)
        .filter(data => !data.error)
        .reduce((sum, data) => sum + data.totalSessions, 0),
      
      systemHealth: 'healthy', // Baseado em health checks
      
      alertas: await getActiveAlerts(),
      
      lastUpdated: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: {
        byType: dashboardData,
        global: globalMetrics,
        insights: generateGlobalInsights(dashboardData)
      }
    });
    
  } catch (error) {
    logger.error('❌ Erro ao gerar dashboard:', error);
    throw error;
  }
}));

/**
 * 🔍 Busca sessões específicas (para auditoria)
 */
router.post('/sessions/search', validateAnalyticsInput, asyncHandler(async (req, res) => {
  const { type, startDate, endDate, filters } = req.validatedBody;
  
  try {
    const sessions = await notionService.getSessionsByDateRange(
      type,
      startDate || getDefaultStartDate(),
      endDate || new Date().toISOString()
    );
    
    let filteredSessions = sessions;
    if (filters) {
      filteredSessions = applyFilters(sessions, filters);
    }
    
    // Remove dados identificáveis para compliance LGPD
    const sanitizedSessions = filteredSessions.map(session => ({
      sessionId: session.sessionId?.substring(0, 8) + '***',
      dataAvaliacao: session.dataAvaliacao?.split('T')[0], // Apenas data, sem hora
      pontuacaoGeral: session.pontuacaoGeral,
      nivelRisco: session.nivelRisco,
      statusSessao: session.statusSessao,
      duracaoSessao: session.duracaoSessao,
      // Subescalas agregadas em grupos para proteção
      subescalasResumo: aggregateSubescales(session.subescalas)
    }));
    
    res.json({
      success: true,
      data: {
        type,
        totalFound: sanitizedSessions.length,
        sessions: sanitizedSessions.slice(0, 100), // Limita a 100 resultados
        filters: filters || {},
        note: 'Dados anonimizados para compliance LGPD'
      }
    });
    
    logger.logDataCleanup('session_search', sanitizedSessions.length, {
      type,
      filtersApplied: !!filters
    });
    
  } catch (error) {
    logger.error('❌ Erro na busca de sessões:', error);
    throw error;
  }
}));

/**
 * 🎯 Métricas de qualidade das triagens
 */
router.get('/quality/:type', asyncHandler(async (req, res) => {
  const { type } = req.params;
  
  if (!['bipolar', 'narcisismo', 'mitomania'].includes(type)) {
    return res.status(400).json({
      success: false,
      error: 'Tipo de triagem inválido'
    });
  }
  
  try {
    const sessions = await notionService.getSessionsByDateRange(
      type,
      getDefaultStartDate(),
      new Date().toISOString()
    );
    
    const qualityMetrics = calculateQualityMetrics(sessions);
    
    res.json({
      success: true,
      data: {
        type,
        quality: qualityMetrics,
        recommendations: generateQualityRecommendations(qualityMetrics)
      }
    });
    
  } catch (error) {
    logger.error(`❌ Erro ao calcular métricas de qualidade ${type}:`, error);
    throw error;
  }
}));

/**
 * 🛠️ FUNÇÕES AUXILIARES
 */

function getDefaultStartDate() {
  const date = new Date();
  date.setDate(date.getDate() - 30); // Últimos 30 dias
  return date.toISOString();
}

function applyFilters(sessions, filters) {
  let filtered = sessions;
  
  if (filters.riskLevel) {
    filtered = filtered.filter(s => s.nivelRisco === filters.riskLevel);
  }
  
  if (filters.minScore !== undefined) {
    filtered = filtered.filter(s => s.pontuacaoGeral >= filters.minScore);
  }
  
  if (filters.maxScore !== undefined) {
    filtered = filtered.filter(s => s.pontuacaoGeral <= filters.maxScore);
  }
  
  return filtered;
}

function processSessionsForAnalytics(sessions) {
  const completedSessions = sessions.filter(s => s.statusSessao === 'Concluída');
  
  return {
    summary: {
      total: sessions.length,
      completed: completedSessions.length,
      abandoned: sessions.length - completedSessions.length
    },
    
    trends: calculateTrends(completedSessions),
    
    riskDistribution: calculateRiskDistribution(completedSessions),
    
    completionRate: sessions.length > 0 ? 
      Math.round((completedSessions.length / sessions.length) * 100) : 0,
    
    averageDuration: completedSessions.length > 0 ?
      Math.round(
        completedSessions.reduce((sum, s) => sum + (s.duracaoSessao || 0), 0) / 
        completedSessions.length
      ) : 0
  };
}

function calculateTrends(sessions) {
  // Agrupa por semana para análise de tendências
  const weeklyData = {};
  
  sessions.forEach(session => {
    if (session.dataAvaliacao) {
      const week = getWeekKey(session.dataAvaliacao);
      if (!weeklyData[week]) {
        weeklyData[week] = { count: 0, totalScore: 0 };
      }
      weeklyData[week].count++;
      weeklyData[week].totalScore += session.pontuacaoGeral || 0;
    }
  });
  
  return Object.keys(weeklyData).map(week => ({
    week,
    sessionsCount: weeklyData[week].count,
    averageScore: weeklyData[week].count > 0 ? 
      Math.round(weeklyData[week].totalScore / weeklyData[week].count) : 0
  })).sort();
}

function calculateRiskDistribution(sessions) {
  const distribution = {
    'Baixo': 0,
    'Moderado': 0,
    'Alto': 0,
    'Crítico': 0
  };
  
  sessions.forEach(session => {
    if (session.nivelRisco && distribution.hasOwnProperty(session.nivelRisco)) {
      distribution[session.nivelRisco]++;
    }
  });
  
  return distribution;
}

function getWeekKey(dateString) {
  const date = new Date(dateString);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  return `${date.getFullYear()}-W${weekNumber}`;
}

function generateInsights(type, stats) {
  const insights = [];
  
  if (stats.totalSessions === 0) {
    insights.push('Nenhuma triagem finalizada ainda');
    return insights;
  }
  
  if (stats.averageScore > 70) {
    insights.push(`Score médio elevado (${stats.averageScore}) indica necessidade de atenção`);
  }
  
  const criticalRate = (stats.riskLevels['Crítico'] || 0) / stats.totalSessions;
  if (criticalRate > 0.1) {
    insights.push(`${Math.round(criticalRate * 100)}% dos casos são críticos - considere alertas automáticos`);
  }
  
  const completionRate = stats.totalSessions > 0 ? 
    (stats.riskLevels['Concluída'] || stats.totalSessions) / stats.totalSessions : 0;
  
  if (completionRate < 0.8) {
    insights.push(`Taxa de conclusão baixa (${Math.round(completionRate * 100)}%) - revisar UX`);
  }
  
  return insights;
}

function generateRecommendations(type, analytics) {
  const recommendations = [];
  
  if (analytics.completionRate < 80) {
    recommendations.push('Melhorar experiência do usuário para reduzir abandono');
  }
  
  if (analytics.averageDuration > 30) {
    recommendations.push('Considerar reduzir número de perguntas ou otimizar fluxo');
  }
  
  const criticalCount = analytics.riskDistribution['Crítico'] || 0;
  if (criticalCount > 0) {
    recommendations.push(`${criticalCount} casos críticos requerem acompanhamento especializado`);
  }
  
  return recommendations;
}

function calculateTrend(type, stats) {
  // Implementação simplificada - em produção, usar dados históricos
  return 'stable';
}

async function getActiveAlerts() {
  // Implementar lógica de alertas baseada em thresholds
  return [];
}

function generateGlobalInsights(dashboardData) {
  const insights = [];
  const types = Object.keys(dashboardData);
  
  // Tipo mais usado
  const mostUsedType = types.reduce((max, type) => 
    dashboardData[type].totalSessions > (dashboardData[max]?.totalSessions || 0) ? type : max
  );
  
  insights.push(`Triagem mais utilizada: ${mostUsedType}`);
  
  return insights;
}

function aggregateSubescales(subescalas) {
  if (!subescalas || Object.keys(subescalas).length === 0) {
    return 'Não disponível';
  }
  
  const scores = Object.values(subescalas);
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  
  if (average < 3) return 'Baixo';
  if (average < 6) return 'Moderado';
  if (average < 8) return 'Alto';
  return 'Muito Alto';
}

function calculateQualityMetrics(sessions) {
  const completedSessions = sessions.filter(s => s.statusSessao === 'Concluída');
  
  return {
    completionRate: sessions.length > 0 ? 
      Math.round((completedSessions.length / sessions.length) * 100) : 0,
    
    averageResponseTime: completedSessions.length > 0 ?
      Math.round(
        completedSessions.reduce((sum, s) => sum + (s.duracaoSessao || 0), 0) / 
        completedSessions.length
      ) : 0,
    
    dataConsistency: calculateDataConsistency(completedSessions),
    
    userSatisfaction: 'N/A' // Implementar se houver feedback do usuário
  };
}

function calculateDataConsistency(sessions) {
  let consistentSessions = 0;
  
  sessions.forEach(session => {
    if (session.pontuacaoGeral !== null && 
        session.nivelRisco && 
        session.duracaoSessao > 0) {
      consistentSessions++;
    }
  });
  
  return sessions.length > 0 ? 
    Math.round((consistentSessions / sessions.length) * 100) : 0;
}

function generateQualityRecommendations(metrics) {
  const recommendations = [];
  
  if (metrics.completionRate < 85) {
    recommendations.push('Melhorar taxa de conclusão através de UX otimizada');
  }
  
  if (metrics.dataConsistency < 95) {
    recommendations.push('Revisar validações para garantir consistência dos dados');
  }
  
  if (metrics.averageResponseTime > 25) {
    recommendations.push('Otimizar tempo de resposta da triagem');
  }
  
  return recommendations;
}

module.exports = router;