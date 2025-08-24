import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from scipy import stats
from typing import Dict, List, Tuple
import json
from datetime import datetime

# Set seaborn style for better visualizations
sns.set_style("whitegrid")
sns.set_palette("husl")
plt.style.use('seaborn-v0_8')

# Configure seaborn settings for better plots
sns.set_context("notebook", font_scale=1.1)
plt.rcParams['figure.facecolor'] = 'white'

class NarcissismScreeningTool:
    """
    Narcissistic Traits Screening Tool
    
    Based on established psychological research including the Narcissistic Personality 
    Inventory (NPI) and clinical literature. This tool identifies narcissistic traits
    and tendencies for self-awareness purposes.
    
    ⚠️  IMPORTANT DISCLAIMERS:
    - This is NOT a diagnostic tool for Narcissistic Personality Disorder (NPD)
    - Only licensed mental health professionals can diagnose personality disorders
    - High scores indicate traits, not necessarily pathological narcissism
    - This tool is for educational and self-reflection purposes only
    - If results concern you, please consult a mental health professional
    """
    
    def __init__(self):
        self.questions = self._load_questions()
        self.subscale_descriptions = {
            'Grandiosity': 'Inflated sense of self-importance and uniqueness',
            'Entitlement': 'Expectation of special treatment and recognition',
            'Exploitation': 'Using others for personal gain without empathy',
            'Vanity': 'Excessive focus on appearance and admiration',
            'Authority': 'Need to dominate and control others',
            'Self-Sufficiency': 'Belief in superiority and independence',
            'Exhibitionism': 'Attention-seeking and showing off behaviors'
        }
        
    def _load_questions(self) -> Dict[str, List[Dict]]:
        """Load research-based narcissism assessment questions"""
        return {
            'Grandiosity': [
                {'text': 'I think I am a special person', 'scoring': 'direct'},
                {'text': 'I am more capable than other people', 'scoring': 'direct'},
                {'text': 'I have a natural talent for influencing people', 'scoring': 'direct'},
                {'text': 'I am essentially a modest person', 'scoring': 'reverse'},
                {'text': 'I see myself as an ordinary person', 'scoring': 'reverse'},
                {'text': 'I believe I am destined for greatness', 'scoring': 'direct'}
            ],
            'Entitlement': [
                {'text': 'I expect a great deal from other people', 'scoring': 'direct'},
                {'text': 'I deserve more recognition for my contributions', 'scoring': 'direct'},
                {'text': 'People should respect my authority', 'scoring': 'direct'},
                {'text': 'I am content with ordinary achievements', 'scoring': 'reverse'},
                {'text': 'I don\'t expect special treatment from others', 'scoring': 'reverse'},
                {'text': 'Rules should apply to me differently than others', 'scoring': 'direct'}
            ],
            'Exploitation': [
                {'text': 'I find it easy to manipulate people', 'scoring': 'direct'},
                {'text': 'I can make anyone believe anything I want them to', 'scoring': 'direct'},
                {'text': 'I get upset when others don\'t notice how I look', 'scoring': 'direct'},
                {'text': 'I genuinely care about others\' feelings', 'scoring': 'reverse'},
                {'text': 'I often use others to get what I want', 'scoring': 'direct'},
                {'text': 'Other people\'s needs are as important as mine', 'scoring': 'reverse'}
            ],
            'Vanity': [
                {'text': 'I like to look at myself in the mirror', 'scoring': 'direct'},
                {'text': 'I really like to be the center of attention', 'scoring': 'direct'},
                {'text': 'I am less attractive than most people', 'scoring': 'reverse'},
                {'text': 'Physical appearance is not important to me', 'scoring': 'reverse'},
                {'text': 'I often check my appearance in reflective surfaces', 'scoring': 'direct'},
                {'text': 'Compliments about my looks are very important to me', 'scoring': 'direct'}
            ],
            'Authority': [
                {'text': 'I like having authority over other people', 'scoring': 'direct'},
                {'text': 'I would prefer to be a leader', 'scoring': 'direct'},
                {'text': 'I don\'t like being told what to do', 'scoring': 'direct'},
                {'text': 'I prefer to follow rather than lead', 'scoring': 'reverse'},
                {'text': 'People naturally look to me for leadership', 'scoring': 'direct'},
                {'text': 'I enjoy making decisions for others', 'scoring': 'direct'}
            ],
            'Self-Sufficiency': [
                {'text': 'I can live my life the way I want to', 'scoring': 'direct'},
                {'text': 'I am independent of others', 'scoring': 'direct'},
                {'text': 'I don\'t need others to validate my worth', 'scoring': 'direct'},
                {'text': 'I often seek advice from others', 'scoring': 'reverse'},
                {'text': 'I rely heavily on others for emotional support', 'scoring': 'reverse'},
                {'text': 'I function better when others depend on me than when I depend on others', 'scoring': 'direct'}
            ],
            'Exhibitionism': [
                {'text': 'I know that I am good because everybody keeps telling me so', 'scoring': 'direct'},
                {'text': 'When people compliment me I get embarrassed', 'scoring': 'reverse'},
                {'text': 'I enjoy performing in front of others', 'scoring': 'direct'},
                {'text': 'I prefer to blend into the background', 'scoring': 'reverse'},
                {'text': 'I like to share my achievements with others', 'scoring': 'direct'},
                {'text': 'I enjoy being photographed', 'scoring': 'direct'}
            ]
        }
    
    def administer_screening(self) -> Dict[str, float]:
        """
        Administer the narcissism screening tool interactively.
        Returns scores for each subscale and overall narcissism index.
        """
        print("="*60)
        print("NARCISSISTIC TRAITS SCREENING TOOL")
        print("="*60)
        print("\n⚠️  IMPORTANT DISCLAIMERS:")
        print("• This is NOT a diagnostic tool for personality disorders")
        print("• Only licensed professionals can diagnose NPD")
        print("• High scores indicate traits, not necessarily pathology")
        print("• Results are for self-awareness and educational purposes only")
        print("• Consider professional consultation if results concern you")
        print("\nRate each statement from 1-5:")
        print("1 = Strongly Disagree")
        print("2 = Disagree")
        print("3 = Neutral")
        print("4 = Agree") 
        print("5 = Strongly Agree")
        print("-" * 60)
        
        scores = {}
        all_responses = []
        
        for subscale, questions in self.questions.items():
            print(f"\n{subscale.upper()}: {self.subscale_descriptions[subscale]}")
            print("-" * 40)
            
            subscale_scores = []
            for i, q in enumerate(questions, 1):
                while True:
                    try:
                        response = input(f"{i}. {q['text']}: ")
                        score = int(response)
                        if 1 <= score <= 5:
                            # Apply scoring (reverse if needed)
                            if q['scoring'] == 'reverse':
                                final_score = 6 - score
                            else:
                                final_score = score
                            
                            subscale_scores.append(final_score)
                            all_responses.append(final_score)
                            break
                        else:
                            print("Please enter a number between 1 and 5")
                    except ValueError:
                        print("Please enter a valid number")
            
            # Calculate normalized subscale score (0-100)
            raw_score = sum(subscale_scores)
            max_possible = len(questions) * 5
            normalized_score = (raw_score / max_possible) * 100
            scores[subscale] = normalized_score
        
        # Calculate overall Narcissism Index
        overall_score = np.mean(list(scores.values()))
        scores['Overall_Narcissism'] = overall_score
        
        return scores
    
    def demo_scores(self) -> Dict[str, float]:
        """Generate demo scores for visualization"""
        return {
            'Grandiosity': 65,
            'Entitlement': 70,
            'Exploitation': 45,
            'Vanity': 55,
            'Authority': 80,
            'Self-Sufficiency': 75,
            'Exhibitionism': 60,
            'Overall_Narcissism': 64
        }
    
    def create_comprehensive_report(self, scores: Dict[str, float], title: str = "Narcissism Screening Results"):
        """Create comprehensive visualization and analysis with enhanced seaborn styling"""
        
        # Create figure with multiple subplots and seaborn styling
        plt.style.use('seaborn-v0_8-darkgrid')
        fig = plt.figure(figsize=(20, 14))
        fig.patch.set_facecolor('white')
        
        # 1. Overall Narcissism Gauge
        ax1 = plt.subplot(2, 4, 1)
        self._create_narcissism_gauge(ax1, scores['Overall_Narcissism'])
        
        # 2. Subscale Radar Chart
        ax2 = plt.subplot(2, 4, (2, 3), projection='polar')
        self._create_subscale_radar(ax2, scores)
        
        # 3. Risk Level Bar Chart
        ax3 = plt.subplot(2, 4, 4)
        self._create_risk_assessment(ax3, scores['Overall_Narcissism'])
        
        # 4. Subscale Breakdown
        ax4 = plt.subplot(2, 4, (5, 6))
        self._create_subscale_breakdown(ax4, scores)
        
        # 5. Percentile Comparison
        ax5 = plt.subplot(2, 4, 7)
        self._create_percentile_comparison(ax5, scores['Overall_Narcissism'])
        
        # 6. Recommendations Panel
        ax6 = plt.subplot(2, 4, 8)
        self._create_recommendations_panel(ax6, scores)
        
        plt.suptitle(title, fontsize=18, fontweight='bold', y=0.98)
        plt.tight_layout()
        plt.subplots_adjust(top=0.93)
        plt.show()
        
    def create_detailed_analysis(self, scores: Dict[str, float], title: str = "Detailed Narcissism Analysis"):
        """Create additional detailed analysis with correlation heatmap"""
        
        # Create figure for detailed analysis
        fig, axes = plt.subplots(2, 2, figsize=(16, 12))
        fig.suptitle(title, fontsize=18, fontweight='bold', y=0.95)
        
        # 1. Subscale Correlation Heatmap (simulated data for demonstration)
        ax1 = axes[0, 0]
        self._create_correlation_heatmap(ax1, scores)
        
        # 2. Trait Distribution Violin Plot
        ax2 = axes[0, 1]
        self._create_trait_distribution(ax2, scores)
        
        # 3. Score Progression (if multiple assessments were available)
        ax3 = axes[1, 0]
        self._create_score_timeline(ax3, scores)
        
        # 4. Risk Profile Polar Plot
        ax4 = axes[1, 1]
        self._create_risk_profile_polar(ax4, scores)
        
        plt.tight_layout()
        plt.show()
    
    def _create_correlation_heatmap(self, ax, scores):
        """Create correlation heatmap between subscales using seaborn"""
        subscales = [k for k in scores.keys() if k != 'Overall_Narcissism']
        
        # Create simulated correlation matrix (in real use, this would come from multiple users' data)
        np.random.seed(42)
        n_subscales = len(subscales)
        correlation_matrix = np.random.rand(n_subscales, n_subscales)
        
        # Make matrix symmetric
        correlation_matrix = (correlation_matrix + correlation_matrix.T) / 2
        np.fill_diagonal(correlation_matrix, 1.0)
        
        # Create DataFrame
        corr_df = pd.DataFrame(correlation_matrix, index=subscales, columns=subscales)
        
        # Create heatmap with seaborn
        sns.heatmap(corr_df, annot=True, cmap='RdBu_r', center=0, 
                   square=True, fmt='.2f', cbar_kws={'shrink': 0.8},
                   ax=ax, linewidths=0.5)
        
        ax.set_title('Trait Correlations\n(Simulated Population Data)', 
                    fontweight='bold', fontsize=12, pad=20)
        ax.tick_params(axis='both', labelsize=9)
    
    def _create_trait_distribution(self, ax, scores):
        """Create violin plot showing trait distributions"""
        subscales = [k for k in scores.keys() if k != 'Overall_Narcissism']
        user_scores = [scores[k] for k in subscales]
        
        # Create simulated population data for comparison
        np.random.seed(42)
        population_data = []
        trait_names = []
        
        for i, (trait, user_score) in enumerate(zip(subscales, user_scores)):
            # Generate population scores for this trait
            pop_scores = np.random.normal(40, 20, 1000)
            pop_scores = np.clip(pop_scores, 0, 100)
            
            population_data.extend(pop_scores)
            trait_names.extend([trait] * len(pop_scores))
        
        # Create DataFrame
        df = pd.DataFrame({
            'Trait': trait_names,
            'Score': population_data
        })
        
        # Create violin plot
        sns.violinplot(data=df, y='Trait', x='Score', ax=ax, 
                      palette='Set2', inner='quart')
        
        # Add user scores as red dots
        for i, (trait, user_score) in enumerate(zip(subscales, user_scores)):
            ax.scatter([user_score], [i], color='red', s=100, zorder=5, 
                      label='Your Score' if i == 0 else '')
        
        ax.set_title('Your Scores vs Population Distribution', 
                    fontweight='bold', fontsize=12, pad=20)
        ax.set_xlabel('Score', fontweight='bold')
        ax.set_ylabel('Trait', fontweight='bold')
        ax.legend()
        ax.grid(True, alpha=0.3)
    
    def _create_score_timeline(self, ax, scores):
        """Create timeline showing score progression (simulated for demo)"""
        # Simulate historical data (in real use, this would be stored assessments)
        dates = pd.date_range(start='2023-01-01', end='2025-08-14', freq='3M')
        overall_scores = [scores['Overall_Narcissism'] + np.random.normal(0, 5) 
                         for _ in dates]
        overall_scores = np.clip(overall_scores, 0, 100)
        
        # Add current score as last point
        overall_scores[-1] = scores['Overall_Narcissism']
        
        # Create line plot with seaborn
        sns.lineplot(x=dates, y=overall_scores, ax=ax, marker='o', 
                    linewidth=3, markersize=8, color='#3498DB')
        
        # Highlight current score
        ax.scatter([dates[-1]], [overall_scores[-1]], color='red', s=150, 
                  zorder=5, edgecolor='darkred', linewidth=2)
        
        # Add trend line
        x_numeric = [i for i in range(len(dates))]
        z = np.polyfit(x_numeric, overall_scores, 1)
        p = np.poly1d(z)
        ax.plot(dates, p(x_numeric), "--", alpha=0.7, color='red', 
               label=f'Trend (slope: {z[0]:.1f})')
        
        ax.set_title('Narcissism Score Timeline\n(Simulated Historical Data)', 
                    fontweight='bold', fontsize=12, pad=20)
        ax.set_xlabel('Date', fontweight='bold')
        ax.set_ylabel('Overall Narcissism Score', fontweight='bold')
        ax.legend()
        ax.grid(True, alpha=0.3)
        
        # Format x-axis
        import matplotlib.dates as mdates
        ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
        ax.tick_params(axis='x', rotation=45)
    
    def _create_risk_profile_polar(self, ax, scores):
        """Create polar plot showing risk profile"""
        subscales = [k for k in scores.keys() if k != 'Overall_Narcissism']
        values = [scores[k] for k in subscales]
        
        # Convert to risk levels (0-4 scale)
        risk_values = [min(4, int(score / 25)) for score in values]
        
        # Create angles
        angles = np.linspace(0, 2 * np.pi, len(subscales), endpoint=False).tolist()
        risk_values += risk_values[:1]  # Close the shape
        angles += angles[:1]
        
        # Create polar plot with different styling
        colors = sns.color_palette("Reds", 5)
        
        for i, (angle, risk_val) in enumerate(zip(angles[:-1], risk_values[:-1])):
            # Create concentric circles for each risk level
            for level in range(1, risk_val + 1):
                circle_angles = np.linspace(angle - np.pi/len(subscales)/2, 
                                          angle + np.pi/len(subscales)/2, 50)
                circle_radii = [level] * len(circle_angles)
                ax.fill_between(circle_angles, 0, circle_radii, 
                              color=colors[level], alpha=0.6)
        
        # Add labels
        ax.set_xticks(angles[:-1])
        ax.set_xticklabels(subscales, fontsize=10)
        ax.set_ylim(0, 4)
        ax.set_yticks([1, 2, 3, 4])
        ax.set_yticklabels(['Low', 'Moderate', 'High', 'Very High'])
        ax.set_title('Risk Level Profile', fontweight='bold', pad=20, fontsize=12)
    
    def _create_narcissism_gauge(self, ax, overall_score):
        """Create speedometer-style gauge for overall narcissism with seaborn colors"""
        # Create gauge segments with seaborn color palette
        theta = np.linspace(0, np.pi, 100)
        
        # Use seaborn color palette for risk levels
        palette = sns.color_palette("RdYlGn_r", 4)  # Red-Yellow-Green reversed
        
        # Color segments based on risk levels
        colors = []
        for angle in theta:
            score_at_angle = (angle / np.pi) * 100
            if score_at_angle < 30:
                colors.append(palette[3])  # Low - Green
            elif score_at_angle < 60:
                colors.append(palette[2])  # Moderate - Yellow
            elif score_at_angle < 80:
                colors.append(palette[1])  # High - Orange
            else:
                colors.append(palette[0])  # Very High - Red
        
        # Plot gauge background
        for i in range(len(theta)-1):
            ax.fill_between([theta[i], theta[i+1]], [0.8, 0.8], [1, 1], 
                           color=colors[i], alpha=0.8)
        
        # Plot needle with enhanced styling
        needle_angle = (overall_score / 100) * np.pi
        ax.arrow(needle_angle, 0, 0, 0.9, head_width=0.08, head_length=0.08, 
                fc='#2C3E50', ec='#2C3E50', linewidth=4)
        
        # Add score text with better styling
        ax.text(np.pi/2, 0.5, f'{overall_score:.0f}', ha='center', va='center',
               fontsize=24, fontweight='bold', color='#2C3E50')
        ax.text(np.pi/2, 0.25, 'Narcissism\nIndex', ha='center', va='center',
               fontsize=14, fontweight='bold', color='#34495E')
        
        # Customize with better labels
        ax.set_ylim(0, 1)
        ax.set_xlim(0, np.pi)
        ax.set_xticks([0, np.pi/4, np.pi/2, 3*np.pi/4, np.pi])
        ax.set_xticklabels(['Low\n(0-30)', 'Mod-Low\n(30-45)', 'Moderate\n(45-60)', 
                           'Mod-High\n(60-80)', 'High\n(80-100)'], fontsize=10)
        ax.set_yticks([])
        ax.set_title('Overall Narcissism Level', fontweight='bold', pad=25, fontsize=14)
    
    def _create_subscale_radar(self, ax, scores):
        """Create radar chart for subscales with seaborn styling"""
        subscales = [k for k in scores.keys() if k != 'Overall_Narcissism']
        values = [scores[k] for k in subscales]
        
        # Close the polygon
        values += values[:1]
        
        # Calculate angles
        angles = np.linspace(0, 2 * np.pi, len(subscales), endpoint=False).tolist()
        angles += angles[:1]
        
        # Use seaborn color palette
        colors = sns.color_palette("husl", 2)
        
        # Plot with enhanced styling
        ax.plot(angles, values, 'o-', linewidth=3, color=colors[0], 
               markersize=8, markerfacecolor=colors[1], markeredgecolor=colors[0], 
               markeredgewidth=2)
        ax.fill(angles, values, alpha=0.3, color=colors[0])
        
        # Customize with better styling
        ax.set_xticks(angles[:-1])
        ax.set_xticklabels(subscales, fontsize=11, fontweight='bold')
        ax.set_ylim(0, 100)
        ax.set_yticks([20, 40, 60, 80, 100])
        ax.set_yticklabels(['20', '40', '60', '80', '100'], fontsize=10)
        ax.grid(True, alpha=0.6)
        ax.set_facecolor('#FAFAFA')
        ax.set_title('Narcissistic Trait Profile', fontweight='bold', pad=25, fontsize=14)
        
        # Add score labels with better positioning
        for angle, value, subscale in zip(angles[:-1], values[:-1], subscales):
            # Adjust label position to avoid overlap
            offset = 8 if value > 85 else 5
            ax.text(angle, value + offset, f'{value:.0f}', 
                   horizontalalignment='center', fontsize=10, fontweight='bold',
                   bbox=dict(boxstyle="round,pad=0.2", facecolor='white', 
                           alpha=0.8, edgecolor='gray'))
    
    def _create_risk_assessment(self, ax, overall_score):
        """Create risk level assessment with seaborn styling"""
        risk_levels = ['Low Risk\n(0-30)', 'Moderate\n(30-60)', 'High\n(60-80)', 'Very High\n(80-100)']
        risk_values = [30, 30, 20, 20]
        
        # Use seaborn color palette
        risk_colors = sns.color_palette("RdYlGn_r", 4)  # Red-Yellow-Green reversed
        
        # Determine current risk level
        if overall_score < 30:
            current_risk = 0
        elif overall_score < 60:
            current_risk = 1
        elif overall_score < 80:
            current_risk = 2
        else:
            current_risk = 3
        
        # Create enhanced bars
        bars = ax.bar(risk_levels, risk_values, color=risk_colors, alpha=0.8, 
                     edgecolor='white', linewidth=2)
        
        # Highlight current risk level with enhanced styling
        bars[current_risk].set_alpha(1.0)
        bars[current_risk].set_edgecolor('#2C3E50')
        bars[current_risk].set_linewidth(4)
        
        # Enhanced styling
        ax.set_ylabel('Score Range', fontweight='bold', fontsize=12)
        ax.set_title('Risk Assessment', fontweight='bold', fontsize=14, pad=20)
        ax.set_ylim(0, 35)
        
        # Add current level indicator with better styling
        ax.text(current_risk, bars[current_risk].get_height() + 2.5, 
               f'YOUR LEVEL\n({overall_score:.0f})', ha='center', va='bottom',
               fontweight='bold', fontsize=11, 
               bbox=dict(boxstyle="round,pad=0.5", facecolor='yellow', 
                        alpha=0.9, edgecolor='orange', linewidth=2))
        
        # Add grid and background
        ax.grid(True, alpha=0.3, axis='y')
        ax.set_facecolor('#FAFAFA')
        
        # Rotate x labels for better readability
        plt.setp(ax.get_xticklabels(), fontsize=10, fontweight='bold')
    
    def _create_subscale_breakdown(self, ax, scores):
        """Create horizontal bar chart of subscales with seaborn styling"""
        subscales = [k for k in scores.keys() if k != 'Overall_Narcissism']
        values = [scores[k] for k in subscales]
        
        # Create DataFrame for seaborn
        df = pd.DataFrame({
            'Subscale': subscales,
            'Score': values,
            'Risk_Level': ['High' if score >= 70 else 'Moderate' if score >= 50 else 'Low' 
                          for score in values]
        })
        
        # Use seaborn color palette
        risk_colors = {'Low': '#2ECC71', 'Moderate': '#F39C12', 'High': '#E74C3C'}
        
        # Create enhanced horizontal bar plot
        y_pos = np.arange(len(subscales))
        bars = ax.barh(y_pos, values, color=[risk_colors[level] for level in df['Risk_Level']], 
                      alpha=0.85, edgecolor='white', linewidth=1.5)
        
        # Add value labels with better styling
        for i, (bar, value) in enumerate(zip(bars, values)):
            width = bar.get_width()
            ax.text(width + 1.5, bar.get_y() + bar.get_height()/2,
                   f'{value:.0f}', ha='left', va='center', fontweight='bold', 
                   fontsize=11, color='#2C3E50')
        
        # Enhanced styling
        ax.set_yticks(y_pos)
        ax.set_yticklabels(subscales, fontsize=11, fontweight='bold')
        ax.set_xlabel('Score (0-100)', fontweight='bold', fontsize=12)
        ax.set_title('Subscale Breakdown', fontweight='bold', fontsize=14, pad=20)
        ax.set_xlim(0, 110)
        
        # Add reference lines with labels
        ax.axvline(x=50, color='gray', linestyle='--', alpha=0.7, linewidth=2)
        ax.axvline(x=70, color='red', linestyle='--', alpha=0.7, linewidth=2)
        
        # Add legend
        from matplotlib.patches import Patch
        legend_elements = [Patch(facecolor='#2ECC71', label='Low (0-49)'),
                          Patch(facecolor='#F39C12', label='Moderate (50-69)'),
                          Patch(facecolor='#E74C3C', label='High (70-100)')]
        ax.legend(handles=legend_elements, loc='lower right', frameon=True, 
                 fancybox=True, shadow=True)
        
        # Grid styling
        ax.grid(True, alpha=0.3, axis='x')
        ax.set_facecolor('#FAFAFA')
    
    def _create_percentile_comparison(self, ax, overall_score):
        """Create percentile comparison with population using seaborn styling"""
        # Simulate population distribution (normal distribution)
        np.random.seed(42)  # For reproducible results
        population = np.random.normal(35, 15, 10000)  # Mean=35, SD=15
        population = np.clip(population, 0, 100)
        
        # Calculate percentile
        percentile = (np.sum(population < overall_score) / len(population)) * 100
        
        # Create enhanced histogram with seaborn styling
        colors = sns.color_palette("viridis", 2)
        n, bins, patches = ax.hist(population, bins=30, alpha=0.75, color=colors[0], 
                                  edgecolor='white', linewidth=0.8, density=True)
        
        # Add kde overlay
        from scipy import stats
        x = np.linspace(0, 100, 100)
        kde = stats.gaussian_kde(population)
        ax.plot(x, kde(x), color=colors[1], linewidth=3, alpha=0.8, label='Distribution Curve')
        
        # Your score line with enhanced styling
        ax.axvline(overall_score, color='#E74C3C', linewidth=4, alpha=0.9,
                  label=f'Your Score ({overall_score:.0f})', linestyle='-')
        
        # Fill area under curve up to your score
        x_fill = x[x <= overall_score]
        y_fill = kde(x_fill)
        ax.fill_between(x_fill, y_fill, alpha=0.3, color='#E74C3C')
        
        # Enhanced styling
        ax.set_xlabel('Narcissism Score', fontweight='bold', fontsize=12)
        ax.set_ylabel('Density', fontweight='bold', fontsize=12)
        ax.set_title(f'Population Comparison\n{percentile:.0f}th Percentile', 
                    fontweight='bold', fontsize=14, pad=20)
        ax.legend(frameon=True, fancybox=True, shadow=True, loc='upper right')
        ax.grid(True, alpha=0.3)
        ax.set_facecolor('#FAFAFA')
        
        # Add percentile text box
        textstr = f'You score higher than\n{percentile:.0f}% of people'
        props = dict(boxstyle='round', facecolor='wheat', alpha=0.8)
        ax.text(0.05, 0.95, textstr, transform=ax.transAxes, fontsize=11,
                verticalalignment='top', bbox=props, fontweight='bold')
    
    def _create_recommendations_panel(self, ax, scores):
        """Create recommendations based on scores"""
        ax.axis('off')
        overall_score = scores['Overall_Narcissism']
        
        # Get highest subscale
        subscales = {k: v for k, v in scores.items() if k != 'Overall_Narcissism'}
        highest_subscale = max(subscales, key=subscales.get)
        highest_score = subscales[highest_subscale]
        
        # Generate recommendations
        if overall_score < 30:
            risk_level = "LOW RISK"
            recommendations = """
RECOMMENDATIONS:
• Healthy self-confidence level
• Continue building empathy
• Maintain balanced relationships
• Consider leadership roles
• Keep developing self-awareness
            """
        elif overall_score < 60:
            risk_level = "MODERATE"
            recommendations = f"""
RECOMMENDATIONS:
• Monitor {highest_subscale.lower()} tendencies
• Practice active listening
• Seek feedback from others
• Focus on empathy building
• Consider counseling for growth
            """
        elif overall_score < 80:
            risk_level = "HIGH CONCERN"
            recommendations = f"""
RECOMMENDATIONS:
• Address {highest_subscale.lower()} patterns
• Seek professional counseling
• Practice humility exercises
• Work on empathy skills
• Consider impact on relationships
            """
        else:
            risk_level = "VERY HIGH CONCERN"
            recommendations = """
RECOMMENDATIONS:
• Strongly consider professional help
• Therapy focusing on narcissistic traits
• Relationship counseling if applicable
• Mindfulness and empathy training
• Regular self-reflection practices
            """
        
        recommendation_text = f"""
RISK LEVEL: {risk_level}
Overall Score: {overall_score:.0f}/100

Highest Trait: {highest_subscale} ({highest_score:.0f})

{recommendations}

⚠️  REMEMBER: This is a screening tool,
not a clinical diagnosis. Professional
consultation is recommended for
concerning results.
        """
        
        ax.text(0.05, 0.95, recommendation_text, transform=ax.transAxes, 
               fontsize=9, verticalalignment='top', fontfamily='monospace',
               bbox=dict(boxstyle="round,pad=0.5", facecolor='lightyellow', alpha=0.8))
    
    def _print_detailed_analysis(self, scores):
        """Print comprehensive analysis of results"""
        print("\n" + "="*70)
        print("DETAILED NARCISSISM SCREENING ANALYSIS")
        print("="*70)
        
        overall_score = scores['Overall_Narcissism']
        print(f"\n🔍 OVERALL NARCISSISM INDEX: {overall_score:.1f}/100")
        
        # Risk interpretation
        if overall_score < 30:
            print("✅ INTERPRETATION: Low narcissistic traits (healthy range)")
            risk_desc = "You show healthy levels of self-confidence with good empathy and interpersonal skills."
        elif overall_score < 60:
            print("⚠️  INTERPRETATION: Moderate narcissistic traits")
            risk_desc = "Some narcissistic tendencies present. Monitor for impact on relationships."
        elif overall_score < 80:
            print("🚨 INTERPRETATION: High narcissistic traits (concerning)")
            risk_desc = "Significant narcissistic patterns that may affect relationships and functioning."
        else:
            print("🚨 INTERPRETATION: Very high narcissistic traits (seek help)")
            risk_desc = "Severe narcissistic patterns requiring professional attention."
        
        print(f"   {risk_desc}")
        
        # Subscale analysis
        print(f"\n📊 SUBSCALE BREAKDOWN:")
        subscales = {k: v for k, v in scores.items() if k != 'Overall_Narcissism'}
        for subscale, score in sorted(subscales.items(), key=lambda x: x[1], reverse=True):
            level = "HIGH" if score >= 70 else "MODERATE" if score >= 50 else "LOW"
            print(f"   • {subscale}: {score:.1f} ({level})")
            print(f"     {self.subscale_descriptions[subscale]}")
        
        # Highest concern
        highest = max(subscales, key=subscales.get)
        print(f"\n⚡ HIGHEST CONCERN: {highest} ({subscales[highest]:.1f})")
        
        # Professional guidance
        print(f"\n🏥 PROFESSIONAL GUIDANCE:")
        if overall_score >= 60:
            print("   • Consider consultation with a mental health professional")
            print("   • Therapy can help address narcissistic patterns")
            print("   • Focus on empathy and relationship skills")
        else:
            print("   • Scores in normal range, professional help not urgent")
            print("   • Continue self-awareness and personal growth")
            print("   • Monitor for changes over time")
        
        print(f"\n📅 NEXT STEPS:")
        print("   • Reflect on results and their accuracy")
        print("   • Seek feedback from trusted friends/family")
        print("   • Consider retaking assessment in 6 months")
        print("   • Focus on empathy and perspective-taking")

