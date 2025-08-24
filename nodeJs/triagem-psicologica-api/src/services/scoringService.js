/**
 * 🧮 Scoring Service - Algoritmos de Pontuação e Análise
 * Calcula scores e níveis de risco para cada tipo de triagem
 */

const logger = require('../utils/logger');

class ScoringService {
  constructor() {
    // Thresholds de risco configuráveis
    this.riskThresholds = {
      low: parseInt(process.env.RISK_LOW_THRESHOLD) || 30,
      moderate: parseInt(process.env.RISK_MODERATE_THRESHOLD) || 50,
      high: parseInt(process.env.RISK_HIGH_THRESHOLD) || 70,
      critical: parseInt(process.env.RISK_CRITICAL_THRESHOLD) || 85
    };

    // Multiplicadores de score por tipo
    this.scoreMultipliers = {
      bipolar: parseFloat(process.env.BIPOLAR_SCORE_MULTIPLIER) || 2.5,
      narcisismo: parseFloat(process.env.NARCISISMO_SCORE_MULTIPLIER) || 2.38,
      mitomania: parseFloat(process.env.MITOMANIA_SCORE_MULTIPLIER) || 1.82
    };
  }

  /**
   * 🔴 ALGORITMO DE SCORING - TRANSTORNO BIPOLAR
   * 8 subescalas, 40+ perguntas
   */
  calculateBipolarScore(responses) {
    try {
      const subescales = {
        mania: this.calculateSubescale(responses.mania || [], 'mania'),
        hipomania: this.calculateSubescale(responses.hipomania || [], 'hipomania'),
        depressao: this.calculateSubescale(responses.depressao || [], 'depressao'),
        ansiedade: this.calculateSubescale(responses.ansiedade || [], 'ansiedade'),
        irritabilidade: this.calculateSubescale(responses.irritabilidade || [], 'irritabilidade'),
        impulsividade: this.calculateSubescale(responses.impulsividade || [], 'impulsividade'),
        ciclosHumor: this.calculateSubescale(responses.ciclosHumor || [], 'ciclos_humor'),
        funcionamento: this.calculateSubescale(responses.funcionamento || [], 'funcionamento')
      };

      // Pesos específicos para transtorno bipolar
      const weights = {
        mania: 0.20,          // 20% - Sintomas mais graves
        hipomania: 0.15,      // 15% - Episódios menos intensos
        depressao: 0.18,      // 18% - Componente depressivo
        ansiedade: 0.10,      // 10% - Comorbidade comum
        irritabilidade: 0.12, // 12% - Sintoma transversal
        impulsividade: 0.10,  // 10% - Comportamento de risco
        ciclosHumor: 0.10,    // 10% - Padrão cíclico
        funcionamento: 0.05   // 5% - Impacto funcional
      };

      // Calcula score ponderado
      const weightedScore = Object.keys(subescales).reduce((total, key) => {
        return total + (subescales[key] * weights[key]);
      }, 0);

      const finalScore = Math.round(weightedScore * this.scoreMultipliers.bipolar);
      const riskLevel = this.determineRiskLevel(finalScore);
      const recommendations = this.generateBipolarRecommendations(subescales, riskLevel);

      logger.info(`🔴 Score Bipolar calculado: ${finalScore} (${riskLevel})`);

      return {
        pontuacaoGeral: finalScore,
        nivelRisco: riskLevel,
        subescalas: subescales,
        recomendacoes: recommendations,
        detalhes: {
          scoresPorSubescala: subescales,
          pesosUtilizados: weights,
          multiplicador: this.scoreMultipliers.bipolar
        }
      };

    } catch (error) {
      logger.error('❌ Erro no cálculo de score bipolar:', error);
      throw new Error('Falha no cálculo de pontuação bipolar');
    }
  }

