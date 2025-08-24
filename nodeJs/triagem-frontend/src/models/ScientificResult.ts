// src/models/ScientificResult.ts
export interface ScientificResult {
  id: string;
  screeningType: string;
  timestamp: string;
  scientificBasis: string;
  responses: Response[];
  interpretation: Interpretation;
}

export interface Response {
  questionId: string;
  questionText: string;
  answer: number | string;
  subscale: string;
}

export interface Interpretation {
  score: number;
  maxScore: number;
  percentage: number;
  riskLevel: 'Baixo' | 'Moderado' | 'Alto' | 'Muito Alto';
  description: string;
  recommendations: string[];
  detailedAnalysis?: DetailedAnalysis;
}

export interface DetailedAnalysis {
  [key: string]: SubscaleAnalysis;
}

export interface SubscaleAnalysis {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: string;
  description: string;
  recommendations: string[];
}

// Tipos auxiliares para as análises específicas
export interface Analysis {
  anxiety?: number;
  depression?: number;
  adhd?: number;
  bipolar?: number;
  narcisismo?: number;
  mitomania?: number;
  recommendations?: Recommendation[];
}

export interface Recommendation {
  id: string;
  condition: string;
  description: string;
  priority: number;
  type: 'immediate' | 'short_term' | 'long_term';
}

// Type guard para verificar se um objeto é do tipo Analysis
export function isAnalysis(obj: unknown): obj is Analysis {
  return typeof obj === 'object' && obj !== null;
}

// Constante para labels de condições (resolver erro linha 355)
export const CONDITION_LABELS = {
  anxiety: 'Ansiedade',
  depression: 'Depressão',
  adhd: 'TDAH',
  bipolar: 'Bipolar',
  narcisismo: 'Narcisismo',
  mitomania: 'Mitomania'
} as const;

export type ConditionKey = keyof typeof CONDITION_LABELS;

// Função helper para acessar labels de forma segura
export const getConditionLabel = (key: string): string => {
  if (key in CONDITION_LABELS) {
    return CONDITION_LABELS[key as ConditionKey];
  }
  return 'Condição Desconhecida';
};