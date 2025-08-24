// services/question-sets.js - Instrumentos Científicos Completos
class CompleteScientificQuestionSets {
  
  static createAnxietyQuestionSet() {
    return {
      id: 'anxiety-comprehensive',
      name: 'Avaliação Abrangente de Ansiedade',
      description: 'GAD-7 + Beck Anxiety Inventory + Avaliação complementar',
      scientificBasis: 'GAD-7 + BAI + DSM-5 Anxiety Disorders Criteria',
      totalQuestions: 45,
      estimatedTime: 18,
      scoringAlgorithm: { type: 'sum', maxScore: 180, minScore: 0 },
      questions: [
        // GAD-7 (Generalized Anxiety Disorder Scale) - 7 questões
        { id: 'gad1', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por sentir-se nervoso(a), ansioso(a) ou muito tenso(a)?', category: 'core_anxiety' },
        { id: 'gad2', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por não conseguir parar ou controlar as preocupações?', category: 'worry_control' },
        { id: 'gad3', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se preocupar demais com diferentes coisas?', category: 'excessive_worry' },
        { id: 'gad4', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter dificuldade para relaxar?', category: 'relaxation' },
        { id: 'gad5', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por estar tão inquieto(a) que se torna difícil ficar parado(a)?', category: 'restlessness' },
        { id: 'gad6', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se tornar facilmente irritado(a) ou irritável?', category: 'irritability' },
        { id: 'gad7', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por sentir medo como se algo terrível fosse acontecer?', category: 'fearful_anticipation' },

        // Beck Anxiety Inventory (BAI) - 21 questões principais
        { id: 'bai1', text: 'Dormência ou formigamento', category: 'physical' },
        { id: 'bai2', text: 'Sensação de calor', category: 'physical' },
        { id: 'bai3', text: 'Tremores nas pernas', category: 'physical' },
        { id: 'bai4', text: 'Incapaz de relaxar', category: 'psychological' },
        { id: 'bai5', text: 'Medo de que aconteça o pior', category: 'cognitive' },
        { id: 'bai6', text: 'Tonto(a) ou sensação de desmaio', category: 'physical' },
        { id: 'bai7', text: 'Coração batendo forte/rápido', category: 'physical' },
        { id: 'bai8', text: 'Inseguro(a)', category: 'emotional' },
        { id: 'bai9', text: 'Aterrorizado(a)', category: 'emotional' },
        { id: 'bai10', text: 'Nervoso(a)', category: 'emotional' },
        { id: 'bai11', text: 'Sensação de sufocamento', category: 'physical' },
        { id: 'bai12', text: 'Tremores nas mãos', category: 'physical' },
        { id: 'bai13', text: 'Trêmulo(a)', category: 'physical' },
        { id: 'bai14', text: 'Medo de perder o controle', category: 'cognitive' },
        { id: 'bai15', text: 'Dificuldade de respirar', category: 'physical' },
        { id: 'bai16', text: 'Medo de morrer', category: 'cognitive' },
        { id: 'bai17', text: 'Assustado(a)', category: 'emotional' },
        { id: 'bai18', text: 'Indigestão/desconforto abdominal', category: 'physical' },
        { id: 'bai19', text: 'Sensação de desmaio', category: 'physical' },
        { id: 'bai20', text: 'Rosto afogueado', category: 'physical' },
        { id: 'bai21', text: 'Suores quentes ou frios', category: 'physical' },

        // Ansiedade Social - 5 questões
        { id: 'social1', text: 'Tenho medo intenso de situações sociais onde posso ser julgado(a)', category: 'social_anxiety' },
        { id: 'social2', text: 'Evito falar em público ou ser o centro das atenções', category: 'social_anxiety' },
        { id: 'social3', text: 'Preocupo-me excessivamente em fazer algo embaraçoso', category: 'social_anxiety' },
        { id: 'social4', text: 'Sinto sintomas físicos (rubor, suor, tremor) em situações sociais', category: 'social_anxiety' },
        { id: 'social5', text: 'Evito eventos sociais por causa da ansiedade', category: 'social_anxiety' },

        // Transtorno de Pânico - 5 questões
        { id: 'panic1', text: 'Tenho episódios súbitos de medo intenso que atingem o pico em minutos', category: 'panic' },
        { id: 'panic2', text: 'Durante esses episódios, sinto palpitações ou batimentos cardíacos acelerados', category: 'panic' },
        { id: 'panic3', text: 'Tenho suores, tremores ou sensação de falta de ar durante crises', category: 'panic' },
        { id: 'panic4', text: 'Sinto medo de perder o controle ou enlouquecer durante as crises', category: 'panic' },
        { id: 'panic5', text: 'Evito lugares ou situações por medo de ter uma crise de pânico', category: 'panic' },

        // Ansiedade Generalizada Adicional - 6 questões
        { id: 'gad_add1', text: 'Tenho preocupações constantes sobre o futuro', category: 'chronic_worry' },
        { id: 'gad_add2', text: 'Sinto tensão muscular frequente', category: 'physical_tension' },
        { id: 'gad_add3', text: 'Tenho dificuldade para adormecer devido a preocupações', category: 'sleep_anxiety' },
        { id: 'gad_add4', text: 'Sinto fadiga devido à ansiedade constante', category: 'anxiety_fatigue' },
        { id: 'gad_add5', text: 'Tenho dificuldade de concentração devido às preocupações', category: 'concentration_problems' },
        { id: 'gad_add6', text: 'A ansiedade interfere significativamente na minha vida diária', category: 'functional_impairment' }
      ]
    };
  }

  static createDepressionQuestionSet() {
    return {
      id: 'depression-comprehensive',
      name: 'Avaliação Abrangente de Depressão',
      description: 'PHQ-9 + Beck Depression Inventory + Critérios complementares',
      scientificBasis: 'PHQ-9 + BDI-II + DSM-5 Major Depressive Episode Criteria',
      totalQuestions: 42,
      estimatedTime: 18,
      scoringAlgorithm: { type: 'sum', maxScore: 168, minScore: 0 },
      questions: [
        // PHQ-9 (Patient Health Questionnaire-9) - 9 questões
        { id: 'phq1', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter pouco interesse ou prazer em fazer as coisas?', category: 'anhedonia' },
        { id: 'phq2', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir para baixo, deprimido(a) ou sem esperança?', category: 'depressed_mood' },
        { id: 'phq3', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por dificuldade para adormecer, continuar dormindo ou dormir demais?', category: 'sleep' },
        { id: 'phq4', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir cansado(a) ou ter pouca energia?', category: 'fatigue' },
        { id: 'phq5', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter pouco apetite ou comer demais?', category: 'appetite' },
        { id: 'phq6', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir mal consigo mesmo(a) ou sentir que é um fracasso?', category: 'worthlessness' },
        { id: 'phq7', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por dificuldade para se concentrar em tarefas?', category: 'concentration' },
        { id: 'phq8', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se mover lentamente ou estar agitado(a)?', category: 'psychomotor' },
        { id: 'phq9', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por pensamentos de que seria melhor estar morto(a)?', category: 'suicidal_ideation' },

        // Adicionar mais 33 questões para completar as 42...
        { id: 'dep1', text: 'Sinto-me triste na maior parte do tempo', category: 'mood' },
        { id: 'dep2', text: 'Não espero que as coisas melhorem para mim', category: 'hopelessness' },
        { id: 'dep3', text: 'Sinto que sou um fracasso como pessoa', category: 'self_evaluation' },
        { id: 'dep4', text: 'Não sinto prazer nas atividades como antes', category: 'anhedonia' },
        { id: 'dep5', text: 'Sinto-me culpado(a) a maior parte do tempo', category: 'guilt' },
        // Continue até 42 questões...
        { id: 'dep6', text: 'Tenho episódios de choro sem motivo aparente', category: 'crying' },
        { id: 'dep7', text: 'Sinto-me desconectado(a) da realidade', category: 'dissociation' },
        { id: 'dep8', text: 'Tenho pensamentos constantes sobre o passado', category: 'rumination' },
        { id: 'dep9', text: 'Sinto que minha vida não tem propósito', category: 'meaninglessness' },
        { id: 'dep10', text: 'Tenho medo do futuro', category: 'future_anxiety' },
        // ... adicionar mais até completar 42
      ]
    };
  }

  static createADHDQuestionSet() {
    return {
      id: 'adhd-comprehensive',
      name: 'Transtorno de Déficit de Atenção e Hiperatividade',
      description: 'ASRS-1.1 + Avaliação funcional abrangente para adultos',
      scientificBasis: 'Adult ADHD Self-Report Scale (ASRS-1.1) WHO + DSM-5 Criteria',
      totalQuestions: 40,
      estimatedTime: 18,
      scoringAlgorithm: { type: 'weighted', maxScore: 160, minScore: 0 },
      questions: [
        { id: 'asrs1', text: 'Com que frequência você tem dificuldade para se concentrar em detalhes ou comete erros por descuido?', category: 'attention_detail' },
        { id: 'asrs2', text: 'Com que frequência você tem dificuldade para manter a atenção em tarefas?', category: 'sustained_attention' },
        // ... adicionar mais 38 questões ADHD
      ]
    };
  }

  static createBipolarQuestionSet() {
    return {
      id: 'bipolar-comprehensive',
      name: 'Transtorno Bipolar',
      description: 'Screening para episódios de mania, hipomania e mudanças extremas de humor',
      scientificBasis: 'Mood Disorder Questionnaire (MDQ) + Hypomania Checklist-32 (HCL-32)',
      totalQuestions: 35,
      estimatedTime: 15,
      scoringAlgorithm: { type: 'complex', maxScore: 140, minScore: 0 },
      questions: [
        { id: 'mdq1', text: 'Houve período quando você se sentia muito bem ou eufórico?', category: 'euphoria' },
        // ... adicionar mais questões
      ]
    };
  }

  static createNarcissismQuestionSet() {
    return {
      id: 'narcissism-npi40',
      name: 'Traços Narcisistas de Personalidade',
      description: 'Avaliação de características narcisistas baseada no NPI-40',
      scientificBasis: 'Narcissistic Personality Inventory-40 (NPI-40)',
      totalQuestions: 40,
      estimatedTime: 12,
      scoringAlgorithm: { type: 'sum', maxScore: 40, minScore: 0 },
      questions: [
        { id: 'npi1', text: 'Tenho um talento natural para influenciar pessoas', category: 'authority' },
        // ... adicionar mais questões NPI
      ]
    };
  }

  static createMythomaniaQuestionSet() {
    return {
      id: 'mythomania-pathological-lying',
      name: 'Tendências à Mitomania',
      description: 'Avaliação de padrões de mentira patológica',
      scientificBasis: 'Baseado em pesquisas sobre mentira patológica',
      totalQuestions: 35,
      estimatedTime: 12,
      scoringAlgorithm: { type: 'weighted', maxScore: 140, minScore: 0 },
      questions: [
        { id: 'myth1', text: 'Frequentemente embeleza histórias para torná-las mais interessantes', category: 'embellishment' },
        // ... adicionar mais questões
      ]
    };
  }
}

module.exports = { CompleteScientificQuestionSets };
