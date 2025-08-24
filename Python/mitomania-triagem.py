import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
import math
from typing import Dict, List, Tuple
import json
from datetime import datetime, timedelta

# Configuração do seaborn para melhores visualizações
sns.set_style("whitegrid")
sns.set_palette("Set1")
plt.style.use('seaborn-v0_8')

# Configurações do seaborn para melhores gráficos
sns.set_context("notebook", font_scale=1.1)
plt.rcParams['figure.facecolor'] = 'white'
plt.rcParams['axes.facecolor'] = '#FAFAFA'

class AvaliacaoMitomaniaBR:
    """
    Ferramenta de Triagem para Mitomania (Pseudologia Fantástica) - Brasil
    
    Baseada em literatura clínica e pesquisa sobre transtorno da mentira patológica,
    pseudologia fantástica e comportamentos de fabricação compulsiva. Esta ferramenta
    identifica padrões de mentira patológica e comportamentos associados.
    
    ⚠️  AVISOS CRÍTICOS:
    - Esta NÃO é uma ferramenta diagnóstica para Mitomania
    - Apenas profissionais de saúde mental licenciados podem diagnosticar
    - Mitomania é um padrão complexo que requer avaliação profissional
    - Mentir ocasionalmente é comportamento humano normal
    - Esta ferramenta é apenas para fins educativos e de triagem
    - Resultados devem ser discutidos com um profissional de saúde
    - Foque na honestidade ao responder para resultados precisos
    """
    
    def __init__(self):
        self.perguntas = self._carregar_perguntas()
        self.descricoes_subescalas = {
            'Mentiras_Compulsivas': 'Tendência incontrolável de mentir mesmo sem necessidade',
            'Fantasias_Elaboradas': 'Criação de histórias complexas e detalhadas irreais',
            'Busca_Atencao': 'Necessidade excessiva de ser notado e admirado',
            'Manipulacao_Interpessoal': 'Uso de mentiras para controlar ou influenciar outros',
            'Confusao_Realidade': 'Dificuldade em distinguir entre verdade e fantasia',
            'Necessidade_Admiracao': 'Desejo intenso de ser visto como especial ou importante',
            'Impacto_Relacionamentos': 'Consequências das mentiras nos relacionamentos',
            'Comportamento_Teatral': 'Tendência a dramatizar e exagerar situações'
        }
        
        # Limites de nível de risco
        self.limites_risco = {
            'Baixo': 25,
            'Moderado': 45, 
            'Alto': 65,
            'Muito_Alto': 80
        }
        
        # Opções de tratamento para mitomania (foco em psicoterapia)
        self.opcoes_tratamento = {
            'Psicoterapias_Principais': {
                'Terapia Cognitivo-Comportamental (TCC)': {
                    'indicacao': 'Primeira linha para mitomania, reestruturação cognitiva',
                    'tecnicas': 'Identificação de gatilhos, registro de pensamentos, técnicas de autocontrole',
                    'duracao': '12-24 sessões, pode ser mais longa dependendo da gravidade',
                    'eficacia': 'Alta para redução de comportamentos de mentira compulsiva'
                },
                'Terapia Dialético-Comportamental (DBT)': {
                    'indicacao': 'Para casos com desregulação emocional e impulsividade',
                    'tecnicas': 'Mindfulness, tolerância ao estresse, regulação emocional',
                    'duracao': '6-12 meses com sessões semanais',
                    'eficacia': 'Boa para controle de impulsos e regulação emocional'
                },
                'Terapia Psicodinâmica': {
                    'indicacao': 'Explorar raízes inconscientes do comportamento de mentir',
                    'tecnicas': 'Interpretação, insight, transferência e contratransferência',
                    'duracao': 'Terapia de longo prazo (1-3 anos)',
                    'eficacia': 'Moderada, melhor para insight pessoal profundo'
                },
                'Terapia de Aceitação e Compromisso (ACT)': {
                    'indicacao': 'Foco em valores pessoais e aceitação de experiências internas',
                    'tecnicas': 'Mindfulness, defusão cognitiva, valores pessoais',
                    'duracao': '16-20 sessões',
                    'eficacia': 'Boa para aumento da flexibilidade psicológica'
                }
            },
            'Terapias_Adjuvantes': {
                'Terapia de Grupo': {
                    'indicacao': 'Desenvolvimento de habilidades sociais autênticas',
                    'beneficios': 'Feedback de pares, prática de honestidade, suporte social',
                    'formato': 'Grupos de 6-10 pessoas, sessões semanais',
                    'duracao': '3-6 meses'
                },
                'Terapia Familiar': {
                    'indicacao': 'Reparar relacionamentos danificados pela mitomania',
                    'objetivos': 'Reconstrução da confiança, comunicação honesta',
                    'formato': 'Sessões familiares quinzenais',
                    'duracao': '2-4 meses'
                },
                'Coaching de Vida': {
                    'indicacao': 'Desenvolvimento de habilidades práticas de vida',
                    'areas': 'Estabelecimento de metas realistas, habilidades sociais',
                    'formato': 'Sessões individuais semanais',
                    'duracao': '2-3 meses'
                }
            },
            'Medicamentos_Adjuvantes': {
                'Antidepressivos (ISRS)': {
                    'indicacao': 'Para ansiedade e depressão associadas',
                    'medicamentos': 'Sertralina, Fluoxetina, Escitalopram',
                    'dosagem': '50-200mg/dia (varia por medicamento)',
                    'observacoes': 'Não trata diretamente a mitomania'
                },
                'Estabilizadores de Humor': {
                    'indicacao': 'Se houver comorbidade com transtorno bipolar',
                    'medicamentos': 'Lítio, Valproato (apenas se indicado)',
                    'observacoes': 'Apenas para comorbidades específicas'
                },
                'Ansiolíticos': {
                    'indicacao': 'Ansiedade aguda (uso muito limitado)',
                    'medicamentos': 'Lorazepam, Clonazepam',
                    'observacoes': 'Uso a curto prazo apenas, risco de dependência'
                }
            },
            'Tecnicas_Autoajuda': {
                'Mindfulness e Meditação': {
                    'descricao': 'Aumento da consciência sobre impulsos de mentir',
                    'pratica': 'Meditação diária de 10-20 minutos',
                    'apps': 'Headspace, Calm, Insight Timer',
                    'beneficios': 'Maior autocontrole e consciência'
                },
                'Diário de Mentiras': {
                    'descricao': 'Registro sistemático de impulsos e episódios de mentira',
                    'formato': 'Data, situação, gatilho, mentira contada, consequências',
                    'frequencia': 'Preenchimento diário',
                    'beneficios': 'Identificação de padrões e gatilhos'
                },
                'Técnicas de Grounding': {
                    'descricao': 'Técnicas para se manter presente e conectado à realidade',
                    'exemplos': '5-4-3-2-1 (5 coisas que vê, 4 que ouve, etc.)',
                    'uso': 'Quando sentir impulso de mentir',
                    'beneficios': 'Redução da impulsividade'
                },
                'Grupo de Apoio': {
                    'descricao': 'Participação em grupos de pessoas com desafios similares',
                    'formato': 'Reuniões presenciais ou online',
                    'frequencia': 'Semanal ou quinzenal',
                    'beneficios': 'Suporte social e responsabilização'
                }
            },
            'Estrategias_Prevencao': {
                'Identificação de Gatilhos': {
                    'descricao': 'Reconhecer situações que levam ao impulso de mentir',
                    'gatilhos_comuns': 'Estresse, insegurança, medo de julgamento, busca de aprovação',
                    'estrategia': 'Listar e monitorar gatilhos pessoais',
                    'implementacao': 'Registro diário durante 2-4 semanas'
                },
                'Desenvolvimento de Honestidade': {
                    'descricao': 'Prática gradual de comunicação honesta',
                    'passos': 'Começar com situações de baixo risco, aumentar gradualmente',
                    'suporte': 'Família e amigos próximos como sistema de apoio',
                    'recompensas': 'Sistema de reforço positivo para honestidade'
                },
                'Manejo de Estresse': {
                    'descricao': 'Técnicas para lidar com estresse sem recorrer a mentiras',
                    'tecnicas': 'Exercício físico, relaxamento progressivo, respiração profunda',
                    'frequencia': 'Prática diária preventiva',
                    'beneficios': 'Redução da necessidade de mentir como escape'
                }
            }
        }
        
    def _carregar_perguntas(self) -> Dict[str, List[Dict]]:
        """Carregar perguntas de triagem para mitomania baseadas em literatura clínica"""
        return {
            'Mentiras_Compulsivas': [
                {'texto': 'Frequentemente minto mesmo quando a verdade seria mais fácil ou melhor', 'pontuacao': 'direta'},
                {'texto': 'Sinto um impulso forte para mentir, mesmo em situações sem importância', 'pontuacao': 'direta'},
                {'texto': 'Tenho dificuldade para parar de mentir uma vez que comecei', 'pontuacao': 'direta'},
                {'texto': 'Minto automaticamente, sem pensar conscientemente nisso', 'pontuacao': 'direta'},
                {'texto': 'Raramente sinto necessidade de inventar ou exagerar histórias', 'pontuacao': 'reversa'},
                {'texto': 'Minto várias vezes ao dia, mesmo sobre coisas pequenas', 'pontuacao': 'direta'},
                {'texto': 'Sempre falo a verdade, independentemente das consequências', 'pontuacao': 'reversa'}
            ],
            'Fantasias_Elaboradas': [
                {'texto': 'Crio histórias detalhadas e complexas sobre minha vida que não são verdadeiras', 'pontuacao': 'direta'},
                {'texto': 'Invento experiências dramáticas ou extraordinárias que nunca aconteceram', 'pontuacao': 'direta'},
                {'texto': 'Fabrico detalhes elaborados para tornar minhas histórias mais interessantes', 'pontuacao': 'direta'},
                {'texto': 'Conto a mesma história de formas diferentes para pessoas diferentes', 'pontuacao': 'direta'},
                {'texto': 'Mantenho minhas histórias simples e baseadas na realidade', 'pontuacao': 'reversa'},
                {'texto': 'Crio personagens ou situações fictícias e as apresento como reais', 'pontuacao': 'direta'},
                {'texto': 'Prefiro contar apenas fatos que realmente aconteceram', 'pontuacao': 'reversa'}
            ],
            'Busca_Atencao': [
                {'texto': 'Frequentemente invento ou exagero histórias para impressionar outros', 'pontuacao': 'direta'},
                {'texto': 'Sinto necessidade de ser o centro das atenções em conversas', 'pontuacao': 'direta'},
                {'texto': 'Conto histórias dramáticas sobre mim mesmo para obter simpatia ou admiração', 'pontuacao': 'direta'},
                {'texto': 'Fico desconfortável quando não sou o foco da atenção', 'pontuacao': 'direta'},
                {'texto': 'Estou satisfeito em ouvir outros falarem sobre suas experiências', 'pontuacao': 'reversa'},
                {'texto': 'Exagero meus problemas ou sucessos para obter mais atenção', 'pontuacao': 'direta'},
                {'texto': 'Raramente sinto necessidade de ser o centro das atenções', 'pontuacao': 'reversa'}
            ],
            'Manipulacao_Interpessoal': [
                {'texto': 'Uso mentiras para conseguir o que quero de outras pessoas', 'pontuacao': 'direta'},
                {'texto': 'Minto para evitar responsabilidades ou consequências', 'pontuacao': 'direta'},
                {'texto': 'Crio histórias para fazer outros sentirem pena de mim', 'pontuacao': 'direta'},
                {'texto': 'Uso informações falsas para influenciar decisões de outros', 'pontuacao': 'direta'},
                {'texto': 'Sempre sou direto e honesto em minhas comunicações', 'pontuacao': 'reversa'},
                {'texto': 'Minto para criar conflitos entre outras pessoas', 'pontuacao': 'direta'},
                {'texto': 'Nunca uso mentiras para obter vantagens pessoais', 'pontuacao': 'reversa'}
            ],
            'Confusao_Realidade': [
                {'texto': 'Às vezes tenho dificuldade para lembrar se algo realmente aconteceu ou se inventei', 'pontuacao': 'direta'},
                {'texto': 'Minhas fantasias às vezes parecem tão reais quanto memórias verdadeiras', 'pontuacao': 'direta'},
                {'texto': 'Começo a acreditar em minhas próprias mentiras depois de contá-las várias vezes', 'pontuacao': 'direta'},
                {'texto': 'Tenho momentos em que não tenho certeza do que é real', 'pontuacao': 'direta'},
                {'texto': 'Sempre tenho clareza sobre o que é verdade e o que é fantasia', 'pontuacao': 'reversa'},
                {'texto': 'Fico confuso sobre quais versões de uma história são verdadeiras', 'pontuacao': 'direta'},
                {'texto': 'Minha memória dos eventos é sempre precisa e confiável', 'pontuacao': 'reversa'}
            ],
            'Necessidade_Admiracao': [
                {'texto': 'Invento conquistas ou habilidades para impressionar outros', 'pontuacao': 'direta'},
                {'texto': 'Exagero meu status social, profissional ou financeiro', 'pontuacao': 'direta'},
                {'texto': 'Crio histórias sobre pessoas famosas ou importantes que "conheço"', 'pontuacao': 'direta'},
                {'texto': 'Minto sobre minha educação, formação ou experiência profissional', 'pontuacao': 'direta'},
                {'texto': 'Estou confortável sendo uma pessoa comum sem histórias especiais', 'pontuacao': 'reversa'},
                {'texto': 'Fabrico histórias sobre viagens ou experiências únicas que nunca tive', 'pontuacao': 'direta'},
                {'texto': 'Não sinto necessidade de impressionar outros com histórias elaboradas', 'pontuacao': 'reversa'}
            ],
            'Impacto_Relacionamentos': [
                {'texto': 'Minhas mentiras já causaram problemas sérios em relacionamentos', 'pontuacao': 'direta'},
                {'texto': 'Perdi amigos ou parceiros por causa de minhas mentiras', 'pontuacao': 'direta'},
                {'texto': 'Pessoas próximas me confrontaram sobre inconsistências em minhas histórias', 'pontuacao': 'direta'},
                {'texto': 'Sinto que preciso lembrar de várias versões diferentes da "verdade"', 'pontuacao': 'direta'},
                {'texto': 'Meus relacionamentos são baseados em honestidade e confiança mútua', 'pontuacao': 'reversa'},
                {'texto': 'Tenho dificuldade para manter relacionamentos próximos e duradouros', 'pontuacao': 'direta'},
                {'texto': 'As pessoas me veem como alguém confiável e honesto', 'pontuacao': 'reversa'}
            ],
            'Comportamento_Teatral': [
                {'texto': 'Tendo a dramatizar situações e exagerar emoções ao contar histórias', 'pontuacao': 'direta'},
                {'texto': 'Uso gestos e expressões dramáticas para tornar minhas histórias mais convincentes', 'pontuacao': 'direta'},
                {'texto': 'Adapto meu comportamento e personalidade dependendo da audiência', 'pontuacao': 'direta'},
                {'texto': 'Sinto que estou "interpretando" um papel em muitas situações sociais', 'pontuacao': 'direta'},
                {'texto': 'Mantenho a mesma personalidade em todas as situações', 'pontuacao': 'reversa'},
                {'texto': 'Exagero expressões faciais e tom de voz para efeito dramático', 'pontuacao': 'direta'},
                {'texto': 'Prefiro uma comunicação direta e sem dramatização', 'pontuacao': 'reversa'}
            ]
        }
    
    def administrar_triagem(self) -> Dict[str, float]:
        """
        Administrar a ferramenta de triagem de mitomania interativamente.
        Retorna pontuações para cada subescala e avaliação geral de risco.
        """
        print("="*85)
        print("FERRAMENTA DE TRIAGEM PARA MITOMANIA (PSEUDOLOGIA FANTÁSTICA) - BRASIL")
        print("="*85)
        print("\n🚨 AVISOS IMPORTANTES:")
        print("• Esta NÃO é uma ferramenta diagnóstica para Mitomania")
        print("• Apenas profissionais licenciados podem diagnosticar transtornos")
        print("• Mentir ocasionalmente é comportamento humano normal")
        print("• Seja honesto ao responder para resultados precisos")
        print("• Resultados devem ser discutidos com profissional de saúde")
        print("\n💡 SOBRE MITOMANIA:")
        print("• Também conhecida como Pseudologia Fantástica")
        print("• Caracterizada por mentiras compulsivas e elaboradas")
        print("• Diferente de mentiras ocasionais ou socialmente aceitáveis")
        print("• Tratamento principal é psicoterapia, não medicamentos")
        
        print("\n📞 RECURSOS DE APOIO - BRASIL:")
        print("• Centro de Valorização da Vida (CVV): 188")
        print("• Conselho Federal de Psicologia: encontre psicólogos")
        print("• CAPS (Centro de Atenção Psicossocial): atendimento público")
        
        print("\nAvalie cada afirmação de 1-5:")
        print("1 = Nunca/Discordo Totalmente")
        print("2 = Raramente/Discordo")
        print("3 = Às vezes/Neutro")
        print("4 = Frequentemente/Concordo")
        print("5 = Sempre/Concordo Totalmente")
        print("-" * 85)
        
        print("\n⚠️  IMPORTANTE: Esta triagem requer honestidade para ser útil.")
        print("Lembre-se: reconhecer padrões é o primeiro passo para mudança positiva.")
        
        pontuacoes = {}
        todas_respostas = []
        
        for subescala, perguntas in self.perguntas.items():
            print(f"\n{subescala.replace('_', ' ').upper()}: {self.descricoes_subescalas[subescala]}")
            print("-" * 70)
            
            pontuacoes_subescala = []
            for i, p in enumerate(perguntas, 1):
                while True:
                    try:
                        resposta = input(f"{i}. {p['texto']}: ")
                        pontuacao = int(resposta)
                        if 1 <= pontuacao <= 5:
                            # Aplicar pontuação (reverter se necessário)
                            if p['pontuacao'] == 'reversa':
                                pontuacao_final = 6 - pontuacao
                            else:
                                pontuacao_final = pontuacao
                            
                            pontuacoes_subescala.append(pontuacao_final)
                            todas_respostas.append(pontuacao_final)
                            break
                        else:
                            print("Por favor, digite um número entre 1 e 5")
                    except ValueError:
                        print("Por favor, digite um número válido")
            
            # Calcular pontuação normalizada da subescala (0-100)
            pontuacao_bruta = sum(pontuacoes_subescala)
            maximo_possivel = len(perguntas) * 5
            pontuacao_normalizada = (pontuacao_bruta / maximo_possivel) * 100
            pontuacoes[subescala] = pontuacao_normalizada
        
        # Calcular pontuação geral com componentes ponderados
        pesos = {
            'Mentiras_Compulsivas': 0.30,
            'Fantasias_Elaboradas': 0.20,
            'Busca_Atencao': 0.15,
            'Manipulacao_Interpessoal': 0.15,
            'Confusao_Realidade': 0.10,
            'Necessidade_Admiracao': 0.05,
            'Impacto_Relacionamentos': 0.03,
            'Comportamento_Teatral': 0.02
        }
        
        pontuacao_geral = sum(pontuacoes[subescala] * peso for subescala, peso in pesos.items())
        pontuacoes['Pontuacao_Geral_Mitomania'] = pontuacao_geral
        
        # Adicionar feedback imediato
        self._feedback_imediato(pontuacoes)
        
        return pontuacoes
    
    def _feedback_imediato(self, pontuacoes):
        """Fornecer feedback imediato após a triagem"""
        pontuacao_geral = pontuacoes['Pontuacao_Geral_Mitomania']
        
        print("\n" + "="*85)
        print("FEEDBACK IMEDIATO")
        print("="*85)
        
        if pontuacao_geral > 70:
            print("🚨 PONTUAÇÃO ALTA DETECTADA")
            print("Suas respostas sugerem padrões significativos consistentes com mitomania.")
            print("Recomendamos fortemente consulta com psicólogo ou psiquiatra.")
        elif pontuacao_geral > 45:
            print("⚠️  PONTUAÇÃO MODERADA")
            print("Alguns padrões preocupantes identificados.")
            print("Considere conversar com um profissional de saúde mental.")
        else:
            print("✅ PONTUAÇÃO BAIXA")
            print("Não há indicadores significativos de mitomania.")
            print("Continue praticando comunicação honesta e autêntica.")
        
        print(f"\nSua pontuação: {pontuacao_geral:.1f}/100")
        print("\nLembre-se: Esta é apenas uma triagem, não um diagnóstico.")
    
    def pontuacoes_demo(self) -> Dict[str, float]:
        """Gerar pontuações demo para visualização"""
        return {
            'Mentiras_Compulsivas': 75,
            'Fantasias_Elaboradas': 68,
            'Busca_Atencao': 82,
            'Manipulacao_Interpessoal': 45,
            'Confusao_Realidade': 55,
            'Necessidade_Admiracao': 70,
            'Impacto_Relacionamentos': 65,
            'Comportamento_Teatral': 78,
            'Pontuacao_Geral_Mitomania': 67
        }
    
    def criar_relatorio_abrangente(self, pontuacoes: Dict[str, float], titulo: str = "Resultados da Triagem de Mitomania"):
        """Criar visualização e análise abrangentes"""
        
        # Criar figura com estilo seaborn aprimorado
        plt.style.use('seaborn-v0_8-darkgrid')
        fig = plt.figure(figsize=(24, 18))
        fig.patch.set_facecolor('white')
        
        # 1. Medidor de Risco Geral
        ax1 = plt.subplot(3, 4, 1)
        self._criar_medidor_mitomania(ax1, pontuacoes['Pontuacao_Geral_Mitomania'])
        
        # 2. Perfil de Comportamentos
        ax2 = plt.subplot(3, 4, (2, 3), projection='polar')
        self._criar_radar_comportamentos(ax2, pontuacoes)
        
        # 3. Classificação de Severidade
        ax3 = plt.subplot(3, 4, 4)
        self._criar_classificacao_severidade(ax3, pontuacoes['Pontuacao_Geral_Mitomania'])
        
        # 4. Análise Detalhada por Categoria
        ax4 = plt.subplot(3, 4, (5, 7))
        self._criar_analise_categorias(ax4, pontuacoes)
        
        # 5. Mapa de Calor de Intensidade
        ax5 = plt.subplot(3, 4, 8)
        self._criar_mapa_calor_intensidade(ax5, pontuacoes)
        
        # 6. Padrão de Comportamento Temporal
        ax6 = plt.subplot(3, 4, (9, 10))
        self._criar_padrao_temporal(ax6, pontuacoes)
        
        # 7. Comparação com População
        ax7 = plt.subplot(3, 4, 11)
        self._criar_comparacao_populacional(ax7, pontuacoes['Pontuacao_Geral_Mitomania'])
        
        # 8. Recomendações de Tratamento
        ax8 = plt.subplot(3, 4, 12)
        self._criar_painel_tratamento(ax8, pontuacoes)
        
        plt.suptitle(titulo, fontsize=22, fontweight='bold', y=0.98)
        plt.tight_layout()
        plt.subplots_adjust(top=0.94)
        plt.show()
    
    def _criar_medidor_mitomania(self, ax, pontuacao_geral):
        """Criar medidor estilo velocímetro para mitomania"""
        theta = np.linspace(0, np.pi, 100)
        
        # Paleta de cores para severidade
        cores_severidade = sns.color_palette("YlOrRd", 4)
        
        cores = []
        for angulo in theta:
            score_no_angulo = (angulo / np.pi) * 100
            if score_no_angulo < 25:
                cores.append('#2ECC71')  # Verde - Baixo
            elif score_no_angulo < 45:
                cores.append('#F39C12')  # Amarelo - Moderado
            elif score_no_angulo < 65:
                cores.append('#E67E22')  # Laranja - Alto
            else:
                cores.append('#E74C3C')  # Vermelho - Muito Alto
        
        # Plotar fundo do medidor
        for i in range(len(theta)-1):
            ax.fill_between([theta[i], theta[i+1]], [0.8, 0.8], [1, 1], 
                           color=cores[i], alpha=0.9)
        
        # Plotar ponteiro
        angulo_ponteiro = (pontuacao_geral / 100) * np.pi
        ax.arrow(angulo_ponteiro, 0, 0, 0.9, head_width=0.06, head_length=0.06, 
                fc='#2C3E50', ec='#2C3E50', linewidth=5)
        
        # Adicionar texto da pontuação
        ax.text(np.pi/2, 0.5, f'{pontuacao_geral:.0f}', ha='center', va='center',
               fontsize=32, fontweight='bold', color='#2C3E50')
        ax.text(np.pi/2, 0.25, 'Índice\nMitomania', ha='center', va='center',
               fontsize=14, fontweight='bold', color='#34495E')
        
        # Rótulos aprimorados
        ax.set_ylim(0, 1)
        ax.set_xlim(0, np.pi)
        ax.set_xticks([0, np.pi/4, np.pi/2, 3*np.pi/4, np.pi])
        ax.set_xticklabels(['Baixo\n(0-25)', 'Moderado\n(25-45)', 'Alto\n(45-65)', 
                           'Muito Alto\n(65-80)', 'Crítico\n(80-100)'], fontsize=11)
        ax.set_yticks([])
        ax.set_title('Nível Geral de Mitomania', fontweight='bold', pad=30, fontsize=16)
    
    def _criar_radar_comportamentos(self, ax, pontuacoes):
        """Criar gráfico radar para comportamentos de mitomania"""
        comportamentos = [k for k in pontuacoes.keys() if k != 'Pontuacao_Geral_Mitomania']
        valores = [pontuacoes[k] for k in comportamentos]
        
        # Fechar o polígono
        valores += valores[:1]
        
        # Calcular ângulos
        angulos = np.linspace(0, 2 * np.pi, len(comportamentos), endpoint=False).tolist()
        angulos += angulos[:1]
        
        # Estilo de gráfico radar aprimorado
        cores = sns.color_palette("plasma", 3)
        
        # Plotar com preenchimento gradiente
        ax.plot(angulos, valores, 'o-', linewidth=4, color=cores[0], 
               markersize=10, markerfacecolor=cores[1], markeredgecolor=cores[0], 
               markeredgewidth=3)
        ax.fill(angulos, valores, alpha=0.4, color=cores[0])
        
        # Personalizar
        rotulos = [s.replace('_', '\n') for s in comportamentos]
        ax.set_xticks(angulos[:-1])
        ax.set_xticklabels(rotulos, fontsize=10, fontweight='bold')
        ax.set_ylim(0, 100)
        ax.set_yticks([25, 50, 75, 100])
        ax.set_yticklabels(['25', '50', '75', '100'], fontsize=11)
        ax.grid(True, alpha=0.7)
        ax.set_title('Perfil de Comportamentos de Mitomania', fontweight='bold', pad=30, fontsize=16)
        
        # Adicionar rótulos de pontuação
        for angulo, valor, comportamento in zip(angulos[:-1], valores[:-1], comportamentos):
            offset = 8 if valor > 85 else 6
            ax.text(angulo, valor + offset, f'{valor:.0f}', 
                   horizontalalignment='center', fontsize=10, fontweight='bold',
                   bbox=dict(boxstyle="round,pad=0.3", facecolor='white', 
                           alpha=0.9, edgecolor=cores[0], linewidth=2))
    
    def _criar_classificacao_severidade(self, ax, pontuacao_geral):
        """Criar classificação de severidade"""
        niveis = ['Baixo\n(0-25)', 'Moderado\n(25-45)', 'Alto\n(45-65)', 
                 'Muito Alto\n(65-80)', 'Crítico\n(80-100)']
        valores = [25, 20, 20, 15, 20]
        
        # Cores baseadas na severidade
        cores = ['#2ECC71', '#F39C12', '#E67E22', '#E74C3C', '#8E44AD']
        
        # Determinar nível atual
        if pontuacao_geral < 25:
            nivel_atual = 0
        elif pontuacao_geral < 45:
            nivel_atual = 1
        elif pontuacao_geral < 65:
            nivel_atual = 2
        elif pontuacao_geral < 80:
            nivel_atual = 3
        else:
            nivel_atual = 4
        
        # Criar barras
        barras = ax.bar(niveis, valores, color=cores, alpha=0.8, 
                       edgecolor='white', linewidth=3)
        
        # Destacar nível atual
        barras[nivel_atual].set_alpha(1.0)
        barras[nivel_atual].set_edgecolor('#2C3E50')
        barras[nivel_atual].set_linewidth(5)
        
        # Estilo
        ax.set_ylabel('Faixa de Pontuação', fontweight='bold', fontsize=13)
        ax.set_title('Classificação de Severidade', fontweight='bold', fontsize=16, pad=25)
        ax.set_ylim(0, 30)
        
        # Indicador do nível atual
        ax.text(nivel_atual, barras[nivel_atual].get_height() + 1.5, 
               f'SEU NÍVEL\n({pontuacao_geral:.0f})', ha='center', va='bottom',
               fontweight='bold', fontsize=12, 
               bbox=dict(boxstyle="round,pad=0.6", facecolor='yellow', 
                        alpha=0.95, edgecolor='orange', linewidth=3))
        
        ax.grid(True, alpha=0.4, axis='y')
        ax.set_facecolor('#FAFAFA')
        plt.setp(ax.get_xticklabels(), fontsize=10, fontweight='bold')
    
    def _criar_analise_categorias(self, ax, pontuacoes):
        """Criar análise detalhada por categorias"""
        comportamentos = [k for k in pontuacoes.keys() if k != 'Pontuacao_Geral_Mitomania']
        valores = [pontuacoes[k] for k in comportamentos]
        
        # Categorizar comportamentos
        df = pd.DataFrame({
            'Comportamento': [s.replace('_', ' ') for s in comportamentos],
            'Pontuacao': valores,
            'Categoria': ['Comportamento Central' if s in ['Mentiras_Compulsivas', 'Fantasias_Elaboradas'] else
                         'Motivação Social' if s in ['Busca_Atencao', 'Necessidade_Admiracao'] else
                         'Manipulação' if s in ['Manipulacao_Interpessoal'] else
                         'Impacto Psicológico' for s in comportamentos]
        })
        
        # Cores por categoria
        cores_categorias = {
            'Comportamento Central': '#E74C3C',
            'Motivação Social': '#3498DB',
            'Manipulação': '#8E44AD',
            'Impacto Psicológico': '#F39C12'
        }
        
        cores = [cores_categorias[cat] for cat in df['Categoria']]
        
        # Criar gráfico de barras horizontais
        y_pos = np.arange(len(comportamentos))
        barras = ax.barh(y_pos, valores, color=cores, alpha=0.85, 
                        edgecolor='white', linewidth=2)
        
        # Adicionar rótulos de valores
        for i, (barra, valor) in enumerate(zip(barras, valores)):
            largura = barra.get_width()
            ax.text(largura + 1.5, barra.get_y() + barra.get_height()/2,
                   f'{valor:.0f}', ha='left', va='center', fontweight='bold', 
                   fontsize=12, color='#2C3E50')
        
        # Estilo
        ax.set_yticks(y_pos)
        ax.set_yticklabels(df['Comportamento'], fontsize=11, fontweight='bold')
        ax.set_xlabel('Pontuação (0-100)', fontweight='bold', fontsize=14)
        ax.set_title('Análise Detalhada por Categoria', fontweight='bold', fontsize=16, pad=25)
        ax.set_xlim(0, 110)
        
        # Linhas de referência
        ax.axvline(x=45, color='orange', linestyle='--', alpha=0.8, linewidth=2, label='Limiar Moderado')
        ax.axvline(x=65, color='red', linestyle='--', alpha=0.8, linewidth=2, label='Limiar Alto')
        
        # Legenda
        from matplotlib.patches import Patch
        elementos_legenda = [Patch(facecolor=cor, label=categoria) 
                            for categoria, cor in cores_categorias.items()]
        ax.legend(handles=elementos_legenda, loc='lower right', frameon=True, 
                 fancybox=True, shadow=True, fontsize=10)
        
        ax.grid(True, alpha=0.4, axis='x')
        ax.set_facecolor('#FAFAFA')
    
    def _criar_mapa_calor_intensidade(self, ax, pontuacoes):
        """Criar mapa de calor de intensidade dos comportamentos"""
        comportamentos = [k for k in pontuacoes.keys() if k != 'Pontuacao_Geral_Mitomania']
        
        # Criar matriz de intensidade
        dados_intensidade = []
        rotulos = []
        
        for comportamento in comportamentos:
            pontuacao = pontuacoes[comportamento]
            # Converter para níveis de intensidade
            if pontuacao < 25:
                intensidade = [1, 0, 0, 0]  # Baixo
            elif pontuacao < 45:
                intensidade = [1, 1, 0, 0]  # Moderado
            elif pontuacao < 65:
                intensidade = [1, 1, 1, 0]  # Alto
            else:
                intensidade = [1, 1, 1, 1]  # Muito Alto
            
            dados_intensidade.append(intensidade)
            rotulos.append(comportamento.replace('_', '\n'))
        
        # Criar mapa de calor
        matriz_intensidade = np.array(dados_intensidade)
        sns.heatmap(matriz_intensidade, 
                   yticklabels=rotulos,
                   xticklabels=['Baixo', 'Moderado', 'Alto', 'Crítico'],
                   cmap='OrRd', cbar=False, ax=ax,
                   linewidths=1, linecolor='white')
        
        ax.set_title('Mapa de Intensidade dos Comportamentos', fontweight='bold', fontsize=14, pad=20)
        ax.set_xlabel('Nível de Intensidade', fontweight='bold', fontsize=12)
        ax.tick_params(axis='both', labelsize=9)
    
    def _criar_padrao_temporal(self, ax, pontuacoes):
        """Criar simulação de padrão temporal de comportamentos"""
        # Simular evolução temporal baseada nas pontuações
        datas = pd.date_range(start='2024-01-01', end='2025-08-14', freq='M')
        
        # Simular intensidade de mentiras ao longo do tempo
        intensidade_base = pontuacoes['Mentiras_Compulsivas'] / 100
        busca_atencao = pontuacoes['Busca_Atencao'] / 100
        
        padrao_temporal = []
        for i, data in enumerate(datas):
            # Criar variação sazonal e tendência
            variacao_sazonal = 0.2 * np.sin(2 * np.pi * i / 12)  # Ciclo anual
            tendencia = intensidade_base + variacao_sazonal
            ruido = busca_atencao * np.random.normal(0, 0.1)
            
            valor = (tendencia + ruido) * 100
            valor = np.clip(valor, 0, 100)
            padrao_temporal.append(valor)
        
        # Criar gráfico de linha temporal
        cores = sns.color_palette("viridis", 3)
        ax.plot(datas, padrao_temporal, linewidth=4, color=cores[0], 
               marker='o', markersize=6, alpha=0.8)
        
        # Adicionar zonas de severidade
        ax.axhspan(0, 25, alpha=0.2, color='green', label='Baixo')
        ax.axhspan(25, 45, alpha=0.2, color='yellow', label='Moderado')
        ax.axhspan(45, 65, alpha=0.2, color='orange', label='Alto')
        ax.axhspan(65, 100, alpha=0.2, color='red', label='Crítico')
        
        # Estilo
        ax.set_xlabel('Período', fontweight='bold', fontsize=12)
        ax.set_ylabel('Intensidade de Comportamentos', fontweight='bold', fontsize=12)
        ax.set_title('Padrão Temporal Simulado\n(Baseado em Suas Respostas)', 
                    fontweight='bold', fontsize=14, pad=20)
        ax.set_ylim(0, 100)
        ax.legend(loc='upper right', frameon=True, fancybox=True, shadow=True)
        ax.grid(True, alpha=0.4)
        
        # Formatar eixo x
        import matplotlib.dates as mdates
        ax.xaxis.set_major_formatter(mdates.DateFormatter('%m/%y'))
        ax.tick_params(axis='x', rotation=45)
    
    def _criar_comparacao_populacional(self, ax, pontuacao_geral):
        """Criar comparação com população geral"""
        # Simular distribuição populacional (mitomania é relativamente rara)
        np.random.seed(42)
        populacao = np.random.beta(1.5, 8, 10000) * 100  # Distribuição beta assimétrica
        populacao = np.clip(populacao, 0, 100)
        
        # Calcular percentil
        percentil = (np.sum(populacao < pontuacao_geral) / len(populacao)) * 100
        
        # Criar histograma
        cores = sns.color_palette("coolwarm", 3)
        n, bins, patches = ax.hist(populacao, bins=30, alpha=0.7, color=cores[0], 
                                  edgecolor='white', linewidth=1, density=True)
        
        # Adicionar curva suave
        x = np.linspace(0, 100, 100)
        from scipy.stats import beta
        a, b = 1.5, 8
        y = beta.pdf(x/100, a, b) / 100
        ax.plot(x, y, color=cores[1], linewidth=4, alpha=0.9, label='Curva Populacional')
        
        # Linha da pontuação
        ax.axvline(pontuacao_geral, color='#E74C3C', linewidth=5, alpha=0.9,
                  label=f'Sua Pontuação ({pontuacao_geral:.0f})', linestyle='-')
        
        # Estilo
        ax.set_xlabel('Pontuação de Mitomania', fontweight='bold', fontsize=12)
        ax.set_ylabel('Densidade', fontweight='bold', fontsize=12)
        ax.set_title(f'Comparação Populacional\n{percentil:.0f}º Percentil', 
                    fontweight='bold', fontsize=14, pad=20)
        ax.legend(frameon=True, fancybox=True, shadow=True)
        ax.grid(True, alpha=0.4)
        ax.set_facecolor('#FAFAFA')
        
        # Texto informativo
        texto_info = f'Pontuação maior que\n{percentil:.0f}% da população'
        props = dict(boxstyle='round', facecolor='lightcyan', alpha=0.8)
        ax.text(0.05, 0.95, texto_info, transform=ax.transAxes, fontsize=11,
                verticalalignment='top', bbox=props, fontweight='bold')
    
    def _criar_painel_tratamento(self, ax, pontuacoes):
        """Criar painel de recomendações de tratamento"""
        ax.axis('off')
        pontuacao_geral = pontuacoes['Pontuacao_Geral_Mitomania']
        
        # Obter principais áreas problemáticas
        comportamentos = {k: v for k, v in pontuacoes.items() if k != 'Pontuacao_Geral_Mitomania'}
        principais_problemas = sorted(comportamentos.items(), key=lambda x: x[1], reverse=True)[:3]
        
        # Gerar recomendações baseadas na severidade
        if pontuacao_geral < 25:
            nivel = "BAIXO RISCO"
            recomendacoes = """
RECOMENDAÇÕES:
• Continue praticando comunicação honesta
• Desenvolva autoconhecimento e mindfulness
• Fortaleça relacionamentos autênticos
• Considere grupos de desenvolvimento pessoal
• Mantenha diário de reflexões diárias
            """
            tratamentos = """
ABORDAGENS SUGERIDAS:
• Técnicas de autoajuda e mindfulness
• Grupos de desenvolvimento pessoal
• Coaching de vida (opcional)
• Leitura sobre comunicação autêntica
            """
        elif pontuacao_geral < 45:
            nivel = "RISCO MODERADO"
            recomendacoes = f"""
RECOMENDAÇÕES:
• Consulte psicólogo especializado
• Inicie terapia cognitivo-comportamental
• Aborde área principal: {principais_problemas[0][0].replace('_', ' ')}
• Pratique técnicas de mindfulness
• Considere terapia de grupo
            """
            tratamentos = """
TRATAMENTOS INDICADOS:
• Terapia Cognitivo-Comportamental (TCC)
• Técnicas de mindfulness e meditação
• Diário de mentiras e gatilhos
• Grupos de apoio ou terapia de grupo
            """
        elif pontuacao_geral < 65:
            nivel = "RISCO ALTO"
            recomendacoes = f"""
RECOMENDAÇÕES:
• URGENTE: Avaliação psicológica completa
• Terapia intensiva (2x por semana)
• Trabalhar: {', '.join([p[0].replace('_', ' ') for p in principais_problemas[:2]])}
• Envolver família no tratamento
• Monitoramento de progresso semanal
            """
            tratamentos = """
TRATAMENTOS NECESSÁRIOS:
• TCC intensiva + DBT se necessário
• Terapia familiar/casal
• Grupos de apoio especializados
• Possível medicação para ansiedade/depressão
            """
        else:
            nivel = "RISCO CRÍTICO"
            recomendacoes = """
RECOMENDAÇÕES:
• Avaliação psiquiátrica IMEDIATA
• Tratamento intensivo multidisciplinar
• Possível internação parcial
• Envolvimento familiar obrigatório
• Monitoramento diário inicial
• Afastamento de situações de risco
            """
            tratamentos = """
TRATAMENTOS URGENTES:
• Terapia intensiva (3x+ por semana)
• Avaliação psiquiátrica completa
• Possível medicação para comorbidades
• Programa estruturado de reabilitação
• Suporte social intensivo
            """
        
        texto_recomendacao = f"""
🎯 NÍVEL DE SEVERIDADE: {nivel}
Pontuação Geral: {pontuacao_geral:.0f}/100

Top 3 Áreas Problemáticas:
1. {principais_problemas[0][0].replace('_', ' ')}: {principais_problemas[0][1]:.0f}
2. {principais_problemas[1][0].replace('_', ' ')}: {principais_problemas[1][1]:.0f}
3. {principais_problemas[2][0].replace('_', ' ')}: {principais_problemas[2][1]:.0f}

{recomendacoes}

🏥 OPÇÕES DE TRATAMENTO:
{tratamentos}

📞 RECURSOS BRASIL:
• Conselho Federal de Psicologia
• CAPS - Centro de Atenção Psicossocial
• CVV: 188 (apoio emocional)
• Universidades com clínicas-escola

💡 LEMBRE-SE:
• Mitomania é tratável com psicoterapia
• Medicamentos não curam, mas ajudam sintomas
• Honestidade é essencial no tratamento
• Mudança é possível com comprometimento
        """
        
        # Cor de fundo baseada na severidade
        if pontuacao_geral < 25:
            cor_fundo = 'lightgreen'
        elif pontuacao_geral < 45:
            cor_fundo = 'lightyellow'
        elif pontuacao_geral < 65:
            cor_fundo = 'orange'
        else:
            cor_fundo = 'lightcoral'
        
        ax.text(0.05, 0.95, texto_recomendacao, transform=ax.transAxes, 
               fontsize=8.5, verticalalignment='top', fontfamily='monospace',
               bbox=dict(boxstyle="round,pad=0.6", facecolor=cor_fundo, alpha=0.9,
                        edgecolor='gray', linewidth=2))
    
    def criar_guia_tratamento(self, pontuacoes: Dict[str, float]):
        """Criar guia detalhado de tratamento baseado nas pontuações"""
        
        fig, axes = plt.subplots(2, 2, figsize=(20, 14))
        fig.suptitle('Guia Completo de Tratamento para Mitomania', 
                    fontsize=18, fontweight='bold', y=0.98)
        
        pontuacao_geral = pontuacoes['Pontuacao_Geral_Mitomania']
        
        # 1. Psicoterapias Principais
        ax1 = axes[0, 0]
        self._criar_grafico_psicoterapias(ax1, pontuacao_geral)
        
        # 2. Terapias Adjuvantes
        ax2 = axes[0, 1]
        self._criar_grafico_terapias_adjuvantes(ax2, pontuacao_geral)
        
        # 3. Técnicas de Autoajuda
        ax3 = axes[1, 0]
        self._criar_grafico_autoajuda(ax3, pontuacao_geral)
        
        # 4. Timeline de Tratamento
        ax4 = axes[1, 1]
        self._criar_timeline_tratamento(ax4, pontuacao_geral)
        
        plt.tight_layout()
        plt.subplots_adjust(top=0.94)
        plt.show()
        
        # Mostrar informações detalhadas
        self._mostrar_detalhes_tratamento(pontuacao_geral)
    
    def _criar_grafico_psicoterapias(self, ax, pontuacao_geral):
        """Criar gráfico de adequação das psicoterapias"""
        terapias = ['TCC', 'DBT', 'Psicodinâmica', 'ACT']
        
        # Adequação baseada na pontuação geral
        if pontuacao_geral < 45:
            adequacao = [85, 60, 70, 75]
        elif pontuacao_geral < 65:
            adequacao = [95, 80, 65, 85]
        else:
            adequacao = [95, 90, 70, 80]
        
        # Cores baseadas na adequação
        cores = ['#27AE60' if a >= 80 else '#F39C12' if a >= 60 else '#E74C3C' for a in adequacao]
        
        barras = ax.bar(terapias, adequacao, color=cores, alpha=0.8,
                       edgecolor='white', linewidth=2)
        
        # Adicionar valores
        for barra, valor in zip(barras, adequacao):
            altura = barra.get_height()
            ax.text(barra.get_x() + barra.get_width()/2., altura + 2,
                   f'{valor}%', ha='center', va='bottom', fontweight='bold')
        
        ax.set_ylabel('Adequação (%)', fontweight='bold')
        ax.set_title('Psicoterapias Principais', fontweight='bold', fontsize=14)
        ax.set_ylim(0, 105)
        ax.grid(True, alpha=0.3, axis='y')
        
        # Legenda
        ax.text(0.02, 0.98, 'Verde: Alta adequação\nAmarelo: Moderada\nVermelho: Baixa', 
               transform=ax.transAxes, fontsize=9, verticalalignment='top',
               bbox=dict(boxstyle="round,pad=0.3", facecolor='white', alpha=0.8))
    
    def _criar_grafico_terapias_adjuvantes(self, ax, pontuacao_geral):
        """Criar gráfico de terapias adjuvantes"""
        terapias = ['Terapia Grupo', 'Terapia Familiar', 'Coaching']
        
        if pontuacao_geral < 45:
            adequacao = [70, 60, 80]
        else:
            adequacao = [85, 90, 70]
        
        cores = ['#3498DB', '#9B59B6', '#E67E22']
        
        barras = ax.bar(terapias, adequacao, color=cores, alpha=0.8,
                       edgecolor='white', linewidth=2)
        
        for barra, valor in zip(barras, adequacao):
            altura = barra.get_height()
            ax.text(barra.get_x() + barra.get_width()/2., altura + 2,
                   f'{valor}%', ha='center', va='bottom', fontweight='bold')
        
        ax.set_ylabel('Adequação (%)', fontweight='bold')
        ax.set_title('Terapias Adjuvantes', fontweight='bold', fontsize=14)
        ax.set_ylim(0, 105)
        ax.grid(True, alpha=0.3, axis='y')
    
    def _criar_grafico_autoajuda(self, ax, pontuacao_geral):
        """Criar gráfico de técnicas de autoajuda"""
        tecnicas = ['Mindfulness', 'Diário', 'Grounding', 'Grupos Apoio']
        
        # Todas as técnicas são úteis, mas variam em importância
        adequacao = [90, 85, 75, 70] if pontuacao_geral > 45 else [85, 80, 70, 60]
        
        cores = sns.color_palette("Set2", len(tecnicas))
        
        barras = ax.bar(tecnicas, adequacao, color=cores, alpha=0.8,
                       edgecolor='white', linewidth=2)
        
        for barra, valor in zip(barras, adequacao):
            altura = barra.get_height()
            ax.text(barra.get_x() + barra.get_width()/2., altura + 2,
                   f'{valor}%', ha='center', va='bottom', fontweight='bold')
        
        ax.set_ylabel('Importância (%)', fontweight='bold')
        ax.set_title('Técnicas de Autoajuda', fontweight='bold', fontsize=14)
        ax.set_ylim(0, 105)
        ax.grid(True, alpha=0.3, axis='y')
        plt.setp(ax.get_xticklabels(), rotation=45, ha='right')
    
    def _criar_timeline_tratamento(self, ax, pontuacao_geral):
        """Criar timeline de tratamento"""
        fases = ['Avaliação\n(1-2 sem)', 'Início Terapia\n(1-3 meses)', 
                'Tratamento\n(6-12 meses)', 'Manutenção\n(6+ meses)']
        
        if pontuacao_geral < 45:
            duracao = [1.5, 10, 30, 24]  # Semanas
        else:
            duracao = [2, 12, 48, 36]
        
        cores_timeline = ['#E74C3C', '#F39C12', '#3498DB', '#27AE60']
        
        barras = ax.bar(fases, duracao, color=cores_timeline, alpha=0.8,
                       edgecolor='white', linewidth=2)
        
        for barra, valor in zip(barras, duracao):
            altura = barra.get_height()
            if valor < 4:
                texto = f'{valor} sem'
            else:
                texto = f'{valor/4:.0f} meses'
            ax.text(barra.get_x() + barra.get_width()/2., altura + 1,
                   texto, ha='center', va='bottom', fontweight='bold', fontsize=10)
        
        ax.set_ylabel('Duração (semanas)', fontweight='bold')
        ax.set_title('Timeline de Tratamento', fontweight='bold', fontsize=14)
        ax.grid(True, alpha=0.3, axis='y')
        plt.setp(ax.get_xticklabels(), fontsize=10, ha='center')
    
    def _mostrar_detalhes_tratamento(self, pontuacao_geral):
        """Mostrar detalhes completos do tratamento"""
        print("\n" + "="*90)
        print("DETALHES COMPLETOS DO TRATAMENTO PARA MITOMANIA")
        print("="*90)
        
        if pontuacao_geral >= 65:
            print("\n🚨 PROTOCOLO DE TRATAMENTO INTENSIVO:")
            print("• Avaliação psiquiátrica completa (1-2 semanas)")
            print("• TCC intensiva: 2-3 sessões/semana inicialmente")
            print("• DBT para regulação emocional (se necessário)")
            print("• Terapia familiar obrigatória")
            print("• Grupos de apoio especializados")
            print("• Monitoramento semanal de progresso")
            print("• Possível medicação para ansiedade/depressão")
            
        elif pontuacao_geral >= 45:
            print("\n⚠️  PROTOCOLO DE TRATAMENTO PADRÃO:")
            print("• Avaliação psicológica (1 semana)")
            print("• TCC: 1 sessão/semana (6-12 meses)")
            print("• Terapia de grupo quinzenal")
            print("• Técnicas de mindfulness diárias")
            print("• Diário de mentiras e gatilhos")
            print("• Avaliação mensal de progresso")
            
        else:
            print("\n✅ PROTOCOLO DE PREVENÇÃO/MANUTENÇÃO:")
            print("• Autoavaliação inicial")
            print("• Técnicas de autoajuda")
            print("• Mindfulness e meditação")
            print("• Grupos de desenvolvimento pessoal")
            print("• Coaching de vida (opcional)")
        
        print("\n💊 SOBRE MEDICAMENTOS:")
        print("• Mitomania NÃO tem medicamentos específicos")
        print("• Antidepressivos podem ajudar ansiedade/depressão associadas")
        print("• Ansiolíticos apenas para crises agudas")
        print("• Foco principal deve ser na psicoterapia")
        
        print("\n🎯 OBJETIVOS DO TRATAMENTO:")
        print("• Reduzir frequência e intensidade das mentiras")
        print("• Desenvolver habilidades de comunicação honesta")
        print("• Melhorar relacionamentos interpessoais")
        print("• Aumentar autoestima de forma saudável")
        print("• Desenvolver tolerância à realidade")
        print("• Aprender estratégias de enfrentamento")
    
    def _imprimir_analise_detalhada(self, pontuacoes):
        """Imprimir análise completa dos resultados"""
        print("\n" + "="*90)
        print("ANÁLISE DETALHADA DA TRIAGEM DE MITOMANIA")
        print("="*90)
        
        pontuacao_geral = pontuacoes['Pontuacao_Geral_Mitomania']
        print(f"\n🎯 PONTUAÇÃO GERAL DE MITOMANIA: {pontuacao_geral:.1f}/100")
        
        # Interpretação
        if pontuacao_geral < 25:
            print("✅ INTERPRETAÇÃO: Baixo risco para mitomania")
            desc = "Padrões normais de comunicação. Continue praticando honestidade."
        elif pontuacao_geral < 45:
            print("⚠️  INTERPRETAÇÃO: Risco moderado - atenção recomendada")
            desc = "Alguns padrões preocupantes. Considere autoavaliação e possível ajuda."
        elif pontuacao_geral < 65:
            print("🚨 INTERPRETAÇÃO: Risco alto - intervenção recomendada")
            desc = "Padrões significativos de mitomania. Busque ajuda profissional."
        else:
            print("🚨 INTERPRETAÇÃO: Risco crítico - tratamento urgente")
            desc = "Indicadores severos de mitomania. Tratamento intensivo necessário."
        
        print(f"   {desc}")
        
        # Análise por comportamento
        print(f"\n📊 ANÁLISE POR COMPORTAMENTO:")
        comportamentos = {k: v for k, v in pontuacoes.items() if k != 'Pontuacao_Geral_Mitomania'}
        for comportamento, pontuacao in sorted(comportamentos.items(), key=lambda x: x[1], reverse=True):
            nivel = "CRÍTICO" if pontuacao >= 80 else "ALTO" if pontuacao >= 65 else "MODERADO" if pontuacao >= 45 else "BAIXO"
            print(f"   • {comportamento.replace('_', ' ')}: {pontuacao:.1f} ({nivel})")
            print(f"     {self.descricoes_subescalas[comportamento]}")
        
        # Recomendações imediatas
        print(f"\n🏥 RECOMENDAÇÕES IMEDIATAS:")
        if pontuacao_geral >= 65:
            print("   1. Buscar avaliação psiquiátrica/psicológica URGENTE")
            print("   2. Iniciar terapia cognitivo-comportamental intensiva")
            print("   3. Envolver família/amigos próximos no tratamento")
            print("   4. Considerar afastamento de situações de risco")
            print("   5. Monitoramento profissional frequente")
        elif pontuacao_geral >= 45:
            print("   1. Agendar consulta com psicólogo especializado")
            print("   2. Iniciar diário de mentiras e gatilhos")
            print("   3. Praticar técnicas de mindfulness")
            print("   4. Considerar terapia de grupo")
            print("   5. Informar pessoas próximas sobre o processo")
        else:
            print("   1. Continuar automonitoramento")
            print("   2. Praticar comunicação honesta")
            print("   3. Técnicas de mindfulness preventivas")
            print("   4. Fortalecer relacionamentos autênticos")
            print("   5. Considerar coaching de desenvolvimento pessoal")
        
        print(f"\n📚 RECURSOS EDUCACIONAIS:")
        print("   • Livros sobre comunicação honesta e autenticidade")
        print("   • Apps de mindfulness (Headspace, Calm)")
        print("   • Grupos de apoio online")
        print("   • Literatura sobre terapia cognitivo-comportamental")
        
        print(f"\n⚠️  IMPORTANTE:")
        print("   • Mitomania é um padrão comportamental tratável")
        print("   • O tratamento principal é psicoterapia")
        print("   • Honestidade no tratamento é essencial")
        print("   • Mudança requer tempo e comprometimento")
        print("   • Apoio social é fundamental para recuperação")


