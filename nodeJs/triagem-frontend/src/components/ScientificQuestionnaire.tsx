import React, { useState, useEffect, useCallback } from 'react';
import { ScientificScreeningService } from '../services/ScientificScreeningService';
import type { ScientificQuestion, QuestionMetadata } from '../services/ScientificScreeningService';

interface ScientificQuestionnaireProps {
  screeningType: string;
  onComplete: (result: any) => void;
  onError: (error: string) => void;
}

const ScientificQuestionnaire: React.FC<ScientificQuestionnaireProps> = ({
  screeningType,
  onComplete,
  onError
}) => {
  const [questions, setQuestions] = useState<ScientificQuestion[]>([]);
  const [metadata, setMetadata] = useState<QuestionMetadata | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);

  const service = new ScientificScreeningService();

  // Timer para tracking de tempo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // Inicializar questionário
  useEffect(() => {
    const initializeQuestionnaire = async () => {
      try {
        setLoading(true);
        
        console.log(`Initializing scientific questionnaire for: ${screeningType}`);
        
        // Buscar questões científicas e inicializar sessão em paralelo
        const [questionResult, sessionResult] = await Promise.all([
          service.getQuestions(screeningType),
          service.initializeSession(screeningType)
        ]);

        setQuestions(questionResult.questions);
        setMetadata(questionResult.metadata);
        setSessionData(sessionResult);
        
        console.log(`Loaded ${questionResult.questions.length} scientific questions`);
        console.log(`Session ${sessionResult.sessionId} initialized`);
      } catch (error: any) {
        console.error('Failed to initialize questionnaire:', error);
        onError(`Erro ao carregar questionário: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    initializeQuestionnaire();
  }, [screeningType, onError]);

  // Manipular resposta
  const handleResponse = useCallback((questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  }, []);

  // Navegar para próxima questão
  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  // Navegar para questão anterior
  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  // Pular para questão específica
  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  }, [questions.length]);

  // Finalizar questionário
  const submitQuestionnaire = async () => {
    try {
      setSubmitting(true);
      
      // Validar se todas as questões foram respondidas
      const unansweredQuestions = questions.filter(q => !(q.id in responses));
      if (unansweredQuestions.length > 0) {
        onError(`Por favor, responda todas as questões. Faltam: ${unansweredQuestions.length} questões.`);
        
        // Ir para a primeira questão não respondida
        const firstUnansweredIndex = questions.findIndex(q => !(q.id in responses));
        if (firstUnansweredIndex !== -1) {
          setCurrentQuestionIndex(firstUnansweredIndex);
        }
        return;
      }

      console.log(`Submitting ${Object.keys(responses).length} responses for ${screeningType}`);
      
      // Submit responses to backend
      const result = await service.submitResponses(sessionData.sessionId, responses, screeningType, timeSpent);
      
      // Enhanced result with additional frontend data
      const enhancedResult = {
        ...result,
        // Ensure all expected properties exist
        sessionId: result.sessionId || sessionData.sessionId,
        screeningType: result.tipo_triagem || screeningType,
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(responses).length,
        timeSpent,
        responses,
        timestamp: result.timestamp || new Date().toISOString(),
        
        // Scientific scoring (from backend)
        totalScore: result.totalScore || 0,
        maxScore: result.maxScore || (questions.length * 4),
        percentage: result.percentage || 0,
        riskLevel: result.riskLevel || 'Indeterminado',
        interpretation: result.interpretation || 'Análise não disponível',
        scientificBasis: result.scientificBasis || metadata?.scientificBasis || '',
        
        // Additional calculated fields
        averageScore: result.totalScore ? (result.totalScore / questions.length) : 0,
        completionRate: 100,
        
        // Fallback scoring if backend fails
        score: result.totalScore || Object.values(responses).reduce((sum, val) => sum + val, 0)
      };
      
      console.log('Questionnaire completed successfully');
      console.log('Results:', enhancedResult);
      onComplete(enhancedResult);
    } catch (error: any) {
      console.error('Error submitting questionnaire:', error);
      
      // Fallback: create local result if backend fails
      const fallbackResult = {
        sessionId: sessionData?.sessionId || `FALLBACK-${Date.now()}`,
        screeningType,
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(responses).length,
        timeSpent,
        responses,
        timestamp: new Date().toISOString(),
        
        // Local scoring
        totalScore: Object.values(responses).reduce((sum, val) => sum + val, 0),
        maxScore: questions.length * 4,
        score: Object.values(responses).reduce((sum, val) => sum + val, 0),
        averageScore: Object.values(responses).reduce((sum, val) => sum + val, 0) / Object.keys(responses).length,
        percentage: Math.round((Object.values(responses).reduce((sum, val) => sum + val, 0) / (questions.length * 4)) * 100),
        riskLevel: 'Análise Local',
        interpretation: 'Resultado calculado localmente devido a falha na conexão',
        scientificBasis: metadata?.scientificBasis || 'Local calculation',
        completionRate: 100,
        
        // Error info
        error: error.message,
        isLocalResult: true
      };
      
      console.log('Using fallback result due to submission error');
      onComplete(fallbackResult);
    } finally {
      setSubmitting(false);
    }
  };

  // Calcular progresso
  const getProgressPercentage = () => {
    return Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  };

  const getAnsweredPercentage = () => {
    return Math.round((Object.keys(responses).length / questions.length) * 100);
  };

  // Formatar tempo
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Obter título do screening
  const getScreeningTitle = (type: string) => {
    const titles: Record<string, string> = {
      anxiety: 'Transtorno de Ansiedade',
      depression: 'Transtorno Depressivo', 
      adhd: 'TDAH',
      bipolar: 'Transtorno Bipolar',
      narcisismo: 'Traços Narcisistas',
      mitomania: 'Tendências à Mitomania'
    };
    return titles[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Carregando Questionário Científico
          </h2>
          <p className="text-gray-600 mb-2">
            {getScreeningTitle(screeningType)}
          </p>
          <p className="text-sm text-blue-600">
            Preparando instrumentos científicos validados...
          </p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-lg">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Erro ao Carregar Questões
          </h2>
          <p className="text-gray-600 mb-6">
            Não foi possível carregar as questões científicas.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = currentQuestion.id in responses;
  const allQuestionsAnswered = Object.keys(responses).length === questions.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header com informações do questionário */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {getScreeningTitle(screeningType)}
              </h1>
              <p className="text-sm text-gray-600">
                {metadata?.description}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Base Científica: {metadata?.scientificBasis}
              </p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div>Tempo: {formatTime(timeSpent)}</div>
              <div>Estimado: {metadata?.estimatedTime} min</div>
              <div>Sessão: {sessionData?.sessionId}</div>
            </div>
          </div>
          
          {/* Barra de progresso principal */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Questão {currentQuestionIndex + 1} de {questions.length}</span>
              <span>{getProgressPercentage()}% navegado</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Barra de progresso de respostas */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{Object.keys(responses).length} de {questions.length} respondidas</span>
              <span>{getAnsweredPercentage()}% completo</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getAnsweredPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Questão atual */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {currentQuestion.category}
              </span>
              <span className="text-sm text-gray-500">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.text}
            </h2>

            {/* Escala Likert 0-4 */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 mb-4">
                Selecione a frequência que melhor descreve sua experiência:
              </p>
              
              {[
                { value: 0, label: 'Nunca (0)', description: 'Nunca ou quase nunca' },
                { value: 1, label: 'Raramente (1)', description: 'Alguns dias' },
                { value: 2, label: 'Às vezes (2)', description: 'Mais da metade dos dias' },
                { value: 3, label: 'Frequentemente (3)', description: 'Quase todos os dias' },
                { value: 4, label: 'Sempre (4)', description: 'Todos os dias' }
              ].map((option) => (
                <label 
                  key={option.value}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    responses[currentQuestion.id] === option.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option.value}
                    checked={responses[currentQuestion.id] === option.value}
                    onChange={() => handleResponse(currentQuestion.id, option.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                    responses[currentQuestion.id] === option.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {responses[currentQuestion.id] === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Navegação */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                currentQuestionIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ← Anterior
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">
                Progresso da Avaliação
              </div>
              <div className="text-lg font-bold text-gray-800">
                {Object.keys(responses).length}/{questions.length}
              </div>
            </div>

            {isLastQuestion && allQuestionsAnswered ? (
              <button
                onClick={submitQuestionnaire}
                disabled={submitting}
                className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all ${
                  submitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processando...
                  </>
                ) : (
                  '✓ Finalizar Avaliação'
                )}
              </button>
            ) : (
              <button
                onClick={goToNextQuestion}
                disabled={!canProceed}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                  canProceed
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Próxima →
              </button>
            )}
          </div>

          {/* Mini navegador de questões */}
          <div className="border-t pt-6">
            <p className="text-sm text-gray-600 mb-3">Navegação rápida:</p>
            <div className="grid grid-cols-10 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`w-8 h-8 text-xs rounded-full transition-all ${
                    index === currentQuestionIndex
                      ? 'bg-blue-600 text-white'
                      : questions[index].id in responses
                      ? 'bg-green-400 text-white hover:bg-green-500'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  title={`Questão ${index + 1}${questions[index].id in responses ? ' (respondida)' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificQuestionnaire;