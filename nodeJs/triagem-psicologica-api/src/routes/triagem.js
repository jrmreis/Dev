const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { validateTriagemResponse } = require('../middleware/triagemValidation');
const notionService = require('../services/notionService');

// Store for active sessions (in production, use Redis)
const activeSessions = new Map();

// Start bipolar screening
router.post('/bipolar/iniciar', async (req, res) => {
  try {
    const sessionData = await notionService.createSession('bipolar', {
      ipHash: 'anonymous',
      timestamp: new Date().toISOString()
    });

    activeSessions.set(sessionData.sessionId, {
      type: 'bipolar',
      pageId: sessionData.pageId,
      startTime: Date.now(),
      responses: {},
      currentQuestion: 0
    });

    res.status(201).json({
      success: true,
      message: 'Sessão de triagem bipolar iniciada',
      data: {
        sessionId: sessionData.sessionId,
        type: 'bipolar',
        totalQuestions: 40,
        estimatedTime: '15-20 minutos',
        notionUrl: sessionData.url
      }
    });

    logger.logTriagemEvent('bipolar', 'session_started', { sessionId: sessionData.sessionId });

  } catch (error) {
    logger.error('Error starting bipolar screening:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start screening',
      details: error.message
    });
  }
});

// Start depression screening
router.post('/depression/iniciar', async (req, res) => {
  try {
    const sessionData = await notionService.createSession('depression', {
      ipHash: 'anonymous',
      timestamp: new Date().toISOString()
    });

    activeSessions.set(sessionData.sessionId, {
      type: 'depression',
      pageId: sessionData.pageId,
      startTime: Date.now(),
      responses: {},
      currentQuestion: 0
    });

    res.status(201).json({
      success: true,
      message: 'Sessão de triagem depressão iniciada',
      data: {
        sessionId: sessionData.sessionId,
        type: 'depression',
        totalQuestions: 35,
        estimatedTime: '12-18 minutos',
        notionUrl: sessionData.url
      }
    });

    logger.logTriagemEvent('depression', 'session_started', { sessionId: sessionData.sessionId });

  } catch (error) {
    logger.error('Error starting depression screening:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start screening',
      details: error.message
    });
  }
});

// Start anxiety screening
router.post('/anxiety/iniciar', async (req, res) => {
  try {
    const sessionData = await notionService.createSession('anxiety', {
      ipHash: 'anonymous',
      timestamp: new Date().toISOString()
    });

    activeSessions.set(sessionData.sessionId, {
      type: 'anxiety',
      pageId: sessionData.pageId,
      startTime: Date.now(),
      responses: {},
      currentQuestion: 0
    });

    res.status(201).json({
      success: true,
      message: 'Sessão de triagem ansiedade iniciada',
      data: {
        sessionId: sessionData.sessionId,
        type: 'anxiety',
        totalQuestions: 30,
        estimatedTime: '10-15 minutos',
        notionUrl: sessionData.url
      }
    });

    logger.logTriagemEvent('anxiety', 'session_started', { sessionId: sessionData.sessionId });

  } catch (error) {
    logger.error('Error starting anxiety screening:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start screening',
      details: error.message
    });
  }
});

// Start ADHD screening
router.post('/adhd/iniciar', async (req, res) => {
  try {
    const sessionData = await notionService.createSession('adhd', {
      ipHash: 'anonymous',
      timestamp: new Date().toISOString()
    });

    activeSessions.set(sessionData.sessionId, {
      type: 'adhd',
      pageId: sessionData.pageId,
      startTime: Date.now(),
      responses: {},
      currentQuestion: 0
    });

    res.status(201).json({
      success: true,
      message: 'Sessão de triagem ADHD iniciada',
      data: {
        sessionId: sessionData.sessionId,
        type: 'adhd',
        totalQuestions: 45,
        estimatedTime: '15-22 minutos',
        notionUrl: sessionData.url
      }
    });

    logger.logTriagemEvent('adhd', 'session_started', { sessionId: sessionData.sessionId });

  } catch (error) {
    logger.error('Error starting ADHD screening:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start screening',
      details: error.message
    });
  }
});

// Start narcisismo screening
router.post('/narcisismo/iniciar', async (req, res) => {
  try {
    const sessionData = await notionService.createSession('narcisismo', {
      ipHash: 'anonymous',
      timestamp: new Date().toISOString()
    });

    activeSessions.set(sessionData.sessionId, {
      type: 'narcisismo',
      pageId: sessionData.pageId,
      startTime: Date.now(),
      responses: {},
      currentQuestion: 0
    });

    res.status(201).json({
      success: true,
      message: 'Sessão de triagem narcisismo iniciada',
      data: {
        sessionId: sessionData.sessionId,
        type: 'narcisismo',
        totalQuestions: 42,
        estimatedTime: '12-18 minutos',
        notionUrl: sessionData.url
      }
    });

    logger.logTriagemEvent('narcisismo', 'session_started', { sessionId: sessionData.sessionId });

  } catch (error) {
    logger.error('Error starting narcisismo screening:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start screening'
    });
  }
});

