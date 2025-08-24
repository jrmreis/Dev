function validateTriagemResponse(req, res, next) {
  const { questionId, response, subescale } = req.body;
  
  // Check required fields
  if (!questionId || response === undefined || !subescale) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      required: ['questionId', 'response', 'subescale']
    });
  }
  
  // Validate response type
  if (typeof response === 'number') {
    if (response < 0 || response > 10) {
      return res.status(400).json({
        success: false,
        error: 'Numeric response must be between 0 and 10'
      });
    }
  } else if (typeof response === 'string') {
    const validStringResponses = [
      'nunca', 'raramente', 'às vezes', 'frequentemente', 'sempre',
      'discordo totalmente', 'discordo', 'neutro', 'concordo', 'concordo totalmente',
      'não', 'talvez', 'sim'
    ];
    
    if (!validStringResponses.includes(response.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid string response',
        validOptions: validStringResponses
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      error: 'Response must be a number (0-10) or valid string option'
    });
  }
  
  // Validate subescale based on type
  const { type } = req.params;
  const validSubescales = {
    bipolar: [
      'mania', 'hipomania', 'depressao', 'ansiedade', 'irritabilidade', 
      'impulsividade', 'ciclosHumor', 'funcionamento'
    ],
    depression: [
      'humorDeprimido', 'perdasInteresse', 'alteracoesSono', 'alteracoesApetite',
      'fadiga', 'culpaInutilidade', 'concentracao', 'agitacaoRetardamento',
      'ideacaoSuicida', 'funcionamentoSocial'
    ],
    anxiety: [
      'preocupacaoExcessiva', 'inquietacao', 'fadiga', 'dificuldadeConcentracao',
      'irritabilidade', 'tensaoMuscular', 'disturbioSono', 'ataquesPanico',
      'evitacaoSocial', 'funcionamentoDiario'
    ],
    adhd: [
      'desatencao', 'hiperatividade', 'impulsividade', 'organizacao',
      'gestaoTempo', 'funcionamentoEscolar', 'funcionamentoTrabalho',
      'relacionamentosInterpessoais', 'autoestima', 'regulacaoEmocional'
    ],
    narcisismo: [
      'grandiosidade', 'necessidadeAdmiracao', 'faltaEmpatia', 'exploracaoOutros',
      'arrogancia', 'autoridade', 'autossuficiencia'
    ],
    mitomania: [
      'frequenciaMentiras', 'complexidadeMentiras', 'controleComportamento',
      'motivacaoMentir', 'conscienciaMentiras', 'impactoRelacoes',
      'diferenciacaoRealidade', 'padroesCompulsivos'
    ]
  };
  
  if (!validSubescales[type] || !validSubescales[type].includes(subescale)) {
    return res.status(400).json({
      success: false,
      error: `Invalid subescale for ${type}`,
      validSubescales: validSubescales[type]
    });
  }
  
  next();
}

module.exports = { validateTriagemResponse };