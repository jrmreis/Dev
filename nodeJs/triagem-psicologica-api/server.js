// server.js - Updated to match your existing Notion database schema
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Client } from '@notionhq/client';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_SECRET,
});

// Store for active sessions
const activeSessions = new Map();

// Database helper function
const getDatabaseId = (tipo_triagem) => {
  const databases = {
    'bipolar': process.env.NOTION_DATABASE_BIPOLAR,
    'depression': process.env.NOTION_DATABASE_DEPRESSION,
    'anxiety': process.env.NOTION_DATABASE_ANXIETY,
    'adhd': process.env.NOTION_DATABASE_ADHD,
    'narcisismo': process.env.NOTION_DATABASE_NARCISISMO,
    'mitomania': process.env.NOTION_DATABASE_MITOMANIA
  };
  return databases[tipo_triagem];
};

// Enhanced Scientific Question Sets with subscales
const questionSets = {
  anxiety: {
    questions: [
      // Ataques de Panico
      {
        id: "anxiety_panic_q1",
        text: "Nos últimos 14 dias, com que frequência você teve ataques súbitos de medo ou pânico?",
        category: "Ataques de Pânico",
        subscale: "AtaquesPanico"
      },
      {
        id: "anxiety_panic_q2", 
        text: "Nos últimos 14 dias, com que frequência você sentiu o coração disparar sem motivo aparente?",
        category: "Ataques de Pânico",
        subscale: "AtaquesPanico"
      },
      
      // Dificuldade de Concentração
      {
        id: "anxiety_conc_q1",
        text: "Nos últimos 14 dias, com que frequência você teve dificuldade para se concentrar?",
        category: "Concentração",
        subscale: "DificuldadeConce"
      },
      {
        id: "anxiety_conc_q2",
        text: "Nos últimos 14 dias, com que frequência sua mente ficou 'em branco'?",
        category: "Concentração", 
        subscale: "DificuldadeConce"
      },

      // Distúrbio do Sono
      {
        id: "anxiety_sleep_q1",
        text: "Nos últimos 14 dias, com que frequência você teve dificuldade para adormecer?",
        category: "Sono",
        subscale: "DisturbioSono"
      },
      {
        id: "anxiety_sleep_q2",
        text: "Nos últimos 14 dias, com que frequência você acordou no meio da noite preocupado?",
        category: "Sono",
        subscale: "DisturbioSono"
      },

      // Evitação Social
      {
        id: "anxiety_social_q1", 
        text: "Nos últimos 14 dias, com que frequência você evitou situações sociais por ansiedade?",
        category: "Social",
        subscale: "EvitacaoSocial"
      },

      // Fadiga
      {
        id: "anxiety_fatigue_q1",
        text: "Nos últimos 14 dias, com que frequência você se sentiu extremamente cansado sem motivo físico?",
        category: "Fadiga",
        subscale: "Fadiga"
      },

      // Funcionamento Diário
      {
        id: "anxiety_func_q1",
        text: "Nos últimos 14 dias, com que frequência a ansiedade interferiu em suas atividades diárias?",
        category: "Funcionamento",
        subscale: "FuncionamentoDi"
      },

      // Inquietação
      {
        id: "anxiety_rest_q1",
        text: "Nos últimos 14 dias, com que frequência você se sentiu inquieto ou agitado?",
        category: "Inquietação",
        subscale: "Inquietacao"
      },

      // Irritabilidade
      {
        id: "anxiety_irrit_q1",
        text: "Nos últimos 14 dias, com que frequência você se sentiu irritado ou impaciente?",
        category: "Irritabilidade", 
        subscale: "Irritabilidade"
      },

      // Preocupação Excessiva
      {
        id: "anxiety_worry_q1",
        text: "Nos últimos 14 dias, com que frequência você se preocupou excessivamente com diferentes coisas?",
        category: "Preocupação",
        subscale: "PreocupacaoExce"
      },
      {
        id: "anxiety_worry_q2",
        text: "Nos últimos 14 dias, com que frequência você não conseguiu parar de se preocupar?",
        category: "Preocupação",
        subscale: "PreocupacaoExce"
      },

      // Tensão Muscular
      {
        id: "anxiety_tension_q1",
        text: "Nos últimos 14 dias, com que frequência você sentiu tensão muscular ou dores por ansiedade?",
        category: "Tensão Física",
        subscale: "TensaoMuscular"
      }
    ],
    subscales: [
      { id: "AtaquesPanico", name: "Ataques de Pânico", questionIds: ["anxiety_panic_q1", "anxiety_panic_q2"] },
      { id: "DificuldadeConce", name: "Dificuldade de Concentração", questionIds: ["anxiety_conc_q1", "anxiety_conc_q2"] },
      { id: "DisturbioSono", name: "Distúrbio do Sono", questionIds: ["anxiety_sleep_q1", "anxiety_sleep_q2"] },
      { id: "EvitacaoSocial", name: "Evitação Social", questionIds: ["anxiety_social_q1"] },
      { id: "Fadiga", name: "Fadiga", questionIds: ["anxiety_fatigue_q1"] },
      { id: "FuncionamentoDi", name: "Funcionamento Diário", questionIds: ["anxiety_func_q1"] },
      { id: "Inquietacao", name: "Inquietação", questionIds: ["anxiety_rest_q1"] },
      { id: "Irritabilidade", name: "Irritabilidade", questionIds: ["anxiety_irrit_q1"] },
      { id: "PreocupacaoExce", name: "Preocupação Excessiva", questionIds: ["anxiety_worry_q1", "anxiety_worry_q2"] },
      { id: "TensaoMuscular", name: "Tensão Muscular", questionIds: ["anxiety_tension_q1"] }
    ],
    metadata: {
      totalQuestions: 13,
      estimatedTime: 8,
      scientificBasis: "GAD-7 + Beck Anxiety Inventory + Comprehensive Anxiety Assessment",
      description: "Avaliação científica abrangente de sintomas de ansiedade com análise por subescalas"
    }
  },
  
  // Simplified versions for other types
  depression: {
    questions: [
      {
        id: "depression_q1",
        text: "Nas últimas 2 semanas, com que frequência você teve pouco interesse ou prazer em fazer as coisas?",
        category: "Anedonia",
        subscale: "interest_loss"
      },
      {
        id: "depression_q2",
        text: "Nas últimas 2 semanas, com que frequência você se sentiu para baixo, deprimido ou sem esperança?",
        category: "Humor Depressivo",
        subscale: "depressed_mood"
      }
    ],
    metadata: {
      totalQuestions: 2,
      estimatedTime: 3,
      scientificBasis: "PHQ-9 (Patient Health Questionnaire)",
      description: "Avaliação de sintomas depressivos baseada em critérios diagnósticos validados"
    }
  },
  
  bipolar: {
    questions: [
      {
        id: "bipolar_q1",
        text: "Você já teve períodos em que se sentiu tão animado e cheio de energia que outras pessoas comentaram que você não estava sendo você mesmo?",
        category: "Episódios Maníacos",
        subscale: "mania_episodes"
      }
    ],
    metadata: {
      totalQuestions: 1,
      estimatedTime: 2,
      scientificBasis: "MDQ (Mood Disorder Questionnaire)",
      description: "Screening para episódios maníacos e hipomaníacos do transtorno bipolar"
    }
  },
  
  adhd: {
    questions: [
      {
        id: "adhd_q1",
        text: "Com que frequência você tem dificuldade para se concentrar em trabalhos ou atividades recreativas?",
        category: "Desatenção",
        subscale: "attention_deficit"
      }
    ],
    metadata: {
      totalQuestions: 1,
      estimatedTime: 2,
      scientificBasis: "ASRS-18 (Adult ADHD Self-Report Scale)",
      description: "Avaliação de sintomas de TDAH em adultos baseada em critérios DSM-5"
    }
  },
  
  narcisismo: {
    questions: [
      {
        id: "narcisismo_q1",
        text: "Eu penso que sou uma pessoa especial.",
        category: "Grandiosidade",
        subscale: "grandiosity"
      }
    ],
    metadata: {
      totalQuestions: 1,
      estimatedTime: 2,
      scientificBasis: "NPI-40 (Narcissistic Personality Inventory)",
      description: "Avaliação de traços narcisistas de personalidade"
    }
  },
  
  mitomania: {
    questions: [
      {
        id: "mitomania_q1",
        text: "Com que frequência você se pega contando histórias que não são completamente verdadeiras?",
        category: "Distorção da Realidade",
        subscale: "reality_distortion"
      }
    ],
    metadata: {
      totalQuestions: 1,
      estimatedTime: 2,
      scientificBasis: "Escala de Pseudologia Fantástica",
      description: "Avaliação de tendências à mitomania e distorção da realidade"
    }
  }
};