// Start mitomania screening
router.post('/mitomania/iniciar', async (req, res) => {
  try {
    const sessionData = await notionService.createSession('mitomania', {
      ipHash: 'anonymous',
      timestamp: new Date().toISOString()
    });

    activeSessions.set(sessionData.sessionId, {
      type: 'mitomania',
      pageId: sessionData.pageId,
      startTime: Date.now(),
      responses: {},
      currentQuestion: 0
    });

    res.status(201).json({
      success: true,
      message: 'Sessão de triagem mitomania iniciada',
      data: {
        sessionId: sessionData.sessionId,
        type: 'mitomania',
        totalQuestions: 55,
        estimatedTime: '18-25 minutos',
        notionUrl: sessionData.url
      }
    });

    logger.logTriagemEvent('mitomania', 'session_started', { sessionId: sessionData.sessionId });

  } catch (error) {
    logger.error('Error starting mitomania screening:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start screening'
    });
  }
});


// REPLACE the existing status route with this updated version
router.get('/:type/status/:sessionId', (req, res) => {
  const { type, sessionId } = req.params;
  const session = activeSessions.get(sessionId);
  
  if (!session || session.type !== type) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }


// Define total questions for each type
  const questionTotals = {
    bipolar: 40,
    depression: 35,
    anxiety: 30,
    adhd: 45,
    narcisismo: 42,
    mitomania: 55
  };

  res.json({
    success: true,
    data: {
      sessionId,
      type: session.type,
      currentQuestion: session.currentQuestion,
      totalQuestions: questionTotals[type] || 40,
      timeElapsed: Math.round((Date.now() - session.startTime) / 60000)
    }
  });
});




module.exports = router;

// Submit response to a question
router.post('/:type/responder/:sessionId', validateTriagemResponse, (req, res) => {
  try {
    const { type, sessionId } = req.params;
    const { questionId, response, subescale } = req.body;

    // Validate input
    if (!questionId || response === undefined || !subescale) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: questionId, response, subescale'
      });
    }

    const session = activeSessions.get(sessionId);
    if (!session || session.type !== type) {
      return res.status(404).json({
        success: false,
        error: 'Session not found or type mismatch'
      });
    }

    // Store the response
    if (!session.responses[subescale]) {
      session.responses[subescale] = [];
    }
    
    session.responses[subescale].push({
      questionId,
      response,
      timestamp: Date.now()
    });

    session.currentQuestion++;

    // Determine total questions
    const questionTotals = {
      bipolar: 40,
      depression: 35,
      anxiety: 30,
      adhd: 45,
      narcisismo: 42,
      mitomania: 55
    };

    const totalQuestions = questionTotals[type] || 40;
    const progress = Math.round((session.currentQuestion / totalQuestions) * 100);
    const isComplete = session.currentQuestion >= totalQuestions;

    res.json({
      success: true,
      message: 'Response recorded',
      data: {
        sessionId,
        currentQuestion: session.currentQuestion,
        totalQuestions,
        progress,
        isComplete,
        nextStep: isComplete 
          ? `/api/v1/triagem/${type}/finalizar/${sessionId}`
          : 'Continue with next question'
      }
    });

    logger.info(`Response recorded for ${type} session ${sessionId}: Q${session.currentQuestion}/${totalQuestions}`);

  } catch (error) {
    logger.error('Error recording response:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to record response'
    });
  }
});

// Finalize session (basic implementation)
router.post('/:type/finalizar/:sessionId', async (req, res) => {
  try {
    const { type, sessionId } = req.params;
    
    const session = activeSessions.get(sessionId);
    if (!session || session.type !== type) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Calculate duration
    const duration = Math.round((Date.now() - session.startTime) / 60000);

    // Basic scoring (placeholder - would integrate with scoringService later)
    const totalResponses = Object.values(session.responses).flat().length;
    const avgResponse = Object.values(session.responses)
      .flat()
      .reduce((sum, r) => sum + (typeof r.response === 'number' ? r.response : 5), 0) / totalResponses;
    
    const basicScore = Math.round(avgResponse * 10);
    const riskLevel = basicScore < 30 ? 'Baixo' : basicScore < 50 ? 'Moderado' : basicScore < 70 ? 'Alto' : 'Crítico';

    // TODO: Update Notion page with final results
    // For now, just mark as completed in memory

    // Remove from active sessions
    activeSessions.delete(sessionId);

    res.json({
      success: true,
      message: 'Triagem finalizada',
      data: {
        sessionId,
        type,
        resultado: {
          pontuacaoGeral: basicScore,
          nivelRisco: riskLevel,
          duracaoSessao: duration,
          totalRespostas: totalResponses,
          recomendacoes: `Resultado ${riskLevel} - Consulte um profissional para avaliação detalhada`
        }
      }
    });

    logger.logTriagemEvent(type, 'session_completed', { 
      sessionId, 
      score: basicScore, 
      duration 
    });

  } catch (error) {
    logger.error('Error finalizing session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to finalize session'
    });
  }
});