def salvar_resultados(pontuacoes: Dict[str, float], nome_arquivo: str = "resultados_triagem_mitomania.json"):
    """Salvar resultados da triagem em arquivo JSON"""
    resultados = {
        'timestamp': datetime.now().isoformat(),
        'pontuacoes': pontuacoes,
        'tipo_avaliacao': 'Ferramenta de Triagem para Mitomania - Brasil',
        'versao': '1.0',
        'disclaimer': 'Esta é uma ferramenta de triagem, não um instrumento diagnóstico. Procure ajuda profissional para avaliação completa.',
        'recursos_apoio_brasil': {
            'conselho_federal_psicologia': 'https://site.cfp.org.br',
            'cvv': '188',
            'caps_info': 'Procure o CAPS da sua região',
            'clinicas_universitarias': 'Universidades oferecem atendimento psicológico'
        }
    }
    
    with open(nome_arquivo, 'w', encoding='utf-8') as f:
        json.dump(resultados, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Resultados salvos em {nome_arquivo}")


# Exemplo de uso
if __name__ == "__main__":
    print("🎭 Ferramenta de Triagem para Mitomania - Brasil")
    print("=" * 85)
    print("📊 Triagem especializada para comportamentos de mentira patológica")
    print("⚠️  Requer: numpy, matplotlib, pandas, seaborn")
    print("🚨 IMPORTANTE: Esta é uma ferramenta de triagem, não diagnóstica")
    print("💡 LEMBRE-SE: Seja honesto nas respostas para resultados úteis")
    print("=" * 85)
    
    ferramenta = AvaliacaoMitomaniaBR()
    
    print("\nEscolha uma opção:")
    print("1 - Fazer a triagem completa (55+ perguntas)")
    print("2 - Ver resultados demo e visualizações")
    print("3 - Ver guia de tratamento (demo)")
    
    while True:
        escolha = input("\nDigite sua escolha (1, 2 ou 3): ").strip()
        if escolha == "1":
            print("\n⚠️  Antes de começar:")
            print("• Esta triagem leva 15-20 minutos")
            print("• A honestidade é ESSENCIAL para resultados úteis")
            print("• Mitomania é tratável com psicoterapia adequada")
            print("• Reconhecer padrões é o primeiro passo para mudança")
            
            confirmar = input("\nPronto para começar com honestidade? (s/n): ").lower()
            if confirmar == 's':
                pontuacoes = ferramenta.administrar_triagem()
                titulo = "Seus Resultados da Triagem de Mitomania"
                nome_arquivo = "minha_triagem_mitomania.json"
                mostrar_tratamento = True
            else:
                print("Triagem cancelada. Considere retornar quando estiver pronto para ser honesto.")
                exit()
            break
        elif escolha == "2":
            pontuacoes = ferramenta.pontuacoes_demo()
            titulo = "Resultados Demo da Triagem de Mitomania"
            nome_arquivo = "demo_triagem_mitomania.json"
            mostrar_tratamento = False
            print("DEMO: Usando pontuações de exemplo para fins de demonstração")
            break
        elif escolha == "3":
            pontuacoes = ferramenta.pontuacoes_demo()
            titulo = "Demo - Guia de Tratamento"
            nome_arquivo = "demo_tratamento_mitomania.json"
            print("DEMO: Mostrando guia de tratamento com dados de exemplo")
            ferramenta.criar_guia_tratamento(pontuacoes)
            continue
        else:
            print("Por favor, digite 1, 2 ou 3")
    
    # Criar relatório abrangente
    ferramenta.criar_relatorio_abrangente(pontuacoes, titulo)
    
    # Mostrar guia de tratamento se solicitado
    if mostrar_tratamento or input("\nDeseja ver o guia detalhado de tratamento? (s/n): ").lower() == 's':
        ferramenta.criar_guia_tratamento(pontuacoes)
    
    # Imprimir análise detalhada
    ferramenta._imprimir_analise_detalhada(pontuacoes)
    
    # Salvar resultados
    salvar_resultados(pontuacoes, nome_arquivo)
    
    print("\n" + "="*85)
    print("🎯 TRIAGEM CONCLUÍDA")
    print("="*85)
    print("Lembre-se: Esta é uma ferramenta de triagem, não um diagnóstico.")
    print("Mitomania é tratável com psicoterapia adequada e comprometimento.")
    print("O primeiro passo para mudança é reconhecer padrões honestamente.")
    print("Procure ajuda profissional se os resultados indicarem necessidade.")
    print("="*85)