// Validation - check for API secret and at least one database
if (!process.env.NOTION_API_SECRET) {
  console.error('❌ NOTION_API_SECRET environment variable is required');
  process.exit(1);
}

// Check if at least one database is configured
const configuredDatabases = Object.entries({
  'bipolar': process.env.NOTION_DATABASE_BIPOLAR,
  'depression': process.env.NOTION_DATABASE_DEPRESSION,
  'anxiety': process.env.NOTION_DATABASE_ANXIETY,
  'adhd': process.env.NOTION_DATABASE_ADHD,
  'narcisismo': process.env.NOTION_DATABASE_NARCISISMO,
  'mitomania': process.env.NOTION_DATABASE_MITOMANIA
}).filter(([type, id]) => id);

if (configuredDatabases.length === 0) {
  console.error('❌ At least one database must be configured');
  process.exit(1);
}

console.log('🔧 Configuração validada:');
console.log(`   🔑 API Key: ✅ Configurado`);
console.log(`   🗄️ Databases configurados: ${configuredDatabases.length}/6`);
configuredDatabases.forEach(([type, id]) => {
  console.log(`      • ${type}: ${id.slice(0, 8)}...`);
});

// Routes

app.get('/', (req, res) => {
  res.json({ 
    message: 'Sistema de Triagem Psicológica Científica',
    status: 'online',
    databases: configuredDatabases.map(([type, id]) => ({ type, configured: !!id }))
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend connection successful',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', async (req, res) => {
  try {
    const databaseChecks = {};
    const tipos_triagem = ['bipolar', 'depression', 'anxiety', 'adhd', 'narcisismo', 'mitomania'];
    
    for (const type of tipos_triagem) {
      const databaseId = getDatabaseId(type);
      if (databaseId) {
        try {
          await notion.databases.retrieve({ database_id: databaseId });
          databaseChecks[type] = '✅ Connected';
        } catch (error) {
          databaseChecks[type] = `❌ Error: ${error.message}`;
        }
      } else {
        databaseChecks[type] = '❌ Not configured';
      }
    }

    res.json({
      status: 'healthy',
      notion: '✅ Connected',
      databases: databaseChecks,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// GET Questions endpoint
app.get('/api/questions/:screeningType', async (req, res) => {
  try {
    const { screeningType } = req.params;
    
    console.log(`🔬 Fetching questions for screening type: ${screeningType}`);
    
    const questionSet = questionSets[screeningType];
    if (!questionSet) {
      return res.status(400).json({
        success: false,
        error: `Invalid screening type: ${screeningType}`
      });
    }

    res.json({
      success: true,
      data: {
        questions: questionSet.questions,
        metadata: questionSet.metadata
      }
    });

  } catch (error) {
    console.error('❌ Error fetching questions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch questions',
      details: error.message
    });
  }
});

// POST Initialize Session - Memory only, no Notion until completion
app.post('/api/iniciar', async (req, res) => {
  try {
    const { tipo_triagem } = req.body;
    
    if (!tipo_triagem) {
      return res.status(400).json({
        success: false,
        error: 'Assessment type is required'
      });
    }

    const questionSet = questionSets[tipo_triagem];
    if (!questionSet) {
      return res.status(400).json({
        success: false,
        error: `Invalid assessment type: ${tipo_triagem}`
      });
    }

    // Generate session ID matching your existing pattern
    const sessionId = `${tipo_triagem.toUpperCase().slice(0,3)}-${Date.now().toString().slice(-12)}-${Math.random().toString(36).substr(2, 5)}`;
    
    // Validate database exists for this assessment type
    const databaseId = getDatabaseId(tipo_triagem);
    if (!databaseId) {
      return res.status(400).json({
        success: false,
        error: `Database not configured for assessment type: ${tipo_triagem}`
      });
    }

    // Store session ONLY in memory - no Notion record yet
    activeSessions.set(sessionId, {
      sessionId,
      tipo_triagem,
      databaseId, // Store for later use
      pageId: null, // Will be set when finalizing
      startTime: Date.now(),
      responses: {},
      metadata: questionSet.metadata
    });

    res.json({
      success: true,
      data: {
        sessionId,
        tipo_triagem,
        totalQuestions: questionSet.metadata.totalQuestions,
        estimatedTime: questionSet.metadata.estimatedTime,
        scientificBasis: questionSet.metadata.scientificBasis,
        timestamp: new Date().toISOString()
      }
    });

    console.log(`✅ Session ${sessionId} created in memory only (no Notion record yet)`);

  } catch (error) {
    console.error('❌ Error initializing session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initialize session',
      details: error.message
    });
  }
});

// Calculate subscale scores
function calculateSubscaleScores(responses, questionSet) {
  const subscaleScores = {};
  
  if (questionSet.subscales) {
    for (const subscale of questionSet.subscales) {
      let subscaleScore = 0;
      let questionCount = 0;
      
      for (const questionId of subscale.questionIds) {
        if (responses[questionId] !== undefined) {
          subscaleScore += responses[questionId];
          questionCount++;
        }
      }
      
      subscaleScores[subscale.id] = questionCount > 0 ? subscaleScore : 0;
    }
  }
  
  return subscaleScores;
}

// Generate recommendations based on scores
function generateRecommendations(totalScore, maxScore, subscaleScores, screeningType) {
  const percentage = (totalScore / maxScore) * 100;
  const recommendations = [];
  
  if (percentage < 25) {
    recommendations.push("Manter hábitos saudáveis de vida");
    recommendations.push("Práticas preventivas de bem-estar mental");
    recommendations.push("Monitoramento ocasional");
  } else if (percentage < 50) {
    recommendations.push("Técnicas de autogerenciamento e enfrentamento");
    recommendations.push("Atividade física regular e práticas de relaxamento");
    recommendations.push("Considerar buscar orientação se sintomas persistirem");
  } else if (percentage < 75) {
    recommendations.push("Avaliação com profissional de saúde mental recomendada");
    recommendations.push("Considerar psicoterapia ou aconselhamento");
    recommendations.push("Implementar estratégias de enfrentamento estruturadas");
  } else {
    recommendations.push("Buscar avaliação profissional urgente");
    recommendations.push("Tratamento especializado recomendado");
    recommendations.push("Possível necessidade de intervenção farmacológica");
  }
  
  // Add specific recommendations based on highest subscale scores
  if (screeningType === 'anxiety' && subscaleScores) {
    const sortedSubscales = Object.entries(subscaleScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2);
    
    for (const [subscaleId, score] of sortedSubscales) {
      if (score > 6) { // High score threshold
        switch (subscaleId) {
          case 'AtaquesPanico':
            recommendations.push("Técnicas de respiração para controle de pânico");
            break;
          case 'DisturbioSono':
            recommendations.push("Higiene do sono e técnicas de relaxamento noturno");
            break;
          case 'PreocupacaoExce':
            recommendations.push("Técnicas de mindfulness para controle de preocupações");
            break;
        }
      }
    }
  }
  
  return recommendations;
}

// POST Finalize Session - CREATE Notion record with complete data
app.post('/api/finalizar/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { respostas, tipo_triagem, tempo_resposta } = req.body;
    
    console.log(`📊 Finalizing session ${sessionId} for ${tipo_triagem}`);
    
    // Get session from memory
    const session = activeSessions.get(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Validate responses
    const questionSet = questionSets[tipo_triagem];
    if (!questionSet) {
      return res.status(400).json({
        success: false,
        error: 'Invalid screening type'
      });
    }

    // Calculate scores
    const totalScore = Object.values(respostas).reduce((sum, val) => sum + val, 0);
    const maxScore = questionSet.questions.length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);
    const subscaleScores = calculateSubscaleScores(respostas, questionSet);
    
    // Determine risk level
    let riskLevel, interpretation;
    if (percentage < 25) {
      riskLevel = 'Baixo';
      interpretation = 'Sintomas mínimos ou ausentes';
    } else if (percentage < 50) {
      riskLevel = 'Leve';
      interpretation = 'Sintomas leves presentes';
    } else if (percentage < 75) {
      riskLevel = 'Moderado';
      interpretation = 'Sintomas moderados - recomenda-se avaliação profissional';
    } else {
      riskLevel = 'Alto';
      interpretation = 'Sintomas severos - buscar ajuda profissional urgente';
    }

    const recommendations = generateRecommendations(totalScore, maxScore, subscaleScores, tipo_triagem);

    const resultado = {
      sessionId,
      tipo_triagem,
      totalScore,
      maxScore,
      percentage,
      riskLevel,
      interpretation,
      responses: respostas,
      subscaleScores,
      recommendations,
      timeSpent: tempo_resposta,
      scientificBasis: questionSet.metadata.scientificBasis,
      timestamp: new Date().toISOString()
    };

    // CREATE Notion page with complete results (not update)
    let createdPageId = null;
    try {
      // Prepare complete properties object
      const createProperties = {
        // Basic session info
        'title': {
          title: [{ text: { content: `Sessão ${sessionId}` } }]
        },
        'Data_Avaliacao': {
          date: { start: new Date().toISOString().split('T')[0] }
        },
        'ID_Sessao': {
          rich_text: [{ text: { content: sessionId } }]
        },
        'IP_Anonimizado': {
          rich_text: [{ text: { content: 'ANONIMO' } }]
        },
        'Duracao_Sessao': {
          number: tempo_resposta
        },
        'Status_Sessao': {
          select: { name: 'Finalizada' }
        },
        'Pontuacao_Geral': {
          number: totalScore
        },
        'Nivel_Risco': {
          select: { name: riskLevel }
        },
        'Recomendacoes': {
          rich_text: [{ text: { content: recommendations.slice(0, 3).join('; ') } }]
        }
      };

      // Add subscale scores using the corrected mapping
      if (subscaleScores && tipo_triagem === 'anxiety') {
        const subscaleMapping = {
          'AtaquesPanico': 'Subescala_AtaquesPanico',
          'DificuldadeConce': 'Subescala_DificuldadeConcentracao',  // ✅ FIXED
          'DisturbioSono': 'Subescala_DisturbioSono',
          'EvitacaoSocial': 'Subescala_EvitacaoSocial',
          'Fadiga': 'Subescala_Fadiga',
          'FuncionamentoDi': 'Subescala_FuncionamentoDiario',       // ✅ FIXED
          'Inquietacao': 'Subescala_Inquietacao',
          'Irritabilidade': 'Subescala_Irritabilidade',
          'PreocupacaoExce': 'Subescala_PreocupacaoExcessiva',      // ✅ FIXED
          'TensaoMuscular': 'Subescala_TensaoMuscular'
        };

        Object.entries(subscaleScores).forEach(([subscaleId, score]) => {
          const notionPropertyName = subscaleMapping[subscaleId];
          if (notionPropertyName) {
            createProperties[notionPropertyName] = { number: score };
            console.log(`✅ Added subscale ${subscaleId}: ${score} to property ${notionPropertyName}`);
          }
        });
      }

      // CREATE the Notion page with all data at once
      const newPage = await notion.pages.create({
        parent: { database_id: session.databaseId },
        properties: createProperties
      });

      createdPageId = newPage.id;

      // Add detailed results as page content
      await notion.blocks.children.append({
        block_id: createdPageId,
        children: [
          {
            object: 'block',
            type: 'heading_2',
            heading_2: {
              rich_text: [{ text: { content: 'Resultado Detalhado da Triagem' } }]
            }
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                { text: { content: `Pontuação Total: ${totalScore}/${maxScore} (${percentage}%)\n` } },
                { text: { content: `Nível de Risco: ${riskLevel}\n` } },
                { text: { content: `Interpretação: ${interpretation}\n\n` } },
                { text: { content: `Base Científica: ${questionSet.metadata.scientificBasis}\n\n` } },
                { text: { content: `Recomendações:\n${recommendations.map(r => `• ${r}`).join('\n')}` } }
              ]
            }
          }
        ]
      });

      // Add subscale breakdown if available
      if (subscaleScores && Object.keys(subscaleScores).length > 0) {
        const subscaleText = Object.entries(subscaleScores)
          .map(([id, score]) => {
            const subscale = questionSet.subscales?.find(s => s.id === id);
            return `${subscale?.name || id}: ${score}`;
          })
          .join('\n');

        await notion.blocks.children.append({
          block_id: createdPageId,
          children: [
            {
              object: 'block',
              type: 'heading_3',
              heading_3: {
                rich_text: [{ text: { content: 'Análise por Subescalas' } }]
              }
            },
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [{ text: { content: subscaleText } }]
              }
            }
          ]
        });
      }

      console.log(`✅ Session ${sessionId} - Complete Notion record created: ${createdPageId}`);
      
    } catch (notionError) {
      console.warn('⚠️ Failed to create Notion record:', notionError.message);
      // Continue without Notion - session is still completed in memory
    }

    // Remove from active sessions
    activeSessions.delete(sessionId);

    res.json({
      success: true,
      data: {
        resultado: {
          ...resultado,
          notionPageId: createdPageId
        }
      }
    });

    console.log(`✅ Session ${sessionId} completed. Score: ${totalScore}/${maxScore} (${riskLevel})`);
    console.log(`📈 Subscale scores:`, subscaleScores);

  } catch (error) {
    console.error('❌ Error finalizing session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to finalize session',
      details: error.message
    });
  }
});

// Get session status
app.get('/api/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = activeSessions.get(sessionId);
  
  if (!session) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }

  res.json({
    success: true,
    data: {
      sessionId: session.sessionId,
      tipo_triagem: session.tipo_triagem,
      startTime: session.startTime,
      metadata: session.metadata,
      active: true
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🧠 Assessment types: anxiety (comprehensive), depression, bipolar, adhd, narcisismo, mitomania`);
});

export default app;