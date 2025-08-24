import React from 'react';

interface Results {
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <h1 className="text-2xl font-bold mb-2">
            Resultado da Triagem - {results.type.toUpperCase()}
          </h1>
          <p className="text-blue-100">
            Sessão: {results.sessionId}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className={`inline-flex items-center px-6 py-3 rounded-full border-2 ${riskColorClass}`}>
              <span className="text-2xl font-bold">
                Nível de Risco: {resultado.nivelRisco}
              </span>
            </div>
          </div>

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

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Recomendações
            </h3>
            <p className="text-blue-800 leading-relaxed">
              {resultado.recomendacoes}
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-yellow-400 mr-3">⚠️</div>
              <div>
                <h4 className="text-yellow-800 font-semibold">Importante</h4>
                <p className="text-yellow-700 text-sm mt-1">
                  Este resultado é apenas uma triagem inicial e não constitui um diagnóstico.
                  É fundamental buscar orientação de um profissional de saúde mental qualificado.
                </p>
              </div>
            </div>
          </div>

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
