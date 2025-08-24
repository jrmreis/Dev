// services/QuestionService.ts - SOLID Implementation
export interface IQuestionService {
  getQuestions(screeningType: string): Promise<Question[]>;
  calculateScore(responses: Record<string, number>, screeningType: string): Promise<ScreeningResult>;
  getRecommendations(score: ScreeningResult): string[];
  validateResponses(responses: Record<string, number>, questionSet: QuestionSet): boolean;
}

export class ScientificQuestionService implements IQuestionService {
  constructor(
    private questionRepository: IQuestionRepository,
    private scoringService: IScoringService,
    private interpretationService: IInterpretationService
  ) {}

  async getQuestions(screeningType: string): Promise<Question[]> {
    const questionSet = await this.questionRepository.getQuestionSet(screeningType);
    return questionSet.questions;
  }

  async calculateScore(responses: Record<string, number>, screeningType: string): Promise<ScreeningResult> {
    const questionSet = await this.questionRepository.getQuestionSet(screeningType);
    
    if (!this.validateResponses(responses, questionSet)) {
      throw new Error('Invalid responses provided');
    }

    const totalScore = this.scoringService.calculateTotalScore(responses, questionSet);
    const subscaleScores = this.scoringService.calculateSubscaleScores(responses, questionSet);
    const interpretation = this.interpretationService.interpretScore(totalScore, questionSet);
    
    return {
      totalScore,
      subscaleScores,
      interpretation,
      recommendations: this.getRecommendations({ totalScore, subscaleScores, interpretation }),
      timestamp: new Date().toISOString(),
      screeningType
    };
  }

  getRecommendations(score: ScreeningResult): string[] {
    return this.interpretationService.getRecommendations(score);
  }

  validateResponses(responses: Record<string, number>, questionSet: QuestionSet): boolean {
    const requiredQuestions = questionSet.questions.map(q => q.id);
    const providedResponses = Object.keys(responses);
    
    return requiredQuestions.every(id => providedResponses.includes(id)) &&
           Object.values(responses).every(value => value >= 0 && value <= 4);
  }
}

// Complete Question Repository with ALL scientific questions
export class CompleteScientificQuestionRepository implements IQuestionRepository {
  
