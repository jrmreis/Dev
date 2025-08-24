// repositories/QuestionRepository.ts
export interface IQuestionRepository {
  getQuestionSet(screeningType: string): Promise<QuestionSet>;
  getAllQuestionSets(): Promise<QuestionSet[]>;
  validateQuestionSet(questionSet: QuestionSet): boolean;
}

export class ScientificQuestionRepository implements IQuestionRepository {
  private questionSets: Map<string, QuestionSet> = new Map();

  constructor() {
    this.initializeQuestionSets();
  }

  async getQuestionSet(screeningType: string): Promise<QuestionSet> {
    const questionSet = this.questionSets.get(screeningType);
    if (!questionSet) {
      throw new Error(`Question set not found for screening type: ${screeningType}`);
    }
    return questionSet;
  }

  async getAllQuestionSets(): Promise<QuestionSet[]> {
    return Array.from(this.questionSets.values());
  }

  validateQuestionSet(questionSet: QuestionSet): boolean {
    return questionSet.questions.length >= 10 && 
           questionSet.scientificBasis.length > 0 &&
           questionSet.scoringAlgorithm.maxScore > questionSet.scoringAlgorithm.minScore;
  }

  private initializeQuestionSets(): void {
    this.questionSets.set('anxiety', this.createAnxietyQuestionSet());
    this.questionSets.set('depression', this.createDepressionQuestionSet());
    this.questionSets.set('adhd', this.createADHDQuestionSet());
    this.questionSets.set('bipolar', this.createBipolarQuestionSet());
    this.questionSets.set('narcisismo', this.createNarcissismQuestionSet());
    this.questionSets.set('mitomania', this.createMythomaniaQuestionSet());
  }

