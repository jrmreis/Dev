#!/bin/bash

# 🚀 Scripts de Deploy - Sistema de Triagem Psicológica
# Facilita deploy em diferentes ambientes

set -e  # Para execução em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Função para logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] ℹ️  $1${NC}"
}

# Banner de início
show_banner() {
    echo -e "${PURPLE}"
    echo "🧠 =============================================="
    echo "   SISTEMA DE TRIAGEM PSICOLÓGICA"
    echo "   Deploy Script v1.0.0"
    echo "=============================================="
    echo -e "${NC}"
}

# Verificação de pré-requisitos
check_prerequisites() {
    log "Verificando pré-requisitos..."
    
    # Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js não encontrado. Instale Node.js 18+"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        error "Node.js 18+ é necessário. Versão atual: $(node -v)"
        exit 1
    fi
    
    # npm
    if ! command -v npm &> /dev/null; then
        error "npm não encontrado"
        exit 1
    fi
    
    # Git
    if ! command -v git &> /dev/null; then
        warn "Git não encontrado. Algumas funcionalidades podem não funcionar"
    fi
    
    log "✅ Pré-requisitos verificados"
}

# Validação de variáveis de ambiente
validate_env() {
    log "Validando variáveis de ambiente..."
    
    local required_vars=(
        "NOTION_API_KEY"
        "NOTION_DATABASE_BIPOLAR"
        "NOTION_DATABASE_NARCISISMO"
        "NOTION_DATABASE_MITOMANIA"
        "HASH_SECRET_KEY"
    )
    
    local missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -ne 0 ]; then
        error "Variáveis de ambiente obrigatórias não definidas:"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        echo ""
        echo "Configure essas variáveis no arquivo .env ou no ambiente de deploy"
        exit 1
    fi
    
    log "✅ Variáveis de ambiente validadas"
}

# Build da aplicação
build_application() {
    log "Iniciando build da aplicação..."
    
    # Limpa builds anteriores
    if [ -d "dist" ]; then
        rm -rf dist
    fi
    
    # Instala dependências
    log "Instalando dependências..."
    npm ci --production=false
    
    # Executa linting
    log "Executando lint..."
    npm run lint || {
        warn "Lint falhou, mas continuando..."
    }
    
    # Executa testes
    if [ "$SKIP_TESTS" != "true" ]; then
        log "Executando testes..."
        npm test || {
            error "Testes falharam"
            exit 1
        }
    else
        warn "Testes ignorados (SKIP_TESTS=true)"
    fi
    
    log "✅ Build concluído"
}

# Deploy para Vercel
deploy_vercel() {
    log "Iniciando deploy para Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        log "Instalando Vercel CLI..."
        npm install -g vercel
    fi
    
    # Configura variáveis de ambiente no Vercel
    log "Configurando variáveis de ambiente..."
    
    vercel env add NOTION_API_KEY production <<< "$NOTION_API_KEY" 2>/dev/null || true
    vercel env add NOTION_DATABASE_BIPOLAR production <<< "$NOTION_DATABASE_BIPOLAR" 2>/dev/null || true
    vercel env add NOTION_DATABASE_NARCISISMO production <<< "$NOTION_DATABASE_NARCISISMO" 2>/dev/null || true
    vercel env add NOTION_DATABASE_MITOMANIA production <<< "$NOTION_DATABASE_MITOMANIA" 2>/dev/null || true
    vercel env add HASH_SECRET_KEY production <<< "$HASH_SECRET_KEY" 2>/dev/null || true
    vercel env add NODE_ENV production <<< "production" 2>/dev/null || true
    
    # Deploy
    log "Executando deploy..."
    if [ "$1" = "production" ]; then
        vercel --prod --yes
    else
        vercel --yes
    fi
    
    log "✅ Deploy para Vercel concluído"
}

# Deploy para Railway
deploy_railway() {
    log "Iniciando deploy para Railway..."
    
    if ! command -v railway &> /dev/null; then
        log "Instalando Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # Login no Railway (se necessário)
    railway login
    
    # Configura variáveis de ambiente
    log "Configurando variáveis de ambiente..."
    
    railway variables set NOTION_API_KEY="$NOTION_API_KEY"
    railway variables set NOTION_DATABASE_BIPOLAR="$NOTION_DATABASE_BIPOLAR"
    railway variables set NOTION_DATABASE_NARCISISMO="$NOTION_DATABASE_NARCISISMO"
    railway variables set NOTION_DATABASE_MITOMANIA="$NOTION_DATABASE_MITOMANIA"
    railway variables set HASH_SECRET_KEY="$HASH_SECRET_KEY"
    railway variables set NODE_ENV="production"
    
    # Deploy
    log "Executando deploy..."
    railway deploy
    
    log "✅ Deploy para Railway concluído"
}

# Deploy para Docker
deploy_docker() {
    log "Iniciando build Docker..."
    
    local image_name="triagem-psicologica-api"
    local tag="${1:-latest}"
    
    # Build da imagem
    log "Construindo imagem Docker..."
    docker build -t "$image_name:$tag" .
    
    # Tag para registry (se especificado)
    if [ -n "$DOCKER_REGISTRY" ]; then
        log "Taggeando para registry: $DOCKER_REGISTRY"
        docker tag "$image_name:$tag" "$DOCKER_REGISTRY/$image_name:$tag"
        
        # Push para registry
        log "Enviando para registry..."
        docker push "$DOCKER_REGISTRY/$image_name:$tag"
    fi
    
    log "✅ Build Docker concluído"
}

# Health check pós-deploy
post_deploy_health_check() {
    local url="$1"
    
    if [ -z "$url" ]; then
        warn "URL não fornecida para health check"
        return
    fi
    
    log "Executando health check pós-deploy..."
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        info "Tentativa $attempt/$max_attempts..."
        
        if curl -f -s "$url/health" > /dev/null; then
            log "✅ Health check passou - aplicação está online"
            return 0
        fi
        
        sleep 10
        ((attempt++))
    done
    
    error "Health check falhou após $max_attempts tentativas"
    return 1
}

# Função principal
main() {
    show_banner
    
    local command="$1"
    local environment="${2:-staging}"
    
    case $command in
        "vercel")
            check_prerequisites
            validate_env
            build_application
            deploy_vercel "$environment"
            ;;
        "railway")
            check_prerequisites
            validate_env
            build_application
            deploy_railway
            ;;
        "docker")
            check_prerequisites
            deploy_docker "$environment"
            ;;
        "build")
            check_prerequisites
            build_application
            ;;
        "check")
            check_prerequisites
            validate_env
            log "✅ Todas as verificações passaram"
            ;;
        "health")
            if [ -z "$2" ]; then
                error "URL é obrigatória para health check"
                echo "Uso: $0 health <URL>"
                exit 1
            fi
            post_deploy_health_check "$2"
            ;;
        *)
            echo "Uso: $0 <comando> [ambiente]"
            echo ""
            echo "Comandos disponíveis:"
            echo "  vercel [staging|production]  - Deploy para Vercel"
            echo "  railway                      - Deploy para Railway"
            echo "  docker [tag]                 - Build Docker"
            echo "  build                        - Build local"
            echo "  check                        - Verificar pré-requisitos"
            echo "  health <URL>                 - Health check"
            echo ""
            echo "Exemplos:"
            echo "  $0 vercel production"
            echo "  $0 railway"
            echo "  $0 docker v1.0.0"
            echo "  $0 health https://sua-app.vercel.app"
            exit 1
            ;;
    esac
}

# Executa função principal
main "$@"