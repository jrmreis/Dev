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
sns.set_palette("Set2")
plt.style.use('seaborn-v0_8')

# Configurações do seaborn para melhores gráficos
sns.set_context("notebook", font_scale=1.1)
plt.rcParams['figure.facecolor'] = 'white'
plt.rcParams['axes.facecolor'] = '#FAFAFA'

class AvaliacaoBipolarBR:
    """
    Ferramenta de Triagem para Transtorno Bipolar - Brasil
    
    Baseada em pesquisas psicológicas estabelecidas incluindo o Questionário 
    de Transtorno do Humor (MDQ), Escala Diagnóstica do Espectro Bipolar (BSDS), 
    e literatura clínica. Esta ferramenta faz triagem para transtornos do espectro bipolar.
    
    ⚠️  AVISOS CRÍTICOS:
    - Esta NÃO é uma ferramenta diagnóstica para Transtorno Bipolar
    - Apenas profissionais de saúde mental licenciados podem diagnosticar transtorno bipolar
    - Pontuações altas indicam necessidade de avaliação profissional
    - Transtorno bipolar é uma condição médica séria que requer tratamento
    - Se você está tendo pensamentos de autolesão, procure ajuda imediata
    - Esta ferramenta é apenas para fins educativos e de triagem
    - Resultados devem ser discutidos com um profissional de saúde
    """
    
    def __init__(self):
        self.perguntas = self._carregar_perguntas()
        self.descricoes_subescalas = {
            'Episodios_Maniacos': 'Períodos de humor elevado, energia e atividade',
            'Episodios_Depressivos': 'Períodos de humor baixo, energia e motivação',
            'Episodios_Mistos': 'Sintomas maníacos e depressivos simultâneos',
            'Prejuizo_Funcional': 'Impacto no trabalho, relacionamentos e vida diária',
            'Historia_Familiar': 'Fatores genéticos e familiares',
            'Uso_Substancias': 'Padrões de álcool/drogas durante episódios de humor',
            'Padroes_Sono': 'Mudanças no sono durante episódios de humor',
            'Caracteristicas_Psicoticas': 'Alucinações ou delírios durante episódios'
        }
        
        # Limites de nível de risco baseados em pesquisa clínica
        self.limites_risco = {
            'Baixo': 30,
            'Moderado': 50, 
            'Alto': 70,
            'Muito_Alto': 85
        }
        
        # Opções de medicamentos para transtorno bipolar
        self.opcoes_medicamentos = {
            'Estabilizadores_Humor': {
                'Carbonato de Lítio': {
                    'indicacao': 'Padrão-ouro para mania aguda e manutenção',
                    'efeitos_colaterais': 'Tremor, sede, ganho de peso, problemas renais/tireoide',
                    'monitoramento': 'Níveis séricos, função renal e tireoidiana',
                    'dosagem': '600-1200mg/dia (ajustar conforme níveis séricos)'
                },
                'Valproato de Sódio (Depakote)': {
                    'indicacao': 'Mania aguda, episódios mistos, ciclagem rápida',
                    'efeitos_colaterais': 'Sedação, ganho de peso, queda de cabelo, hepatotoxicidade',
                    'monitoramento': 'Função hepática, contagem de plaquetas',
                    'dosagem': '750-1500mg/dia dividido em 2-3 doses'
                },
                'Carbamazepina (Tegretol)': {
                    'indicacao': 'Mania aguda, manutenção (segunda linha)',
                    'efeitos_colaterais': 'Tontura, náusea, visão dupla, erupções cutâneas',
                    'monitoramento': 'Hemograma, função hepática',
                    'dosagem': '400-1200mg/dia dividido em 2-3 doses'
                },
                'Lamotrigina (Lamictal)': {
                    'indicacao': 'Prevenção de episódios depressivos, manutenção',
                    'efeitos_colaterais': 'Erupção cutânea (risco de Stevens-Johnson), tontura',
                    'monitoramento': 'Vigilância para erupções cutâneas',
                    'dosagem': '100-400mg/dia (titulação lenta necessária)'
                }
            },
            'Antipsicoticos_Atipicos': {
                'Quetiapina (Seroquel)': {
                    'indicacao': 'Mania aguda, depressão bipolar, manutenção',
                    'efeitos_colaterais': 'Sedação, ganho de peso, diabetes, dislipidemia',
                    'monitoramento': 'Glicose, lipídios, peso',
                    'dosagem': '300-800mg/dia (mania), 150-300mg/dia (depressão)'
                },
                'Olanzapina (Zyprexa)': {
                    'indicacao': 'Mania aguda, episódios mistos, manutenção',
                    'efeitos_colaterais': 'Ganho de peso significativo, diabetes, dislipidemia',
                    'monitoramento': 'Peso, glicose, lipídios, prolactina',
                    'dosagem': '10-20mg/dia'
                },
                'Aripiprazol (Abilify)': {
                    'indicacao': 'Mania aguda, episódios mistos, manutenção',
                    'efeitos_colaterais': 'Agitação, insônia, náusea, acatisia',
                    'monitoramento': 'Peso, glicose (menor risco metabólico)',
                    'dosagem': '15-30mg/dia'
                },
                'Risperidona (Risperdal)': {
                    'indicacao': 'Mania aguda, episódios mistos',
                    'efeitos_colaterais': 'Sonolência, ganho de peso, hiperprolactinemia',
                    'monitoramento': 'Prolactina, peso, sintomas extrapiramidais',
                    'dosagem': '2-6mg/dia'
                }
            },
            'Antidepressivos': {
                'ISRS - Fluoxetina (Prozac)': {
                    'indicacao': 'Depressão bipolar (sempre com estabilizador)',
                    'efeitos_colaterais': 'Náusea, insônia, disfunção sexual, risco de virada maníaca',
                    'monitoramento': 'Sinais de mania/hipomania, ideação suicida',
                    'dosagem': '20-40mg/dia (cuidado com monoterapia)'
                },
                'ISRS - Sertralina (Zoloft)': {
                    'indicacao': 'Depressão bipolar (sempre com estabilizador)',
                    'efeitos_colaterais': 'Náusea, diarreia, insônia, risco de virada maníaca',
                    'monitoramento': 'Sinais de mania/hipomania, ideação suicida',
                    'dosagem': '50-200mg/dia (cuidado com monoterapia)'
                },
                'Bupropiona (Wellbutrin)': {
                    'indicacao': 'Depressão bipolar, menor risco de virada maníaca',
                    'efeitos_colaterais': 'Insônia, boca seca, convulsões (raras)',
                    'monitoramento': 'Sinais de mania, histórico de convulsões',
                    'dosagem': '150-450mg/dia dividido em doses'
                }
            },
            'Ansiolíticos': {
                'Lorazepam (Ativan)': {
                    'indicacao': 'Agitação aguda, ansiedade, insônia (uso a curto prazo)',
                    'efeitos_colaterais': 'Sedação, dependência, tolerância',
                    'monitoramento': 'Sinais de dependência, função respiratória',
                    'dosagem': '0.5-2mg 2-3x/dia conforme necessário'
                },
                'Clonazepam (Rivotril)': {
                    'indicacao': 'Ansiedade, agitação (uso a curto prazo)',
                    'efeitos_colaterais': 'Sedação, dependência, comprometimento cognitivo',
                    'monitoramento': 'Sinais de dependência, função cognitiva',
                    'dosagem': '0.25-2mg 2x/dia conforme necessário'
                }
            },
            'Terapias_Adjuvantes': {
                'Ácidos Graxos Ômega-3': {
                    'indicacao': 'Adjuvante para depressão bipolar',
                    'efeitos_colaterais': 'Distúrbios gastrointestinais leves',
                    'monitoramento': 'Nenhum específico',
                    'dosagem': '1-2g/dia de EPA'
                },
                'Melatonina': {
                    'indicacao': 'Distúrbios do sono, regulação do ritmo circadiano',
                    'efeitos_colaterais': 'Sonolência matinal, tontura',
                    'monitoramento': 'Padrões de sono',
                    'dosagem': '3-10mg antes de dormir'
                }
            }
        }
        
    def _carregar_perguntas(self) -> Dict[str, List[Dict]]:
        """Carregar perguntas de triagem para transtorno bipolar baseadas em pesquisa"""
        return {
            'Episodios_Maniacos': [
                {'texto': 'Já tive períodos em que me senti tão bem ou energético que outros pensaram que eu não estava sendo meu eu normal', 'pontuacao': 'direta'},
                {'texto': 'Já tive momentos em que fiquei mais falante ou falei mais rápido que o habitual', 'pontuacao': 'direta'},
                {'texto': 'Já tive períodos em que precisei de muito menos sono que o habitual', 'pontuacao': 'direta'},
                {'texto': 'Já tive momentos em que estava muito mais autoconfiante que o habitual', 'pontuacao': 'direta'},
                {'texto': 'Já tive períodos em que fiz coisas incomuns para mim ou que outros acharam excessivas', 'pontuacao': 'direta'},
                {'texto': 'Já tive momentos em que estava muito mais ativo ou fiz muito mais coisas que o habitual', 'pontuacao': 'direta'},
                {'texto': 'Nunca experimentei períodos de humor incomumente elevado', 'pontuacao': 'reversa'}
            ],
            'Episodios_Depressivos': [
                {'texto': 'Já tive períodos de pelo menos 2 semanas quando me senti triste, deprimido ou vazio na maior parte do dia', 'pontuacao': 'direta'},
                {'texto': 'Já experimentei momentos em que perdi o interesse em atividades que normalmente gostava', 'pontuacao': 'direta'},
                {'texto': 'Já tive períodos em que me senti inútil ou excessivamente culpado', 'pontuacao': 'direta'},
                {'texto': 'Já experimentei mudanças significativas no apetite ou peso durante períodos baixos', 'pontuacao': 'direta'},
                {'texto': 'Já tive dificuldade para me concentrar ou tomar decisões durante períodos depressivos', 'pontuacao': 'direta'},
                {'texto': 'Já tive pensamentos de morte ou suicídio durante períodos baixos', 'pontuacao': 'direta'},
                {'texto': 'Nunca experimentei períodos prolongados de depressão', 'pontuacao': 'reversa'}
            ],
            'Episodios_Mistos': [
                {'texto': 'Já tive períodos em que me senti energético e deprimido ao mesmo tempo', 'pontuacao': 'direta'},
                {'texto': 'Já experimentei momentos em que meu humor mudou rapidamente de alto para baixo', 'pontuacao': 'direta'},
                {'texto': 'Já tive períodos em que me senti agitado e inquieto enquanto também me sentia triste', 'pontuacao': 'direta'},
                {'texto': 'Já experimentei momentos em que tinha pensamentos acelerados enquanto me sentia sem esperança', 'pontuacao': 'direta'},
                {'texto': 'Já tive períodos em que estava irritável e tinha energia aumentada simultaneamente', 'pontuacao': 'direta'},
                {'texto': 'Meus episódios de humor são sempre claramente altos ou baixos, nunca mistos', 'pontuacao': 'reversa'}
            ],
            'Prejuizo_Funcional': [
                {'texto': 'Minhas mudanças de humor causaram problemas no meu desempenho no trabalho ou escola', 'pontuacao': 'direta'},
                {'texto': 'Meus episódios de humor prejudicaram meus relacionamentos com família ou amigos', 'pontuacao': 'direta'},
                {'texto': 'Já tomei decisões importantes durante episódios de humor das quais me arrependi depois', 'pontuacao': 'direta'},
                {'texto': 'Minhas mudanças de humor levaram a problemas financeiros ou decisões ruins de gastos', 'pontuacao': 'direta'},
                {'texto': 'Já fui hospitalizado ou precisei de tratamento intensivo para episódios de humor', 'pontuacao': 'direta'},
                {'texto': 'Minhas mudanças de humor nunca impactaram significativamente meu funcionamento diário', 'pontuacao': 'reversa'}
            ],
            'Historia_Familiar': [
                {'texto': 'Um ou mais dos meus parentes biológicos foi diagnosticado com transtorno bipolar', 'pontuacao': 'direta'},
                {'texto': 'Membros da família experimentaram depressão grave que exigiu tratamento', 'pontuacao': 'direta'},
                {'texto': 'Parentes tiveram problemas com álcool ou abuso de substâncias', 'pontuacao': 'direta'},
                {'texto': 'Membros da família foram hospitalizados por razões psiquiátricas', 'pontuacao': 'direta'},
                {'texto': 'Não há histórico de problemas de saúde mental na minha família', 'pontuacao': 'reversa'}
            ],
            'Uso_Substancias': [
                {'texto': 'Já usei álcool ou drogas mais durante períodos de humor elevado', 'pontuacao': 'direta'},
                {'texto': 'Já usei substâncias para lidar com episódios depressivos', 'pontuacao': 'direta'},
                {'texto': 'Meu uso de substâncias aumentou durante episódios de humor', 'pontuacao': 'direta'},
                {'texto': 'Já tomei decisões ruins sobre álcool/drogas durante mudanças de humor', 'pontuacao': 'direta'},
                {'texto': 'Meus padrões de uso de substâncias não mudam com meu humor', 'pontuacao': 'reversa'}
            ],
            'Padroes_Sono': [
                {'texto': 'Durante períodos elevados, precisei de muito menos sono que o habitual (3-4 horas)', 'pontuacao': 'direta'},
                {'texto': 'Já tive períodos em que mal dormi por dias, mas ainda me sentia energético', 'pontuacao': 'direta'},
                {'texto': 'Durante períodos baixos, durmo muito mais que o habitual ou tenho problemas para dormir', 'pontuacao': 'direta'},
                {'texto': 'Meus padrões de sono mudam drasticamente com meu humor', 'pontuacao': 'direta'},
                {'texto': 'Meu sono permanece consistente independentemente do meu humor', 'pontuacao': 'reversa'}
            ],
            'Caracteristicas_Psicoticas': [
                {'texto': 'Já ouvi vozes ou vi coisas que outros não conseguiam durante episódios de humor', 'pontuacao': 'direta'},
                {'texto': 'Já tive crenças que outros acharam irreais durante períodos de humor', 'pontuacao': 'direta'},
                {'texto': 'Durante episódios de humor, já senti que tinha poderes ou habilidades especiais', 'pontuacao': 'direta'},
                {'texto': 'Já experimentei pensamentos paranóicos durante mudanças de humor', 'pontuacao': 'direta'},
                {'texto': 'Nunca experimentei percepções ou crenças incomuns', 'pontuacao': 'reversa'}
            ]
        }
    
    def administrar_triagem(self) -> Dict[str, float]:
        """
        Administrar a ferramenta de triagem de transtorno bipolar interativamente.
        Retorna pontuações para cada subescala e avaliação geral de risco.
        """
        print("="*80)
        print("FERRAMENTA DE TRIAGEM PARA TRANSTORNO BIPOLAR - BRASIL")
        print("="*80)
        print("\n🚨 AVISOS CRÍTICOS:")
        print("• Esta NÃO é uma ferramenta diagnóstica para transtorno bipolar")
        print("• Apenas profissionais licenciados podem diagnosticar transtorno bipolar")
        print("• Pontuações altas indicam necessidade de avaliação profissional")
        print("• Transtorno bipolar requer tratamento profissional")
        print("• Se tem pensamentos de autolesão, procure ajuda imediata")
        print("• Resultados devem ser discutidos com profissional de saúde")
        print("\n📞 RECURSOS DE CRISE - BRASIL:")
        print("• Centro de Valorização da Vida (CVV): 188")
        print("• SAMU: 192")
        print("• Emergência: 193 (Bombeiros)")
        print("• Chat CVV: https://www.cvv.org.br")
        
        print("\nAvalie cada afirmação de 1-5:")
        print("1 = Nunca/Discordo Totalmente")
        print("2 = Raramente/Discordo")
        print("3 = Às vezes/Neutro")
        print("4 = Frequentemente/Concordo")
        print("5 = Muito Frequentemente/Concordo Totalmente")
        print("-" * 80)
        
        pontuacoes = {}
        todas_respostas = []
        
        for subescala, perguntas in self.perguntas.items():
            print(f"\n{subescala.replace('_', ' ').upper()}: {self.descricoes_subescalas[subescala]}")
            print("-" * 60)
            
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
        
        # Calcular pontuação geral de risco com componentes ponderados
        pesos = {
            'Episodios_Maniacos': 0.25,
            'Episodios_Depressivos': 0.25,
            'Episodios_Mistos': 0.15,
            'Prejuizo_Funcional': 0.20,
            'Historia_Familiar': 0.05,
            'Uso_Substancias': 0.05,
            'Padroes_Sono': 0.03,
            'Caracteristicas_Psicoticas': 0.02
        }
        
        risco_geral = sum(pontuacoes[subescala] * peso for subescala, peso in pesos.items())
        pontuacoes['Risco_Geral'] = risco_geral
        
        # Adicionar verificação de segurança imediata
        self._verificacao_seguranca(pontuacoes)
        
        return pontuacoes
    
    def _verificacao_seguranca(self, pontuacoes):
        """Realizar avaliação imediata de segurança"""
        if pontuacoes['Risco_Geral'] > 70 or pontuacoes['Episodios_Depressivos'] > 80:
            print("\n" + "="*80)
            print("🚨 ALTO RISCO DETECTADO - POR FAVOR LEIA COM ATENÇÃO")
            print("="*80)
            print("Suas respostas indicam preocupações significativas de saúde mental.")
            print("Recomendamos fortemente que você:")
            print("• Entre em contato com um profissional de saúde mental imediatamente")
            print("• Ligue 188 (CVV) se estiver tendo pensamentos de autolesão")
            print("• Vá ao pronto-socorro mais próximo se estiver em crise")
            print("• Procure amigos ou familiares de confiança para apoio")
            print("="*80)
            
            continuar_avaliacao = input("\nDeseja continuar com a avaliação? (s/n): ")
            if continuar_avaliacao.lower() != 's':
                print("Por favor, priorize sua segurança e procure ajuda profissional.")
                exit()
    
    def pontuacoes_demo(self) -> Dict[str, float]:
        """Gerar pontuações demo para visualização"""
        return {
            'Episodios_Maniacos': 65,
            'Episodios_Depressivos': 75,
            'Episodios_Mistos': 55,
            'Prejuizo_Funcional': 70,
            'Historia_Familiar': 40,
            'Uso_Substancias': 35,
            'Padroes_Sono': 80,
            'Caracteristicas_Psicoticas': 25,
            'Risco_Geral': 58
        }
    
    def criar_relatorio_abrangente(self, pontuacoes: Dict[str, float], titulo: str = "Resultados da Triagem Bipolar"):
        """Criar visualização e análise abrangentes"""
        
        # Criar figura com estilo seaborn aprimorado
        plt.style.use('seaborn-v0_8-darkgrid')
        fig = plt.figure(figsize=(24, 18))
        fig.patch.set_facecolor('white')
        
        # 1. Medidor de Risco Geral
        ax1 = plt.subplot(3, 4, 1)
        self._criar_medidor_risco(ax1, pontuacoes['Risco_Geral'])
        
        # 2. Padrões de Episódios de Humor
        ax2 = plt.subplot(3, 4, (2, 3), projection='polar')
        self._criar_radar_humor(ax2, pontuacoes)
        
        # 3. Avaliação do Nível de Risco
        ax3 = plt.subplot(3, 4, 4)
        self._criar_grafico_nivel_risco(ax3, pontuacoes['Risco_Geral'])
        
        # 4. Detalhamento das Subescalas
        ax4 = plt.subplot(3, 4, (5, 7))
        self._criar_detalhamento_subescalas(ax4, pontuacoes)
        
        # 5. Mapa de Calor de Gravidade
        ax5 = plt.subplot(3, 4, 8)
        self._criar_mapa_calor_gravidade(ax5, pontuacoes)
        
        # 6. Linha do Tempo do Humor Simulada
        ax6 = plt.subplot(3, 4, (9, 10))
        self._criar_linha_tempo_humor(ax6, pontuacoes)
        
        # 7. Comparação Populacional
        ax7 = plt.subplot(3, 4, 11)
        self._criar_comparacao_populacional(ax7, pontuacoes['Risco_Geral'])
        
        # 8. Recomendações de Tratamento
        ax8 = plt.subplot(3, 4, 12)
        self._criar_painel_recomendacoes(ax8, pontuacoes)
        
        plt.suptitle(titulo, fontsize=22, fontweight='bold', y=0.98)
        plt.tight_layout()
        plt.subplots_adjust(top=0.94)
        plt.show()
    
    def _criar_medidor_risco(self, ax, risco_geral):
        """Criar medidor estilo velocímetro para risco geral"""
        theta = np.linspace(0, np.pi, 100)
        
        # Paleta de cores aprimorada para níveis de risco
        cores_risco = sns.color_palette("RdYlBu_r", 4)
        
        cores = []
        for angulo in theta:
            risco_no_angulo = (angulo / np.pi) * 100
            if risco_no_angulo < 30:
                cores.append(cores_risco[3])  # Baixo - Azul
            elif risco_no_angulo < 50:
                cores.append(cores_risco[2])  # Moderado - Amarelo
            elif risco_no_angulo < 70:
                cores.append(cores_risco[1])  # Alto - Laranja
            else:
                cores.append(cores_risco[0])  # Muito Alto - Vermelho
        
        # Plotar fundo do medidor
        for i in range(len(theta)-1):
            ax.fill_between([theta[i], theta[i+1]], [0.8, 0.8], [1, 1], 
                           color=cores[i], alpha=0.9)
        
        # Plotar ponteiro
        angulo_ponteiro = (risco_geral / 100) * np.pi
        ax.arrow(angulo_ponteiro, 0, 0, 0.9, head_width=0.06, head_length=0.06, 
                fc='#2C3E50', ec='#2C3E50', linewidth=5)
        
        # Adicionar texto da pontuação
        ax.text(np.pi/2, 0.5, f'{risco_geral:.0f}', ha='center', va='center',
               fontsize=30, fontweight='bold', color='#2C3E50')
        ax.text(np.pi/2, 0.25, 'Pontuação\nRisco Bipolar', ha='center', va='center',
               fontsize=14, fontweight='bold', color='#34495E')
        
        # Rótulos aprimorados
        ax.set_ylim(0, 1)
        ax.set_xlim(0, np.pi)
        ax.set_xticks([0, np.pi/4, np.pi/2, 3*np.pi/4, np.pi])
        ax.set_xticklabels(['Baixo\n(0-30)', 'Moderado\n(30-50)', 'Elevado\n(50-70)', 
                           'Alto\n(70-85)', 'Crítico\n(85-100)'], fontsize=11)
        ax.set_yticks([])
        ax.set_title('Nível Geral de Risco Bipolar', fontweight='bold', pad=30, fontsize=16)
    
    def _criar_radar_humor(self, ax, pontuacoes):
        """Criar gráfico radar para subescalas relacionadas ao humor"""
        subescalas_humor = ['Episodios_Maniacos', 'Episodios_Depressivos', 'Episodios_Mistos', 
                           'Padroes_Sono', 'Prejuizo_Funcional']
        valores = [pontuacoes[k] for k in subescalas_humor]
        
        # Fechar o polígono
        valores += valores[:1]
        
        # Calcular ângulos
        angulos = np.linspace(0, 2 * np.pi, len(subescalas_humor), endpoint=False).tolist()
        angulos += angulos[:1]
        
        # Estilo de gráfico radar aprimorado
        cores = sns.color_palette("viridis", 3)
        
        # Plotar com preenchimento gradiente
        ax.plot(angulos, valores, 'o-', linewidth=4, color=cores[0], 
               markersize=10, markerfacecolor=cores[1], markeredgecolor=cores[0], 
               markeredgewidth=3)
        ax.fill(angulos, valores, alpha=0.4, color=cores[0])
        
        # Personalizar
        rotulos = [s.replace('_', '\n') for s in subescalas_humor]
        ax.set_xticks(angulos[:-1])
        ax.set_xticklabels(rotulos, fontsize=12, fontweight='bold')
        ax.set_ylim(0, 100)
        ax.set_yticks([25, 50, 75, 100])
        ax.set_yticklabels(['25', '50', '75', '100'], fontsize=11)
        ax.grid(True, alpha=0.7)
        ax.set_title('Perfil de Episódios de Humor', fontweight='bold', pad=30, fontsize=16)
        
        # Adicionar rótulos de pontuação com estilo aprimorado
        for angulo, valor, subescala in zip(angulos[:-1], valores[:-1], subescalas_humor):
            offset = 8 if valor > 85 else 6
            ax.text(angulo, valor + offset, f'{valor:.0f}', 
                   horizontalalignment='center', fontsize=11, fontweight='bold',
                   bbox=dict(boxstyle="round,pad=0.3", facecolor='white', 
                           alpha=0.9, edgecolor=cores[0], linewidth=2))
    
    def _criar_grafico_nivel_risco(self, ax, risco_geral):
        """Criar avaliação aprimorada do nível de risco"""
        niveis_risco = ['Baixo\n(0-30)', 'Moderado\n(30-50)', 'Elevado\n(50-70)', 
                       'Alto\n(70-85)', 'Crítico\n(85-100)']
        valores_risco = [30, 20, 20, 15, 15]
        
        # Paleta de cores aprimorada
        cores_risco = sns.color_palette("RdYlBu_r", 5)
        
        # Determinar nível de risco atual
        if risco_geral < 30:
            risco_atual = 0
        elif risco_geral < 50:
            risco_atual = 1
        elif risco_geral < 70:
            risco_atual = 2
        elif risco_geral < 85:
            risco_atual = 3
        else:
            risco_atual = 4
        
        # Criar barras aprimoradas
        barras = ax.bar(niveis_risco, valores_risco, color=cores_risco, alpha=0.8, 
                       edgecolor='white', linewidth=3)
        
        # Destacar nível de risco atual
        barras[risco_atual].set_alpha(1.0)
        barras[risco_atual].set_edgecolor('#2C3E50')
        barras[risco_atual].set_linewidth(5)
        
        # Estilo aprimorado
        ax.set_ylabel('Faixa de Pontuação', fontweight='bold', fontsize=13)
        ax.set_title('Classificação de Risco', fontweight='bold', fontsize=16, pad=25)
        ax.set_ylim(0, 35)
        
        # Indicador do nível atual
        ax.text(risco_atual, barras[risco_atual].get_height() + 2, 
               f'SEU NÍVEL\n({risco_geral:.0f})', ha='center', va='bottom',
               fontweight='bold', fontsize=12, 
               bbox=dict(boxstyle="round,pad=0.6", facecolor='yellow', 
                        alpha=0.95, edgecolor='orange', linewidth=3))
        
        ax.grid(True, alpha=0.4, axis='y')
        ax.set_facecolor('#FAFAFA')
        plt.setp(ax.get_xticklabels(), fontsize=11, fontweight='bold')
    
    def _criar_detalhamento_subescalas(self, ax, pontuacoes):
        """Criar gráfico de barras horizontais de todas as subescalas"""
        subescalas = [k for k in pontuacoes.keys() if k != 'Risco_Geral']
        valores = [pontuacoes[k] for k in subescalas]
        
        # Criar DataFrame para melhor manuseio
        df = pd.DataFrame({
            'Subescala': [s.replace('_', ' ') for s in subescalas],
            'Pontuacao': valores,
            'Categoria': ['Episódios de Humor' if 'Episodio' in s else 
                         'Fatores de Impacto' if s in ['Prejuizo_Funcional', 'Padroes_Sono'] else
                         'Fatores de Risco' for s in subescalas]
        })
        
        # Mapeamento de cores aprimorado
        cores_categorias = {
            'Episódios de Humor': '#E74C3C',
            'Fatores de Impacto': '#F39C12', 
            'Fatores de Risco': '#3498DB'
        }
        
        cores = [cores_categorias[cat] for cat in df['Categoria']]
        
        # Criar gráfico de barras horizontais
        y_pos = np.arange(len(subescalas))
        barras = ax.barh(y_pos, valores, color=cores, alpha=0.85, 
                        edgecolor='white', linewidth=2)
        
        # Adicionar rótulos de valores
        for i, (barra, valor) in enumerate(zip(barras, valores)):
            largura = barra.get_width()
            ax.text(largura + 1.5, barra.get_y() + barra.get_height()/2,
                   f'{valor:.0f}', ha='left', va='center', fontweight='bold', 
                   fontsize=12, color='#2C3E50')
        
        # Estilo aprimorado
        ax.set_yticks(y_pos)
        ax.set_yticklabels(df['Subescala'], fontsize=12, fontweight='bold')
        ax.set_xlabel('Pontuação (0-100)', fontweight='bold', fontsize=14)
        ax.set_title('Análise Detalhada das Subescalas', fontweight='bold', fontsize=16, pad=25)
        ax.set_xlim(0, 110)
        
        # Linhas de referência
        ax.axvline(x=50, color='gray', linestyle='--', alpha=0.8, linewidth=2)
        ax.axvline(x=70, color='red', linestyle='--', alpha=0.8, linewidth=2)
        
        # Legenda aprimorada
        from matplotlib.patches import Patch
        elementos_legenda = [Patch(facecolor=cor, label=categoria) 
                            for categoria, cor in cores_categorias.items()]
        ax.legend(handles=elementos_legenda, loc='lower right', frameon=True, 
                 fancybox=True, shadow=True, fontsize=11)
        
        ax.grid(True, alpha=0.4, axis='x')
        ax.set_facecolor('#FAFAFA')
    
    def _criar_mapa_calor_gravidade(self, ax, pontuacoes):
        """Criar mapa de calor mostrando gravidade entre domínios"""
        subescalas = [k for k in pontuacoes.keys() if k != 'Risco_Geral']
        
        # Remodelar dados para mapa de calor
        dados_gravidade = []
        rotulos = []
        
        for subescala in subescalas:
            pontuacao = pontuacoes[subescala]
            # Converter para níveis de gravidade
            if pontuacao < 30:
                gravidade = [1, 0, 0, 0]  # Baixo
            elif pontuacao < 50:
                gravidade = [1, 1, 0, 0]  # Moderado
            elif pontuacao < 70:
                gravidade = [1, 1, 1, 0]  # Alto
            else:
                gravidade = [1, 1, 1, 1]  # Muito Alto
            
            dados_gravidade.append(gravidade)
            rotulos.append(subescala.replace('_', '\n'))
        
        # Criar mapa de calor
        matriz_gravidade = np.array(dados_gravidade)
        sns.heatmap(matriz_gravidade, 
                   yticklabels=rotulos,
                   xticklabels=['Leve', 'Moderado', 'Grave', 'Crítico'],
                   cmap='Reds', cbar=False, ax=ax,
                   linewidths=1, linecolor='white')
        
        ax.set_title('Mapa de Calor de Gravidade', fontweight='bold', fontsize=14, pad=20)
        ax.set_xlabel('Nível de Gravidade', fontweight='bold', fontsize=12)
        ax.tick_params(axis='both', labelsize=10)
    
    def _criar_linha_tempo_humor(self, ax, pontuacoes):
        """Criar linha do tempo simulada do humor baseada nas pontuações"""
        # Gerar dados simulados de humor baseados nas pontuações
        datas = pd.date_range(start='2024-01-01', end='2025-08-14', freq='W')
        
        # Humor base
        humor_base = 5  # Humor neutro
        
        # Adicionar variações baseadas nas pontuações
        intensidade_maniaca = pontuacoes['Episodios_Maniacos'] / 100
        intensidade_depressiva = pontuacoes['Episodios_Depressivos'] / 100
        fator_misto = pontuacoes['Episodios_Mistos'] / 100
        
        linha_tempo_humor = []
        for i, data in enumerate(datas):
            # Simular episódios de humor
            posicao_ciclo = (i / len(datas)) * 4 * np.pi  # Múltiplos ciclos
            
            componente_maniaco = intensidade_maniaca * 3 * np.sin(posicao_ciclo + np.pi/4)
            componente_depressivo = -intensidade_depressiva * 3 * np.sin(posicao_ciclo + np.pi)
            ruido_misto = fator_misto * np.random.normal(0, 1)
            
            humor = humor_base + componente_maniaco + componente_depressivo + ruido_misto
            humor = np.clip(humor, 1, 10)  # Manter dentro da faixa 1-10
            linha_tempo_humor.append(humor)
        
        # Criar gráfico de linha do tempo aprimorado
        cores = sns.color_palette("RdBu_r", 256)
        
        # Plotar linha do humor com gradiente de cores
        for i in range(len(datas)-1):
            indice_cor = int((linha_tempo_humor[i] - 1) / 9 * 255)
            ax.plot([datas[i], datas[i+1]], [linha_tempo_humor[i], linha_tempo_humor[i+1]], 
                   color=cores[indice_cor], linewidth=3, alpha=0.8)
        
        # Adicionar zonas de nível de humor
        ax.axhspan(7, 10, alpha=0.2, color='red', label='Faixa Maníaca')
        ax.axhspan(4, 6, alpha=0.2, color='green', label='Faixa Normal')
        ax.axhspan(1, 3, alpha=0.2, color='blue', label='Faixa Depressiva')
        
        # Estilo aprimorado
        ax.set_xlabel('Data', fontweight='bold', fontsize=12)
        ax.set_ylabel('Nível de Humor', fontweight='bold', fontsize=12)
        ax.set_title('Linha do Tempo do Humor Simulada\n(Baseada em Suas Respostas)', 
                    fontweight='bold', fontsize=14, pad=20)
        ax.set_ylim(1, 10)
        ax.legend(loc='upper right', frameon=True, fancybox=True, shadow=True)
        ax.grid(True, alpha=0.4)
        
        # Formatar eixo x
        import matplotlib.dates as mdates
        ax.xaxis.set_major_formatter(mdates.DateFormatter('%m/%y'))
        ax.tick_params(axis='x', rotation=45)
    
    def _criar_comparacao_populacional(self, ax, risco_geral):
        """Criar visualização de comparação populacional"""
        # Simular distribuição populacional
        np.random.seed(42)
        populacao = np.random.gamma(2, 8, 10000)  # Distribuição gamma para prevalência bipolar
        populacao = np.clip(populacao, 0, 100)
        
        # Calcular percentil
        percentil = (np.sum(populacao < risco_geral) / len(populacao)) * 100
        
        # Criar histograma aprimorado
        cores = sns.color_palette("viridis", 3)
        n, bins, patches = ax.hist(populacao, bins=40, alpha=0.7, color=cores[0], 
                                  edgecolor='white', linewidth=1, density=True)
        
        # Adicionar aproximação de curva suave
        x = np.linspace(0, 100, 100)
        # Aproximação da distribuição gamma
        shape, scale = 2, 8
        y = (x**(shape-1) * np.exp(-x/scale)) / (scale**shape * math.gamma(shape))
        ax.plot(x, y, color=cores[1], linewidth=4, alpha=0.9, label='Curva Populacional')
        
        # Linha da sua pontuação
        ax.axvline(risco_geral, color='#E74C3C', linewidth=5, alpha=0.9,
                  label=f'Sua Pontuação de Risco ({risco_geral:.0f})', linestyle='-')
        
        # Estilo aprimorado
        ax.set_xlabel('Pontuação de Risco Bipolar', fontweight='bold', fontsize=12)
        ax.set_ylabel('Densidade', fontweight='bold', fontsize=12)
        ax.set_title(f'Comparação de Risco Populacional\n{percentil:.0f}º Percentil', 
                    fontweight='bold', fontsize=14, pad=20)
        ax.legend(frameon=True, fancybox=True, shadow=True)
        ax.grid(True, alpha=0.4)
        ax.set_facecolor('#FAFAFA')
        
        # Adicionar informações do percentil
        texto_info = f'Risco maior que\n{percentil:.0f}% da população'
        props = dict(boxstyle='round', facecolor='lightblue', alpha=0.8)
        ax.text(0.05, 0.95, texto_info, transform=ax.transAxes, fontsize=11,
                verticalalignment='top', bbox=props, fontweight='bold')
    
    def _criar_painel_recomendacoes(self, ax, pontuacoes):
        """Criar painel de recomendações de tratamento"""
        ax.axis('off')
        risco_geral = pontuacoes['Risco_Geral']
        
        # Obter áreas de maior risco
        subescalas = {k: v for k, v in pontuacoes.items() if k != 'Risco_Geral'}
        principais_preocupacoes = sorted(subescalas.items(), key=lambda x: x[1], reverse=True)[:3]
        
        # Gerar recomendações baseadas no nível de risco
        if risco_geral < 30:
            nivel_risco = "RISCO BAIXO"
            recomendacoes = """
RECOMENDAÇÕES:
• Continue monitorando padrões de humor
• Mantenha horário regular de sono
• Pratique gerenciamento de estresse
• Exercícios regulares e apoio social
• Check-ups anuais de saúde mental
            """
            medicamentos = """
MEDICAMENTOS: Não indicados neste momento
• Foque em estilo de vida saudável
• Suplementos: Ômega-3, Vitamina D
• Melatonina para regulação do sono
            """
        elif risco_geral < 50:
            nivel_risco = "RISCO MODERADO"
            recomendacoes = f"""
RECOMENDAÇÕES:
• Consulte profissional de saúde mental
• Considere apps de monitoramento de humor
• Aborde principais preocupações: {principais_preocupacoes[0][0].replace('_', ' ')}
• Aprenda sobre transtorno bipolar
• Construa rede de apoio forte
            """
            medicamentos = """
MEDICAMENTOS POSSÍVEIS:
• Estabilizadores leves (Lamotrigina)
• Suplementos: Ômega-3, complexo B
• Ansiolíticos pontuais se necessário
• Melatonina para distúrbios do sono
            """
        elif risco_geral < 70:
            nivel_risco = "RISCO ELEVADO"
            recomendacoes = f"""
RECOMENDAÇÕES:
• URGENTE: Veja psiquiatra/psicólogo
• Avaliação abrangente para bipolar
• Aborde: {', '.join([c[0].replace('_', ' ') for c in principais_preocupacoes[:2]])}
• Considere tratamento estabilizador
• Terapia familiar/casal
            """
            medicamentos = """
MEDICAMENTOS PROVÁVEIS:
• Estabilizadores: Lítio, Valproato
• Antipsicóticos: Quetiapina, Aripiprazol
• Antidepressivos (com estabilizador)
• Ansiolíticos a curto prazo
            """
        else:
            nivel_risco = "RISCO ALTO"
            recomendacoes = """
RECOMENDAÇÕES:
• Avaliação profissional IMEDIATA
• Avaliação psiquiátrica para bipolar
• Considere tratamento intensivo/internação
• Avaliação de medicamentos
• Planejamento de segurança em crise
• Envolver família/sistema de apoio
            """
            medicamentos = """
MEDICAMENTOS URGENTES:
• Estabilizadores: Lítio + Antipsicótico
• Quetiapina ou Olanzapina
• Possível hospitalização
• Monitoramento médico intensivo
• Múltiplas medicações podem ser necessárias
            """
        
        texto_recomendacao = f"""
🚨 NÍVEL DE RISCO: {nivel_risco}
Pontuação Geral: {risco_geral:.0f}/100

Top 3 Preocupações:
1. {principais_preocupacoes[0][0].replace('_', ' ')}: {principais_preocupacoes[0][1]:.0f}
2. {principais_preocupacoes[1][0].replace('_', ' ')}: {principais_preocupacoes[1][1]:.0f}
3. {principais_preocupacoes[2][0].replace('_', ' ')}: {principais_preocupacoes[2][1]:.0f}

{recomendacoes}

💊 OPÇÕES DE MEDICAMENTOS:
{medicamentos}

📞 RECURSOS DE CRISE - BRASIL:
• CVV: 188
• Chat CVV: cvv.org.br
• SAMU: 192
• Emergência: 193

⚠️  Esta é apenas uma ferramenta de triagem.
Diagnóstico profissional é obrigatório.
        """
        
        # Escolher cor de fundo baseada no risco
        if risco_geral < 30:
            cor_fundo = 'lightgreen'
        elif risco_geral < 50:
            cor_fundo = 'lightyellow'
        elif risco_geral < 70:
            cor_fundo = 'orange'
        else:
            cor_fundo = 'lightcoral'
        
        ax.text(0.05, 0.95, texto_recomendacao, transform=ax.transAxes, 
               fontsize=9, verticalalignment='top', fontfamily='monospace',
               bbox=dict(boxstyle="round,pad=0.6", facecolor=cor_fundo, alpha=0.9,
                        edgecolor='gray', linewidth=2))
    
    def criar_guia_medicamentos(self, pontuacoes: Dict[str, float]):
        """Criar guia detalhado de medicamentos baseado nas pontuações"""
        
        fig, axes = plt.subplots(2, 2, figsize=(20, 14))
        fig.suptitle('Guia Completo de Medicamentos para Transtorno Bipolar', 
                    fontsize=18, fontweight='bold', y=0.98)
        
        risco_geral = pontuacoes['Risco_Geral']
        
        # 1. Estabilizadores de Humor
        ax1 = axes[0, 0]
        self._criar_grafico_medicamentos(ax1, 'Estabilizadores_Humor', risco_geral)
        
        # 2. Antipsicóticos Atípicos
        ax2 = axes[0, 1]
        self._criar_grafico_medicamentos(ax2, 'Antipsicoticos_Atipicos', risco_geral)
        
        # 3. Antidepressivos
        ax3 = axes[1, 0]
        self._criar_grafico_medicamentos(ax3, 'Antidepressivos', risco_geral)
        
        # 4. Ansiolíticos e Adjuvantes
        ax4 = axes[1, 1]
        self._criar_grafico_adjuvantes(ax4, risco_geral)
        
        plt.tight_layout()
        plt.subplots_adjust(top=0.94)
        plt.show()
    
    def _criar_grafico_medicamentos(self, ax, categoria, risco_geral):
        """Criar gráfico de medicamentos por categoria"""
        medicamentos = list(self.opcoes_medicamentos[categoria].keys())
        
        # Pontuações de adequação baseadas no risco geral
        if risco_geral < 30:
            adequacao = [20, 30, 10, 25] if categoria == 'Estabilizadores_Humor' else [15, 10, 20, 25]
        elif risco_geral < 50:
            adequacao = [40, 60, 30, 50] if categoria == 'Estabilizadores_Humor' else [35, 30, 40, 45]
        elif risco_geral < 70:
            adequacao = [80, 85, 60, 70] if categoria == 'Estabilizadores_Humor' else [70, 65, 75, 70]
        else:
            adequacao = [95, 90, 75, 80] if categoria == 'Estabilizadores_Humor' else [85, 90, 80, 75]
        
        # Ajustar para o número real de medicamentos
        adequacao = adequacao[:len(medicamentos)]
        
        # Cores baseadas na adequação
        cores = ['#27AE60' if a >= 70 else '#F39C12' if a >= 40 else '#E74C3C' for a in adequacao]
        
        # Criar gráfico de barras
        barras = ax.bar(range(len(medicamentos)), adequacao, color=cores, alpha=0.8,
                       edgecolor='white', linewidth=2)
        
        # Adicionar valores
        for i, (barra, valor) in enumerate(zip(barras, adequacao)):
            altura = barra.get_height()
            ax.text(barra.get_x() + barra.get_width()/2., altura + 2,
                   f'{valor}%', ha='center', va='bottom', fontweight='bold')
        
        # Personalizar
        ax.set_xticks(range(len(medicamentos)))
        nomes_curtos = [med.split('(')[0][:15] + '...' if len(med) > 15 else med.split('(')[0] 
                       for med in medicamentos]
        ax.set_xticklabels(nomes_curtos, rotation=45, ha='right', fontsize=10)
        ax.set_ylabel('Adequação (%)', fontweight='bold')
        ax.set_title(categoria.replace('_', ' '), fontweight='bold', fontsize=14)
        ax.set_ylim(0, 105)
        ax.grid(True, alpha=0.3, axis='y')
    
    def _criar_grafico_adjuvantes(self, ax, risco_geral):
        """Criar gráfico combinado para ansiolíticos e terapias adjuvantes"""
        medicamentos_ansi = list(self.opcoes_medicamentos['Ansiolíticos'].keys())
        medicamentos_adj = list(self.opcoes_medicamentos['Terapias_Adjuvantes'].keys())
        
        todos_medicamentos = medicamentos_ansi + medicamentos_adj
        cores_categoria = ['#3498DB'] * len(medicamentos_ansi) + ['#9B59B6'] * len(medicamentos_adj)
        
        # Adequação baseada no risco
        if risco_geral < 50:
            adequacao = [30, 25, 80, 70]  # Baixa para ansiolíticos, alta para adjuvantes
        else:
            adequacao = [70, 60, 85, 75]  # Maior para ansiolíticos em alto risco
        
        # Criar gráfico
        barras = ax.bar(range(len(todos_medicamentos)), adequacao, color=cores_categoria, 
                       alpha=0.8, edgecolor='white', linewidth=2)
        
        # Adicionar valores
        for i, (barra, valor) in enumerate(zip(barras, adequacao)):
            altura = barra.get_height()
            ax.text(barra.get_x() + barra.get_width()/2., altura + 2,
                   f'{valor}%', ha='center', va='bottom', fontweight='bold')
        
        # Personalizar
        ax.set_xticks(range(len(todos_medicamentos)))
        nomes_curtos = [med.split('(')[0][:12] + '...' if len(med) > 12 else med.split('(')[0] 
                       for med in todos_medicamentos]
        ax.set_xticklabels(nomes_curtos, rotation=45, ha='right', fontsize=10)
        ax.set_ylabel('Adequação (%)', fontweight='bold')
        ax.set_title('Ansiolíticos e Terapias Adjuvantes', fontweight='bold', fontsize=14)
        ax.set_ylim(0, 105)
        ax.grid(True, alpha=0.3, axis='y')
        
        # Legenda
        from matplotlib.patches import Patch
        elementos_legenda = [Patch(facecolor='#3498DB', label='Ansiolíticos'),
                            Patch(facecolor='#9B59B6', label='Terapias Adjuvantes')]
        ax.legend(handles=elementos_legenda, loc='upper right')
    
    def _imprimir_analise_detalhada(self, pontuacoes):
        """Imprimir análise abrangente dos resultados"""
        print("\n" + "="*90)
        print("ANÁLISE DETALHADA DA TRIAGEM PARA TRANSTORNO BIPOLAR")
        print("="*90)
        
        risco_geral = pontuacoes['Risco_Geral']
        print(f"\n🎯 PONTUAÇÃO GERAL DE RISCO BIPOLAR: {risco_geral:.1f}/100")
        
        # Interpretação do risco
        if risco_geral < 30:
            print("✅ INTERPRETAÇÃO: Baixo risco para transtorno bipolar")
            desc_risco = "Respostas sugerem baixa probabilidade de transtorno bipolar. Continue hábitos saudáveis."
        elif risco_geral < 50:
            print("⚠️  INTERPRETAÇÃO: Risco moderado - monitoramento recomendado")
            desc_risco = "Alguns padrões preocupantes. Considere consulta profissional."
        elif risco_geral < 70:
            print("🚨 INTERPRETAÇÃO: Risco elevado - avaliação profissional recomendada")
            desc_risco = "Múltiplos fatores de risco presentes. Recomenda-se fortemente avaliação psiquiátrica."
        else:
            print("🚨 INTERPRETAÇÃO: Alto risco - ajuda profissional imediata necessária")
            desc_risco = "Indicadores significativos de transtorno bipolar. Procure ajuda profissional imediata."
        
        print(f"   {desc_risco}")
        
        # Análise das subescalas
        print(f"\n📊 ANÁLISE DETALHADA DAS SUBESCALAS:")
        subescalas = {k: v for k, v in pontuacoes.items() if k != 'Risco_Geral'}
        for subescala, pontuacao in sorted(subescalas.items(), key=lambda x: x[1], reverse=True):
            nivel = "ALTO" if pontuacao >= 70 else "MODERADO" if pontuacao >= 50 else "BAIXO"
            print(f"   • {subescala.replace('_', ' ')}: {pontuacao:.1f} ({nivel})")
            print(f"     {self.descricoes_subescalas[subescala]}")
        
        # Avaliação de crise
        print(f"\n🚨 AVALIAÇÃO DE SEGURANÇA:")
        if pontuacoes['Episodios_Depressivos'] > 70 or risco_geral > 85:
            print("   ⚠️  PREOCUPAÇÃO DE SEGURANÇA ELEVADA")
            print("   • Pontuações altas de depressão podem indicar risco de suicídio")
            print("   • Entre em contato com linha de crise: 188 (CVV)")
            print("   • Considere pronto-socorro se tiver pensamentos de autolesão")
        else:
            print("   ✅ Nenhuma preocupação imediata de segurança indicada")
        
        # Recomendações de medicamentos
        print(f"\n💊 RECOMENDAÇÕES DE MEDICAMENTOS:")
        if risco_geral >= 70:
            print("   🔴 MEDICAÇÃO URGENTE RECOMENDADA:")
            print("   • Estabilizadores de humor: Lítio ou Valproato")
            print("   • Antipsicóticos: Quetiapina ou Olanzapina")
            print("   • Monitoramento médico intensivo necessário")
            print("   • Possível necessidade de múltiplas medicações")
        elif risco_geral >= 50:
            print("   🟡 MEDICAÇÃO MODERADA RECOMENDADA:")
            print("   • Estabilizadores: Lamotrigina ou Valproato")
            print("   • Antipsicóticos: Aripiprazol ou Quetiapina")
            print("   • Antidepressivos (apenas com estabilizador)")
            print("   • Acompanhamento psiquiátrico regular")
        else:
            print("   🟢 MEDICAÇÃO NÃO URGENTE:")
            print("   • Foque em estilo de vida saudável")
            print("   • Suplementos: Ômega-3, Vitamina D")
            print("   • Medicações para sintomas específicos se necessário")
        
        # Próximos passos
        print(f"\n📋 PRÓXIMOS PASSOS RECOMENDADOS:")
        if risco_geral >= 50:
            print("   1. Agendar consulta com psiquiatra ou psicólogo")
            print("   2. Levar estes resultados para sua consulta")
            print("   3. Considerar monitoramento de humor entre agora e a consulta")
            print("   4. Informar familiares/amigos de confiança sobre preocupações")
            print("   5. Evitar decisões importantes de vida até ser avaliado")
            print("   6. Pesquisar sobre transtorno bipolar e opções de tratamento")
        else:
            print("   1. Continuar monitorando padrões de humor")
            print("   2. Manter hábitos de estilo de vida saudável")
            print("   3. Considerar check-ups anuais de saúde mental")
            print("   4. Aprender técnicas de gerenciamento de estresse")
            print("   5. Construir rede de apoio social forte")
        
        # Informações sobre medicamentos específicos
        print(f"\n💊 INFORMAÇÕES DETALHADAS SOBRE MEDICAMENTOS:")
        print("   Para ver informações completas sobre medicamentos, use:")
        print("   ferramenta.criar_guia_medicamentos(pontuacoes)")
        
        print(f"\n📚 RECURSOS EDUCACIONAIS - BRASIL:")
        print("   • Associação Brasileira de Transtorno Bipolar (ABTB)")
        print("   • Instituto de Psiquiatria do HC-FMUSP")
        print("   • Centro de Valorização da Vida (CVV): cvv.org.br")
        print("   • CAPS (Centro de Atenção Psicossocial) da sua região")


