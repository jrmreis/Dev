// backend/services/ScientificQuestionService.js
const { CompleteScientificQuestionSets } = require('./question-sets');

class ScientificQuestionService {
  constructor() {
    this.questionSets = new Map();
    this.initializeQuestionSets();
  }

  initializeQuestionSets() {
    this.questionSets.set('anxiety', CompleteScientificQuestionSets.createAnxietyQuestionSet());
    this.questionSets.set('depression', CompleteScientificQuestionSets.createDepressionQuestionSet());
    this.questionSets.set('adhd', CompleteScientificQuestionSets.createADHDQuestionSet());
    this.questionSets.set('bipolar', CompleteScientificQuestionSets.createBipolarQuestionSet());
    this.questionSets.set('narcisismo', CompleteScientificQuestionSets.createNarcissismQuestionSet());
    this.questionSets.set('mitomania', CompleteScientificQuestionSets.createMythomaniaQuestionSet());
  }

  getQuestionSet(screeningType) {
    const questionSet = this.questionSets.get(screeningType);
    if (!questionSet) {
      throw new Error(`Question set not found for screening type: ${screeningType}`);
    }
    return questionSet;
  }

  getQuestions(screeningType) {
    const questionSet = this.getQuestionSet(screeningType);
    return {
      questions: questionSet.questions.map(q => ({
        id: q.id,
        text: q.text,
        category: q.category,
        subscale: q.subscale
      })),
      metadata: {
        totalQuestions: questionSet.totalQuestions,
        estimatedTime: questionSet.estimatedTime,
        scientificBasis: questionSet.scientificBasis,
        description: questionSet.description
      }
    };
  }

  calculateScore(responses, screeningType) {
    const questionSet = this.getQuestionSet(screeningType);
    
    // Validate all questions are answered
    const requiredQuestions = questionSet.questions.map(q => q.id);
    const missingQuestions = requiredQuestions.filter(id => !(id in responses));
    
    if (missingQuestions.length > 0) {
      throw new Error(`Missing responses for questions: ${missingQuestions.join(', ')}`);
    }

    // Calculate total score
    let totalScore = 0;
    const questionScores = {};

    for (const question of questionSet.questions) {
      const response = responses[question.id];
      if (response < 0 || response > 4) {
        throw new Error(`Invalid response value for question ${question.id}: ${response}`);
      }
      
      // Apply reverse scoring if needed
      const score = question.reverseScored ? (4 - response) : response;
      // Apply weight if specified
      const weightedScore = question.weight ? score * question.weight : score;
      
      totalScore += weightedScore;
      questionScores[question.id] = weightedScore;
    }

    // Calculate subscale scores
    const subscaleScores = {};
    if (questionSet.subscales) {
      for (const subscale of questionSet.subscales) {
        let subscaleScore = 0;
        for (const questionId of subscale.questionIds) {
          if (questionScores[questionId] !== undefined) {
            subscaleScore += questionScores[questionId];
          }
        }
        subscaleScores[subscale.id] = subscaleScore;
      }
    }

    // Get interpretation
    const interpretation = this.interpretScore(totalScore, questionSet, subscaleScores);
    
    return {
      totalScore,
      subscaleScores,
      interpretation,
      recommendations: interpretation.recommendations,
      riskLevel: interpretation.riskLevel,
      detailedAnalysis: interpretation.detailedAnalysis,
      timestamp: new Date().toISOString(),
      screeningType,
      scientificBasis: questionSet.scientificBasis
    };
  }

  interpretScore(totalScore, questionSet, subscaleScores) {
    const maxScore = questionSet.scoringAlgorithm.maxScore;
    const percentage = (totalScore / maxScore) * 100;
    
    let riskLevel, description, recommendations = [];
    
    // Determine primary risk level
    if (percentage < 25) {
      riskLevel = 'Baixo';
      description = 'Sintomas mínimos ou ausentes';
      recommendations = [
        'Manutenção de hábitos saudáveis de vida',
        'Práticas preventivas de bem-estar mental',
        'Monitoramento ocasional'
      ];
    } else if (percentage < 50) {
      riskLevel = 'Leve';
      description = 'Sintomas leves presentes';
      recommendations = [
        'Técnicas de autogerenciamento e enfrentamento',
        'Atividade física regular e práticas de relaxamento',
        'Considerar buscar orientação se sintomas persistirem'
      ];
    } else if (percentage < 75) {
      riskLevel = 'Moderado';
      description = 'Sintomas moderados que podem impactar funcionamento';
      recommendations = [
        'Avaliação com profissional de saúde mental recomendada',
        'Considerar psicoterapia ou aconselhamento',
        'Implementar estratégias de enfrentamento estruturadas'
      ];
    } else {
      riskLevel = 'Alto';
      description = 'Sintomas severos que requerem atenção profissional';
      recommendations = [
        'Buscar avaliação profissional urgente',
        'Tratamento especializado recomendado',
        'Possível necessidade de intervenção farmacológica'
      ];
    }

    // Add subscale-specific interpretations
    const detailedAnalysis = this.generateDetailedAnalysis(subscaleScores, questionSet);
    
    return {
      riskLevel,
      description,
      recommendations,
      detailedAnalysis,
      score: totalScore,
      maxScore,
      percentage: Math.round(percentage)
    };
  }