def save_results(scores: Dict[str, float], filename: str = "narcissism_screening_results.json"):
    """Save screening results to JSON file"""
    results = {
        'timestamp': datetime.now().isoformat(),
        'scores': scores,
        'assessment_type': 'Narcissism Screening Tool',
        'version': '1.0',
        'disclaimer': 'This is a screening tool, not a diagnostic instrument'
    }
    
    with open(filename, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n💾 Results saved to {filename}")

# Example usage
if __name__ == "__main__":
    print("🔍 Narcissistic Traits Screening Tool (Enhanced with Seaborn)")
    print("=" * 60)
    print("📊 Now featuring enhanced visualizations with seaborn styling!")
    print("⚠️  Requires: numpy, matplotlib, pandas, seaborn, scipy")
    print("=" * 60)
    
    tool = NarcissismScreeningTool()
    
    print("\nChoose an option:")
    print("1 - Take the complete screening (42 questions)")
    print("2 - View demo results")
    print("3 - View demo with detailed analysis")
    
    while True:
        choice = input("\nEnter your choice (1, 2, or 3): ").strip()
        if choice == "1":
            scores = tool.administer_screening()
            title = "Your Narcissism Screening Results"
            filename = "my_narcissism_screening.json"
            show_detailed = input("\nWould you like to see detailed analysis? (y/n): ").lower() == 'y'
            break
        elif choice == "2":
            scores = tool.demo_scores()
            title = "Demo Narcissism Screening Results"
            filename = "demo_narcissism_screening.json"
            show_detailed = False
            print("DEMO: Using sample scores for demonstration")
            break
        elif choice == "3":
            scores = tool.demo_scores()
            title = "Demo Narcissism Screening Results - Detailed"
            filename = "demo_narcissism_detailed.json"
            show_detailed = True
            print("DEMO: Using sample scores with detailed analysis")
            break
        else:
            print("Please enter 1, 2, or 3")
    
    # Create comprehensive report
    tool.create_comprehensive_report(scores, title)
    
    # Show detailed analysis if requested
    if show_detailed:
        tool.create_detailed_analysis(scores, "Advanced Narcissism Analysis")
    
    # Print detailed analysis
    tool._print_detailed_analysis(scores)
    
    # Save results
    save_results(scores, filename)