  /**
   * 🟡 ALGORITMO DE SCORING - NARCISISMO
   * 7 subescalas, 42 perguntas
   */
  calculateNarcisismoScore(responses) {
    try {
      const subescales = {
        grandiosidade: this.calculateSubescale(responses.grandiosidade || [], 'grandiosidade'),
        necessidadeAdmiracao: this.calculateSubescale(responses.necessidadeAdmiracao || [], 'admiracao'),
        faltaEmpatia: this.calculateSubescale(responses.faltaEmpatia || [], 'empatia'),
        exploracaoOutros: this.calculateSubescale(responses.exploracaoOutros || [], 'exploracao'),
        arrogancia: this.calculateSubescale(responses.arrogancia || [], 'arrogancia'),
        autoridade: this.calculateSubescale(responses.autoridade || [], 'autoridade'),
        autossuficiencia: this.calculateSubescale(responses.autossuficiencia || [], 'autossuficiencia')
      };

      // Pesos específicos para narcisismo
      const weights = {
        grandiosidade: 0.18,        // 18% - Núcleo do narcisismo
        necessidadeAdmiracao: 0.16, // 16% - Busca por validação
        faltaEmpatia: 0.15,         // 15% - Déficit empático
        exploracaoOutros: 0.14,     // 14% - Exploração interpessoal
        arrogancia: 0.13,           // 13% - Atitude superior
        autoridade: 0.12,           // 12% - Desejo de controle
        autossuficiencia: 0.12      // 12% - Independência excessiva
      };

      const weightedScore = Object.keys(subescales).reduce((total, key) => {
        return total + (subescales[key] * weights[key]);
      }, 0);

      const finalScore = Math.round(weightedScore * this.scoreMultipliers.narcisismo);
      const riskLevel = this.determineRiskLevel(finalScore);
      const recommendations = this.generateNarcisismoRecommendations(subescales, riskLevel);

      logger.info(`🟡 Score Narcisismo calculado: ${finalScore} (${riskLevel})`);

      return {
        pontuacaoGeral: finalScore,
        nivelRisco: riskLevel,
        subescalas: subescales,
        recomendacoes: recommendations,
        detalhes: {
          scoresPorSubescala: subescales,
          pesosUtilizados: weights,
          multiplicador: this.scoreMultipliers.narcisismo
        }
      };

    } catch (error) {
      logger.error('❌ Erro no cálculo de score narcisismo:', error);
      throw new Error('Falha no cálculo de pontuação narcisismo');
    }
  }

  /**
   * 🟢 ALGORITMO DE SCORING - MITOMANIA
   * 8 subescalas, 55+ perguntas
   */
  calculateMitomaniaScore(responses) {
    try {
      const subescales = {
        frequenciaMentiras: this.calculateSubescale(responses.frequenciaMentiras || [], 'frequencia'),
        complexidadeMentiras: this.calculateSubescale(responses.complexidadeMentiras || [], 'complexidade'),
        controleComportamento: this.calculateSubescale(responses.controleComportamento || [], 'controle'),
        motivacaoMentir: this.calculateSubescale(responses.motivacaoMentir || [], 'motivacao'),
        conscienciaMentiras: this.calculateSubescale(responses.conscienciaMentiras || [], 'consciencia'),
        impactoRelacoes: this.calculateSubescale(responses.impactoRelacoes || [], 'relacoes'),
        diferenciacaoRealidade: this.calculateSubescale(responses.diferenciacaoRealidade || [], 'realidade'),
        padroesCompulsivos: this.calculateSubescale(responses.padroesCompulsivos || [], 'compulsivos')
      };

      // Pesos específicos para mitomania
      const weights = {
        frequenciaMentiras: 0.16,       // 16% - Frequência do comportamento
        complexidadeMentiras: 0.14,     // 14% - Elaboração das mentiras
        controleComportamento: 0.15,    // 15% - Capacidade de controle
        motivacaoMentir: 0.13,          // 13% - Razões subjacentes
        conscienciaMentiras: 0.12,      // 12% - Autoconsciência
        impactoRelacoes: 0.13,          // 13% - Consequências sociais
        diferenciacaoRealidade: 0.10,   // 10% - Distinção realidade/fantasia
        padroesCompulsivos: 0.07        // 7% - Aspectos compulsivos
      };

      const weightedScore = Object.keys(subescales).reduce((total, key) => {
        return total + (subescales[key] * weights[key]);
      }, 0);

      const finalScore = Math.round(weightedScore * this.scoreMultipliers.mitomania);
      const riskLevel = this.determineRiskLevel(finalScore);
      const recommendations = this.generateMitomaniaRecommendations(subescales, riskLevel);

      logger.info(`🟢 Score Mitomania calculado: ${finalScore} (${riskLevel})`);

      return {
        pontuacaoGeral: finalScore,
        nivelRisco: riskLevel,
        subescalas: subescales,
        recomendacoes: recommendations,
        detalhes: {
          scoresPorSubescala: subescales,
          pesosUtilizados: weights,
          multiplicador: this.scoreMultipliers.mitomania
        }
      };

    } catch (error) {
      logger.error('❌ Erro no cálculo de score mitomania:', error);
      throw new Error('Falha no cálculo de pontuação mitomania');
    }
  }

