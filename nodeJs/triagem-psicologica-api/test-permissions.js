const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function testAllDatabases() {
  const databases = {
    depression: process.env.NOTION_DATABASE_DEPRESSION,
    anxiety: process.env.NOTION_DATABASE_ANXIETY,
    adhd: process.env.NOTION_DATABASE_ADHD,
    bipolar: process.env.NOTION_DATABASE_BIPOLAR,
    narcisismo: process.env.NOTION_DATABASE_NARCISISMO,
    mitomania: process.env.NOTION_DATABASE_MITOMANIA
  };

  console.log('🔍 Testando permissões dos databases...\n');

  for (const [name, id] of Object.entries(databases)) {
    if (!id) {
      console.log(`⚠️  ${name.toUpperCase()}: VARIÁVEL NÃO DEFINIDA`);
      continue;
    }
    
    try {
      const response = await notion.databases.retrieve({ database_id: id });
      console.log(`✅ ${name.toUpperCase()}: OK - "${response.title[0]?.plain_text}"`);
    } catch (error) {
      console.log(`❌ ${name.toUpperCase()}: ERRO - ${error.message}`);
      console.log(`   🔗 ID: ${id}`);
    }
  }
}

testAllDatabases();
