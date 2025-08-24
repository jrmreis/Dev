# 🧠 Sistema de Triagem Psicológica

**API Node.js + Notion para triagem de Transtorno Bipolar, Narcisismo e Mitomania**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)](https://expressjs.com/)
[![Notion API](https://img.shields.io/badge/Notion_API-2.2+-black.svg)](https://developers.notion.com/)
[![LGPD](https://img.shields.io/badge/LGPD-Compliant-brightgreen.svg)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)

## 📋 Índice

- [✨ Características](#-características)
- [🏗️ Arquitetura](#️-arquitetura)
- [🚀 Instalação](#-instalação)
- [⚙️ Configuração](#️-configuração)
- [🔧 Uso da API](#-uso-da-api)
- [📊 Analytics](#-analytics)
- [🔒 Segurança](#-segurança)
- [🧪 Testes](#-testes)
- [🚢 Deploy](#-deploy)
- [📚 Documentação](#-documentação)

## ✨ Características

### 🧠 **Triagens Implementadas**
- **Transtorno Bipolar** - 8 subescalas, 40+ perguntas
- **Narcisismo** - 7 subescalas, 42 perguntas  
- **Mitomania** - 8 subescalas, 55+ perguntas

### 🛡️ **Segurança e Compliance**
- ✅ **LGPD Compliant** - Anonimização de IPs, direito ao esquecimento
- ✅ **Rate Limiting** - Proteção contra ataques
- ✅ **Validação rigorosa** - Zod + sanitização
- ✅ **Logs seguros** - Dados sensíveis removidos
- ✅ **Headers de segurança** - Helmet.js

### 📊 **Features Técnicas**
- ✅ **Integração Notion** - Armazenamento estruturado
- ✅ **Algoritmos de scoring** - Ponderação científica
- ✅ **Sistema de analytics** - Relatórios e insights
- ✅ **Health monitoring** - Kubernetes ready
- ✅ **Error handling** - Tratamento robusto
- ✅ **Request logging** - Auditoria completa

## 🏗️ Arquitetura

```
src/
├── 📁 middleware/          # Middlewares (validação, logs, errors)
├── 📁 routes/             # Rotas da API (triagem, analytics, health)
├── 📁 services/           # Serviços (Notion, scoring)
├── 📁 utils/              # Utilitários (security, logger, helpers)
├── 📄 server.js           # Servidor principal
└── 📄 package.json        # Dependências
```

### 🗄️ **Databases Notion**
```javascript
// IDs das databases criadas
const DATABASES = {
  bipolar: 'cea70b522dd14b61874410cabf296478',
  narcisismo: '78581d17c6e342be9ba12d3c4058ce52',
  mitomania: 'b4ab5e546051403daeb202bdabdc0818'
};
```

## 🚀 Instalação

### 📋 **Pré-requisitos**
- Node.js 18+
- npm 8+
- Conta Notion com integração criada

### 🔧 **Instalação Local**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/triagem-psicologica-api.git
cd triagem-psicologica-api

# Instale dependências
npm install

# Copie e configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# Inicie o servidor de desenvolvimento
npm run dev
```

### 🐳 **Com Docker**

```bash
# Build da imagem
docker build -t triagem-api .

# Execute o container
docker run -p 3000:3000 --env-file .env triagem-api
```

### 🏗️ **Com Docker Compose**

```bash
# Inicie todos os serviços
docker-compose up -d

# Logs
docker-compose logs -f api
```

## ⚙️ Configuração

### 🔑 **Variáveis de Ambiente Obrigatórias**

```bash
# Notion API
NOTION_API_KEY=secret_sua_chave_notion_aqui
NOTION_DATABASE_BIPOLAR=sua_database_id_bipolar
NOTION_DATABASE_NARCISISMO=sua_database_id_narcisismo  
NOTION_DATABASE_MITOMANIA=sua_database_id_mitomania

# Segurança
HASH_SECRET_KEY=sua_chave_secreta_muito_forte_32_chars_min
```

### 📋 **Configuração Completa**

Veja o arquivo `.env.example` para todas as opções disponíveis.

### 🗄️ **Setup do Notion**

1. **Crie uma integração** em https://developers.notion.com/
2. **Anote o token** que será seu `NOTION_API_KEY`
3. **As databases já foram criadas** com os IDs fornecidos
4. **Dê acesso** à integração para as databases

## 🔧 Uso da API

### 🏃‍♂️ **Quick Start**

```bash
# 1. Inicie uma triagem
curl -X POST http://localhost:3000/api/v1/triagem/bipolar/iniciar \
  -H "Content-Type: application/json"

# Response:
{
  "success": true,
  "data": {
    "sessionId": "BI-1724567890-abc123",
    "totalQuestions": 40,
    "nextStep": "/api/v1/triagem/bipolar/responder/BI-1724567890-abc123"
  }
}
```

```bash
# 2. Envie uma resposta
curl -X POST http://localhost:3000/api/v1/triagem/bipolar/responder/BI-1724567890-abc123 \
  -H "Content-Type: application/json" \
  -d '{
    "questionId": "q1_mania",
    "response": 7,
    "subescale": "mania"
  }'
```

```bash
# 3. Finalize a triagem
curl -X POST http://localhost:3000/api/v1/triagem/bipolar/finalizar/BI-1724567890-abc123

# Response:
{
  "success": true,
  "data": {
    "resultado": {
      "pontuacaoGeral": 68,
      "nivelRisco": "Alto",
      "recomendacoes": "🚨 Sinais de mania detectados - avaliação especializada recomendada"
    }
  }
}
```

### 📍 **Endpoints Principais**

#### 🔴 **Transtorno Bipolar**
```
POST /api/v1/triagem/bipolar/iniciar
POST /api/v1/triagem/bipolar/responder/:sessionId
POST /api/v1/triagem/bipolar/finalizar/:sessionId
GET  /api/v1/triagem/bipolar/resultado/:sessionId
```

#### 🟡 **Narcisismo**
```
POST /api/v1/triagem/narcisismo/iniciar
POST /api/v1/triagem/narcisismo/responder/:sessionId
POST /api/v1/triagem/narcisismo/finalizar/:sessionId
GET  /api/v1/triagem/narcisismo/resultado/:sessionId
```

#### 🟢 **Mitomania**
```
POST /api/v1/triagem/mitomania/iniciar
POST /api/v1/triagem/mitomania/responder/:sessionId
POST /api/v1/triagem/mitomania/finalizar/:sessionId
GET  /api/v1/triagem/mitomania/resultado/:sessionId
```

#### 📊 **Analytics**
```
GET  /api/v1/analytics/stats/:type
POST /api/v1/analytics/report
GET  /api/v1/analytics/dashboard
```

#### 🏥 **Health Check**
```
GET  /health              # Health check básico
GET  /health/detailed     # Health check detalhado
GET  /health/ready        # Readiness probe
GET  /health/live         # Liveness probe
```

## 📊 Analytics

### 📈 **Dashboard**
```bash
curl http://localhost:3000/api/v1/analytics/dashboard
```

### 📋 **Relatório Personalizado**
```bash
curl -X POST http://localhost:3000/api/v1/analytics/report \
  -H "Content-Type: application/json" \
  -d '{
    "type": "bipolar",
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-12-31T23:59:59Z",
    "filters": {
      "riskLevel": "Alto"
    }
  }'
```

## 🔒 Segurança

### 🛡️ **Proteções Implementadas**

- **Rate Limiting**: 100 requests/15min por IP
- **IP Anonimization**: SHA-256 + salt para compliance LGPD
- **Input Validation**: Zod schemas + sanitização
- **SQL Injection Protection**: Escape automático
- **XSS Protection**: Headers de segurança
- **CSRF Protection**: SameSite cookies
- **Security Headers**: Helmet.js configurado

### 🔐 **LGPD Compliance**

```javascript
// IPs são automaticamente anonimizados
const anonymizedIP = anonymizeIP('192.168.1.100');
// Resultado: "ip_a1b2c3d4e5f6g7h8"

// Dados sensíveis são automaticamente limpos dos logs
logger.info('User data', sanitizeForLogging(userData));
```

### 🚨 **Casos Críticos**

O sistema detecta automaticamente casos críticos e pode:
- Registrar em logs especiais
- Enviar webhooks para sistemas de alerta
- Notificar administradores

## 🧪 Testes

### 🏃‍♂️ **Executar Testes**

```bash
# Todos os testes
npm test

# Testes com watch
npm run test:watch

# Coverage
npm run test:coverage
```

### 📝 **Tipos de Teste**

```bash
# Testes unitários
npm run test:unit

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e
```

### 🔍 **Exemplo de Teste**

```javascript
describe('Scoring Service', () => {
  it('should calculate bipolar score correctly', () => {
    const responses = {
      mania: [8, 9, 7],
      depressao: [6, 5, 7]
    };
    
    const result = scoringService.calculateBipolarScore(responses);
    
    expect(result.pontuacaoGeral).toBeGreaterThan(0);
    expect(result.nivelRisco).toBeDefined();
  });
});
```

## 🚢 Deploy

### ☁️ **Vercel (Recomendado)**

```bash
# Instale a CLI do Vercel
npm i -g vercel

# Configure as variáveis de ambiente
vercel env add NOTION_API_KEY
vercel env add NOTION_DATABASE_BIPOLAR
# ... outras variáveis

# Deploy
vercel --prod
```

### 🚂 **Railway**

```bash
# Conecte o repositório no Railway
# Configure as variáveis de ambiente
# Deploy automático via Git
```

### 🏗️ **Docker Production**

```dockerfile
# Build otimizado para produção
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src/ ./src/
EXPOSE 3000
CMD ["npm", "start"]
```

### ☸️ **Kubernetes**

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: triagem-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: triagem-api
  template:
    metadata:
      labels:
        app: triagem-api
    spec:
      containers:
      - name: api
        image: triagem-api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NOTION_API_KEY
          valueFrom:
            secretKeyRef:
              name: triagem-secrets
              key: notion-api-key
        livenessProbe:
          httpGet:
            path: /health/live
            port: 3000
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 3000
```

## 📚 Documentação

### 📖 **API Documentation**

Acesse a documentação interativa:
```
GET http://localhost:3000/api/v1/docs
```

### 🔍 **Logs e Monitoramento**

```bash
# Logs em tempo real
tail -f logs/app.log

# Métricas (formato Prometheus)
curl http://localhost:3000/health/metrics
```

### 📊 **Métricas Disponíveis**

- Total de requests HTTP
- Tempo médio de resposta
- Taxa de erro
- Uso de memória
- Uptime do processo
- Estatísticas por tipo de triagem

## 🤝 Contribuição

### 🛠️ **Desenvolvimento**

```bash
# Fork o projeto
git fork https://github.com/original/triagem-psicologica-api

# Crie uma branch para sua feature
git checkout -b feature/nova-funcionalidade

# Commit suas mudanças
git commit -m "feat: adiciona nova funcionalidade"

# Push para sua branch
git push origin feature/nova-funcionalidade

# Abra um Pull Request
```

### 📋 **Padrões de Código**

- **ESLint**: Linting automático
- **Prettier**: Formatação de código
- **Conventional Commits**: Padrão de commits
- **JSDoc**: Documentação de código

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

### 📧 **Contato**
- Email: suporte@triagem.com
- Issues: [GitHub Issues](https://github.com/usuario/triagem-psicologica-api/issues)

### 🐛 **Reportar Bugs**

Use o template de issue para reportar bugs:
```
**Descrição do Bug**
Uma descrição clara do que está acontecendo.

**Reproduzir**
Passos para reproduzir o comportamento:
1. Vá para '...'
2. Clique em '....'
3. Role para baixo até '....'
4. Veja o erro

**Comportamento Esperado**
Uma descrição clara do que você esperava que acontecesse.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]
```

## 🙏 Agradecimentos

- **Notion API** - Armazenamento estruturado
- **Express.js** - Framework web robusto
- **Winston** - Sistema de logging
- **Zod** - Validação de esquemas
- **Helmet** - Segurança HTTP

---

**Desenvolvido com ❤️ para profissionais de saúde mental**

🧠 **Sistema de Triagem Psicológica v1.0.0**