  /**
   * 📊 Calcula score de uma subescala específica
   */
  calculateSubescale(responses, type) {
    if (!responses || responses.length === 0) return 0;

    // Normaliza respostas para escala 0-10
    const normalizedResponses = responses.map(response => {
      if (typeof response === 'number') {
        return Math.max(0, Math.min(10, response));
      }
      // Se for string, converte escalas comuns
      if (typeof response === 'string') {
        const scaleMappings = {
          'nunca': 0, 'raramente': 2.5, 'às vezes': 5, 'frequentemente': 7.5, 'sempre': 10,
          'discordo totalmente': 0, 'discordo': 2.5, 'neutro': 5, 'concordo': 7.5, 'concordo totalmente': 10,
          'não': 0, 'talvez': 5, 'sim': 10
        };
        return scaleMappings[response.toLowerCase()] || 5;
      }
      return 5; // Default neutral
    });

    // Calcula média ponderada
    const sum = normalizedResponses.reduce((acc, val) => acc + val, 0);
    const average = sum / normalizedResponses.length;

    // Aplica fatores de correção por tipo de subescala
    const correctionFactors = {
      'mania': 1.1, 'hipomania': 0.9, 'depressao': 1.0,
      'grandiosidade': 1.0, 'empatia': 0.95, 'exploracao': 1.05,
      'frequencia': 1.1, 'complexidade': 0.9, 'controle': 1.0
    };

    const factor = correctionFactors[type] || 1.0;
    return Math.round(average * factor * 10) / 10; // Uma casa decimal
  }

  /**
   * ⚠️ Determina nível de risco baseado na pontuação
   */
  determineRiskLevel(score) {
    if (score < this.riskThresholds.low) return 'Baixo';
    if (score < this.riskThresholds.moderate) return 'Moderado';
    if (score < this.riskThresholds.high) return 'Alto';
    return 'Crítico';
  }

  /**
   * 💡 Gera recomendações para Transtorno Bipolar
   */
  generateBipolarRecommendations(subescales, riskLevel) {
    const recommendations = [];
    
    if (riskLevel === 'Crítico') {
      recommendations.push('🚨 URGENTE: Busque ajuda psiquiátrica imediatamente');
      recommendations.push('📞 Entre em contato com profissional de saúde mental');
    }
    
    if (subescales.mania > 7) {
      recommendations.push('⚠️ Sinais de mania detectados - avaliação especializada recomendada');
    }
    
    if (subescales.depressao > 6) {
      recommendations.push('💙 Componente depressivo identificado - apoio terapêutico indicado');
    }
    
    if (subescales.funcionamento > 5) {
      recommendations.push('🏥 Prejuízo funcional detectado - acompanhamento multidisciplinar');
    }
    
    recommendations.push('📚 Educação sobre transtorno bipolar e estratégias de manejo');
    recommendations.push('👥 Considere grupos de apoio e rede de suporte social');
    
    return recommendations.join(' | ');
  }

  /**
   * 💡 Gera recomendações para Narcisismo
   */
  generateNarcisismoRecommendations(subescales, riskLevel) {
    const recommendations = [];
    
    if (riskLevel === 'Crítico') {
      recommendations.push('🚨 Traços narcisísticos intensos - avaliação psicológica especializada');
    }
    
    if (subescales.faltaEmpatia > 7) {
      recommendations.push('💝 Trabalho em desenvolvimento da empatia recomendado');
    }
    
    if (subescales.exploracaoOutros > 6) {
      recommendations.push('🤝 Terapia para relacionamentos interpessoais saudáveis');
    }
    
    recommendations.push('🧘 Práticas de autoconhecimento e mindfulness');
    recommendations.push('📖 Psicoterapia cognitivo-comportamental pode ser benéfica');
    
    return recommendations.join(' | ');
  }

  /**
   * 💡 Gera recomendações para Mitomania
   */
  generateMitomaniaRecommendations(subescales, riskLevel) {
    const recommendations = [];
    
    if (riskLevel === 'Crítico') {
      recommendations.push('🚨 Padrão patológico de mentiras - intervenção especializada urgente');
    }
    
    if (subescales.controleComportamento < 4) {
      recommendations.push('🛡️ Desenvolvimento de estratégias de autocontrole');
    }
    
    if (subescales.impactoRelacoes > 6) {
      recommendations.push('💔 Terapia de casal/familiar para reparar relacionamentos');
    }
    
    recommendations.push('🎯 Terapia cognitivo-comportamental especializada');
    recommendations.push('📝 Registro e monitoramento de comportamentos');
    
    return recommendations.join(' | ');
  }

  /**
   * 📈 Análise comparativa de resultados
   */
  generateComparativeAnalysis(currentScore, historicalData) {
    if (!historicalData || historicalData.length === 0) {
      return 'Primeira avaliação - sem dados comparativos disponíveis';
    }

    const avgHistorical = historicalData.reduce((sum, score) => sum + score, 0) / historicalData.length;
    const improvement = currentScore - avgHistorical;

    if (improvement < -10) return 'Melhora significativa detectada';
    if (improvement < -5) return 'Melhora moderada observada';
    if (improvement > 10) return 'Piora significativa detectada';
    if (improvement > 5) return 'Piora moderada observada';
    return 'Estabilidade nos resultados';
  }
}

module.exports = new ScoringService();