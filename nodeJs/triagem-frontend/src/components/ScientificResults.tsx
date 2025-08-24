import React from 'react';

interface ScientificResultsProps {
  result: any;
  sessionId: string;
  onNewScreening: () => void;
  onDownloadReport: () => void;
}

const ScientificResults: React.FC<ScientificResultsProps> = ({
  result,
  sessionId,
  onNewScreening,
  onDownloadReport
}) => {
  const getScreeningTitle = (type: string) => {
    const titles = {
      anxiety: 'Transtorno de Ansiedade',
      depression: 'Transtorno Depressivo',
      adhd: 'TDAH',
      bipolar: 'Transtorno Bipolar',
      narcisismo: 'Traços Narcisistas',
      mitomania: 'Tendências à Mitomania'
    };
    return titles[type] || type;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getRiskLevel = (averageScore: number) => {
    if (averageScore <= 1) return { level: 'Baixo', color: 'green', description: 'Sintomas mínimos' };
    if (averageScore <= 2) return { level: 'Leve', color: 'yellow', description: 'Sintomas leves' };
    if (averageScore <= 3) return { level: 'Moderado', color: 'orange', description: 'Sintomas moderados' };
    return { level: 'Alto', color: 'red', description: 'Sintomas severos' };
  };

  const risk = getRiskLevel(result.averageScore);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Resultado da Triagem - {getScreeningTitle(result.screeningType)}
              </h1>
              <p className="text-blue-100 mb-4">
                Sessão: {result.sessionId} • Realizada em: {new Date(result.timestamp).toLocaleString('pt-BR')}
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">{result.totalScore}</div>
                  <div className="text-sm text-blue-100">Pontuação Total</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">{result.averageScore.toFixed(1)}</div>
                  <div className="text-sm text-blue-100">Média</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold">{formatTime(result.timeSpent)}</div>
                  <div className="text-sm text-blue-100">Tempo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Análise de Risco */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Nível de Risco</h3>
            <div className={`p-6 rounded-lg border-2 bg-${risk.color}-50 border-${risk.color}-200`}>
              <div className={`text-3xl font-bold text-${risk.color}-700 mb-2`}>
                {risk.level}
              </div>
              <p className={`text-${risk.color}-600`}>{risk.description}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Estatísticas</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total de Questões:</span>
                <span className="font-semibold">{result.totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Questões Respondidas:</span>
                <span className="font-semibold">{result.answeredQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxa de Conclusão:</span>
                <span className="font-semibold">
                  {Math.round((result.answeredQuestions / result.totalQuestions) * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tempo Gasto:</span>
                <span className="font-semibold">{formatTime(result.timeSpent)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Distribuição de Respostas */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Distribuição das Respostas</h3>
          <div className="grid grid-cols-5 gap-4">
            {[0, 1, 2, 3, 4].map(value => {
              const count = Object.values(result.responses).filter(r => r === value).length;
              const percentage = Math.round((count / result.answeredQuestions) * 100);
              
              return (
                <div key={value} className="text-center">
                  <div className="bg-blue-100 rounded-lg p-4 mb-2">
                    <div className="text-2xl font-bold text-blue-600">{count}</div>
                    <div className="text-sm text-blue-600">{percentage}%</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Nível {value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recomendações */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="text-2xl mr-3">💡</span>
            Recomendações Baseadas no Resultado
          </h3>
          
          <div className="space-y-4">
            {risk.level === 'Baixo' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Manutenção e Prevenção</h4>
                <ul className="text-green-800 space-y-1">
                  <li>• Continue mantendo hábitos saudáveis de vida</li>
                  <li>• Pratique exercícios físicos regulares</li>
                  <li>• Mantenha uma rotina de sono adequada</li>
                  <li>• Cultive relacionamentos sociais positivos</li>
                </ul>
              </div>
            )}

            {risk.level === 'Leve' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">Estratégias de Enfrentamento</h4>
                <ul className="text-yellow-800 space-y-1">
                  <li>• Implemente técnicas de gerenciamento de estresse</li>
                  <li>• Considere práticas de mindfulness ou meditação</li>
                  <li>• Mantenha um diário de humor</li>
                  <li>• Busque atividades prazerosas regularmente</li>
                </ul>
              </div>
            )}

            {(risk.level === 'Moderado' || risk.level === 'Alto') && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">Buscar Ajuda Profissional</h4>
                <ul className="text-red-800 space-y-1">
                  <li>• Agende uma consulta com psicólogo ou psiquiatra</li>
                  <li>• Considere iniciar psicoterapia</li>
                  <li>• Informe pessoas próximas sobre como você está se sentindo</li>
                  <li>• Evite decisões importantes até se sentir melhor</li>
                  {risk.level === 'Alto' && (
                    <li>• <strong>Procure ajuda profissional urgente</strong></li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="text-yellow-600 text-2xl mr-3">⚠️</div>
            <div>
              <h4 className="font-semibold text-yellow-900 mb-2">Importante</h4>
              <p className="text-yellow-800">
                Este resultado é baseado em uma triagem inicial utilizando instrumentos científicos validados.
                Não constitui um diagnóstico médico ou psicológico. É fundamental buscar orientação de um 
                profissional de saúde mental qualificado para uma avaliação completa e adequada.
              </p>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex justify-between items-center">
          <div className="space-x-4">
            <button
              onClick={onDownloadReport}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <span className="mr-2">📄</span>
              Baixar Relatório
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Resultado da Triagem de Saúde Mental',
                    text: `Resultado: ${risk.level} - ${risk.description}`,
                    url: window.location.href
                  });
                }
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <span className="mr-2">📤</span>
              Compartilhar
            </button>
          </div>
          <button
            onClick={onNewScreening}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Nova Triagem
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScientificResults;
