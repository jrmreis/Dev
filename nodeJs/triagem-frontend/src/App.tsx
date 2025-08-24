// src/App.tsx - Versão corrigida com tipagem adequada
import React, { useState } from 'react';
import ScientificQuestionnaire from './components/ScientificQuestionnaire';
import ScientificResults from './components/ScientificResults';
import type { 
  ScientificResult, 
  Analysis, 
  Recommendation
} from './models/ScientificResult';
import { getConditionLabel } from './models/ScientificResult';

interface ScreeningOption {
  id: string;
  title: string;
  description: string;
  scientificBasis: string;
  estimatedTime: number;
  totalQuestions: number;
  icon: string;
  color: string;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'questionnaire' | 'results'>('home');
  const [selectedScreening, setSelectedScreening] = useState<string>('');
  const [result, setResult] = useState<ScientificResult | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const screeningOptions: ScreeningOption[] = [
    {
      id: 'anxiety',
      title: 'Transtorno de Ansiedade',
      description: 'Avaliação abrangente de sintomas de ansiedade generalizada, fobias e ataques de pânico',
      scientificBasis: 'GAD-7 + Beck Anxiety Inventory + DSM-5 Criteria',
      estimatedTime: 18,
      totalQuestions: 45,
      icon: '😰',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'depression',
      title: 'Transtorno Depressivo',
      description: 'Avaliação completa de sintomas depressivos e episódios de humor baixo',
      scientificBasis: 'PHQ-9 + Beck Depression Inventory + DSM-5 Criteria',
      estimatedTime: 18,
      totalQuestions: 42,
      icon: '😔',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'adhd',
      title: 'TDAH - Déficit de Atenção',
      description: 'Avaliação de sintomas de desatenção, hiperatividade e impulsividade em adultos',
      scientificBasis: 'ASRS-1.1 WHO + DSM-5 ADHD Criteria',
      estimatedTime: 18,
      totalQuestions: 40,
      icon: '🧠',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'bipolar',
      title: 'Transtorno Bipolar',
      description: 'Screening para episódios de mania, hipomania e mudanças extremas de humor',
      scientificBasis: 'Mood Disorder Questionnaire + HCL-32',
      estimatedTime: 15,
      totalQuestions: 35,
      icon: '🎭',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'narcisismo',
      title: 'Traços Narcisistas',
      description: 'Avaliação de características narcisistas de personalidade',
      scientificBasis: 'Narcissistic Personality Inventory-40 (NPI-40)',
      estimatedTime: 12,
      totalQuestions: 40,
      icon: '👑',
      color: 'from-pink-400 to-red-500'
    },
    {
      id: 'mitomania',
      title: 'Tendências à Mitomania',
      description: 'Avaliação de padrões de mentira patológica e distorção da realidade',
      scientificBasis: 'Pathological Lying Research (Dike et al., 2005)',
      estimatedTime: 12,
      totalQuestions: 35,
      icon: '🎪',
      color: 'from-indigo-400 to-purple-500'
    }
  ];

  const handleScreeningSelect = (screeningId: string) => {
    setSelectedScreening(screeningId);
    setCurrentView('questionnaire');
    setError('');
  };

  const handleQuestionnaireComplete = (completedResult: ScientificResult) => {
    setResult(completedResult);
    setCurrentView('results');
  };

  const handleQuestionnaireError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleNewScreening = () => {
    setCurrentView('home');
    setSelectedScreening('');
    setResult(null);
    setSessionId('');
    setError('');
  };

