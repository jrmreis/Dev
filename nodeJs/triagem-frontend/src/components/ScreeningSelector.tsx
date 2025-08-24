// src/components/ScreeningSelector.tsx
import React from 'react';
import { ScreeningType } from '../types';

interface ScreeningSelectorProps {
  onSelectScreening: (type: string) => void;
  disabled?: boolean;
}

const SCREENING_TYPES: ScreeningType[] = [
  {
    id: 'anxiety',
    name: 'Triagem de Ansiedade',
    description: 'Avalia sintomas e padrões relacionados à ansiedade generalizada e social.',
    totalQuestions: 30,
    estimatedTime: '10-15 minutos',
    color: 'bg-blue-500',
    icon: '🧠',
  },
  {
    id: 'depression',
    name: 'Triagem de Depressão',
    description: 'Identifica sinais e sintomas relacionados a transtornos depressivos.',
    totalQuestions: 35,
    estimatedTime: '12-18 minutos',
    color: 'bg-purple-500',
    icon: '💙',
  },
  {
    id: 'adhd',
    name: 'Triagem de TDAH',
    description: 'Avalia sintomas de déficit de atenção e hiperatividade.',
    totalQuestions: 45,
    estimatedTime: '15-22 minutos',
    color: 'bg-orange-500',
    icon: '⚡',
  },
  {
    id: 'bipolar',
    name: 'Triagem Transtorno Bipolar',
    description: 'Identifica padrões de episódios maníacos e depressivos.',
    totalQuestions: 40,
    estimatedTime: '15-20 minutos',
    color: 'bg-green-500',
    icon: '🌊',
  },
  {
    id: 'narcisismo',
    name: 'Triagem de Narcisismo',
    description: 'Avalia traços e padrões narcisistas de personalidade.',
    totalQuestions: 42,
    estimatedTime: '12-18 minutos',
    color: 'bg-yellow-500',
    icon: '👑',
  },
  {
    id: 'mitomania',
    name: 'Triagem de Mitomania',
    description: 'Identifica padrões compulsivos de mentira e distorção da realidade.',
    totalQuestions: 55,
    estimatedTime: '18-25 minutos',
    color: 'bg-red-500',
    icon: '🎭',
  },
];

export const ScreeningSelector: React.FC<ScreeningSelectorProps> = ({
  onSelectScreening,
  disabled = false,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sistema de Triagem Psicológica
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Selecione o tipo de triagem que deseja realizar. Todas as avaliações são confidenciais
          e destinadas apenas para fins de triagem inicial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SCREENING_TYPES.map((screening) => (
          <div
            key={screening.id}
            className={`
              relative p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
            `}
            onClick={() => !disabled && onSelectScreening(screening.id)}
          >
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 ${screening.color} rounded-lg flex items-center justify-center text-white text-2xl mr-4`}>
                {screening.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {screening.name}
              </h3>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {screening.description}
            </p>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{screening.totalQuestions} questões</span>
              <span>{screening.estimatedTime}</span>
            </div>

            <button
              className={`
                mt-4 w-full py-2 px-4 rounded-md font-medium transition-colors duration-200
                ${disabled 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : `${screening.color} hover:opacity-90 text-white`
                }
              `}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) onSelectScreening(screening.id);
              }}
            >
              Iniciar Triagem
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="text-yellow-400 mr-3">⚠️</div>
          <div>
            <h4 className="text-yellow-800 font-semibold">Importante</h4>
            <p className="text-yellow-700 text-sm mt-1">
              Esta triagem não substitui uma avaliação profissional. Os resultados são indicativos
              e devem ser interpretados por um profissional de saúde mental qualificado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// src/components/ProgressIndicator.tsx
import React from 'react';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  timeElapsed?: string;
  screeningType?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
  timeElapsed,
  screeningType,
}) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-600">
          {screeningType && (
            <span className="capitalize font-medium">{screeningType} - </span>
          )}
          Questão {current} de {total}
        </div>
        {timeElapsed && (
          <div className="text-sm text-gray-500">
            Tempo: {timeElapsed}
          </div>
        )}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>{percentage.toFixed(1)}% concluído</span>
        <span>{total - current} restantes</span>
      </div>
    </div>
  );
};

// src/components/QuestionDisplay.tsx
import React, { useState } from 'react';
import { Question } from '../types';

interface QuestionDisplayProps {
  questionNumber: number;
  questionText: string;
  onAnswer: (value: number) => void;
  disabled?: boolean;
  type?: 'likert' | 'scale' | 'binary';
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  questionNumber,
  questionText,
  onAnswer,
  disabled = false,
  type = 'likert',
}) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleSelection = (value: number) => {
    if (disabled) return;
    setSelectedValue(value);
    onAnswer(value);
  };

  const renderLikertScale = () => {
    const options = [
      { value: 1, label: 'Nunca' },
      { value: 2, label: 'Raramente' },
      { value: 3, label: 'Às vezes' },
      { value: 4, label: 'Frequentemente' },
      { value: 5, label: 'Sempre' },
    ];

    return (
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            className={`
              w-full p-4 text-left rounded-lg border-2 transition-all duration-200
              ${selectedValue === option.value
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            onClick={() => handleSelection(option.value)}
            disabled={disabled}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option.label}</span>
              <div className={`
                w-6 h-6 rounded-full border-2 transition-all duration-200
                ${selectedValue === option.value
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
                }
              `}>
                {selectedValue === option.value && (
                  <div className="w-full h-full rounded-full bg-white scale-50" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderNumericScale = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>Discordo totalmente</span>
          <span>Concordo totalmente</span>
        </div>
        <div className="flex justify-between gap-2">
          {numbers.map((num) => (
            <button
              key={num}
              className={`
                w-12 h-12 rounded-full border-2 font-semibold transition-all duration-200
                ${selectedValue === num
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 hover:border-blue-300 text-gray-700'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              onClick={() => handleSelection(num)}
              disabled={disabled}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <div className="text-sm text-blue-600 font-medium mb-2">
          Questão {questionNumber}
        </div>
        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
          {questionText}
        </h2>
      </div>

      <div className="space-y-6">
        {type === 'likert' ? renderLikertScale() : renderNumericScale()}
      </div>

      {selectedValue && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            ✓ Resposta selecionada: {selectedValue}
          </p>
        </div>
      )}
    </div>
  );
};

// src/components/ResultsDisplay.tsx
import React from 'react';
import { Results } from '../types';

interface ResultsDisplayProps {
  results: Results;
  onRestart?: () => void;
  onDownload?: () => void;
}

const getRiskColor = (nivel: string) => {
  switch (nivel.toLowerCase()) {
    case 'baixo':
      return 'text-green-700 bg-green-100 border-green-300';
    case 'moderado':
      return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    case 'alto':
      return 'text-orange-700 bg-orange-100 border-orange-300';
    case 'crítico':
      return 'text-red-700 bg-red-100 border-red-300';
    default:
      return 'text-gray-700 bg-gray-100 border-gray-300';
  }
};

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  onRestart,
  onDownload,
}) => {
  const { resultado } = results;
  const riskColorClass = getRiskColor(resultado.nivelRisco);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">
            Resultado da Triagem - {results.type.toUpperCase()}
          </h1>
          <p className="text-blue-100">
            Sessão: {results.sessionId}
          </p>
        </div>

        {/* Results Content */}
        <div className="p-6 space-y-6">
          {/* Risk Level */}
          <div className="text-center">
            <div className={`inline-flex items-center px-6 py-3 rounded-full border-2 ${riskColorClass}`}>
              <span className="text-2xl font-bold">
                Nível de Risco: {resultado.nivelRisco}
              </span>
            </div>
          </div>

          {/* Score and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {resultado.pontuacaoGeral || 'N/A'}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Pontuação Geral
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600">
                {resultado.totalRespostas}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Respostas Dadas
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {formatDuration(resultado.duracaoSessao)}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Duração
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Recomendações
            </h3>
            <p className="text-blue-800 leading-relaxed">
              {resultado.recomendacoes}
            </p>
          </div>

          {/* Important Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-yellow-400 mr-3">⚠️</div>
              <div>
                <h4 className="text-yellow-800 font-semibold">Importante</h4>
                <p className="text-yellow-700 text-sm mt-1">
                  Este resultado é apenas uma triagem inicial e não constitui um diagnóstico.
                  É fundamental buscar orientação de um profissional de saúde mental qualificado
                  para uma avaliação completa e adequada.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            {onRestart && (
              <button
                onClick={onRestart}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Nova Triagem
              </button>
            )}
            
            {onDownload && (
              <button
                onClick={onDownload}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Baixar Resultado
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// src/components/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`} />
      {message && (
        <p className="mt-4 text-gray-600 text-center">{message}</p>
      )}
    </div>
  );
};

// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="max-w-2xl mx-auto p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-red-800 font-semibold text-lg mb-2">
                Ops! Algo deu errado
              </h2>
              <p className="text-red-700">
                Ocorreu um erro inesperado. Tente recarregar a página.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Recarregar Página
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}