// types/Question.ts
export interface Question {
  id: string;
  text: string;
  category?: string;
  subscale?: string;
  reverseScored?: boolean;
  weight?: number;
}

export interface QuestionSet {
  id: string;
  name: string;
  description: string;
  scientificBasis: string;
  totalQuestions: number;
  estimatedTime: number;
  questions: Question[];
  subscales?: Subscale[];
  scoringAlgorithm: ScoringAlgorithm;
}

export interface Subscale {
  id: string;
  name: string;
  description: string;
  questionIds: string[];
  interpretation: ScoreInterpretation[];
}

export interface ScoringAlgorithm {
  type: 'sum' | 'average' | 'weighted' | 'complex';
  formula?: string;
  maxScore: number;
  minScore: number;
}

export interface ScoreInterpretation {
  minScore: number;
  maxScore: number;
  level: 'minimal' | 'mild' | 'moderate' | 'severe' | 'very_severe';
  description: string;
  recommendations: string[];
}