def salvar_resultados(pontuacoes: Dict[str, float], nome_arquivo: str = "resultados_triagem_bipolar.json"):
    """Salvar resultados da triagem em arquivo JSON"""
    resultados = {
        'timestamp': datetime.now().isoformat(),
        'pontuacoes': pontuacoes,
        'tipo_avaliacao': 'Ferramenta de Triagem para Transtorno Bipolar - Brasil',
        'versao': '1.0',
        'disclaimer': 'Esta é uma ferramenta de triagem, não um instrumento diagnóstico. Procure ajuda profissional para diagnóstico.',
        'recursos_crise_brasil': {
            'cvv': '188',
            'chat_cvv': 'https://www.cvv.org.br',
            'samu': '192',
            'bombeiros': '193'
        }
    }
    
    with open(nome_arquivo, 'w', encoding='utf-8') as f:
        json.dump(resultados, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Resultados salvos em {nome_arquivo}")


# Exemplo de uso
if __name__ == "__main__":
    print("🧠 Ferramenta de Triagem para Transtorno Bipolar - Brasil")
    print("=" * 80)
    print("📊 Triagem profissional de saúde mental com visualizações avançadas")
    print("⚠️  Requer: numpy, matplotlib, pandas, seaborn")
    print("🚨 IMPORTANTE: Esta é uma ferramenta de triagem, não um instrumento diagnóstico")
    print("=" * 80)
    
    ferramenta = AvaliacaoBipolarBR()
    
    print("\nEscolha uma opção:")
    print("1 - Fazer a triagem completa (40+ perguntas)")
    print("2 - Ver resultados demo e visualizações")
    print("3 - Ver guia de medicamentos (demo)")
    
    while True:
        escolha = input("\nDigite sua escolha (1, 2 ou 3): ").strip()
        if escolha == "1":
            print("\n⚠️  Antes de começar:")
            print("• Esta triagem leva 10-15 minutos")
            print("• Responda honestamente para resultados precisos")
            print("• Procure ajuda profissional se estiver em crise")
            
            confirmar = input("\nPronto para começar? (s/n): ").lower()
            if confirmar == 's':
                pontuacoes = ferramenta.administrar_triagem()
                titulo = "Seus Resultados da Triagem para Transtorno Bipolar"
                nome_arquivo = "minha_triagem_bipolar.json"
                mostrar_medicamentos = True
            else:
                print("Avaliação cancelada. Procure ajuda profissional se necessário.")
                exit()
            break
        elif escolha == "2":
            pontuacoes = ferramenta.pontuacoes_demo()
            titulo = "Resultados Demo da Triagem Bipolar"
            nome_arquivo = "demo_triagem_bipolar.json"
            mostrar_medicamentos = False
            print("DEMO: Usando pontuações de exemplo para fins de demonstração")
            break
        elif escolha == "3":
            pontuacoes = ferramenta.pontuacoes_demo()
            titulo = "Demo - Guia de Medicamentos"
            nome_arquivo = "demo_medicamentos_bipolar.json"
            print("DEMO: Mostrando guia de medicamentos com dados de exemplo")
            ferramenta.criar_guia_medicamentos(pontuacoes)
            continue
        else:
            print("Por favor, digite 1, 2 ou 3")
    
    # Criar relatório abrangente
    ferramenta.criar_relatorio_abrangente(pontuacoes, titulo)
    
    # Mostrar guia de medicamentos se solicitado
    if mostrar_medicamentos or input("\nDeseja ver o guia detalhado de medicamentos? (s/n): ").lower() == 's':
        ferramenta.criar_guia_medicamentos(pontuacoes)
    
    # Imprimir análise detalhada
    ferramenta._imprimir_analise_detalhada(pontuacoes)
    
    # Salvar resultados
    salvar_resultados(pontuacoes, nome_arquivo)
    
    print("\n" + "="*80)
    print("🎯 TRIAGEM CONCLUÍDA")
    print("="*80)
    print("Lembre-se: Esta é uma ferramenta de triagem, não um diagnóstico.")
    print("Por favor, discuta os resultados com um profissional de saúde mental.")
    print("Se você está em crise, entre em contato com 188 (CVV) ou vá ao pronto-socorro.")
    print("="*80)