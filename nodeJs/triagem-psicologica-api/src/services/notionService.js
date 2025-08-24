const { Client } = require('@notionhq/client');
const logger = require('../utils/logger');
const { retryOperation } = require('../utils/helpers');

class NotionService {
  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    
    this.databases = {
      bipolar: process.env.NOTION_DATABASE_BIPOLAR,
      depression: process.env.NOTION_DATABASE_DEPRESSION,
      anxiety: process.env.NOTION_DATABASE_ANXIETY,
      adhd: process.env.NOTION_DATABASE_ADHD,
      narcisismo: process.env.NOTION_DATABASE_NARCISISMO,
      mitomania: process.env.NOTION_DATABASE_MITOMANIA
    };
  }

  generateSessionId(type) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const prefix = type.toUpperCase().substring(0, 2);
    return `${prefix}-${timestamp}-${random}`;
  }

  async createSession(triagemType, initialData) {
    try {
      const databaseId = this.databases[triagemType];
      if (!databaseId) {
        throw new Error(`Database não encontrada para tipo: ${triagemType}`);
      }

      const sessionId = this.generateSessionId(triagemType);
      
      const properties = {
        title: {
          title: [
            {
              text: {
                content: `Sessão ${sessionId}`
              }
            }
          ]
        },
        ID_Sessao: {
          rich_text: [
            {
              text: {
                content: sessionId
              }
            }
          ]
        },
        Status_Sessao: {
          select: {
            name: 'Iniciada'
          }
        }
      };

      const response = await this.notion.pages.create({
        parent: { database_id: databaseId },
        properties: properties
      });

      logger.info(`Sessão criada: ${sessionId} para ${triagemType}`);
      
      return {
        sessionId,
        pageId: response.id,
        url: response.url,
        createdAt: new Date().toISOString()
      };

    } catch (error) {
      logger.error(`Erro ao criar sessão ${triagemType}:`, error);
      throw new Error(`Falha ao criar sessão: ${error.message}`);
    }
  }

  async testConnection() {
    try {
      await this.notion.users.me();
      return true;
    } catch (error) {
      logger.error('Falha na conexão com Notion API:', error);
      return false;
    }
  }
}

module.exports = new NotionService();