  // GAD-7 + Beck Anxiety Inventory Combined (40 questions)
  private createAnxietyQuestionSet(): QuestionSet {
    return {
      id: 'anxiety-gad7-bai',
      name: 'Transtorno de Ansiedade Generalizada',
      description: 'Avaliação abrangente de sintomas de ansiedade baseada em escalas científicas validadas',
      scientificBasis: 'GAD-7 (Generalized Anxiety Disorder 7-item) + Beck Anxiety Inventory (BAI) - Instrumentos validados internacionalmente',
      totalQuestions: 40,
      estimatedTime: 15,
      scoringAlgorithm: {
        type: 'sum',
        maxScore: 156, // GAD-7: 21 + BAI: 135
        minScore: 0
      },
      subscales: [
        {
          id: 'gad7',
          name: 'Ansiedade Generalizada (GAD-7)',
          description: 'Sintomas centrais de ansiedade generalizada',
          questionIds: ['gad1', 'gad2', 'gad3', 'gad4', 'gad5', 'gad6', 'gad7'],
          interpretation: [
            { minScore: 0, maxScore: 4, level: 'minimal', description: 'Ansiedade mínima', recommendations: ['Manutenção de hábitos saudáveis', 'Técnicas de relaxamento preventivas'] },
            { minScore: 5, maxScore: 9, level: 'mild', description: 'Ansiedade leve', recommendations: ['Técnicas de respiração', 'Exercícios físicos regulares', 'Mindfulness'] },
            { minScore: 10, maxScore: 14, level: 'moderate', description: 'Ansiedade moderada', recommendations: ['Terapia cognitivo-comportamental', 'Avaliação profissional', 'Técnicas de enfrentamento'] },
            { minScore: 15, maxScore: 21, level: 'severe', description: 'Ansiedade severa', recommendations: ['Avaliação psiquiátrica urgente', 'Terapia intensiva', 'Possível medicação'] }
          ]
        },
        {
          id: 'bai_physical',
          name: 'Sintomas Físicos de Ansiedade',
          description: 'Manifestações corporais da ansiedade',
          questionIds: ['bai1', 'bai3', 'bai5', 'bai7', 'bai9', 'bai11', 'bai13', 'bai15', 'bai17', 'bai19', 'bai21'],
          interpretation: [
            { minScore: 0, maxScore: 10, level: 'minimal', description: 'Sintomas físicos mínimos', recommendations: ['Atividade física regular'] },
            { minScore: 11, maxScore: 20, level: 'mild', description: 'Sintomas físicos leves', recommendations: ['Técnicas de relaxamento muscular'] },
            { minScore: 21, maxScore: 35, level: 'moderate', description: 'Sintomas físicos moderados', recommendations: ['Avaliação médica', 'Terapia somática'] },
            { minScore: 36, maxScore: 66, level: 'severe', description: 'Sintomas físicos severos', recommendations: ['Avaliação médica urgente', 'Tratamento integrado'] }
          ]
        }
      ],
      questions: [
        // GAD-7 Questions
        { id: 'gad1', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por sentir-se nervoso(a), ansioso(a) ou muito tenso(a)?', category: 'core_anxiety' },
        { id: 'gad2', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por não conseguir parar ou controlar as preocupações?', category: 'worry_control' },
        { id: 'gad3', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se preocupar demais com diferentes coisas?', category: 'excessive_worry' },
        { id: 'gad4', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter dificuldade para relaxar?', category: 'relaxation_difficulty' },
        { id: 'gad5', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por estar tão inquieto(a) que se torna difícil ficar parado(a)?', category: 'restlessness' },
        { id: 'gad6', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se tornar facilmente irritado(a) ou irritável?', category: 'irritability' },
        { id: 'gad7', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por sentir medo como se algo terrível fosse acontecer?', category: 'fearful_anticipation' },

        // Beck Anxiety Inventory Questions (33 additional questions)
        { id: 'bai1', text: 'Dormência ou formigamento nas mãos, pés ou rosto', category: 'physical', subscale: 'bai_physical' },
        { id: 'bai2', text: 'Sensação de calor no corpo', category: 'physical' },
        { id: 'bai3', text: 'Tremores nas pernas', category: 'physical', subscale: 'bai_physical' },
        { id: 'bai4', text: 'Incapaz de relaxar', category: 'psychological' },
        { id: 'bai5', text: 'Medo de que aconteça o pior', category: 'cognitive' },
        { id: 'bai6', text: 'Tonto(a) ou com sensação de cabeça leve', category: 'physical' },
        { id: 'bai7', text: 'Coração batendo forte e rápido', category: 'physical', subscale: 'bai_physical' },
        { id: 'bai8', text: 'Inseguro(a)', category: 'psychological' },
        { id: 'bai9', text: 'Aterrorizado(a)', category: 'psychological' },
        { id: 'bai10', text: 'Nervoso(a)', category: 'psychological' },
        { id: 'bai11', text: 'Sensação de sufocamento', category: 'physical', subscale: 'bai_physical' },
        { id: 'bai12', text: 'Tremores nas mãos', category: 'physical' },
        { id: 'bai13', text: 'Trêmulo(a)', category: 'physical', subscale: 'bai_physical' },
        { id: 'bai14', text: 'Medo de perder o controle', category: 'cognitive' },
        { id: 'bai15', text: 'Dificuldade de respirar', category: 'physical', subscale: 'bai_physical' },
        { id: 'bai16', text: 'Medo de morrer', category: 'cognitive' },
        { id: 'bai17', text: 'Assustado(a)', category: 'psychological' },
        { id: 'bai18', text: 'Indigestão ou desconforto abdominal', category: 'physical' },
        { id: 'bai19', text: 'Desmaios', category: 'physical', subscale: 'bai_physical' },
        { id: 'bai20', text: 'Rosto afogueado/vermelho', category: 'physical' },
        { id: 'bai21', text: 'Suores frios ou quentes', category: 'physical', subscale: 'bai_physical' },

        // Additional comprehensive anxiety questions
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
      ]
    };
  }

  // PHQ-9 + Beck Depression Inventory Combined (42 questions)
  private createDepressionQuestionSet(): QuestionSet {
    return {
      id: 'depression-phq9-bdi',
      name: 'Transtorno Depressivo Maior',
      description: 'Avaliação abrangente de sintomas depressivos baseada em escalas clínicas validadas',
      scientificBasis: 'PHQ-9 (Patient Health Questionnaire-9) + Beck Depression Inventory (BDI-II) - Padrão ouro para screening de depressão',
      totalQuestions: 42,
      estimatedTime: 18,
      scoringAlgorithm: {
        type: 'sum',
        maxScore: 90, // PHQ-9: 27 + BDI-II: 63
        minScore: 0
      },
      subscales: [
        {
          id: 'phq9_core',
          name: 'Sintomas Centrais de Depressão (PHQ-9)',
          description: 'Critérios diagnósticos principais do DSM-5',
          questionIds: ['phq1', 'phq2', 'phq3', 'phq4', 'phq5', 'phq6', 'phq7', 'phq8', 'phq9'],
          interpretation: [
            { minScore: 0, maxScore: 4, level: 'minimal', description: 'Sintomas depressivos mínimos', recommendations: ['Manutenção de atividades prazerosas', 'Exercícios regulares'] },
            { minScore: 5, maxScore: 9, level: 'mild', description: 'Depressão leve', recommendations: ['Ativação comportamental', 'Terapia de apoio', 'Exercícios físicos'] },
            { minScore: 10, maxScore: 14, level: 'moderate', description: 'Depressão moderada', recommendations: ['Terapia cognitivo-comportamental', 'Avaliação psiquiátrica', 'Suporte social'] },
            { minScore: 15, maxScore: 19, level: 'severe', description: 'Depressão moderadamente severa', recommendations: ['Tratamento psiquiátrico', 'Terapia intensiva', 'Medicação antidepressiva'] },
            { minScore: 20, maxScore: 27, level: 'very_severe', description: 'Depressão severa', recommendations: ['Tratamento psiquiátrico urgente', 'Hospitalização se risco de suicídio', 'Medicação + psicoterapia'] }
          ]
        }
      ],
      questions: [
        // PHQ-9 Questions (Core depression symptoms)
        { id: 'phq1', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter pouco interesse ou prazer em fazer as coisas?', category: 'anhedonia' },
        { id: 'phq2', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir para baixo, deprimido(a) ou sem esperança?', category: 'depressed_mood' },
        { id: 'phq3', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter dificuldade para adormecer, continuar dormindo ou dormir demais?', category: 'sleep_disturbance' },
        { id: 'phq4', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir cansado(a) ou ter pouca energia?', category: 'fatigue' },
        { id: 'phq5', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter pouco apetite ou comer demais?', category: 'appetite_changes' },
        { id: 'phq6', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se sentir mal consigo mesmo(a) ou sentir que é um fracasso ou que decepcionou sua família ou você mesmo(a)?', category: 'worthlessness' },
        { id: 'phq7', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por ter dificuldade para se concentrar em coisas como ler jornal ou assistir televisão?', category: 'concentration' },
        { id: 'phq8', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por se mover ou falar tão devagar que outras pessoas notaram? Ou o oposto - estar tão agitado(a) ou inquieto(a) que você se move muito mais que o normal?', category: 'psychomotor' },
        { id: 'phq9', text: 'Nas últimas 2 semanas, com que frequência você foi incomodado(a) por pensamentos de que seria melhor estar morto(a) ou se ferir de alguma maneira?', category: 'suicidal_ideation' },

        // BDI-II Style Questions (Additional comprehensive assessment)
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
        { id: 'dep_add21', text: 'Tenho pensamentos de auto-crítica constantes', category: 'self_criticism' },
        { id: 'dep_add22', text: 'Sinto que não mereço ser feliz', category: 'unworthiness' },
        { id: 'dep_add23', text: 'A menor tarefa parece um grande esforço', category: 'effort' },
        { id: 'dep_add24', text: 'Sinto um vazio constante dentro de mim', category: 'emptiness' },
        { id: 'dep_add25', text: 'Tenho dificuldade para sentir amor pelos outros', category: 'emotional_connection' },
        { id: 'dep_add26', text: 'O mundo parece cinzento e sem cor', category: 'perception' },
        { id: 'dep_add27', text: 'Sinto que ninguém realmente me entende', category: 'isolation' },
        { id: 'dep_add28', text: 'Penso frequentemente em como tudo seria melhor sem mim', category: 'suicidal_thoughts' },
        { id: 'dep_add29', text: 'Tenho episódios de choro sem motivo aparente', category: 'crying_spells' },
        { id: 'dep_add30', text: 'Sinto que perdi minha identidade', category: 'identity_loss' },
        { id: 'dep_add31', text: 'Nada consegue me motivar ou animar', category: 'motivation_loss' },
        { id: 'dep_add32', text: 'Sinto-me fisicamente pesado(a) ou lento(a)', category: 'psychomotor_retardation' },
        { id: 'dep_add33', text: 'Tenho memórias constantes de falhas passadas', category: 'rumination' }
      ]
    };
  }

  // Continue with other question sets...
  private createADHDQuestionSet(): QuestionSet {
    // ASRS-1.1 + Comprehensive ADHD assessment (45 questions)
    return {
      id: 'adhd-asrs-comprehensive',
      name: 'Transtorno de Déficit de Atenção e Hiperatividade',
      description: 'Avaliação completa de sintomas de ADHD em adultos',
      scientificBasis: 'ASRS-1.1 (Adult ADHD Self-Report Scale) + DSM-5 Criteria - Organização Mundial da Saúde',
      totalQuestions: 45,
      estimatedTime: 20,
      scoringAlgorithm: {
        type: 'weighted',
        maxScore: 180,
        minScore: 0
      },
      questions: [
        // ASRS Part A (6 most predictive questions)
        { id: 'asrs1', text: 'Com que frequência você tem dificuldade para se concentrar em detalhes ou comete erros por descuido no trabalho ou em outras atividades?', category: 'inattention' },
        { id: 'asrs2', text: 'Com que frequência você tem dificuldade para manter a atenção em tarefas ou atividades?', category: 'inattention' },
        { id: 'asrs3', text: 'Com que frequência você tem dificuldade para se organizar em tarefas e atividades?', category: 'executive_function' },
        { id: 'asrs4', text: 'Com que frequência você deixa de fazer algo ou atrasa porque tem dificuldade para começar?', category: 'procrastination' },
        { id: 'asrs5', text: 'Com que frequência você se mexe ou se contorce quando tem que ficar sentado(a) por muito tempo?', category: 'hyperactivity' },
        { id: 'asrs6', text: 'Com que frequência você se sente muito ativo(a) e compelido(a) a fazer coisas, como se fosse "movido(a) a motor"?', category: 'hyperactivity' },

        // ASRS Part B (12 additional questions)
        { id: 'asrs7', text: 'Com que frequência você não escuta quando as pessoas falam diretamente com você?', category: 'inattention' },
        { id: 'asrs8', text: 'Com que frequência você não segue instruções até o fim e não termina o trabalho?', category: 'task_completion' },
        // ... Continue with all 45 questions for comprehensive ADHD assessment
      ]
    };
  }

  private createBipolarQuestionSet(): QuestionSet {
    // MDQ + HCL-32 based assessment (40 questions)
    return {
      id: 'bipolar-mdq-hcl32',
      name: 'Transtorno Bipolar',
      description: 'Screening para episódios de mania e hipomania',
      scientificBasis: 'Mood Disorder Questionnaire (MDQ) + Hypomania Checklist-32 (HCL-32)',
      totalQuestions: 40,
      estimatedTime: 15,
      scoringAlgorithm: {
        type: 'complex',
        maxScore: 100,
        minScore: 0
      },
      questions: [
        { id: 'mdq1', text: 'Houve algum período quando você não era o seu eu normal e se sentia tão bem ou eufórico que outras pessoas pensaram que você não estava normal?', category: 'euphoria' },
        { id: 'mdq2', text: 'Você já teve períodos quando estava tão irritável que gritava com pessoas ou começava brigas ou discussões?', category: 'irritability' },
        // ... Continue with bipolar-specific questions
      ]
    };
  }

  private createNarcissismQuestionSet(): QuestionSet {
    // NPI-40 (Narcissistic Personality Inventory)
    return {
      id: 'narcissism-npi40',
      name: 'Traços Narcisistas de Personalidade',
      description: 'Avaliação de características narcisistas da personalidade',
      scientificBasis: 'Narcissistic Personality Inventory-40 (NPI-40) - Raskin & Terry (1988)',
      totalQuestions: 40,
      estimatedTime: 12,
      scoringAlgorithm: {
        type: 'sum',
        maxScore: 40,
        minScore: 0
      },
      questions: [
        { id: 'npi1', text: 'Tenho um talento natural para influenciar pessoas', category: 'authority' },
        { id: 'npi2', text: 'A modestia não me combina', category: 'exhibitionism' },
        // ... Continue with NPI-40 questions
      ]
    };
  }

  private createMythomaniaQuestionSet(): QuestionSet {
    // Research-based pathological lying assessment
    return {
      id: 'mythomania-pathological-lying',
      name: 'Tendências à Mitomania',
      description: 'Avaliação de padrões de mentira patológica e distorção da realidade',
      scientificBasis: 'Baseado em pesquisas sobre mentira patológica (Dike et al., 2005; Yang et al., 2005)',
      totalQuestions: 35,
      estimatedTime: 12,
      scoringAlgorithm: {
        type: 'weighted',
        maxScore: 140,
        minScore: 0
      },
      questions: [
        { id: 'myth1', text: 'Frequentemente embeleko histórias para torná-las mais interessantes', category: 'embellishment' },
        { id: 'myth2', text: 'Às vezes invento experiências que nunca tive', category: 'fabrication' },
        // ... Continue with mythomania-specific questions
      ]
    };
  }
}