/**
 * 🧠 Exemplo Completo de Uso da API de Triagem Psicológica
 * Demonstra como integrar com todas as funcionalidades
 */

const axios = require('axios');

// Configuração da API
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Triagem-Example-Client/1.0.0'
  }
});

/**
 * 🎯 Classe principal para interação com a API
 */
class TriagemAPIClient {
  constructor(baseURL = API_BASE_URL) {
    this.api = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Triagem-Client/1.0.0'
      }
    });

    // Interceptor para logging
    this.api.interceptors.request.use(request => {
      console.log(`🚀 ${request.method?.toUpperCase()} ${request.url}`);
      return request;
    });

    this.api.interceptors.response.use(
      response => {
        console.log(`✅ ${response.status} ${response.config.url}`);
        return response;
      },
      error => {
        console.error(`❌ ${error.response?.status} ${error.config?.url}:`, 
          error.response?.data?.error || error.message);
        throw error;
      }
    );
  }

  /**
   * 🔴 Executa triagem completa de Transtorno Bipolar
   */
  async executarTriagemBipolar() {
    console.log('\n🔴 === INICIANDO TRIAGEM TRANSTORNO BIPOLAR ===\n');

    try {
      // 1. Inicia a sessão
      const sessionResponse = await this.api.post('/api/v1/triagem/bipolar/iniciar');
      const { sessionId } = sessionResponse.data.data;
      
      console.log(`📋 Sessão iniciada: ${sessionId}`);
      console.log(`📊 Total de perguntas: ${sessionResponse.data.data.totalQuestions}`);

      // 2. Simula respostas das perguntas
      const respostasBipolar = [
        // Subescala Mania
        { questionId: 'q1_mania', response: 8, subescale: 'mania' },
        { questionId: 'q2_mania', response: 7, subescale: 'mania' },
        { questionId: 'q3_mania', response: 9, subescale: 'mania' },
        { questionId: 'q4_mania', response: 6, subescale: 'mania' },
        { questionId: 'q5_mania', response: 8, subescale: 'mania' },

        // Subescala Hipomania
        { questionId: 'q1_hipomania', response: 5, subescale: 'hipomania' },
        { questionId: 'q2_hipomania', response: 6, subescale: 'hipomania' },
        { questionId: 'q3_hipomania', response: 4, subescale: 'hipomania' },
        { questionId: 'q4_hipomania', response: 5, subescale: 'hipomania' },
        { questionId: 'q5_hipomania', response: 7, subescale: 'hipomania' },

        // Subescala Depressão
        { questionId: 'q1_depressao', response: 7, subescale: 'depressao' },
        { questionId: 'q2_depressao', response: 8, subescale: 'depressao' },
        { questionId: 'q3_depressao', response: 6, subescale: 'depressao' },
        { questionId: 'q4_depressao', response: 7, subescale: 'depressao' },
        { questionId: 'q5_depressao', response: 9, subescale: 'depressao' },

        // Subescala Ansiedade
        { questionId: 'q1_ansiedade', response: 6, subescale: 'ansiedade' },
        { questionId: 'q2_ansiedade', response: 5, subescale: 'ansiedade' },
        { questionId: 'q3_ansiedade', response: 7, subescale: 'ansiedade' },
        { questionId: 'q4_ansiedade', response: 6, subescale: 'ansiedade' },

        // Subescala Irritabilidade
        { questionId: 'q1_irritabilidade', response: 8, subescale: 'irritabilidade' },
        { questionId: 'q2_irritabilidade', response: 7, subescale: 'irritabilidade' },
        { questionId: 'q3_irritabilidade', response: 9, subescale: 'irritabilidade' },
        { questionId: 'q4_irritabilidade', response: 6, subescale: 'irritabilidade' },

        // Subescala Impulsividade
        { questionId: 'q1_impulsividade', response: 7, subescale: 'impulsividade' },
        { questionId: 'q2_impulsividade', response: 8, subescale: 'impulsividade' },
        { questionId: 'q3_impulsividade', response: 5, subescale: 'impulsividade' },
        { questionId: 'q4_impulsividade', response: 6, subescale: 'impulsividade' },

        // Subescala Ciclos de Humor
        { questionId: 'q1_ciclos', response: 9, subescale: 'ciclosHumor' },
        { questionId: 'q2_ciclos', response: 8, subescale: 'ciclosHumor' },
        { questionId: 'q3_ciclos', response: 7, subescale: 'ciclosHumor' },
        { questionId: 'q4_ciclos', response: 8, subescale: 'ciclosHumor' },

        // Subescala Funcionamento
        { questionId: 'q1_funcionamento', response: 6, subescale: 'funcionamento' },
        { questionId: 'q2_funcionamento', response: 7, subescale: 'funcionamento' },
        { questionId: 'q3_funcionamento', response: 5, subescale: 'funcionamento' },
        { questionId: 'q4_funcionamento', response: 6, subescale: 'funcionamento' },

        // Perguntas adicionais para completar 40
        { questionId: 'q6_mania', response: 7, subescale: 'mania' },
        { questionId: 'q6_hipomania', response: 5, subescale: 'hipomania' },
        { questionId: 'q6_depressao', response: 8, subescale: 'depressao' },
        { questionId: 'q5_ansiedade', response: 6, subescale: 'ansiedade' },
        { questionId: 'q5_irritabilidade', response: 7, subescale: 'irritabilidade' },
        { questionId: 'q5_impulsividade', response: 6, subescale: 'impulsividade' },
        { questionId: 'q5_ciclos', response: 8, subescale: 'ciclosHumor' },
        { questionId: 'q5_funcionamento', response: 5, subescale: 'funcionamento' }
      ];

      // 3. Envia cada resposta
      console.log('\n📝 Enviando respostas...');
      for (let i = 0; i < respostasBipolar.length; i++) {
        const resposta = respostasBipolar[i];
        
        const responseData = await this.api.post(
          `/api/v1/triagem/bipolar/responder/${sessionId}`,
          {
            ...resposta,
            metadata: {
              timeSpent: Math.floor(Math.random() * 30) + 10, // 10-40 segundos
              confidence: Math.floor(Math.random() * 3) + 3    // 3-5
            }
          }
        );

        const progress = responseData.data.data.progress;
        console.log(`  📊 Progresso: ${progress}% (${i + 1}/${respostasBipolar.length})`);

        // Simula tempo de resposta humano
        await this.sleep(100);
      }

      // 4. Finaliza a triagem
      console.log('\n🏁 Finalizando triagem...');
      const resultadoResponse = await this.api.post(
        `/api/v1/triagem/bipolar/finalizar/${sessionId}`
      );

      const resultado = resultadoResponse.data.data.resultado;

      // 5. Exibe resultado
      console.log('\n🎯 === RESULTADO TRANSTORNO BIPOLAR ===');
      console.log(`📊 Pontuação Geral: ${resultado.pontuacaoGeral}`);
      console.log(`⚠️ Nível de Risco: ${resultado.nivelRisco}`);
      console.log(`🕐 Duração: ${resultado.duracaoSessao} minutos`);
      console.log(`💡 Recomendações:`);
      console.log(`   ${resultado.recomendacoes}`);

      if (resultado.subescalas) {
        console.log('\n📈 Subescalas:');
        Object.entries(resultado.subescalas).forEach(([nome, score]) => {
          console.log(`   ${nome}: ${score}`);
        });
      }

      return { sessionId, resultado };

    } catch (error) {
      console.error('❌ Erro na triagem bipolar:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 🟡 Executa triagem completa de Narcisismo
   */
  async executarTriagemNarcisismo() {
    console.log('\n🟡 === INICIANDO TRIAGEM NARCISISMO ===\n');

    try {
      // 1. Inicia a sessão
      const sessionResponse = await this.api.post('/api/v1/triagem/narcisismo/iniciar');
      const { sessionId } = sessionResponse.data.data;
      
      console.log(`📋 Sessão iniciada: ${sessionId}`);

      // 2. Simula respostas (42 perguntas)
      const respostasNarcisismo = [
        // Subescala Grandiosidade
        { questionId: 'q1_grandiosidade', response: 6, subescale: 'grandiosidade' },
        { questionId: 'q2_grandiosidade', response: 7, subescale: 'grandiosidade' },
        { questionId: 'q3_grandiosidade', response: 5, subescale: 'grandiosidade' },
        { questionId: 'q4_grandiosidade', response: 8, subescale: 'grandiosidade' },
        { questionId: 'q5_grandiosidade', response: 6, subescale: 'grandiosidade' },
        { questionId: 'q6_grandiosidade', response: 7, subescale: 'grandiosidade' },

        // Subescala Necessidade de Admiração
        { questionId: 'q1_admiracao', response: 7, subescale: 'necessidadeAdmiracao' },
        { questionId: 'q2_admiracao', response: 8, subescale: 'necessidadeAdmiracao' },
        { questionId: 'q3_admiracao', response: 6, subescale: 'necessidadeAdmiracao' },
        { questionId: 'q4_admiracao', response: 7, subescale: 'necessidadeAdmiracao' },
        { questionId: 'q5_admiracao', response: 9, subescale: 'necessidadeAdmiracao' },
        { questionId: 'q6_admiracao', response: 5, subescale: 'necessidadeAdmiracao' },

        // Subescala Falta de Empatia
        { questionId: 'q1_empatia', response: 8, subescale: 'faltaEmpatia' },
        { questionId: 'q2_empatia', response: 7, subescale: 'faltaEmpatia' },
        { questionId: 'q3_empatia', response: 6, subescale: 'faltaEmpatia' },
        { questionId: 'q4_empatia', response: 8, subescale: 'faltaEmpatia' },
        { questionId: 'q5_empatia', response: 9, subescale: 'faltaEmpatia' },
        { questionId: 'q6_empatia', response: 7, subescale: 'faltaEmpatia' },

        // Subescala Exploração de Outros
        { questionId: 'q1_exploracao', response: 5, subescale: 'exploracaoOutros' },
        { questionId: 'q2_exploracao', response: 6, subescale: 'exploracaoOutros' },
        { questionId: 'q3_exploracao', response: 7, subescale: 'exploracaoOutros' },
        { questionId: 'q4_exploracao', response: 4, subescale: 'exploracaoOutros' },
        { questionId: 'q5_exploracao', response: 6, subescale: 'exploracaoOutros' },
        { questionId: 'q6_exploracao', response: 5, subescale: 'exploracaoOutros' },

        // Subescala Arrogância
        { questionId: 'q1_arrogancia', response: 7, subescale: 'arrogancia' },
        { questionId: 'q2_arrogancia', response: 8, subescale: 'arrogancia' },
        { questionId: 'q3_arrogancia', response: 6, subescale: 'arrogancia' },
        { questionId: 'q4_arrogancia', response: 7, subescale: 'arrogancia' },
        { questionId: 'q5_arrogancia', response: 9, subescale: 'arrogancia' },
        { questionId: 'q6_arrogancia', response: 5, subescale: 'arrogancia' },

        // Subescala Autoridade
        { questionId: 'q1_autoridade', response: 6, subescale: 'autoridade' },
        { questionId: 'q2_autoridade', response: 7, subescale: 'autoridade' },
        { questionId: 'q3_autoridade', response: 5, subescale: 'autoridade' },
        { questionId: 'q4_autoridade', response: 8, subescale: 'autoridade' },
        { questionId: 'q5_autoridade', response: 6, subescale: 'autoridade' },
        { questionId: 'q6_autoridade', response: 7, subescale: 'autoridade' },

        // Subescala Autossuficiência
        { questionId: 'q1_autossuficiencia', response: 8, subescale: 'autossuficiencia' },
        { questionId: 'q2_autossuficiencia', response: 7, subescale: 'autossuficiencia' },
        { questionId: 'q3_autossuficiencia', response: 9, subescale: 'autossuficiencia' },
        { questionId: 'q4_autossuficiencia', response: 6, subescale: 'autossuficiencia' },
        { questionId: 'q5_autossuficiencia', response: 8, subescale: 'autossuficiencia' },
        { questionId: 'q6_autossuficiencia', response: 7, subescale: 'autossuficiencia' }
      ];

      // 3. Envia respostas
      for (let i = 0; i < respostasNarcisismo.length; i++) {
        await this.api.post(
          `/api/v1/triagem/narcisismo/responder/${sessionId}`,
          respostasNarcisismo[i]
        );
        
        if ((i + 1) % 10 === 0) {
          console.log(`  📊 Progresso: ${Math.round(((i + 1) / respostasNarcisismo.length) * 100)}%`);
        }
        
        await this.sleep(50);
      }

      // 4. Finaliza a triagem
      const resultadoResponse = await this.api.post(
        `/api/v1/triagem/narcisismo/finalizar/${sessionId}`
      );

      const resultado = resultadoResponse.data.data.resultado;

      console.log('\n🎯 === RESULTADO NARCISISMO ===');
      console.log(`📊 Pontuação Geral: ${resultado.pontuacaoGeral}`);
      console.log(`⚠️ Nível de Risco: ${resultado.nivelRisco}`);
      console.log(`💡 Recomendações: ${resultado.recomendacoes}`);

      return { sessionId, resultado };

    } catch (error) {
      console.error('❌ Erro na triagem narcisismo:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * 📊 Busca analytics do sistema
   */
  async buscarAnalytics() {
    console.log('\n📊 === BUSCANDO ANALYTICS ===\n');

    try {
      // 1. Dashboard geral
      console.log('🏠 Buscando dashboard...');
      const dashboardResponse = await this.api.get('/api/v1/analytics/dashboard');
      const dashboard = dashboardResponse.data.data;

      console.log('📈 Dashboard Global:');
      console.log(`   Total de sessões: ${dashboard.global.totalSessionsAllTypes}`);
      console.log(`   Status do sistema: ${dashboard.global.systemHealth}`);

      console.log('\n📊 Por tipo de triagem:');
      Object.entries(dashboard.byType).forEach(([tipo, dados]) => {
        if (!dados.error) {
          console.log(`   ${tipo}: ${dados.totalSessions} sessões (média: ${dados.averageScore})`);
        }
      });

      // 2. Estatísticas detalhadas por tipo
      const tipos = ['bipolar', 'narcisismo', 'mitomania'];
      for (const tipo of tipos) {
        try {
          console.log(`\n📈 Estatísticas ${tipo}:`);
          const statsResponse = await this.api.get(`/api/v1/analytics/stats/${tipo}`);
          const stats = statsResponse.data.data.statistics;

          console.log(`   Total: ${stats.totalSessions}`);
          console.log(`   Média: ${stats.averageScore}`);
          console.log(`   Distribuição de risco:`, stats.riskDistribution);
        } catch (error) {
          console.log(`   ⚠️ Dados não disponíveis para ${tipo}`);
        }
      }

      // 3. Relatório personalizado
      console.log('\n📋 Gerando relatório personalizado...');
      const reportResponse = await this.api.post('/api/v1/analytics/report', {
        type: 'bipolar',
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
        filters: {
          riskLevel: 'Alto'
        }
      });

      const report = reportResponse.data.data;
      console.log(`📊 Relatório (${report.type}):`);
      console.log(`   Período: últimos 30 dias`);
      console.log(`   Filtro: apenas casos de alto risco`);
      console.log(`   Resultado:`, report.analytics.summary);

    } catch (error) {
      console.error('❌ Erro ao buscar analytics:', error.response?.data || error.message);
    }
  }

  /**
   * 🏥 Verifica saúde do sistema
   */
  async verificarSaude() {
    console.log('\n🏥 === VERIFICANDO SAÚDE DO SISTEMA ===\n');

    try {
      // Health check básico
      const healthResponse = await this.api.get('/health');
      const health = healthResponse.data;

      console.log(`✅ Status: ${health.status}`);
      console.log(`⏱️ Uptime: ${Math.round(health.uptime)} segundos`);
      console.log(`🗄️ Notion: ${health.services?.notion?.status || 'não verificado'}`);

      // Health check detalhado
      const detailedResponse = await this.api.get('/health/detailed');
      const detailed = detailedResponse.data;

      console.log('\n💻 Sistema:');
      console.log(`   Memória: ${detailed.system.memory.usage}% (${detailed.system.memory.used}MB/${detailed.system.memory.total}MB)`);
      console.log(`   Node.js: ${detailed.system.nodeVersion}`);

      console.log('\n📊 API:');
      console.log(`   Total requests: ${detailed.api.totalRequests}`);
      console.log(`   Tempo médio: ${Math.round(detailed.api.averageResponseTime)}ms`);
      console.log(`   Requests lentos: ${detailed.api.slowRequests}`);

    } catch (error) {
      console.error('❌ Erro no health check:', error.response?.data || error.message);
    }
  }

  /**
   * ⏰ Função auxiliar para delay
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * 🚀 Execução principal
 */
async function main() {
  console.log('🧠 === SISTEMA DE TRIAGEM PSICOLÓGICA - EXEMPLO DE USO ===\n');

  const client = new TriagemAPIClient();

  try {
    // 1. Verifica saúde do sistema
    await client.verificarSaude();

    // 2. Executa triagem de Transtorno Bipolar
    const resultadoBipolar = await client.executarTriagemBipolar();

    // 3. Executa triagem de Narcisismo
    const resultadoNarcisismo = await client.executarTriagemNarcisismo();

    // 4. Busca analytics
    await client.buscarAnalytics();

    // 5. Resumo final
    console.log('\n🎉 === EXEMPLO CONCLUÍDO COM SUCESSO ===');
    console.log(`✅ Triagem Bipolar: Score ${resultadoBipolar.resultado.pontuacaoGeral} (${resultadoBipolar.resultado.nivelRisco})`);
    console.log(`✅ Triagem Narcisismo: Score ${resultadoNarcisismo.resultado.pontuacaoGeral} (${resultadoNarcisismo.resultado.nivelRisco})`);
    console.log('\n💡 Dados foram salvos no Notion automaticamente!');

  } catch (error) {
    console.error('\n💥 Erro durante execução:', error.message);
    
    if (error.response?.status === 503) {
      console.log('\n🔧 Dicas para resolver:');
      console.log('   1. Verifique se o servidor está rodando');
      console.log('   2. Confirme as variáveis de ambiente');
      console.log('   3. Teste a conexão com o Notion');
    }
    
    process.exit(1);
  }
}

// Executa se chamado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { TriagemAPIClient };