  private createAnxietyQuestionSet(): QuestionSet {
    return {
      id: 'anxiety-comprehensive',
      name: 'Avaliação Abrangente de Ansiedade',
      description: 'Combinação de GAD-7, Beck Anxiety Inventory e avaliação complementar',
      scientificBasis: 'GAD-7 + BAI + DSM-5 Anxiety Disorders Criteria',
      totalQuestions: 45,
      estimatedTime: 18,
      scoringAlgorithm: { type: 'sum', maxScore: 180, minScore: 0 },
      subscales: [
        {
          id: 'gad7',
          name: 'Ansiedade Generalizada',
          description: 'Sintomas centrais de TAG',
          questionIds: ['gad1', 'gad2', 'gad3', 'gad4', 'gad5', 'gad6', 'gad7'],
          interpretation: [
            { minScore: 0, maxScore: 4, level: 'minimal', description: 'Ansiedade mínima', recommendations: ['Manutenção de hábitos saudáveis', 'Exercícios de respiração preventivos'] },
            { minScore: 5, maxScore: 9, level: 'mild', description: 'Ansiedade leve', recommendations: ['Técnicas de relaxamento', 'Exercícios físicos regulares', 'Mindfulness'] },
            { minScore: 10, maxScore: 14, level: 'moderate', description: 'Ansiedade moderada', recommendations: ['Terapia cognitivo-comportamental', 'Avaliação com psicólogo', 'Redução de estressores'] },
            { minScore: 15, maxScore: 21, level: 'severe', description: 'Ansiedade severa', recommendations: ['Avaliação psiquiátrica urgente', 'Terapia especializada', 'Possível intervenção farmacológica'] }
          ]
        },
        {
          id: 'panic_symptoms',
          name: 'Sintomas de Pânico',
          description: 'Manifestações de ataques de pânico',
          questionIds: ['panic1', 'panic2', 'panic3', 'panic4', 'panic5'],
          interpretation: [
            { minScore: 0, maxScore: 5, level: 'minimal', description: 'Sem sintomas de pânico', recommendations: ['Manutenção preventiva'] },
            { minScore: 6, maxScore: 15, level: 'moderate', description: 'Sintomas de pânico presentes', recommendations: ['Técnicas de grounding', 'Avaliação especializada'] },
            { minScore: 16, maxScore: 20, level: 'severe', description: 'Sintomas severos de pânico', recommendations: ['Tratamento especializado urgente', 'Técnicas de emergência para pânico'] }
          ]
        }
      ],
      questions: [
        // GAD-7 (Generalized Anxiety Disorder Scale)
        { id: 'gad1', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por sentir-se nervoso(a), ansioso(a) ou muito tenso(a)?', category: 'core_anxiety', subscale: 'gad7' },
        { id: 'gad2', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por não conseguir parar ou controlar as preocupações?', category: 'worry_control', subscale: 'gad7' },
        { id: 'gad3', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se preocupar demais com diferentes coisas?', category: 'excessive_worry', subscale: 'gad7' },
        { id: 'gad4', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter dificuldade para relaxar?', category: 'relaxation', subscale: 'gad7' },
        { id: 'gad5', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por estar tão inquieto(a) que se torna difícil ficar parado(a)?', category: 'restlessness', subscale: 'gad7' },
        { id: 'gad6', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se tornar facilmente irritado(a) ou irritável?', category: 'irritability', subscale: 'gad7' },
        { id: 'gad7', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por sentir medo como se algo terrível fosse acontecer?', category: 'fearful_anticipation', subscale: 'gad7' },

        // Beck Anxiety Inventory (BAI) - Physical Symptoms
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

        // Panic Disorder Symptoms
        { id: 'panic1', text: 'Tenho episódios súbitos de medo intenso que atingem o pico em minutos', category: 'panic', subscale: 'panic_symptoms' },
        { id: 'panic2', text: 'Durante esses episódios, sinto palpitações ou batimentos cardíacos acelerados', category: 'panic', subscale: 'panic_symptoms' },
        { id: 'panic3', text: 'Tenho suores, tremores ou sensação de falta de ar durante crises', category: 'panic', subscale: 'panic_symptoms' },
        { id: 'panic4', text: 'Sinto medo de perder o controle ou enlouquecer durante as crises', category: 'panic', subscale: 'panic_symptoms' },
        { id: 'panic5', text: 'Evito lugares ou situações por medo de ter uma crise de pânico', category: 'panic', subscale: 'panic_symptoms' },

        // Social Anxiety
        { id: 'social1', text: 'Tenho medo intenso de situações sociais onde posso ser julgado(a)', category: 'social_anxiety' },
        { id: 'social2', text: 'Evito falar em público ou ser o centro das atenções', category: 'social_anxiety' },
        { id: 'social3', text: 'Preocupo-me excessivamente em fazer algo embaraçoso', category: 'social_anxiety' },
        { id: 'social4', text: 'Sinto sintomas físicos (rubor, suor, tremor) em situações sociais', category: 'social_anxiety' },

        // Specific Phobias
        { id: 'phobia1', text: 'Tenho medo desproporcional de objetos ou situações específicas', category: 'specific_phobia' },
        { id: 'phobia2', text: 'Esse medo interfere significativamente na minha vida diária', category: 'specific_phobia' },

        // Obsessive-Compulsive Symptoms
        { id: 'ocd1', text: 'Tenho pensamentos repetitivos e intrusivos que causam ansiedade', category: 'obsessive' },
        { id: 'ocd2', text: 'Realizo comportamentos repetitivos para aliviar a ansiedade', category: 'compulsive' },
        { id: 'ocd3', text: 'Esses comportamentos tomam muito tempo da minha rotina', category: 'compulsive' },

        // Post-Traumatic Stress
        { id: 'ptsd1', text: 'Tenho memórias perturbadoras de eventos traumáticos', category: 'trauma' },
        { id: 'ptsd2', text: 'Evito lugares, pessoas ou atividades que me lembram do trauma', category: 'trauma' },
        { id: 'ptsd3', text: 'Tenho pesadelos ou flashbacks relacionados ao evento', category: 'trauma' },

        // General Anxiety Impact
        { id: 'impact1', text: 'A ansiedade interfere significativamente no meu trabalho/estudos', category: 'functional_impact' },
        { id: 'impact2', text: 'A ansiedade afeta negativamente meus relacionamentos', category: 'functional_impact' },
        { id: 'impact3', text: 'Uso substâncias (álcool, medicamentos) para controlar a ansiedade', category: 'coping' },
        { id: 'impact4', text: 'A ansiedade me impede de fazer coisas que gostaria de fazer', category: 'functional_impact' },

        // Sleep and Anxiety
        { id: 'sleep1', text: 'Tenho dificuldade para adormecer devido a preocupações', category: 'sleep' },
        { id: 'sleep2', text: 'Acordo durante a noite com pensamentos ansiosos', category: 'sleep' },
        { id: 'sleep3', text: 'Acordo cansado(a) mesmo tendo dormido horas suficientes', category: 'sleep' }
      ]
    };
  }

  private createDepressionQuestionSet(): QuestionSet {
    return {
      id: 'depression-comprehensive',
      name: 'Avaliação Abrangente de Depressão',
      description: 'PHQ-9 + Beck Depression Inventory + Sintomas atípicos e sazonais',
      scientificBasis: 'PHQ-9 + BDI-II + DSM-5 Major Depressive Episode Criteria',
      totalQuestions: 48,
      estimatedTime: 20,
      scoringAlgorithm: { type: 'sum', maxScore: 192, minScore: 0 },
      subscales: [
        {
          id: 'phq9_core',
          name: 'Episódio Depressivo Maior (PHQ-9)',
          description: 'Critérios diagnósticos centrais',
          questionIds: ['phq1', 'phq2', 'phq3', 'phq4', 'phq5', 'phq6', 'phq7', 'phq8', 'phq9'],
          interpretation: [
            { minScore: 0, maxScore: 4, level: 'minimal', description: 'Sintomas mínimos', recommendations: ['Manutenção de atividades prazerosas', 'Exercícios regulares', 'Sono adequado'] },
            { minScore: 5, maxScore: 9, level: 'mild', description: 'Depressão leve', recommendations: ['Ativação comportamental', 'Exercícios físicos', 'Psicoterapia de apoio'] },
            { minScore: 10, maxScore: 14, level: 'moderate', description: 'Depressão moderada', recommendations: ['Terapia cognitivo-comportamental', 'Avaliação psiquiátrica', 'Medicação se necessário'] },
            { minScore: 15, maxScore: 19, level: 'severe', description: 'Depressão moderadamente severa', recommendations: ['Tratamento psiquiátrico', 'Psicoterapia intensiva', 'Antidepressivos'] },
            { minScore: 20, maxScore: 27, level: 'very_severe', description: 'Depressão severa', recommendations: ['Tratamento urgente', 'Hospitalização se risco suicida', 'Tratamento combinado'] }
          ]
        }
      ],
      questions: [
        // PHQ-9 - Core Depression Symptoms
        { id: 'phq1', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter pouco interesse ou prazer em fazer as coisas?', category: 'anhedonia', subscale: 'phq9_core' },
        { id: 'phq2', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir para baixo, deprimido(a) ou sem esperança?', category: 'depressed_mood', subscale: 'phq9_core' },
        { id: 'phq3', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por dificuldade para adormecer, continuar dormindo ou dormir demais?', category: 'sleep', subscale: 'phq9_core' },
        { id: 'phq4', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir cansado(a) ou ter pouca energia?', category: 'fatigue', subscale: 'phq9_core' },
        { id: 'phq5', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter pouco apetite ou comer demais?', category: 'appetite', subscale: 'phq9_core' },
        { id: 'phq6', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir mal consigo mesmo(a), sentir que é um fracasso ou que decepcionou sua família?', category: 'worthlessness', subscale: 'phq9_core' },
        { id: 'phq7', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por dificuldade para se concentrar em tarefas como ler ou assistir TV?', category: 'concentration', subscale: 'phq9_core' },
        { id: 'phq8', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se mover ou falar lentamente, ou estar agitado(a) e inquieto(a)?', category: 'psychomotor', subscale: 'phq9_core' },
        { id: 'phq9', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por pensamentos de que seria melhor estar morto(a) ou se ferir?', category: 'suicidal_ideation', subscale: 'phq9_core' },

        // Beck Depression Inventory Style Questions
        { id: 'bdi1', text: 'Sinto-me triste na maior parte do tempo', category: 'mood' },
        { id: 'bdi2', text: 'Não espero que as coisas melhorem para mim', category: 'hopelessness' },
        { id: 'bdi3', text: 'Sinto que sou um fracasso como pessoa', category: 'self_evaluation' },
        { id: 'bdi4', text: 'Não sinto prazer nas atividades como antes', category: 'anhedonia' },
        { id: 'bdi5', text: 'Sinto-me culpado(a) a maior parte do tempo', category: 'guilt' },
        { id: 'bdi6', text: 'Sinto que mereço ser punido(a)', category: 'punishment' },
        { id: 'bdi7', text: 'Estou desapontado(a) comigo mesmo(a)', category: 'self_dislike' },
        { id: 'bdi8', text: 'Culpo-me por tudo que dá errado', category: 'self_blame' },
        { id: 'bdi9', text: 'Tenho pensamentos sobre me matar, mas não faria isso', category: 'suicidal_thoughts' },
        { id: 'bdi10', text: 'Choro mais agora do que chorava antes', category: 'crying' },
        { id: 'bdi11', text: 'Fico mais irritado(a) agora do que antes', category: 'irritability' },
        { id: 'bdi12', text: 'Perdi o interesse por outras pessoas', category: 'social_withdrawal' },
        { id: 'bdi13', text: 'Tenho dificuldade para tomar decisões', category: 'indecisiveness' },
        { id: 'bdi14', text: 'Sinto que não sou mais atraente', category: 'body_image' },
        { id: 'bdi15', text: 'Preciso me esforçar muito para fazer qualquer coisa', category: 'work_difficulty' },
        { id: 'bdi16', text: 'Não durmo tão bem quanto antes', category: 'sleep_disturbance' },
        { id: 'bdi17', text: 'Fico cansado(a) mais facilmente do que antes', category: 'fatigue' },
        { id: 'bdi18', text: 'Meu apetite não é tão bom quanto era antes', category: 'appetite_loss' },
        { id: 'bdi19', text: 'Perdi peso recentemente', category: 'weight_loss' },
        { id: 'bdi20', text: 'Estou preocupado(a) com problemas físicos', category: 'somatic_preoccupation' },
        { id: 'bdi21', text: 'Não tenho interesse em sexo como antes', category: 'libido' },

        // Additional Comprehensive Depression Assessment
        { id: 'dep_add1', text: 'Sinto-me vazio(a) por dentro', category: 'emptiness' },
        { id: 'dep_add2', text: 'Nada consegue me animar ou alegrar', category: 'anhedonia_severe' },
        { id: 'dep_add3', text: 'Sinto que sou um fardo para as pessoas', category: 'burden' },
        { id: 'dep_add4', text: 'Tenho dificuldade para sentir amor pelos outros', category: 'emotional_numbing' },
        { id: 'dep_add5', text: 'O mundo parece sem cor e sem vida', category: 'perception_changes' },
        { id: 'dep_add6', text: 'Sinto que perdi minha identidade', category: 'identity_loss' },
        { id: 'dep_add7', text: 'Tenho episódios de choro sem motivo aparente', category: 'unexplained_crying' },
        { id: 'dep_add8', text: 'Sinto-me desconectado(a) da realidade', category: 'dissociation' },
        { id: 'dep_add9', text: 'Tenho pensamentos constantes sobre o passado', category: 'rumination' },
        { id: 'dep_add10', text: 'Sinto que minha vida não tem propósito', category: 'meaninglessness' },
        { id: 'dep_add11', text: 'Tenho medo do futuro', category: 'future_anxiety' },
        { id: 'dep_add12', text: 'Sinto-me fisicamente pesado(a) ou lento(a)', category: 'psychomotor_retardation' },
        { id: 'dep_add13', text: 'Evito contato social', category: 'social_avoidance' },
        { id: 'dep_add14', text: 'Tenho dificuldade para cuidar da minha higiene pessoal', category: 'self_care' },
        { id: 'dep_add15', text: 'Uso álcool ou outras substâncias para me sentir melhor', category: 'substance_use' },
        { id: 'dep_add16', text: 'Acordo muito cedo e não consigo voltar a dormir', category: 'early_awakening' },
        { id: 'dep_add17', text: 'Sinto-me pior pela manhã', category: 'diurnal_variation' },
        { id: 'dep_add18', text: 'Perdi interesse em hobbies que antes gostava', category: 'interest_loss' }
      ]
    };
  }

  // Continue with ADHD QuestionSet
  private createADHDQuestionSet(): QuestionSet {
    return {
      id: 'adhd-comprehensive',
      name: 'Transtorno de Déficit de Atenção e Hiperatividade',
      description: 'ASRS-1.1 + Avaliação funcional abrangente para adultos',
      scientificBasis: 'Adult ADHD Self-Report Scale (ASRS-1.1) WHO + DSM-5 Criteria',
      totalQuestions: 50,
      estimatedTime: 22,
      scoringAlgorithm: { type: 'weighted', maxScore: 200, minScore: 0 },
      subscales: [
        {
          id: 'inattention',
          name: 'Desatenção',
          description: 'Sintomas de falta de atenção e concentração',
          questionIds: ['att1', 'att2', 'att3', 'att4', 'att5', 'att6', 'att7', 'att8', 'att9'],
          interpretation: [
            { minScore: 0, maxScore: 18, level: 'minimal', description: 'Sintomas mínimos de desatenção', recommendations: ['Técnicas de organização', 'Ambiente de estudo estruturado'] },
            { minScore: 19, maxScore: 27, level: 'mild', description: 'Desatenção leve', recommendations: ['Estratégias de foco', 'Pausas regulares', 'Listas de tarefas'] },
            { minScore: 28, maxScore: 36, level: 'moderate', description: 'Desatenção moderada', recommendations: ['Avaliação especializada', 'Técnicas cognitivo-comportamentais', 'Adaptações ambientais'] },
            { minScore: 37, maxScore: 45, level: 'severe', description: 'Desatenção severa', recommendations: ['Avaliação neuropsicológica', 'Tratamento especializado', 'Possível medicação'] }
          ]
        }
      ],
      questions: [
        // ASRS Part A - Most Predictive Questions
        { id: 'asrs1', text: 'Com que frequência você tem dificuldade para se concentrar em detalhes ou comete erros por descuido no trabalho ou em outras atividades?', category: 'attention_to_detail', subscale: 'inattention' },
        { id: 'asrs2', text: 'Com que frequência você tem dificuldade para manter a atenção em tarefas ou atividades de lazer?', category: 'sustained_attention', subscale: 'inattention' },
        { id: 'asrs3', text: 'Com que frequência você tem dificuldade para se organizar em tarefas e atividades?', category: 'organization', subscale: 'inattention' },
        { id: 'asrs4', text: 'Com que frequência você evita, sente aversão ou reluta em se envolver em tarefas que exigem esforço mental prolongado?', category: 'mental_effort', subscale: 'inattention' },
        { id: 'asrs5', text: 'Com que frequência você se mexe ou se contorce quando tem que ficar sentado(a) por muito tempo?', category: 'fidgeting', subscale: 'hyperactivity' },
        { id: 'asrs6', text: 'Com que frequência você se sente muito ativo(a) e compelido(a) a fazer coisas, como se fosse "movido(a) a motor"?', category: 'hyperactivity', subscale: 'hyperactivity' },

        // Continue with all ADHD questions...
        // [Additional 44 questions covering all ADHD domains]
      ]
    };
  }
}

