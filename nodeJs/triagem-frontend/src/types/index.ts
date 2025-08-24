export interface ScreeningType {
  id: 'depression' | 'anxiety' | 'adhd' | 'bipolar' | 'narcisismo' | 'mitomania';
  name: string;
  description: string;
  totalQuestions: number;
  estimatedTime: string;
  color: string;
  icon: string;
}

export interface SessionData {
  sessionId: string;
  type: string;
  totalQuestions: number;
  estimatedTime: string;
  notionUrl: string;
}

export interface QuestionResponse {
  questionId: number;
  response: number;
  subescale: string;
}

export interface ProgressData {
  sessionId: string;
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
  isComplete: boolean;
  nextStep: string;
}

export interface Results {
  sessionId: string;
  type: string;
  resultado: {
    pontuacaoGeral: number | null;
    nivelRisco: 'Baixo' | 'Moderado' | 'Alto' | 'Crítico';
    duracaoSessao: number;
    totalRespostas: number;
    recomendacoes: string;
  };
}