  generateDetailedAnalysis(subscaleScores, questionSet) {
    const analysis = {};
    
    if (questionSet.subscales) {
      for (const subscale of questionSet.subscales) {
        const score = subscaleScores[subscale.id];
        if (score !== undefined) {
          // Find the appropriate interpretation for this subscale score
          const interpretation = subscale.interpretation.find(interp => 
            score >= interp.minScore && score <= interp.maxScore
          );
          
          if (interpretation) {
            analysis[subscale.id] = {
              name: subscale.name,
              score,
              level: interpretation.level,
              description: interpretation.description,
              recommendations: interpretation.recommendations
            };
          }
        }
      }
    }
    
    return analysis;
  }
}

// Updated backend routes (routes/screening.js)
const express = require('express');
const router = express.Router();
const { Client } = require('@notionhq/client');
const ScientificQuestionService = require('../services/ScientificQuestionService');

// Initialize services
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const questionService = new ScientificQuestionService();

// Get scientific questions for a screening type
router.get('/questions/:screeningType', async (req, res) => {
  try {
    const { screeningType } = req.params;
    
    console.log(`Fetching questions for screening type: ${screeningType}`);
    
    const questionData = questionService.getQuestions(screeningType);
    
    res.json({
      success: true,
      data: questionData
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Initialize screening session (unchanged)
router.post('/iniciar', async (req, res) => {
  try {
    const { tipo_triagem } = req.body;
    
    // Get question metadata for session initialization
    const questionData = questionService.getQuestions(tipo_triagem);
    
    const sessionId = `${tipo_triagem.toUpperCase().slice(0, 2)}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    
    const newPage = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        'ID_Sessao': {
          title: [{ text: { content: sessionId } }]
        },
        'Tipo_Triagem': {
          select: { name: tipo_triagem }
        },
        'Data_Inicio': {
          date: { start: new Date().toISOString() }
        },
        'Status_Sessao': {
          select: { name: 'Iniciada' }
        },
        'Total_Perguntas': {
          number: questionData.metadata.totalQuestions
        },
        'Tempo_Estimado': {
          number: questionData.metadata.estimatedTime
        },
        'Base_Cientifica': {
          rich_text: [{ text: { content: questionData.metadata.scientificBasis } }]
        }
      }
    });

    res.json({
      success: true,
      data: {
        sessionId,
        notionPageId: newPage.id,
        metadata: questionData.metadata
      }
    });
  } catch (error) {
    console.error('Error initializing session:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Submit responses and calculate scientific results
router.post('/finalizar/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { respostas, tipo_triagem, tempo_resposta } = req.body;
    
    console.log(`Finalizing session ${sessionId} for ${tipo_triagem}`);
    
    // Calculate scientific score
    const resultado = questionService.calculateScore(respostas, tipo_triagem);
    
    // Find the session in Notion
    const database = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'ID_Sessao',
        title: { equals: sessionId }
      }
    });

    if (database.results.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    const pageId = database.results[0].id;

    // Update the page with results
    await notion.pages.update({
      page_id: pageId,
      properties: {
        'Status_Sessao': {
          select: { name: 'Finalizada' }
        },
        'Data_Finalizacao': {
          date: { start: new Date().toISOString() }
        },
        'Pontuacao_Total': {
          number: resultado.totalScore
        },
        'Nivel_Risco': {
          select: { name: resultado.riskLevel }
        },
        'Percentual_Score': {
          number: resultado.percentage
        },
        'Tempo_Resposta': {
          number: tempo_resposta
        },
        'Respostas_JSON': {
          rich_text: [{ text: { content: JSON.stringify(respostas) } }]
        },
        'Resultado_Detalhado': {
          rich_text: [{ text: { content: JSON.stringify(resultado, null, 2) } }]
        }
      }
    });

    // Add detailed analysis to page content
    const analysisContent = generateAnalysisContent(resultado);
    
    await notion.blocks.children.append({
      block_id: pageId,
      children: [
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{ text: { content: 'Análise Detalhada dos Resultados' } }]
          }
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ text: { content: analysisContent } }]
          }
        }
      ]
    });

    res.json({
      success: true,
      data: {
        sessionId,
        resultado,
        notionPageId: pageId
      }
    });
  } catch (error) {
    console.error('Error finalizing session:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get session results
router.get('/resultado/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const database = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'ID_Sessao',
        title: { equals: sessionId }
      }
    });

    if (database.results.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    const session = database.results[0];
    const properties = session.properties;

    // Parse the detailed result if available
    let detailedResult = null;
    if (properties.Resultado_Detalhado?.rich_text?.[0]?.text?.content) {
      try {
        detailedResult = JSON.parse(properties.Resultado_Detalhado.rich_text[0].text.content);
      } catch (e) {
        console.error('Error parsing detailed result:', e);
      }
    }

    res.json({
      success: true,
      data: {
        sessionId,
        tipo_triagem: properties.Tipo_Triagem?.select?.name,
        status: properties.Status_Sessao?.select?.name,
        pontuacao_total: properties.Pontuacao_Total?.number,
        nivel_risco: properties.Nivel_Risco?.select?.name,
        percentual: properties.Percentual_Score?.number,
        data_inicio: properties.Data_Inicio?.date?.start,
        data_finalizacao: properties.Data_Finalizacao?.date?.start,
        tempo_resposta: properties.Tempo_Resposta?.number,
        base_cientifica: properties.Base_Cientifica?.rich_text?.[0]?.text?.content,
        resultado_detalhado: detailedResult
      }
    });
  } catch (error) {
    console.error('Error fetching session result:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Analytics endpoint
router.get('/analytics', async (req, res) => {
  try {
    const database = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      page_size: 100
    });

    const sessions = database.results;
    const analytics = {
      total_sessions: sessions.length,
      completed_sessions: sessions.filter(s => s.properties.Status_Sessao?.select?.name === 'Finalizada').length,
      screening_types: {},
      risk_levels: {},
      average_completion_time: 0,
      recent_sessions: []
    };

    let totalTime = 0;
    let timeCount = 0;

    sessions.forEach(session => {
      const props = session.properties;
      
      // Count by screening type
      const type = props.Tipo_Triagem?.select?.name;
      if (type) {
        analytics.screening_types[type] = (analytics.screening_types[type] || 0) + 1;
      }

      // Count by risk level
      const risk = props.Nivel_Risco?.select?.name;
      if (risk) {
        analytics.risk_levels[risk] = (analytics.risk_levels[risk] || 0) + 1;
      }

      // Calculate average time
      const time = props.Tempo_Resposta?.number;
      if (time) {
        totalTime += time;
        timeCount++;
      }

      // Recent sessions
      if (props.Data_Inicio?.date?.start) {
        analytics.recent_sessions.push({
          id: props.ID_Sessao?.title?.[0]?.text?.content,
          type: type,
          risk_level: risk,
          date: props.Data_Inicio.date.start,
          completed: props.Status_Sessao?.select?.name === 'Finalizada'
        });
      }
    });

    analytics.average_completion_time = timeCount > 0 ? Math.round(totalTime / timeCount) : 0;
    analytics.recent_sessions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

function generateAnalysisContent(resultado) {
  let content = `Pontuação Total: ${resultado.score}/${resultado.maxScore} (${resultado.percentage}%)\n`;
  content += `Nível de Risco: ${resultado.riskLevel}\n`;
  content += `Descrição: ${resultado.description}\n\n`;
  
  content += "Recomendações:\n";
  resultado.recommendations.forEach(rec => {
    content += `• ${rec}\n`;
  });
  
  if (resultado.detailedAnalysis && Object.keys(resultado.detailedAnalysis).length > 0) {
    content += "\nAnálise por Subescalas:\n";
    Object.values(resultado.detailedAnalysis).forEach(analysis => {
      content += `\n${analysis.name}: ${analysis.score} - ${analysis.description}\n`;
      if (analysis.recommendations) {
        analysis.recommendations.forEach(rec => {
          content += `  • ${rec}\n`;
        });
      }
    });
  }
  
  content += `\nBase Científica: ${resultado.scientificBasis}`;
  
  return content;
}

module.exports = router;
