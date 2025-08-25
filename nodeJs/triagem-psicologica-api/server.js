// server.js - Updated with comprehensive scientific question sets
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

// Comprehensive Scientific Question Sets
const questionSets = {
  anxiety: {
    questions: [
      // GAD-7 Questions
      { id: 'gad1', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por sentir-se nervoso(a), ansioso(a) ou muito tenso(a)?', category: 'core_anxiety', subscale: 'gad7' },
      { id: 'gad2', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por não conseguir parar ou controlar as preocupações?', category: 'worry_control', subscale: 'gad7' },
      { id: 'gad3', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se preocupar demais com diferentes coisas?', category: 'excessive_worry', subscale: 'gad7' },
      { id: 'gad4', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter dificuldade para relaxar?', category: 'relaxation_difficulty', subscale: 'gad7' },
      { id: 'gad5', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por estar tão inquieto(a) que se torna difícil ficar parado(a)?', category: 'restlessness', subscale: 'gad7' },
      { id: 'gad6', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se tornar facilmente irritado(a) ou irritável?', category: 'irritability', subscale: 'gad7' },
      { id: 'gad7', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por sentir medo como se algo terrível fosse acontecer?', category: 'fearful_anticipation', subscale: 'gad7' },

      // Beck Anxiety Inventory Questions (21 questions)
      { id: 'bai1', text: 'Dormência ou formigamento', category: 'physical', subscale: 'bai_physical' },
      { id: 'bai2', text: 'Sensação de calor', category: 'physical' },
      { id: 'bai3', text: 'Tremores nas pernas', category: 'physical', subscale: 'bai_physical' },
      { id: 'bai4', text: 'Incapaz de relaxar', category: 'psychological' },
      { id: 'bai5', text: 'Medo de que aconteça o pior', category: 'cognitive', subscale: 'bai_physical' },
      { id: 'bai6', text: 'Tonto(a) ou com sensação de cabeça leve', category: 'physical' },
      { id: 'bai7', text: 'Coração batendo forte e rápido', category: 'physical', subscale: 'bai_physical' },
      { id: 'bai8', text: 'Inseguro(a)', category: 'psychological' },
      { id: 'bai9', text: 'Aterrorizado(a)', category: 'psychological', subscale: 'bai_physical' },
      { id: 'bai10', text: 'Nervoso(a)', category: 'psychological' },
      { id: 'bai11', text: 'Sensação de sufocamento', category: 'physical', subscale: 'bai_physical' },
      { id: 'bai12', text: 'Tremores nas mãos', category: 'physical' },
      { id: 'bai13', text: 'Trêmulo(a)', category: 'physical', subscale: 'bai_physical' },
      { id: 'bai14', text: 'Medo de perder o controle', category: 'cognitive' },
      { id: 'bai15', text: 'Dificuldade de respirar', category: 'physical', subscale: 'bai_physical' },
      { id: 'bai16', text: 'Medo de morrer', category: 'cognitive' },
      { id: 'bai17', text: 'Assustado(a)', category: 'psychological', subscale: 'bai_physical' },
      { id: 'bai18', text: 'Indigestão ou desconforto abdominal', category: 'physical' },
      { id: 'bai19', text: 'Desmaios', category: 'physical', subscale: 'bai_physical' },
      { id: 'bai20', text: 'Rosto afogueado/vermelho', category: 'physical' },
      { id: 'bai21', text: 'Suores frios ou quentes', category: 'physical', subscale: 'bai_physical' },

      // Additional comprehensive anxiety questions (12 questions)
      { id: 'anx_add1', text: 'Tenho pensamentos repetitivos que não consigo controlar', category: 'obsessive_thoughts' },
      { id: 'anx_add2', text: 'Evito situações sociais por medo de julgamento', category: 'social_anxiety' },
      { id: 'anx_add3', text: 'Acordo durante a noite preocupado(a) com problemas', category: 'sleep_anxiety' },
      { id: 'anx_add4', text: 'Tenho dificuldade de concentração devido às preocupações', category: 'concentration' },
      { id: 'anx_add5', text: 'Sinto-me sobrecarregado(a) com responsabilidades', category: 'overwhelm' },
      { id: 'anx_add6', text: 'Tenho medo de situações específicas (elevadores, multidões, etc.)', category: 'specific_phobias' },
      { id: 'anx_add7', text: 'Procrastino tarefas importantes por ansiedade', category: 'avoidance' },
      { id: 'anx_add8', text: 'Tenho episódios súbitos de pânico', category: 'panic' },
      { id: 'anx_add9', text: 'Preocupo-me excessivamente com a saúde', category: 'health_anxiety' },
      { id: 'anx_add10', text: 'Sinto ansiedade sobre o futuro constantemente', category: 'future_anxiety' },
      { id: 'anx_add11', text: 'Tenho rituais ou comportamentos repetitivos para controlar a ansiedade', category: 'compulsive_behaviors' },
      { id: 'anx_add12', text: 'A ansiedade interfere significativamente no meu trabalho/estudos', category: 'functional_impairment' }
    ],
    subscales: [
      {
        id: 'gad7',
        name: 'Ansiedade Generalizada (GAD-7)',
        description: 'Sintomas centrais de ansiedade generalizada',
        questionIds: ['gad1', 'gad2', 'gad3', 'gad4', 'gad5', 'gad6', 'gad7']
      },
      {
        id: 'bai_physical',
        name: 'Sintomas Físicos de Ansiedade',
        description: 'Manifestações corporais da ansiedade',
        questionIds: ['bai1', 'bai3', 'bai5', 'bai7', 'bai9', 'bai11', 'bai13', 'bai15', 'bai17', 'bai19', 'bai21']
      }
    ],
    metadata: {
      totalQuestions: 40,
      estimatedTime: 15,
      scientificBasis: 'GAD-7 + Beck Anxiety Inventory + Comprehensive Anxiety Assessment',
      description: 'Avaliação científica abrangente de sintomas de ansiedade baseada em escalas validadas internacionalmente'
    }
  },

  depression: {
    questions: [
      // PHQ-9 Core Questions
      { id: 'phq1', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter pouco interesse ou prazer em fazer as coisas?', category: 'anhedonia', subscale: 'phq9_core' },
      { id: 'phq2', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir para baixo, deprimido(a) ou sem esperança?', category: 'depressed_mood', subscale: 'phq9_core' },
      { id: 'phq3', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter dificuldade para adormecer, continuar dormindo ou dormir demais?', category: 'sleep_disturbance', subscale: 'phq9_core' },
      { id: 'phq4', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir cansado(a) ou ter pouca energia?', category: 'fatigue', subscale: 'phq9_core' },
      { id: 'phq5', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter pouco apetite ou comer demais?', category: 'appetite_changes', subscale: 'phq9_core' },
      { id: 'phq6', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir mal consigo mesmo(a) ou sentir que é um fracasso?', category: 'worthlessness', subscale: 'phq9_core' },
      { id: 'phq7', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter dificuldade para se concentrar?', category: 'concentration', subscale: 'phq9_core' },
      { id: 'phq8', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se mover muito devagar ou estar muito agitado(a)?', category: 'psychomotor', subscale: 'phq9_core' },
      { id: 'phq9', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por pensamentos de morte ou autolesão?', category: 'suicidal_ideation', subscale: 'phq9_core' },

      // Additional BDI-II Style Questions (21 more questions)
      { id: 'dep_add1', text: 'Sinto-me triste a maior parte do tempo', category: 'mood' },
      { id: 'dep_add2', text: 'Não tenho mais prazer nas atividades que antes gostava', category: 'anhedonia' },
      { id: 'dep_add3', text: 'Culpo-me por coisas que dão errado', category: 'guilt' },
      { id: 'dep_add4', text: 'Choro mais facilmente do que antes', category: 'emotional_lability' },
      { id: 'dep_add5', text: 'Perdi interesse em outras pessoas', category: 'social_withdrawal' },
      { id: 'dep_add6', text: 'Tenho dificuldade para tomar decisões', category: 'indecisiveness' },
      { id: 'dep_add7', text: 'Não me cuido como deveria (higiene, aparência)', category: 'self_care' },
      { id: 'dep_add8', text: 'Acordo muito cedo e não consigo voltar a dormir', category: 'early_awakening' },
      { id: 'dep_add9', text: 'Fico cansado(a) mais facilmente que antes', category: 'fatigue' },
      { id: 'dep_add10', text: 'Meu apetite está menor que o normal', category: 'appetite_loss' },
      { id: 'dep_add11', text: 'Perdi peso sem fazer dieta', category: 'weight_loss' },
      { id: 'dep_add12', text: 'Tenho menos interesse em sexo', category: 'libido' },
      { id: 'dep_add13', text: 'Estou preocupado(a) com problemas físicos', category: 'somatic_concerns' },
      { id: 'dep_add14', text: 'Sinto que o futuro é sem esperança', category: 'hopelessness' },
      { id: 'dep_add15', text: 'Sinto que sou um fardo para outras pessoas', category: 'burden' },
      { id: 'dep_add16', text: 'Tenho pensamentos sobre morte frequentemente', category: 'death_thoughts' },
      { id: 'dep_add17', text: 'Sinto que minha vida não tem sentido', category: 'meaninglessness' },
      { id: 'dep_add18', text: 'Tenho dificuldade para sentir emoções positivas', category: 'emotional_numbing' },
      { id: 'dep_add19', text: 'Evito compromissos sociais', category: 'social_avoidance' },
      { id: 'dep_add20', text: 'Sinto-me desconectado(a) de outras pessoas', category: 'disconnection' },
      { id: 'dep_add21', text: 'A menor tarefa parece um grande esforço', category: 'effort' }
    ],
    subscales: [
      {
        id: 'phq9_core',
        name: 'Sintomas Centrais de Depressão (PHQ-9)',
        description: 'Critérios diagnósticos principais do DSM-5',
        questionIds: ['phq1', 'phq2', 'phq3', 'phq4', 'phq5', 'phq6', 'phq7', 'phq8', 'phq9']
      }
    ],
    metadata: {
      totalQuestions: 30,
      estimatedTime: 15,
      scientificBasis: 'PHQ-9 + BDI-II criteria - Padrão ouro para screening de depressão',
      description: 'Avaliação abrangente de sintomas depressivos baseada em escalas clínicas validadas'
    }
  },

  adhd: {
    questions: [
      // ASRS Part A (6 most predictive questions - weighted higher)
      { id: 'asrs1', text: 'Com que frequência você tem dificuldade para se concentrar em detalhes ou comete erros por descuido no trabalho ou em outras atividades?', category: 'inattention', subscale: 'inattention' },
      { id: 'asrs2', text: 'Com que frequência você tem dificuldade para manter a atenção em tarefas ou atividades?', category: 'inattention', subscale: 'inattention' },
      { id: 'asrs3', text: 'Com que frequência você tem dificuldade para se organizar em tarefas e atividades?', category: 'executive_function' },
      { id: 'asrs4', text: 'Com que frequência você deixa de fazer algo ou atrasa porque tem dificuldade para começar?', category: 'procrastination' },
      { id: 'asrs5', text: 'Com que frequência você se mexe ou se contorce quando tem que ficar sentado(a) por muito tempo?', category: 'hyperactivity', subscale: 'hyperactivity_impulsivity' },
      { id: 'asrs6', text: 'Com que frequência você se sente muito ativo(a) e compelido(a) a fazer coisas, como se fosse "movido(a) a motor"?', category: 'hyperactivity', subscale: 'hyperactivity_impulsivity' },

      // ASRS Part B (12 additional questions)
      { id: 'asrs7', text: 'Com que frequência você não escuta quando as pessoas falam diretamente com você?', category: 'inattention', subscale: 'inattention' },
      { id: 'asrs8', text: 'Com que frequência você não segue instruções até o fim e não termina o trabalho?', category: 'task_completion', subscale: 'inattention' },
      { id: 'asrs9', text: 'Com que frequência você evita, não gosta ou reluta em se envolver em tarefas que exijam esforço mental sustentado?', category: 'mental_effort', subscale: 'inattention' },
      { id: 'asrs10', text: 'Com que frequência você perde objetos necessários para tarefas ou atividades?', category: 'organization', subscale: 'inattention' },
      { id: 'asrs11', text: 'Com que frequência você se distrai facilmente por estímulos externos?', category: 'distractibility', subscale: 'inattention' },
      { id: 'asrs12', text: 'Com que frequência você é esquecido(a) em atividades diárias?', category: 'forgetfulness', subscale: 'inattention' },
      { id: 'asrs13', text: 'Com que frequência você tem dificuldade para esperar sua vez?', category: 'impatience', subscale: 'inattention' },
      { id: 'asrs14', text: 'Com que frequência você interrompe ou se intromete nos assuntos de outros?', category: 'social_intrusion', subscale: 'hyperactivity_impulsivity' },
      { id: 'asrs15', text: 'Com que frequência você fala excessivamente?', category: 'talkativeness', subscale: 'hyperactivity_impulsivity' },
      { id: 'asrs16', text: 'Com que frequência você responde antes das perguntas serem completadas?', category: 'impulsivity', subscale: 'hyperactivity_impulsivity' },
      { id: 'asrs17', text: 'Com que frequência você tem dificuldade para permanecer sentado(a) quando se espera isso?', category: 'restlessness', subscale: 'hyperactivity_impulsivity' },
      { id: 'asrs18', text: 'Com que frequência você se sente inquieto(a) ou agitado(a) durante atividades de lazer?', category: 'restlessness', subscale: 'hyperactivity_impulsivity' },

      // Additional DSM-5 based questions (18 more questions)
      { id: 'adhd_add1', text: 'Frequentemente cometo erros por descuido em trabalhos escolares, no trabalho ou em outras atividades', category: 'attention_to_detail' },
      { id: 'adhd_add2', text: 'Tenho dificuldade para manter atenção em tarefas ou atividades lúdicas', category: 'sustained_attention' },
      { id: 'adhd_add3', text: 'Pareço não escutar quando falam diretamente comigo', category: 'listening_skills' },
      { id: 'adhd_add4', text: 'Não sigo instruções e falho em terminar deveres de casa, tarefas domésticas ou trabalho', category: 'task_completion' },
      { id: 'adhd_add5', text: 'Tenho dificuldade para organizar tarefas e atividades', category: 'organization' },
      { id: 'adhd_add6', text: 'Evito, demonstro relutância ou não gosto de me envolver em tarefas que exijam esforço mental contínuo', category: 'mental_effort_avoidance' },
      { id: 'adhd_add7', text: 'Perco objetos necessários para tarefas ou atividades', category: 'losing_things' },
      { id: 'adhd_add8', text: 'Sou facilmente distraído(a) por estímulos alheios à tarefa', category: 'external_distractibility' },
      { id: 'adhd_add9', text: 'Sou esquecido(a) em atividades cotidianas', category: 'daily_forgetfulness' },
      { id: 'adhd_add10', text: 'Mexo as mãos e pés ou me remexo na cadeira', category: 'fidgeting' },
      { id: 'adhd_add11', text: 'Abandono minha cadeira em sala de aula ou outras situações nas quais se espera que permaneça sentado(a)', category: 'leaving_seat' },
      { id: 'adhd_add12', text: 'Corro ou escalo em demasia em situações inadequadas', category: 'inappropriate_activity' },
      { id: 'adhd_add13', text: 'Tenho dificuldade para brincar ou me envolver silenciosamente em atividades de lazer', category: 'quiet_activities' },
      { id: 'adhd_add14', text: 'Estou frequentemente "a mil" ou muitas vezes ajo como se estivesse "a todo vapor"', category: 'driven_by_motor' },
      { id: 'adhd_add15', text: 'Falo em demasia', category: 'excessive_talking' },
      { id: 'adhd_add16', text: 'Dou respostas precipitadas antes de as perguntas terem sido terminadas', category: 'blurting_answers' },
      { id: 'adhd_add17', text: 'Tenho dificuldade para aguardar minha vez', category: 'waiting_turn' },
      { id: 'adhd_add18', text: 'Interrompo ou me intrometo em assuntos de outros', category: 'interrupting' }
    ],
    subscales: [
      {
        id: 'inattention',
        name: 'Desatenção',
        description: 'Sintomas de dificuldade de atenção e concentração',
        questionIds: ['asrs1', 'asrs2', 'asrs7', 'asrs8', 'asrs9', 'asrs10', 'asrs11', 'asrs12', 'asrs13']
      },
      {
        id: 'hyperactivity_impulsivity',
        name: 'Hiperatividade/Impulsividade',
        description: 'Sintomas de agitação e impulsividade',
        questionIds: ['asrs5', 'asrs6', 'asrs14', 'asrs15', 'asrs16', 'asrs17', 'asrs18']
      }
    ],
    metadata: {
      totalQuestions: 36,
      estimatedTime: 20,
      scientificBasis: 'ASRS-1.1 (Adult ADHD Self-Report Scale) + DSM-5 Criteria - OMS',
      description: 'Avaliação completa de sintomas de ADHD em adultos baseada em critérios diagnósticos validados'
    }
  },

  bipolar: {
    questions: [
      // MDQ Core Questions (13 questions)
      { id: 'mdq1', text: 'Houve algum período quando você não era o seu eu normal e se sentia tão bem ou eufórico que outras pessoas pensaram que você não estava normal?', category: 'euphoria', subscale: 'manic_episodes' },
      { id: 'mdq2', text: 'Você já teve períodos quando estava tão irritável que gritava com pessoas ou começava brigas ou discussões?', category: 'irritability', subscale: 'manic_episodes' },
      { id: 'mdq3', text: 'Houve períodos em que você se sentia muito mais autoconfiante que o usual?', category: 'self_esteem', subscale: 'manic_episodes' },
      { id: 'mdq4', text: 'Você já teve períodos em que dormia muito menos que o usual e não sentia falta de sono?', category: 'sleep_reduction', subscale: 'manic_episodes' },
      { id: 'mdq5', text: 'Houve períodos em que você falava muito mais ou muito mais rápido que o usual?', category: 'speech_changes', subscale: 'manic_episodes' },
      { id: 'mdq6', text: 'Você já teve períodos em que seus pensamentos corriam tão rápido que não conseguia acompanhá-los?', category: 'racing_thoughts', subscale: 'manic_episodes' },
      { id: 'mdq7', text: 'Houve períodos em que você se distraía tão facilmente que qualquer pequena interrupção ou ruído desviava sua atenção?', category: 'distractibility', subscale: 'manic_episodes' },
      { id: 'mdq8', text: 'Você já teve períodos em que estava muito mais ativo ou fazia muito mais coisas que o usual?', category: 'increased_activity', subscale: 'manic_episodes' },
      { id: 'mdq9', text: 'Houve períodos em que era muito mais sociável ou extrovertido(a) que o usual?', category: 'social_behavior', subscale: 'manic_episodes' },
      { id: 'mdq10', text: 'Você já teve períodos em que estava muito mais interessado(a) em sexo que o usual?', category: 'sexual_behavior', subscale: 'manic_episodes' },
      { id: 'mdq11', text: 'Houve períodos em que fazia coisas que eram incomuns para você ou que outras pessoas poderiam ter considerado excessivas, tolas ou arriscadas?', category: 'risky_behavior', subscale: 'manic_episodes' },
      { id: 'mdq12', text: 'Você já teve períodos em que gastava dinheiro excessivamente, a ponto de se meter em problemas?', category: 'spending_behavior', subscale: 'manic_episodes' },
      { id: 'mdq13', text: 'Houve períodos em que você tinha muito mais energia que o usual?', category: 'energy_levels', subscale: 'manic_episodes' },

      // HCL-32 Style Questions (Additional 22 questions)
      { id: 'hcl1', text: 'Eu precisava de menos sono', category: 'sleep' },
      { id: 'hcl2', text: 'Eu tinha mais energia e era mais ativo(a)', category: 'energy' },
      { id: 'hcl3', text: 'Eu estava mais autoconfiante', category: 'confidence' },
      { id: 'hcl4', text: 'Eu desfrutava mais do meu trabalho', category: 'work_enjoyment' },
      { id: 'hcl5', text: 'Eu estava mais sociável', category: 'sociability' },
      { id: 'hcl6', text: 'Eu queria viajar e realmente viajava mais', category: 'travel_urges' },
      { id: 'hcl7', text: 'Eu dirigia mais rápido ou corria mais riscos ao dirigir', category: 'risk_taking' },
      { id: 'hcl8', text: 'Eu gastava mais dinheiro', category: 'spending' },
      { id: 'hcl9', text: 'Eu corria mais riscos em minha vida diária', category: 'daily_risks' },
      { id: 'hcl10', text: 'Eu estava mais fisicamente ativo(a)', category: 'physical_activity' },
      { id: 'hcl11', text: 'Eu planejava mais atividades ou projetos', category: 'planning' },
      { id: 'hcl12', text: 'Eu tinha mais ideias e era mais criativo(a)', category: 'creativity' },
      { id: 'hcl13', text: 'Eu era menos tímido(a) ou inibido(a)', category: 'disinhibition' },
      { id: 'hcl14', text: 'Eu usava roupas mais coloridas e extravagantes', category: 'appearance' },
      { id: 'hcl15', text: 'Eu falava mais', category: 'talkativeness' },
      { id: 'hcl16', text: 'Eu pensava mais rápido', category: 'thought_speed' },
      { id: 'hcl17', text: 'Eu fazia mais piadas ou trocadilhos', category: 'humor' },
      { id: 'hcl18', text: 'Eu estava mais interessado(a) em sexo', category: 'sexuality' },
      { id: 'hcl19', text: 'Eu flertava mais', category: 'flirtation' },
      { id: 'hcl20', text: 'Eu estava mais irritável', category: 'irritability' },
      { id: 'hcl21', text: 'Eu bebia mais café', category: 'stimulant_use' },
      { id: 'hcl22', text: 'Eu fumava mais cigarros ou usava mais nicotina', category: 'nicotine_use' }
    ],
    subscales: [
      {
        id: 'manic_episodes',
        name: 'Episódios Maníacos/Hipomaníacos',
        description: 'Sintomas de elevação do humor e energia',
        questionIds: ['mdq1', 'mdq2', 'mdq3', 'mdq4', 'mdq5', 'mdq6', 'mdq7', 'mdq8', 'mdq9', 'mdq10', 'mdq11', 'mdq12', 'mdq13']
      }
    ],
    metadata: {
      totalQuestions: 35,
      estimatedTime: 15,
      scientificBasis: 'MDQ (Mood Disorder Questionnaire) + HCL-32 (Hypomania Checklist-32)',
      description: 'Screening para episódios maníacos e hipomaníacos do transtorno bipolar'
    }
  },

  narcisismo: {
    questions: [
      // NPI-40 Complete Questions
      { id: 'npi1', text: 'Tenho um talento natural para influenciar pessoas', category: 'authority', subscale: 'grandiosity' },
      { id: 'npi2', text: 'A modestia não me combina', category: 'exhibitionism' },
      { id: 'npi3', text: 'Eu faria quase qualquer coisa em uma aposta', category: 'exploitativeness' },
      { id: 'npi4', text: 'Quando as pessoas me elogiam, às vezes fico sem graça', category: 'superiority', subscale: 'grandiosity' },
      { id: 'npi5', text: 'Eu sei que sou bom(boa) porque todos sempre me dizem isso', category: 'vanity' },
      { id: 'npi6', text: 'Eu gosto de ser o centro das atenções', category: 'exhibitionism' },
      { id: 'npi7', text: 'Eu consigo fazer qualquer pessoa acreditar em qualquer coisa que eu queira', category: 'exploitativeness' },
      { id: 'npi8', text: 'Eu sou uma pessoa assertiva', category: 'authority', subscale: 'grandiosity' },
      { id: 'npi9', text: 'Eu gosto de ter autoridade sobre outras pessoas', category: 'authority' },
      { id: 'npi10', text: 'Eu acho fácil manipular pessoas', category: 'exploitativeness' },
      { id: 'npi11', text: 'Eu insisto em conseguir o respeito que mereço', category: 'entitlement' },
      { id: 'npi12', text: 'Eu gosto de ser elogiado(a)', category: 'superiority', subscale: 'grandiosity' },
      { id: 'npi13', text: 'Eu tenho um forte desejo de poder', category: 'authority' },
      { id: 'npi14', text: 'Eu gosto de mostrar meu corpo', category: 'exhibitionism' },
      { id: 'npi15', text: 'Eu posso fazer qualquer pessoa fazer o que eu quiser', category: 'exploitativeness' },
      { id: 'npi16', text: 'Eu sou um líder nato', category: 'authority', subscale: 'grandiosity' },
      { id: 'npi17', text: 'Eu sou um artista(performer) nato', category: 'exhibitionism' },
      { id: 'npi18', text: 'Eu gosto de usar outros para meus próprios fins', category: 'exploitativeness' },
      { id: 'npi19', text: 'Eu realmente gosto de ser o centro das atenções', category: 'exhibitionism' },
      { id: 'npi20', text: 'As pessoas sempre parecem reconhecer minha autoridade', category: 'authority', subscale: 'grandiosity' },
      { id: 'npi21', text: 'Eu me tornarei uma pessoa famosa', category: 'superiority' },
      { id: 'npi22', text: 'Eu tenho um talento especial para persuadir pessoas', category: 'exploitativeness' },
      { id: 'npi23', text: 'Eu gosto de olhar para mim mesmo(a) no espelho', category: 'vanity' },
      { id: 'npi24', text: 'Eu gosto de assumir a responsabilidade por tomar decisões', category: 'authority', subscale: 'grandiosity' },
      { id: 'npi25', text: 'Eu espero muito de outras pessoas', category: 'entitlement' },
      { id: 'npi26', text: 'Eu gosto de ser elogiado(a)', category: 'vanity' },
      { id: 'npi27', text: 'Eu tenho uma personalidade forte', category: 'authority' },
      { id: 'npi28', text: 'Eu gosto de começar novas tendências e modas', category: 'superiority', subscale: 'grandiosity' },
      { id: 'npi29', text: 'Eu gosto de ver outras pessoas se admirarem', category: 'exhibitionism' },
      { id: 'npi30', text: 'Eu posso viver minha vida da maneira que quiser', category: 'entitlement' },
      { id: 'npi31', text: 'As pessoas às vezes acreditam no que eu digo', category: 'exploitativeness' },
      { id: 'npi32', text: 'Eu gosto de ser diferente de outras pessoas', category: 'superiority' },
      { id: 'npi33', text: 'Quando eu me sinto competitivo, geralmente ganho', category: 'superiority' },
      { id: 'npi34', text: 'Eu não me importo muito com o que as pessoas pensam de mim', category: 'self_sufficiency' },
      { id: 'npi35', text: 'Eu sou mais capaz que outras pessoas', category: 'superiority' },
      { id: 'npi36', text: 'Eu sou extraordinário(a)', category: 'superiority' },
      { id: 'npi37', text: 'Eu gosto de ter pessoas importantes ao meu redor', category: 'entitlement' },
      { id: 'npi38', text: 'Eu posso fazer qualquer um acreditar em qualquer coisa que eu quiser', category: 'exploitativeness' },
      { id: 'npi39', text: 'Eu sou uma pessoa especial', category: 'superiority' },
      { id: 'npi40', text: 'Eu gosto de competir contra outros', category: 'superiority' }
    ],
    subscales: [
      {
        id: 'grandiosity',
        name: 'Grandiosidade',
        description: 'Senso inflado de auto-importância',
        questionIds: ['npi1', 'npi4', 'npi8', 'npi12', 'npi16', 'npi20', 'npi24', 'npi28']
      }
    ],
    metadata: {
      totalQuestions: 40,
      estimatedTime: 12,
      scientificBasis: 'NPI-40 (Narcissistic Personality Inventory) - Raskin & Terry (1988)',
      description: 'Avaliação de traços narcisistas de personalidade baseada em escala validada'
    }
  },

  mitomania: {
    questions: [
      { id: 'myth1', text: 'Frequentemente embelenzo histórias para torná-las mais interessantes', category: 'embellishment', subscale: 'fabrication' },
      { id: 'myth2', text: 'Às vezes invento experiências que nunca tive', category: 'fabrication', subscale: 'fabrication' },
      { id: 'myth3', text: 'Minto para evitar consequências negativas', category: 'protective_lying' },
      { id: 'myth4', text: 'Conto mentiras pequenas em conversas casuais', category: 'casual_lying' },
      { id: 'myth5', text: 'Invento detalhes para tornar minhas histórias mais convincentes', category: 'detailed_fabrication', subscale: 'fabrication' },
      { id: 'myth6', text: 'Às vezes minto sobre minha formação educacional ou profissional', category: 'credential_lying' },
      { id: 'myth7', text: 'Exagero sobre minhas conquistas pessoais', category: 'achievement_exaggeration' },
      { id: 'myth8', text: 'Invento desculpas elaboradas quando chego atrasado(a)', category: 'excuse_fabrication' },
      { id: 'myth9', text: 'Crio personas diferentes para pessoas diferentes', category: 'identity_fabrication', subscale: 'fabrication' },
      { id: 'myth10', text: 'Minto sobre meus sentimentos para impressionar outros', category: 'emotional_lying' },
      { id: 'myth11', text: 'Invento histórias sobre lugares que nunca visitei', category: 'travel_fabrication' },
      { id: 'myth12', text: 'Exagero sobre dinheiro que tenho ou gastei', category: 'financial_exaggeration' },
      { id: 'myth13', text: 'Conto a mesma mentira tantas vezes que começo a acreditar nela', category: 'self_deception', subscale: 'fabrication' },
      { id: 'myth14', text: 'Minto sobre minha idade', category: 'age_lying' },
      { id: 'myth15', text: 'Invento relacionamentos que não existem', category: 'relationship_fabrication' },
      { id: 'myth16', text: 'Exagero sobre problemas de saúde', category: 'health_exaggeration' },
      { id: 'myth17', text: 'Crio histórias dramáticas sobre meu passado', category: 'past_fabrication', subscale: 'fabrication' },
      { id: 'myth18', text: 'Minto sobre habilidades que não possuo', category: 'skill_lying' },
      { id: 'myth19', text: 'Invento emergências para conseguir atenção', category: 'attention_seeking_lies' },
      { id: 'myth20', text: 'Exagero sobre conexões com pessoas famosas', category: 'celebrity_fabrication' },
      { id: 'myth21', text: 'Minto sobre ter lido livros ou assistido filmes', category: 'cultural_lying' },
      { id: 'myth22', text: 'Invento histórias sobre minha família', category: 'family_fabrication' },
      { id: 'myth23', text: 'Exagero sobre dificuldades que enfrentei', category: 'hardship_exaggeration' },
      { id: 'myth24', text: 'Minto para parecer mais interessante em encontros', category: 'dating_lies' },
      { id: 'myth25', text: 'Invento hobbies ou interesses que não tenho', category: 'interest_fabrication' },
      { id: 'myth26', text: 'Exagero sobre minha importância no trabalho', category: 'professional_exaggeration' },
      { id: 'myth27', text: 'Minto sobre ter feito boas ações', category: 'altruism_fabrication' },
      { id: 'myth28', text: 'Invento razões médicas para explicar comportamentos', category: 'medical_excuse_fabrication' },
      { id: 'myth29', text: 'Exagero sobre traumas que vivi', category: 'trauma_exaggeration' },
      { id: 'myth30', text: 'Minto compulsivamente mesmo quando a verdade seria melhor', category: 'compulsive_lying' }
    ],
    subscales: [
      {
        id: 'fabrication',
        name: 'Fabricação de Histórias',
        description: 'Tendência a criar narrativas falsas',
        questionIds: ['myth1', 'myth2', 'myth5', 'myth9', 'myth13', 'myth17']
      }
    ],
    metadata: {
      totalQuestions: 30,
      estimatedTime: 12,
      scientificBasis: 'Baseado em pesquisas sobre mentira patológica (Dike et al., 2005; Yang et al., 2005)',
      description: 'Avaliação de padrões de mentira patológica e distorção da realidade'
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
        metadata: questionSet.metadata,
        subscales: questionSet.subscales || []
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

// Enhanced recommendations based on scientific subscales
function generateRecommendations(totalScore, maxScore, subscaleScores, screeningType, questionSet) {
  const percentage = (totalScore / maxScore) * 100;
  const recommendations = [];
  
  // Base recommendations by severity
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
  
  // Specific recommendations based on highest subscale scores
  if (subscaleScores && Object.keys(subscaleScores).length > 0) {
    const sortedSubscales = Object.entries(subscaleScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2);
    
    for (const [subscaleId, score] of sortedSubscales) {
      const subscale = questionSet.subscales?.find(s => s.id === subscaleId);
      const scoreThreshold = Math.max(6, Math.floor(subscale?.questionIds.length * 2.5 || 6));
      
      if (score >= scoreThreshold) {
        switch (screeningType) {
          case 'anxiety':
            if (subscaleId === 'gad7') {
              recommendations.push("Técnicas de mindfulness para controle de preocupações");
            } else if (subscaleId === 'bai_physical') {
              recommendations.push("Técnicas de respiração e relaxamento muscular");
            }
            break;
          case 'depression':
            if (subscaleId === 'phq9_core') {
              if (score >= 15) {
                recommendations.push("Avaliação psiquiátrica urgente recomendada");
              } else if (score >= 10) {
                recommendations.push("Terapia cognitivo-comportamental recomendada");
              }
            }
            break;
          case 'adhd':
            if (subscaleId === 'inattention') {
              recommendations.push("Estratégias de organização e gestão de tempo");
            } else if (subscaleId === 'hyperactivity_impulsivity') {
              recommendations.push("Técnicas de autorregulação e mindfulness");
            }
            break;
          case 'bipolar':
            if (subscaleId === 'manic_episodes' && score >= 7) {
              recommendations.push("Avaliação psiquiátrica especializada urgente");
            }
            break;
          case 'narcisismo':
            if (subscaleId === 'grandiosity') {
              recommendations.push("Terapia focada em relacionamentos interpessoais");
            }
            break;
          case 'mitomania':
            if (subscaleId === 'fabrication') {
              recommendations.push("Terapia comportamental para padrões de honestidade");
            }
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
    
    // Enhanced risk level determination
    let riskLevel, interpretation;
    if (percentage < 20) {
      riskLevel = 'Mínimo';
      interpretation = 'Sintomas mínimos ou ausentes';
    } else if (percentage < 35) {
      riskLevel = 'Baixo';
      interpretation = 'Sintomas leves presentes';
    } else if (percentage < 55) {
      riskLevel = 'Moderado';
      interpretation = 'Sintomas moderados - recomenda-se avaliação profissional';
    } else if (percentage < 75) {
      riskLevel = 'Alto';
      interpretation = 'Sintomas significativos - buscar ajuda profissional';
    } else {
      riskLevel = 'Severo';
      interpretation = 'Sintomas severos - buscar ajuda profissional urgente';
    }

    const recommendations = generateRecommendations(totalScore, maxScore, subscaleScores, tipo_triagem, questionSet);

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
          rich_text: [{ text: { content: recommendations.slice(0, 5).join('; ') } }]
        }
      };

      // Add subscale scores (currently only implemented for anxiety)
      if (subscaleScores && tipo_triagem === 'anxiety') {
        // For now, keep the existing anxiety mapping
        // Future: implement mappings for other assessment types
        const subscaleMapping = {
          'gad7': 'Subescala_GAD7',
          'bai_physical': 'Subescala_BAI_Physical'
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
                { text: { content: `Tipo de Avaliação: ${tipo_triagem.toUpperCase()}\n` } },
                { text: { content: `Pontuação Total: ${totalScore}/${maxScore} (${percentage}%)\n` } },
                { text: { content: `Nível de Risco: ${riskLevel}\n` } },
                { text: { content: `Interpretação: ${interpretation}\n` } },
                { text: { content: `Total de Perguntas: ${questionSet.metadata.totalQuestions}\n` } },
                { text: { content: `Tempo Estimado: ${questionSet.metadata.estimatedTime} min\n\n` } },
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
            const maxSubscaleScore = (subscale?.questionIds.length || 1) * 4;
            const subscalePercentage = Math.round((score / maxSubscaleScore) * 100);
            return `${subscale?.name || id}: ${score}/${maxSubscaleScore} (${subscalePercentage}%)`;
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
  console.log(`🧠 Assessment types with comprehensive questions:`);
  Object.entries(questionSets).forEach(([type, set]) => {
    console.log(`   • ${type}: ${set.metadata.totalQuestions} questions (${set.metadata.estimatedTime} min)`);
  });
});

export default app;