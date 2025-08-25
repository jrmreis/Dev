// repositories/QuestionRepository.ts
export interface Question {
  id: string;
  text: string;
  category: string;
  subscale?: string;
}

export interface Subscale {
  id: string;
  name: string;
  description: string;
  questionIds: string[];
  interpretation: {
    minScore: number;
    maxScore: number;
    level: string;
    description: string;
    recommendations: string[];
  }[];
}

export interface QuestionSet {
  id: string;
  name: string;
  description: string;
  scientificBasis: string;
  totalQuestions: number;
  estimatedTime: number;
  scoringAlgorithm: {
    type: string;
    maxScore: number;
    minScore: number;
  };
  subscales?: Subscale[];
  questions: Question[];
}

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
      ]
    };
  }

  // Complete ADHD Question Set (ASRS-1.1 + DSM-5 Based)
  private createADHDQuestionSet(): QuestionSet {
    return {
      id: 'adhd-asrs-comprehensive',
      name: 'Transtorno de Déficit de Atenção e Hiperatividade',
      description: 'Avaliação completa de sintomas de ADHD em adultos',
      scientificBasis: 'ASRS-1.1 (Adult ADHD Self-Report Scale) + DSM-5 Criteria - Organização Mundial da Saúde',
      totalQuestions: 36,
      estimatedTime: 20,
      scoringAlgorithm: {
        type: 'weighted',
        maxScore: 144,
        minScore: 0
      },
      subscales: [
        {
          id: 'inattention',
          name: 'Desatenção',
          description: 'Sintomas de dificuldade de atenção e concentração',
          questionIds: ['asrs1', 'asrs2', 'asrs7', 'asrs8', 'asrs9', 'asrs10', 'asrs11', 'asrs12', 'asrs13'],
          interpretation: [
            { minScore: 0, maxScore: 12, level: 'minimal', description: 'Sintomas mínimos de desatenção', recommendations: ['Técnicas de organização', 'Ambiente livre de distrações'] },
            { minScore: 13, maxScore: 24, level: 'moderate', description: 'Sintomas moderados de desatenção', recommendations: ['Avaliação neuropsicológica', 'Estratégias compensatórias'] },
            { minScore: 25, maxScore: 36, level: 'severe', description: 'Sintomas severos de desatenção', recommendations: ['Avaliação psiquiátrica especializada', 'Tratamento multimodal'] }
          ]
        },
        {
          id: 'hyperactivity_impulsivity',
          name: 'Hiperatividade/Impulsividade',
          description: 'Sintomas de agitação e impulsividade',
          questionIds: ['asrs5', 'asrs6', 'asrs14', 'asrs15', 'asrs16', 'asrs17', 'asrs18'],
          interpretation: [
            { minScore: 0, maxScore: 10, level: 'minimal', description: 'Sintomas mínimos de hiperatividade', recommendations: ['Atividade física regular'] },
            { minScore: 11, maxScore: 20, level: 'moderate', description: 'Sintomas moderados de hiperatividade', recommendations: ['Técnicas de autocontrole', 'Mindfulness'] },
            { minScore: 21, maxScore: 28, level: 'severe', description: 'Sintomas severos de hiperatividade', recommendations: ['Avaliação especializada', 'Tratamento comportamental'] }
          ]
        }
      ],
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
      ]
    };
  }

  // Complete Bipolar Question Set (MDQ + HCL-32 based)
  private createBipolarQuestionSet(): QuestionSet {
    return {
      id: 'bipolar-mdq-hcl32',
      name: 'Transtorno Bipolar',
      description: 'Screening para episódios de mania e hipomania',
      scientificBasis: 'Mood Disorder Questionnaire (MDQ) + Hypomania Checklist-32 (HCL-32)',
      totalQuestions: 35,
      estimatedTime: 15,
      scoringAlgorithm: {
        type: 'complex',
        maxScore: 140,
        minScore: 0
      },
      subscales: [
        {
          id: 'manic_episodes',
          name: 'Episódios Maníacos/Hipomaníacos',
          description: 'Sintomas de elevação do humor e energia',
          questionIds: ['mdq1', 'mdq2', 'mdq3', 'mdq4', 'mdq5', 'mdq6', 'mdq7', 'mdq8', 'mdq9', 'mdq10', 'mdq11', 'mdq12', 'mdq13'],
          interpretation: [
            { minScore: 0, maxScore: 6, level: 'unlikely', description: 'Episódios maníacos improváveis', recommendations: ['Monitoramento de humor regular'] },
            { minScore: 7, maxScore: 12, level: 'possible', description: 'Possíveis episódios hipomaníacos', recommendations: ['Avaliação psiquiátrica recomendada'] },
            { minScore: 13, maxScore: 52, level: 'probable', description: 'Episódios maníacos prováveis', recommendations: ['Avaliação psiquiátrica urgente', 'Tratamento especializado'] }
          ]
        }
      ],
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
      ]
    };
  }

  // Complete Narcissism Question Set (NPI-40 based)
  private createNarcissismQuestionSet(): QuestionSet {
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
      subscales: [
        {
          id: 'grandiosity',
          name: 'Grandiosidade',
          description: 'Senso inflado de auto-importância',
          questionIds: ['npi1', 'npi4', 'npi8', 'npi12', 'npi16', 'npi20', 'npi24', 'npi28'],
          interpretation: [
            { minScore: 0, maxScore: 2, level: 'low', description: 'Baixos traços de grandiosidade', recommendations: ['Manutenção de autoestima saudável'] },
            { minScore: 3, maxScore: 5, level: 'moderate', description: 'Traços moderados de grandiosidade', recommendations: ['Autorreflexão sobre relacionamentos'] },
            { minScore: 6, maxScore: 8, level: 'high', description: 'Altos traços de grandiosidade', recommendations: ['Avaliação psicológica recomendada'] }
          ]
        }
      ],
      questions: [
        // NPI-40 Complete Questions (Authority subscale)
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
      ]
    };
  }

  // Complete Mythomania Question Set
  private createMythomaniaQuestionSet(): QuestionSet {
    return {
      id: 'mythomania-pathological-lying',
      name: 'Tendências à Mitomania',
      description: 'Avaliação de padrões de mentira patológica e distorção da realidade',
      scientificBasis: 'Baseado em pesquisas sobre mentira patológica (Dike et al., 2005; Yang et al., 2005)',
      totalQuestions: 30,
      estimatedTime: 12,
      scoringAlgorithm: {
        type: 'weighted',
        maxScore: 120,
        minScore: 0
      },
      subscales: [
        {
          id: 'fabrication',
          name: 'Fabricação de Histórias',
          description: 'Tendência a criar narrativas falsas',
          questionIds: ['myth1', 'myth2', 'myth5', 'myth9', 'myth13', 'myth17'],
          interpretation: [
            { minScore: 0, maxScore: 8, level: 'minimal', description: 'Fabricação mínima', recommendations: ['Honestidade em relacionamentos'] },
            { minScore: 9, maxScore: 16, level: 'moderate', description: 'Fabricação moderada', recommendations: ['Autorreflexão sobre motivações'] },
            { minScore: 17, maxScore: 24, level: 'significant', description: 'Fabricação significativa', recommendations: ['Avaliação psicológica recomendada'] }
          ]
        }
      ],
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
      ]
    };
  }

  // Depression Question Set (Complete PHQ-9 + additional questions)
  private createDepressionQuestionSet(): QuestionSet {
    return {
      id: 'depression-phq9-comprehensive',
      name: 'Transtorno Depressivo Maior',
      description: 'Avaliação abrangente de sintomas depressivos baseada em escalas clínicas validadas',
      scientificBasis: 'PHQ-9 (Patient Health Questionnaire-9) + BDI-II criteria - Padrão ouro para screening de depressão',
      totalQuestions: 30,
      estimatedTime: 15,
      scoringAlgorithm: {
        type: 'sum',
        maxScore: 120,
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
      ]
    };
  }
}