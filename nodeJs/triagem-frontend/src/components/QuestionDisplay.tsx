import React, { useState } from 'react';

interface QuestionDisplayProps {
  questionNumber: number;
  questionText: string;
  onAnswer: (value: number) => void;
  disabled?: boolean;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  questionNumber,
  questionText,
  onAnswer,
  disabled = false,
}) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleSelection = (value: number) => {
    if (disabled) return;
    setSelectedValue(value);
    onAnswer(value);
  };

  const options = [
    { value: 1, label: 'Nunca', color: 'bg-green-100 border-green-300 text-green-800' },
    { value: 2, label: 'Raramente', color: 'bg-blue-100 border-blue-300 text-blue-800' },
    { value: 3, label: 'Às vezes', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
    { value: 4, label: 'Frequentemente', color: 'bg-orange-100 border-orange-300 text-orange-800' },
    { value: 5, label: 'Sempre', color: 'bg-red-100 border-red-300 text-red-800' },
  ];

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

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            className={`
              w-full p-4 text-left rounded-lg border-2 transition-all duration-200
              ${selectedValue === option.value
                ? `${option.color} border-current`
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
                  ? 'border-current bg-current'
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

      {selectedValue && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            ✓ Resposta selecionada: {options.find(o => o.value === selectedValue)?.label}
          </p>
        </div>
      )}
    </div>
  );
};