  const handleDownloadReport = () => {
    if (!result) return;
    
    const reportContent = generateReportContent(result, sessionId);
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio-triagem-${result.screeningType}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (currentView === 'questionnaire') {
    return (
      <div className="min-h-screen bg-gray-50">
        <ScientificQuestionnaire
          screeningType={selectedScreening}
          onComplete={handleQuestionnaireComplete}
          onError={handleQuestionnaireError}
        />
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
            <strong className="font-bold">Erro: </strong>
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={() => setError('')}
              className="float-right ml-4 font-bold"
            >
              ×
            </button>
          </div>
        )}
      </div>
    );
  }

  if (currentView === 'results' && result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ScientificResults
          result={result}
          sessionId={sessionId}
          onNewScreening={handleNewScreening}
          onDownloadReport={handleDownloadReport}
        />
      </div>
    );
  }

  // Rest of the component remains the same...
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Sistema de Triagem Psicológica Científica
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Avaliações baseadas em instrumentos científicos validados
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Instrumentos Validados
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Base Científica
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Análise Detalhada
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Triagem Científica de Saúde Mental
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Nossa plataforma utiliza instrumentos psicológicos cientificamente validados para fornecer 
              uma avaliação inicial abrangente. Cada questionário é baseado em escalas reconhecidas 
              internacionalmente e critérios diagnósticos estabelecidos, oferecendo resultados confiáveis 
              e recomendações personalizadas.
            </p>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>⚠️ Importante:</strong> Esta é uma triagem inicial e não substitui uma avaliação 
                profissional completa. Os resultados devem ser discutidos com um profissional de saúde mental qualificado.
              </p>
            </div>
          </div>
        </div>

        {/* Screening Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screeningOptions.map((option) => (
            <div
              key={option.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              onClick={() => handleScreeningSelect(option.id)}
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${option.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{option.icon}</span>
                  <div className="text-right">
                    <div className="text-sm opacity-90">{option.totalQuestions} questões</div>
                    <div className="text-sm opacity-90">{option.estimatedTime} min</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {option.description}
                </p>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Base Científica:</div>
                  <div className="text-sm text-blue-600 font-medium">
                    {option.scientificBasis}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>📊 Análise detalhada</span>
                  <span>📄 Relatório completo</span>
                </div>

                {/* Call to Action */}
                <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                  Iniciar Avaliação →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Características do Sistema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Scientificamente Validado</h4>
              <p className="text-gray-600">
                Utiliza instrumentos reconhecidos internacionalmente como GAD-7, PHQ-9, ASRS-1.1 e outros.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Análise Detalhada</h4>
              <p className="text-gray-600">
                Fornece pontuações por subescalas e interpretações específicas para cada domínio avaliado.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Recomendações Personalizadas</h4>
              <p className="text-gray-600">
                Oferece sugestões específicas baseadas nos resultados e níveis de risco identificados.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Como Funciona</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <p className="text-gray-600">Selecione o tipo de triagem que deseja realizar</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <p className="text-gray-600">Responda às questões baseadas em escalas científicas</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <p className="text-gray-600">Receba resultados detalhados com recomendações personalizadas</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <p className="text-gray-600">Baixe o relatório completo e busque orientação profissional se necessário</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">Quando Buscar Ajuda Profissional</h4>
              <div className="space-y-2 text-gray-600">
                <p>• Sintomas persistem por mais de duas semanas</p>
                <p>• Interferem no trabalho, relacionamentos ou atividades diárias</p>
                <p>• Causam sofrimento significativo</p>
                <p>• Há pensamentos de autolesão ou suicídio</p>
                <p>• Uso de substâncias para lidar com sintomas</p>
              </div>
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-red-800 text-sm">
                  <strong>Emergência:</strong> Se você está em crise, ligue 188 (CVV) ou procure ajuda imediatamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

function generateReportContent(result: ScientificResult, sessionId: string): string {
  const getScreeningTitle = (type: string): string => {
    const titles: Record<string, string> = {
      'anxiety': 'Transtorno de Ansiedade',
      'depression': 'Transtorno Depressivo',
      'adhd': 'Transtorno de Déficit de Atenção e Hiperatividade',
      'bipolar': 'Transtorno Bipolar',
      'narcisismo': 'Traços Narcisistas de Personalidade',
      'mitomania': 'Tendências à Mitomania'
    };
    return titles[type] || type;
  };

  let report = `RELATÓRIO DE TRIAGEM PSICOLÓGICA CIENTÍFICA
=====================================

INFORMAÇÕES DA SESSÃO
-------------------
Tipo de Triagem: ${getScreeningTitle(result.screeningType)}
ID da Sessão: ${sessionId}
Data e Hora: ${new Date(result.timestamp).toLocaleString('pt-BR')}
Base Científica: ${result.scientificBasis}

RESULTADOS GERAIS
---------------
Pontuação Total: ${result.interpretation.score} de ${result.interpretation.maxScore} (${result.interpretation.percentage}%)
Nível de Risco: ${result.interpretation.riskLevel}
Interpretação: ${result.interpretation.description}

ANÁLISE DETALHADA POR SUBESCALAS
------------------------------
`;

  if (result.interpretation.detailedAnalysis) {
    Object.entries(result.interpretation.detailedAnalysis).forEach(([id, analysis]) => {
      report += `
${analysis.name}:
  - Pontuação: ${analysis.score}
  - Nível: ${analysis.level}
  - Descrição: ${analysis.description}
  - Recomendações Específicas:
`;
      analysis.recommendations.forEach(rec => {
        report += `    • ${rec}\n`;
      });
    });
  }

  report += `
RECOMENDAÇÕES GERAIS
------------------
`;
  result.interpretation.recommendations.forEach(rec => {
    report += `• ${rec}\n`;
  });

  report += `
DISCLAIMER IMPORTANTE
-------------------
Este resultado é baseado em uma triagem inicial utilizando instrumentos científicos validados.
Não constitui um diagnóstico médico ou psicológico.
É fundamental buscar orientação de um profissional de saúde mental qualificado para uma 
avaliação completa e adequada.

Se você está enfrentando uma crise ou tendo pensamentos de autolesão, procure ajuda 
imediatamente:
- CVV (Centro de Valorização da Vida): 188 (24h, gratuito)
- SAMU: 192
- Emergência: 193

Este relatório foi gerado pelo Sistema de Triagem Psicológica Científica.
Data de geração: ${new Date().toLocaleString('pt-BR')}
`;

  return report;
}

export default App;