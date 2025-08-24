// backend/server.js - Complete backend server with scientific question system
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('@notionhq/client');
const { CompleteScientificQuestionSets } = require('./services/question-sets');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Scientific Question Service
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

// Initialize services
const questionService = new ScientificQuestionService();

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    features: ['scientific-questions', 'notion-integration', 'advanced-scoring']
  });
});

// Get scientific questions for a screening type
app.get('/api/questions/:screeningType', async (req, res) => {
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

// Initialize screening session
app.post('/api/iniciar', async (req, res) => {
  try {
    const { tipo_triagem } = req.body;
    
    if (!tipo_triagem) {
      return res.status(400).json({
        success: false,
        error: 'tipo_triagem is required'
      });
    }

    // Get question metadata for session initialization
    const questionData = questionService.getQuestions(tipo_triagem);
    
    const sessionId = `${tipo_triagem.toUpperCase().slice(0, 2)}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    
    console.log(`Creating session ${sessionId} for ${tipo_triagem}`);

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
app.post('/api/finalizar/:sessionId', async (req, res) => {
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
          number: resultado.interpretation.percentage
        },
        'Tempo_Resposta': {
          number: tempo_resposta || 0
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
            rich_text: [{ text: { content: analysisContent.substring(0, 2000) } }] // Notion limit
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
app.get('/api/resultado/:sessionId', async (req, res) => {
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
app.get('/api/analytics', async (req, res) => {
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
      recent_sessions: [],
      scientific_features: {
        total_question_sets: 6,
        instruments_used: [
          'GAD-7', 'Beck Anxiety Inventory', 'PHQ-9', 'BDI-II', 
          'ASRS-1.1', 'MDQ', 'HCL-32', 'NPI-40'
        ],
        comprehensive_questions: {
          anxiety: 45,
          depression: 42,
          adhd: 40,
          bipolar: 35,
          narcisismo: 40,
          mitomania: 35
        }
      }
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
          completed: props.Status_Sessao?.select?.name === 'Finalizada',
          score: props.Pontuacao_Total?.number,
          percentage: props.Percentual_Score?.number
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

// Get available question sets
app.get('/api/questionsets', async (req, res) => {
  try {
    const questionSets = [
      'anxiety', 'depression', 'adhd', 'bipolar', 'narcisismo', 'mitomania'
    ].map(type => {
      const questionData = questionService.getQuestions(type);
      return {
        id: type,
        name: questionData.metadata.description,
        scientificBasis: questionData.metadata.scientificBasis,
        totalQuestions: questionData.metadata.totalQuestions,
        estimatedTime: questionData.metadata.estimatedTime
      };
    });

    res.json({
      success: true,
      data: questionSets
    });
  } catch (error) {
    console.error('Error fetching question sets:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Helper function to generate analysis content
function generateAnalysisContent(resultado) {
  let content = `Pontuação Total: ${resultado.interpretation.score}/${resultado.interpretation.maxScore} (${resultado.interpretation.percentage}%)\n`;
  content += `Nível de Risco: ${resultado.riskLevel}\n`;
  content += `Descrição: ${resultado.interpretation.description}\n\n`;
  
  content += "Recomendações:\n";
  resultado.interpretation.recommendations.forEach(rec => {
    content += `• ${rec}\n`;
  });
  
  if (resultado.interpretation.detailedAnalysis && Object.keys(resultado.interpretation.detailedAnalysis).length > 0) {
    content += "\nAnálise por Subescalas:\n";
    Object.values(resultado.interpretation.detailedAnalysis).forEach(analysis => {
      content += `\n${analysis.name}: ${analysis.score} - ${analysis.description}\n`;
      if (analysis.recommendations) {
        analysis.recommendations.forEach(rec => {
          content += `  • ${rec}\n`;
        });
      }
    });
  }
  
  content += `\nBase Científica: ${resultado.scientificBasis}`;
  content += `\nTimestamp: ${resultado.timestamp}`;
  
  return content;
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'GET /api/questions/:screeningType',
      'POST /api/iniciar',
      'POST /api/finalizar/:sessionId',
      'GET /api/resultado/:sessionId',
      'GET /api/analytics',
      'GET /api/questionsets'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Scientific Psychological Screening Server running on port ${PORT}`);
  console.log(`📊 Features: Complete scientific question sets, advanced scoring, Notion integration`);
  console.log(`🔬 Instruments: GAD-7, PHQ-9, ASRS-1.1, MDQ, NPI-40, and more`);
  console.log(`📈 Analytics available at http://localhost:${PORT}/api/analytics`);
  console.log(`💚 Health check at http://localhost:${PORT}/health`);
});

module.exports = app;
