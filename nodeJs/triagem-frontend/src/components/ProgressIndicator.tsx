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
