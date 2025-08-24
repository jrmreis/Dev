// backend/debug-notion.js
import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 DIAGNÓSTICO COMPLETO - INTEGRAÇÃO NOTION');
console.log('==========================================\n');

// Função para criar linha separadora
const separator = (title) => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📋 ${title}`);
  console.log('='.repeat(50));
};

// 1. Verificar variáveis de ambiente
separator('VERIFICAÇÃO DE VARIÁVEIS DE AMBIENTE');

const checks = {
  notionSecret: !!process.env.NOTION_API_SECRET,
  notionDatabase: !!process.env.NOTION_DATABASE_ID,
  port: !!process.env.PORT,
  corsOrigin: !!process.env.CORS_ORIGIN
};

console.log(`NOTION_API_SECRET: ${checks.notionSecret ? '✅ Configurado' : '❌ Não configurado'}`);
console.log(`NOTION_DATABASE_ID: ${checks.notionDatabase ? '✅ Configurado' : '❌ Não configurado'}`);
console.log(`PORT: ${checks.port ? '✅ Configurado' : '⚠️ Usando padrão (3000)'}`);
console.log(`CORS_ORIGIN: ${checks.corsOrigin ? '✅ Configurado' : '⚠️ Usando padrão'}`);

if (process.env.NOTION_API_SECRET) {
  const secret = process.env.NOTION_API_SECRET;
  console.log(`\n🔍 Análise do Secret:`);
  console.log(`   Formato: ${secret.startsWith('secret_') ? '✅ Correto' : '❌ Deve começar com "secret_"'}`);
  console.log(`   Tamanho: ${secret.length} caracteres ${secret.length === 49 ? '✅' : '⚠️ Esperado: 49'}`);
  console.log(`   Preview: ${secret.substring(0, 20)}...`);
}

if (process.env.NOTION_DATABASE_ID) {
  const dbId = process.env.NOTION_DATABASE_ID;
  console.log(`\n🗄️ Análise do Database ID:`);
  console.log(`   Tamanho: ${dbId.length} caracteres ${dbId.length === 32 ? '✅' : '⚠️ Esperado: 32'}`);
  console.log(`   Formato: ${/^[a-f0-9]{32}$/.test(dbId) ? '✅ Hexadecimal válido' : '⚠️ Formato inválido'}`);
  console.log(`   Preview: ${dbId.substring(0, 8)}...${dbId.substring(-4)}`);
}

// Parar se não tiver configurações básicas
if (!checks.notionSecret || !checks.notionDatabase) {
  console.log('\n❌ CONFIGURAÇÃO INCOMPLETA');
  console.log('💡 Configure as variáveis obrigatórias no arquivo .env:');
  console.log('   NOTION_API_SECRET=secret_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  console.log('   NOTION_DATABASE_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  console.log('\n📖 Consulte o README.md para instruções detalhadas');
  process.exit(1);
}

// Inicializar cliente Notion
const notion = new Client({
  auth: process.env.NOTION_API_SECRET,
});

// 2. Testar conexão básica
separator('TESTE DE CONEXÃO BÁSICA');

async function testBasicConnection() {
  try {
    console.log('🔄 Testando autenticação...');
    
    const response = await notion.users.me();
    
    console.log('✅ Autenticação bem-sucedida');
    console.log(`   👤 Nome do Bot: ${response.name || 'N/A'}`);
    console.log(`   🤖 Tipo: ${response.type}`);
    console.log(`   🆔 ID: ${response.id}`);
    console.log(`   👤 Owner: ${response.owner?.type || 'N/A'}`);
    
    return { success: true, bot: response };
  } catch (error) {
    console.log('❌ Falha na autenticação');
    console.log(`   Erro: ${error.message}`);
    console.log(`   Código: ${error.code || 'N/A'}`);
    
    if (error.code === 'unauthorized') {
      console.log('💡 Possíveis causas:');
      console.log('   • Token inválido ou expirado');
      console.log('   • Formato do token incorreto');
      console.log('   • Token não é de uma integração válida');
    }
    
    return { success: false, error };
  }
}

// 3. Testar acesso à database
separator('TESTE DE ACESSO À DATABASE');

async function testDatabaseAccess() {
  try {
    console.log('🔄 Verificando acesso à database...');
    
    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    
    console.log('✅ Database acessível');
    console.log(`   📝 Título: ${response.title[0]?.plain_text || 'Sem título'}`);
    console.log(`   🆔 ID: ${response.id}`);
    console.log(`   📅 Criada: ${new Date(response.created_time).toLocaleString('pt-BR')}`);
    console.log(`   ✏️ Última edição: ${new Date(response.last_edited_time).toLocaleString('pt-BR')}`);
    console.log(`   🔗 URL: ${response.url}`);
    
    // Listar propriedades
    console.log('\n📊 Propriedades encontradas:');
    const requiredProps = ['Título', 'Tipo de Triagem', 'Pontuação', 'Nível de Risco', 'Data', 'Session ID'];
    const foundProps = Object.keys(response.properties);
    
    requiredProps.forEach(prop => {
      const found = foundProps.includes(prop);
      console.log(`   ${found ? '✅' : '❌'} ${prop} (${found ? response.properties[prop].type : 'não encontrada'})`);
    });
    
    if (foundProps.length > requiredProps.length) {
      console.log('\n🔍 Propriedades extras encontradas:');
      foundProps.forEach(prop => {
        if (!requiredProps.includes(prop)) {
          console.log(`   ℹ️ ${prop} (${response.properties[prop].type})`);
        }
      });
    }
    
    return { success: true, database: response };
  } catch (error) {
    console.log('❌ Falha no acesso à database');
    console.log(`   Erro: ${error.message}`);
    console.log(`   Código: ${error.code || 'N/A'}`);
    
    if (error.code === 'object_not_found') {
      console.log('💡 Possíveis causas:');
      console.log('   • Database ID incorreto');
      console.log('   • Database foi deletada');
      console.log('   • Database não está no workspace da integração');
    } else if (error.code === 'unauthorized') {
      console.log('💡 Possíveis causas:');
      console.log('   • Integração não foi adicionada à database');
      console.log('   • Permissões insuficientes');
      console.log('   • Database privada sem acesso');
    }
    
    return { success: false, error };
  }
}

// 4. Testar criação de página
separator('TESTE DE CRIAÇÃO DE PÁGINA');

async function testPageCreation(database) {
  try {
    console.log('🔄 Testando criação de página...');
    
    // Encontrar propriedade título
    const titleProp = Object.entries(database.properties).find(([name, prop]) => prop.type === 'title');
    
    if (!titleProp) {
      throw new Error('Propriedade título não encontrada na database');
    }
    
    const testData = {
      parent: { 
        database_id: process.env.NOTION_DATABASE_ID 
      },
      properties: {
        [titleProp[0]]: {
          title: [
            {
              text: {
                content: `🧪 Teste Diagnóstico - ${new Date().toLocaleString('pt-BR')}`
              }
            }
          ]
        }
      }
    };
    
    // Adicionar propriedades opcionais se existirem
    if (database.properties['Tipo de Triagem']) {
      testData.properties['Tipo de Triagem'] = {
        select: { name: 'anxiety' }
      };
    }
    
    if (database.properties['Pontuação']) {
      testData.properties['Pontuação'] = { number: 99 };
    }
    
    if (database.properties['Data']) {
      testData.properties['Data'] = {
        date: { start: new Date().toISOString().split('T')[0] }
      };
    }
    
    const response = await notion.pages.create(testData);
    
    console.log('✅ Página criada com sucesso');
    console.log(`   🆔 ID: ${response.id}`);
    console.log(`   🔗 URL: ${response.url}`);
    
    // Tentar arquivar a página de teste
    try {
      await notion.pages.update({
        page_id: response.id,
        archived: true
      });
      console.log('🗑️ Página de teste arquivada');
    } catch (archiveError) {
      console.log('⚠️ Não foi possível arquivar a página de teste');
      console.log(`   Você pode deletá-la manualmente: ${response.url}`);
    }
    
    return { success: true, page: response };
  } catch (error) {
    console.log('❌ Falha na criação de página');
    console.log(`   Erro: ${error.message}`);
    console.log(`   Código: ${error.code || 'N/A'}`);
    
    if (error.code === 'validation_error') {
      console.log('💡 Possíveis causas:');
      console.log('   • Propriedades obrigatórias não fornecidas');
      console.log('   • Tipo de dados incompatível');
      console.log('   • Valores de select não existem na database');
    }
    
    return { success: false, error };
  }
}

// 5. Testar listagem de páginas
separator('TESTE DE LISTAGEM DE PÁGINAS');

async function testPageQuery() {
  try {
    console.log('🔄 Testando busca de páginas...');
    
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      page_size: 5
    });
    
    console.log(`✅ Busca realizada com sucesso`);
    console.log(`   📄 Páginas encontradas: ${response.results.length}`);
    console.log(`   📊 Total na database: ${response.results.length < 5 ? response.results.length : '5+ (limitado)'}`);
    
    if (response.results.length > 0) {
      console.log('\n📋 Últimas páginas:');
      response.results.slice(0, 3).forEach((page, index) => {
        const title = page.properties[Object.keys(page.properties).find(key => page.properties[key].type === 'title')]?.title[0]?.plain_text || 'Sem título';
        console.log(`   ${index + 1}. ${title}`);
      });
    }
    
    return { success: true, query: response };
  } catch (error) {
    console.log('❌ Falha na busca de páginas');
    console.log(`   Erro: ${error.message}`);
    console.log(`   Código: ${error.code || 'N/A'}`);
    
    return { success: false, error };
  }
}

// Função principal
async function runDiagnostic() {
  const results = {
    basicConnection: false,
    databaseAccess: false,
    pageCreation: false,
    pageQuery: false
  };
  
  try {
    // Teste 1: Conexão básica
    const basicTest = await testBasicConnection();
    results.basicConnection = basicTest.success;
    
    if (!basicTest.success) {
      throw new Error('Falha na conexão básica - parando diagnóstico');
    }
    
    // Teste 2: Acesso à database
    const databaseTest = await testDatabaseAccess();
    results.databaseAccess = databaseTest.success;
    
    if (!databaseTest.success) {
      throw new Error('Falha no acesso à database - parando diagnóstico');
    }
    
    // Teste 3: Criação de página
    const pageTest = await testPageCreation(databaseTest.database);
    results.pageCreation = pageTest.success;
    
    // Teste 4: Listagem de páginas
    const queryTest = await testPageQuery();
    results.pageQuery = queryTest.success;
    
  } catch (error) {
    console.log(`\n⚠️ Diagnóstico interrompido: ${error.message}`);
  }
  
  // Resumo final
  separator('RESUMO DO DIAGNÓSTICO');
  
  console.log('📊 Resultados dos testes:');
  console.log(`   🔗 Conexão básica: ${results.basicConnection ? '✅ Sucesso' : '❌ Falhou'}`);
  console.log(`   🗄️ Acesso à database: ${results.databaseAccess ? '✅ Sucesso' : '❌ Falhou'}`);
  console.log(`   📝 Criação de páginas: ${results.pageCreation ? '✅ Sucesso' : '❌ Falhou'}`);
  console.log(`   📋 Listagem de páginas: ${results.pageQuery ? '✅ Sucesso' : '❌ Falhou'}`);
  
  const allPassed = Object.values(results).every(result => result);
  
  if (allPassed) {
    console.log('\n🎉 PARABÉNS! CONFIGURAÇÃO PERFEITA!');
    console.log('   Sua integração Notion está 100% funcional');
    console.log('   ✨ Você pode iniciar o servidor: npm run dev');
  } else {
    console.log('\n⚠️ PROBLEMAS ENCONTRADOS');
    console.log('   Revise as mensagens de erro acima');
    console.log('   📖 Consulte o README.md para ajuda');
  }
  
  console.log('\n📞 Próximos passos:');
  if (allPassed) {
    console.log('   1. npm run dev (iniciar servidor)');
    console.log('   2. Teste: curl http://localhost:3000/api/test-notion');
    console.log('   3. Integre com o frontend');
  } else {
    console.log('   1. Corrija os problemas identificados');
    console.log('   2. Execute novamente: npm run debug-notion');
    console.log('   3. Consulte a documentação Notion API');
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('Diagnóstico concluído ✨');
  console.log('='.repeat(50));
}

// Executar diagnóstico
runDiagnostic().catch(error => {
  console.error('\n💥 Erro inesperado no diagnóstico:', error.message);
  process.exit(1);
});
