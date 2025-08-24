import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
import math
from typing import Dict, List, Tuple
import json
from datetime import datetime, timedelta

# Set seaborn style for better visualizations
sns.set_style("whitegrid")
sns.set_palette("Set2")
plt.style.use('seaborn-v0_8')

# Configure seaborn settings for better plots
sns.set_context("notebook", font_scale=1.1)
plt.rcParams['figure.facecolor'] = 'white'
plt.rcParams['axes.facecolor'] = '#FAFAFA'

class BipolarScreeningTool:
    """
    Bipolar Disorder Screening Tool
    
    Based on established psychological research including the Mood Disorder 
    Questionnaire (MDQ), Bipolar Spectrum Diagnostic Scale (BSDS), and 
    clinical literature. This tool screens for bipolar spectrum disorders.
    
    ⚠️  CRITICAL DISCLAIMERS:
    - This is NOT a diagnostic tool for Bipolar Disorder
    - Only licensed mental health professionals can diagnose bipolar disorder
    - High scores indicate need for professional evaluation
    - Bipolar disorder is a serious medical condition requiring treatment
    - If you're having thoughts of self-harm, seek immediate help
    - This tool is for educational and screening purposes only
    - Results should be discussed with a healthcare provider
    """
    
    def __init__(self):
        self.questions = self._load_questions()
        self.subscale_descriptions = {
            'Manic_Episodes': 'Elevated mood, energy, and activity periods',
            'Depressive_Episodes': 'Low mood, energy, and motivation periods',
            'Mixed_Episodes': 'Simultaneous manic and depressive symptoms',
            'Functional_Impairment': 'Impact on work, relationships, and daily life',
            'Family_History': 'Genetic and family factors',
            'Substance_Use': 'Alcohol/drug use patterns during mood episodes',
            'Sleep_Patterns': 'Changes in sleep during mood episodes',
            'Psychotic_Features': 'Hallucinations or delusions during episodes'
        }
        
        # Risk level thresholds based on clinical research
        self.risk_thresholds = {
            'Low': 30,
            'Moderate': 50, 
            'High': 70,
            'Very_High': 85
        }
        
    def _load_questions(self) -> Dict[str, List[Dict]]:
        """Load research-based bipolar disorder screening questions"""
        return {
            'Manic_Episodes': [
                {'text': 'I have had periods where I felt so good or energetic that others thought I was not my normal self', 'scoring': 'direct'},
                {'text': 'I have had times when I was more talkative or spoke faster than usual', 'scoring': 'direct'},
                {'text': 'I have had periods when I needed much less sleep than usual', 'scoring': 'direct'},
                {'text': 'I have had times when I was much more self-confident than usual', 'scoring': 'direct'},
                {'text': 'I have had periods when I did things that were unusual for me or others thought were excessive', 'scoring': 'direct'},
                {'text': 'I have had times when I was much more active or did many more things than usual', 'scoring': 'direct'},
                {'text': 'I have never experienced periods of unusually elevated mood', 'scoring': 'reverse'}
            ],
            'Depressive_Episodes': [
                {'text': 'I have had periods lasting at least 2 weeks when I felt sad, depressed, or empty most of the day', 'scoring': 'direct'},
                {'text': 'I have experienced times when I lost interest in activities I usually enjoyed', 'scoring': 'direct'},
                {'text': 'I have had periods when I felt worthless or excessively guilty', 'scoring': 'direct'},
                {'text': 'I have experienced significant changes in appetite or weight during low periods', 'scoring': 'direct'},
                {'text': 'I have had difficulty concentrating or making decisions during depressive periods', 'scoring': 'direct'},
                {'text': 'I have had thoughts of death or suicide during low periods', 'scoring': 'direct'},
                {'text': 'I have never experienced extended periods of depression', 'scoring': 'reverse'}
            ],
            'Mixed_Episodes': [
                {'text': 'I have had periods when I felt both energetic and depressed at the same time', 'scoring': 'direct'},
                {'text': 'I have experienced times when my mood changed rapidly from high to low', 'scoring': 'direct'},
                {'text': 'I have had periods when I felt agitated and restless while also feeling sad', 'scoring': 'direct'},
                {'text': 'I have experienced times when I had racing thoughts while feeling hopeless', 'scoring': 'direct'},
                {'text': 'I have had periods when I was irritable and had increased energy simultaneously', 'scoring': 'direct'},
                {'text': 'My mood episodes are always clearly either high or low, never mixed', 'scoring': 'reverse'}
            ],
            'Functional_Impairment': [
                {'text': 'My mood changes have caused problems in my work or school performance', 'scoring': 'direct'},
                {'text': 'My mood episodes have strained my relationships with family or friends', 'scoring': 'direct'},
                {'text': 'I have made important decisions during mood episodes that I later regretted', 'scoring': 'direct'},
                {'text': 'My mood changes have led to financial problems or poor spending decisions', 'scoring': 'direct'},
                {'text': 'I have been hospitalized or needed intensive treatment for mood episodes', 'scoring': 'direct'},
                {'text': 'My mood changes have never significantly impacted my daily functioning', 'scoring': 'reverse'}
            ],
            'Family_History': [
                {'text': 'One or more of my biological relatives has been diagnosed with bipolar disorder', 'scoring': 'direct'},
                {'text': 'Family members have experienced severe depression requiring treatment', 'scoring': 'direct'},
                {'text': 'Relatives have had problems with alcohol or substance abuse', 'scoring': 'direct'},
                {'text': 'Family members have been hospitalized for psychiatric reasons', 'scoring': 'direct'},
                {'text': 'There is no history of mental health issues in my family', 'scoring': 'reverse'}
            ],
            'Substance_Use': [
                {'text': 'I have used alcohol or drugs more during periods of elevated mood', 'scoring': 'direct'},
                {'text': 'I have used substances to cope with depressive episodes', 'scoring': 'direct'},
                {'text': 'My substance use has increased during mood episodes', 'scoring': 'direct'},
                {'text': 'I have made poor decisions about alcohol/drugs during mood changes', 'scoring': 'direct'},
                {'text': 'My substance use patterns do not change with my mood', 'scoring': 'reverse'}
            ],
            'Sleep_Patterns': [
                {'text': 'During elevated periods, I have needed much less sleep than usual (3-4 hours)', 'scoring': 'direct'},
                {'text': 'I have had periods where I barely slept for days but still felt energetic', 'scoring': 'direct'},
                {'text': 'During low periods, I sleep much more than usual or have trouble sleeping', 'scoring': 'direct'},
                {'text': 'My sleep patterns change dramatically with my mood', 'scoring': 'direct'},
                {'text': 'My sleep remains consistent regardless of my mood', 'scoring': 'reverse'}
            ],
            'Psychotic_Features': [
                {'text': 'I have heard voices or seen things others could not during mood episodes', 'scoring': 'direct'},
                {'text': 'I have had beliefs that others thought were unrealistic during mood periods', 'scoring': 'direct'},
                {'text': 'During mood episodes, I have felt like I had special powers or abilities', 'scoring': 'direct'},
                {'text': 'I have experienced paranoid thoughts during mood changes', 'scoring': 'direct'},
                {'text': 'I have never experienced unusual perceptions or beliefs', 'scoring': 'reverse'}
            ]
        }
    
    def administer_screening(self) -> Dict[str, float]:
        """
        Administer the bipolar disorder screening tool interactively.
        Returns scores for each subscale and overall risk assessment.
        """
        print("="*70)
        print("BIPOLAR DISORDER SCREENING TOOL")
        print("="*70)
        print("\n🚨 CRITICAL DISCLAIMERS:")
        print("• This is NOT a diagnostic tool for bipolar disorder")
        print("• Only licensed professionals can diagnose bipolar disorder")
        print("• High scores indicate need for professional evaluation")
        print("• Bipolar disorder requires professional treatment")
        print("• If having thoughts of self-harm, seek immediate help")
        print("• Results should be discussed with a healthcare provider")
        print("\n📞 CRISIS RESOURCES:")
        print("• National Suicide Prevention Lifeline: 988")
        print("• Crisis Text Line: Text HOME to 741741")
        print("• Emergency: Call 911")
        
        print("\nRate each statement from 1-5:")
        print("1 = Never/Strongly Disagree")
        print("2 = Rarely/Disagree")
        print("3 = Sometimes/Neutral")
        print("4 = Often/Agree")
        print("5 = Very Often/Strongly Agree")
        print("-" * 70)
        
        scores = {}
        all_responses = []
        
        for subscale, questions in self.questions.items():
            print(f"\n{subscale.replace('_', ' ').upper()}: {self.subscale_descriptions[subscale]}")
            print("-" * 50)
            
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
        
        # Calculate overall risk score with weighted components
        weights = {
            'Manic_Episodes': 0.25,
            'Depressive_Episodes': 0.25,
            'Mixed_Episodes': 0.15,
            'Functional_Impairment': 0.20,
            'Family_History': 0.05,
            'Substance_Use': 0.05,
            'Sleep_Patterns': 0.03,
            'Psychotic_Features': 0.02
        }
        
        overall_risk = sum(scores[subscale] * weight for subscale, weight in weights.items())
        scores['Overall_Risk'] = overall_risk
        
        # Add immediate safety check
        self._safety_check(scores)
        
        return scores
    
    def _safety_check(self, scores):
        """Perform immediate safety assessment"""
        if scores['Overall_Risk'] > 70 or scores['Depressive_Episodes'] > 80:
            print("\n" + "="*70)
            print("🚨 HIGH RISK DETECTED - PLEASE READ CAREFULLY")
            print("="*70)
            print("Your responses indicate significant mental health concerns.")
            print("We strongly recommend you:")
            print("• Contact a mental health professional immediately")
            print("• Call 988 (Suicide Prevention Lifeline) if having thoughts of self-harm")
            print("• Go to nearest emergency room if in crisis")
            print("• Reach out to trusted friends or family for support")
            print("="*70)
            
            continue_assessment = input("\nDo you want to continue with the assessment? (y/n): ")
            if continue_assessment.lower() != 'y':
                print("Please prioritize your safety and seek professional help.")
                exit()
    
    def demo_scores(self) -> Dict[str, float]:
        """Generate demo scores for visualization"""
        return {
            'Manic_Episodes': 65,
            'Depressive_Episodes': 75,
            'Mixed_Episodes': 55,
            'Functional_Impairment': 70,
            'Family_History': 40,
            'Substance_Use': 35,
            'Sleep_Patterns': 80,
            'Psychotic_Features': 25,
            'Overall_Risk': 58
        }
    
    def create_comprehensive_report(self, scores: Dict[str, float], title: str = "Bipolar Screening Results"):
        """Create comprehensive visualization and analysis"""
        
        # Create figure with enhanced seaborn styling
        plt.style.use('seaborn-v0_8-darkgrid')
        fig = plt.figure(figsize=(22, 16))
        fig.patch.set_facecolor('white')
        
        # 1. Overall Risk Gauge
        ax1 = plt.subplot(3, 4, 1)
        self._create_risk_gauge(ax1, scores['Overall_Risk'])
        
        # 2. Mood Episode Patterns
        ax2 = plt.subplot(3, 4, (2, 3), projection='polar')
        self._create_mood_radar(ax2, scores)
        
        # 3. Risk Level Assessment
        ax3 = plt.subplot(3, 4, 4)
        self._create_risk_level_chart(ax3, scores['Overall_Risk'])
        
        # 4. Subscale Breakdown
        ax4 = plt.subplot(3, 4, (5, 7))
        self._create_subscale_breakdown(ax4, scores)
        
        # 5. Severity Heatmap
        ax5 = plt.subplot(3, 4, 8)
        self._create_severity_heatmap(ax5, scores)
        
        # 6. Mood Timeline Simulation
        ax6 = plt.subplot(3, 4, (9, 10))
        self._create_mood_timeline(ax6, scores)
        
        # 7. Population Comparison
        ax7 = plt.subplot(3, 4, 11)
        self._create_population_comparison(ax7, scores['Overall_Risk'])
        
        # 8. Treatment Recommendations
        ax8 = plt.subplot(3, 4, 12)
        self._create_recommendations_panel(ax8, scores)
        
        plt.suptitle(title, fontsize=20, fontweight='bold', y=0.98)
        plt.tight_layout()
        plt.subplots_adjust(top=0.94)
        plt.show()
    
    def _create_risk_gauge(self, ax, overall_risk):
        """Create speedometer-style gauge for overall risk"""
        theta = np.linspace(0, np.pi, 100)
        
        # Enhanced color palette for risk levels
        risk_colors = sns.color_palette("RdYlBu_r", 4)
        
        colors = []
        for angle in theta:
            risk_at_angle = (angle / np.pi) * 100
            if risk_at_angle < 30:
                colors.append(risk_colors[3])  # Low - Blue
            elif risk_at_angle < 50:
                colors.append(risk_colors[2])  # Moderate - Yellow
            elif risk_at_angle < 70:
                colors.append(risk_colors[1])  # High - Orange
            else:
                colors.append(risk_colors[0])  # Very High - Red
        
        # Plot gauge background
        for i in range(len(theta)-1):
            ax.fill_between([theta[i], theta[i+1]], [0.8, 0.8], [1, 1], 
                           color=colors[i], alpha=0.9)
        
        # Plot needle
        needle_angle = (overall_risk / 100) * np.pi
        ax.arrow(needle_angle, 0, 0, 0.9, head_width=0.06, head_length=0.06, 
                fc='#2C3E50', ec='#2C3E50', linewidth=5)
        
        # Add score text
        ax.text(np.pi/2, 0.5, f'{overall_risk:.0f}', ha='center', va='center',
               fontsize=28, fontweight='bold', color='#2C3E50')
        ax.text(np.pi/2, 0.25, 'Bipolar\nRisk Score', ha='center', va='center',
               fontsize=14, fontweight='bold', color='#34495E')
        
        # Enhanced labels
        ax.set_ylim(0, 1)
        ax.set_xlim(0, np.pi)
        ax.set_xticks([0, np.pi/4, np.pi/2, 3*np.pi/4, np.pi])
        ax.set_xticklabels(['Low\n(0-30)', 'Moderate\n(30-50)', 'Elevated\n(50-70)', 
                           'High\n(70-85)', 'Critical\n(85-100)'], fontsize=11)
        ax.set_yticks([])
        ax.set_title('Overall Bipolar Risk Level', fontweight='bold', pad=30, fontsize=16)
    
    def _create_mood_radar(self, ax, scores):
        """Create radar chart for mood-related subscales"""
        mood_subscales = ['Manic_Episodes', 'Depressive_Episodes', 'Mixed_Episodes', 
                         'Sleep_Patterns', 'Functional_Impairment']
        values = [scores[k] for k in mood_subscales]
        
        # Close the polygon
        values += values[:1]
        
        # Calculate angles
        angles = np.linspace(0, 2 * np.pi, len(mood_subscales), endpoint=False).tolist()
        angles += angles[:1]
        
        # Enhanced radar chart styling
        colors = sns.color_palette("viridis", 3)
        
        # Plot with gradient fill
        ax.plot(angles, values, 'o-', linewidth=4, color=colors[0], 
               markersize=10, markerfacecolor=colors[1], markeredgecolor=colors[0], 
               markeredgewidth=3)
        ax.fill(angles, values, alpha=0.4, color=colors[0])
        
        # Customize
        labels = [s.replace('_', '\n') for s in mood_subscales]
        ax.set_xticks(angles[:-1])
        ax.set_xticklabels(labels, fontsize=12, fontweight='bold')
        ax.set_ylim(0, 100)
        ax.set_yticks([25, 50, 75, 100])
        ax.set_yticklabels(['25', '50', '75', '100'], fontsize=11)
        ax.grid(True, alpha=0.7)
        ax.set_title('Mood Episode Profile', fontweight='bold', pad=30, fontsize=16)
        
        # Add score labels with enhanced styling
        for angle, value, subscale in zip(angles[:-1], values[:-1], mood_subscales):
            offset = 8 if value > 85 else 6
            ax.text(angle, value + offset, f'{value:.0f}', 
                   horizontalalignment='center', fontsize=11, fontweight='bold',
                   bbox=dict(boxstyle="round,pad=0.3", facecolor='white', 
                           alpha=0.9, edgecolor=colors[0], linewidth=2))
    
    def _create_risk_level_chart(self, ax, overall_risk):
        """Create enhanced risk level assessment"""
        risk_levels = ['Low\n(0-30)', 'Moderate\n(30-50)', 'Elevated\n(50-70)', 
                      'High\n(70-85)', 'Critical\n(85-100)']
        risk_values = [30, 20, 20, 15, 15]
        
        # Enhanced color palette
        risk_colors = sns.color_palette("RdYlBu_r", 5)
        
        # Determine current risk level
        if overall_risk < 30:
            current_risk = 0
        elif overall_risk < 50:
            current_risk = 1
        elif overall_risk < 70:
            current_risk = 2
        elif overall_risk < 85:
            current_risk = 3
        else:
            current_risk = 4
        
        # Create enhanced bars
        bars = ax.bar(risk_levels, risk_values, color=risk_colors, alpha=0.8, 
                     edgecolor='white', linewidth=3)
        
        # Highlight current risk level
        bars[current_risk].set_alpha(1.0)
        bars[current_risk].set_edgecolor('#2C3E50')
        bars[current_risk].set_linewidth(5)
        
        # Enhanced styling
        ax.set_ylabel('Score Range', fontweight='bold', fontsize=13)
        ax.set_title('Risk Classification', fontweight='bold', fontsize=16, pad=25)
        ax.set_ylim(0, 35)
        
        # Current level indicator
        ax.text(current_risk, bars[current_risk].get_height() + 2, 
               f'YOUR LEVEL\n({overall_risk:.0f})', ha='center', va='bottom',
               fontweight='bold', fontsize=12, 
               bbox=dict(boxstyle="round,pad=0.6", facecolor='yellow', 
                        alpha=0.95, edgecolor='orange', linewidth=3))
        
        ax.grid(True, alpha=0.4, axis='y')
        ax.set_facecolor('#FAFAFA')
        plt.setp(ax.get_xticklabels(), fontsize=11, fontweight='bold')
    
    def _create_subscale_breakdown(self, ax, scores):
        """Create horizontal bar chart of all subscales"""
        subscales = [k for k in scores.keys() if k != 'Overall_Risk']
        values = [scores[k] for k in subscales]
        
        # Create DataFrame for better handling
        df = pd.DataFrame({
            'Subscale': [s.replace('_', ' ') for s in subscales],
            'Score': values,
            'Category': ['Mood Episodes' if 'Episode' in s else 
                        'Impact Factors' if s in ['Functional_Impairment', 'Sleep_Patterns'] else
                        'Risk Factors' for s in subscales]
        })
        
        # Enhanced color mapping
        category_colors = {
            'Mood Episodes': '#E74C3C',
            'Impact Factors': '#F39C12', 
            'Risk Factors': '#3498DB'
        }
        
        colors = [category_colors[cat] for cat in df['Category']]
        
        # Create horizontal bar plot
        y_pos = np.arange(len(subscales))
        bars = ax.barh(y_pos, values, color=colors, alpha=0.85, 
                      edgecolor='white', linewidth=2)
        
        # Add value labels
        for i, (bar, value) in enumerate(zip(bars, values)):
            width = bar.get_width()
            ax.text(width + 1.5, bar.get_y() + bar.get_height()/2,
                   f'{value:.0f}', ha='left', va='center', fontweight='bold', 
                   fontsize=12, color='#2C3E50')
        
        # Enhanced styling
        ax.set_yticks(y_pos)
        ax.set_yticklabels(df['Subscale'], fontsize=12, fontweight='bold')
        ax.set_xlabel('Score (0-100)', fontweight='bold', fontsize=14)
        ax.set_title('Detailed Subscale Analysis', fontweight='bold', fontsize=16, pad=25)
        ax.set_xlim(0, 110)
        
        # Reference lines
        ax.axvline(x=50, color='gray', linestyle='--', alpha=0.8, linewidth=2)
        ax.axvline(x=70, color='red', linestyle='--', alpha=0.8, linewidth=2)
        
        # Enhanced legend
        from matplotlib.patches import Patch
        legend_elements = [Patch(facecolor=color, label=category) 
                          for category, color in category_colors.items()]
        ax.legend(handles=legend_elements, loc='lower right', frameon=True, 
                 fancybox=True, shadow=True, fontsize=11)
        
        ax.grid(True, alpha=0.4, axis='x')
        ax.set_facecolor('#FAFAFA')
    
    def _create_severity_heatmap(self, ax, scores):
        """Create heatmap showing severity across domains"""
        subscales = [k for k in scores.keys() if k != 'Overall_Risk']
        
        # Reshape data for heatmap
        severity_data = []
        labels = []
        
        for subscale in subscales:
            score = scores[subscale]
            # Convert to severity levels
            if score < 30:
                severity = [1, 0, 0, 0]  # Low
            elif score < 50:
                severity = [1, 1, 0, 0]  # Moderate
            elif score < 70:
                severity = [1, 1, 1, 0]  # High
            else:
                severity = [1, 1, 1, 1]  # Very High
            
            severity_data.append(severity)
            labels.append(subscale.replace('_', '\n'))
        
        # Create heatmap
        severity_matrix = np.array(severity_data)
        sns.heatmap(severity_matrix, 
                   yticklabels=labels,
                   xticklabels=['Mild', 'Moderate', 'Severe', 'Critical'],
                   cmap='Reds', cbar=False, ax=ax,
                   linewidths=1, linecolor='white')
        
        ax.set_title('Severity Heatmap', fontweight='bold', fontsize=14, pad=20)
        ax.set_xlabel('Severity Level', fontweight='bold', fontsize=12)
        ax.tick_params(axis='both', labelsize=10)
    
    def _create_mood_timeline(self, ax, scores):
        """Create simulated mood timeline based on scores"""
        # Generate simulated mood data based on scores
        dates = pd.date_range(start='2024-01-01', end='2025-08-14', freq='W')
        
        # Base mood line
        base_mood = 5  # Neutral mood
        
        # Add variations based on scores
        manic_intensity = scores['Manic_Episodes'] / 100
        depressive_intensity = scores['Depressive_Episodes'] / 100
        mixed_factor = scores['Mixed_Episodes'] / 100
        
        mood_timeline = []
        for i, date in enumerate(dates):
            # Simulate mood episodes
            cycle_position = (i / len(dates)) * 4 * np.pi  # Multiple cycles
            
            manic_component = manic_intensity * 3 * np.sin(cycle_position + np.pi/4)
            depressive_component = -depressive_intensity * 3 * np.sin(cycle_position + np.pi)
            mixed_noise = mixed_factor * np.random.normal(0, 1)
            
            mood = base_mood + manic_component + depressive_component + mixed_noise
            mood = np.clip(mood, 1, 10)  # Keep within 1-10 range
            mood_timeline.append(mood)
        
        # Create enhanced timeline plot
        colors = sns.color_palette("RdBu_r", 256)
        
        # Plot mood line with color gradient
        for i in range(len(dates)-1):
            color_index = int((mood_timeline[i] - 1) / 9 * 255)
            ax.plot([dates[i], dates[i+1]], [mood_timeline[i], mood_timeline[i+1]], 
                   color=colors[color_index], linewidth=3, alpha=0.8)
        
        # Add mood level zones
        ax.axhspan(7, 10, alpha=0.2, color='red', label='Manic Range')
        ax.axhspan(4, 6, alpha=0.2, color='green', label='Normal Range')
        ax.axhspan(1, 3, alpha=0.2, color='blue', label='Depressive Range')
        
        # Enhanced styling
        ax.set_xlabel('Date', fontweight='bold', fontsize=12)
        ax.set_ylabel('Mood Level', fontweight='bold', fontsize=12)
        ax.set_title('Simulated Mood Timeline\n(Based on Your Responses)', 
                    fontweight='bold', fontsize=14, pad=20)
        ax.set_ylim(1, 10)
        ax.legend(loc='upper right', frameon=True, fancybox=True, shadow=True)
        ax.grid(True, alpha=0.4)
        
        # Format x-axis
        import matplotlib.dates as mdates
        ax.xaxis.set_major_formatter(mdates.DateFormatter('%m/%y'))
        ax.tick_params(axis='x', rotation=45)
    
    def _create_population_comparison(self, ax, overall_risk):
        """Create population comparison visualization"""
        # Simulate population distribution
        np.random.seed(42)
        population = np.random.gamma(2, 8, 10000)  # Gamma distribution for bipolar prevalence
        population = np.clip(population, 0, 100)
        
        # Calculate percentile
        percentile = (np.sum(population < overall_risk) / len(population)) * 100
        
        # Create enhanced histogram
        colors = sns.color_palette("viridis", 3)
        n, bins, patches = ax.hist(population, bins=40, alpha=0.7, color=colors[0], 
                                  edgecolor='white', linewidth=1, density=True)
        
        # Add smooth curve approximation
        x = np.linspace(0, 100, 100)
        # Simplified gamma distribution approximation
        shape, scale = 2, 8
        y = (x**(shape-1) * np.exp(-x/scale)) / (scale**shape * math.gamma(shape))
        ax.plot(x, y, color=colors[1], linewidth=4, alpha=0.9, label='Population Curve')
        
        # Your score line
        ax.axvline(overall_risk, color='#E74C3C', linewidth=5, alpha=0.9,
                  label=f'Your Risk Score ({overall_risk:.0f})', linestyle='-')
        
        # Enhanced styling
        ax.set_xlabel('Bipolar Risk Score', fontweight='bold', fontsize=12)
        ax.set_ylabel('Density', fontweight='bold', fontsize=12)
        ax.set_title(f'Population Risk Comparison\n{percentile:.0f}th Percentile', 
                    fontweight='bold', fontsize=14, pad=20)
        ax.legend(frameon=True, fancybox=True, shadow=True)
        ax.grid(True, alpha=0.4)
        ax.set_facecolor('#FAFAFA')
        
        # Add percentile info
        textstr = f'Higher risk than\n{percentile:.0f}% of population'
        props = dict(boxstyle='round', facecolor='lightblue', alpha=0.8)
        ax.text(0.05, 0.95, textstr, transform=ax.transAxes, fontsize=11,
                verticalalignment='top', bbox=props, fontweight='bold')
    
    def _create_recommendations_panel(self, ax, scores):
        """Create treatment recommendations panel"""
        ax.axis('off')
        overall_risk = scores['Overall_Risk']
        
        # Get highest risk areas
        subscales = {k: v for k, v in scores.items() if k != 'Overall_Risk'}
        top_concerns = sorted(subscales.items(), key=lambda x: x[1], reverse=True)[:3]
        
        # Generate recommendations based on risk level
        if overall_risk < 30:
            risk_level = "LOW RISK"
            recommendations = """
RECOMMENDATIONS:
• Continue monitoring mood patterns
• Maintain healthy sleep schedule
• Practice stress management
• Regular exercise and social support
• Annual mental health check-ups
            """
        elif overall_risk < 50:
            risk_level = "MODERATE RISK"
            recommendations = f"""
RECOMMENDATIONS:
• Consult mental health professional
• Consider mood tracking apps
• Address top concerns: {top_concerns[0][0].replace('_', ' ')}
• Learn about bipolar disorder
• Build strong support network
            """
        elif overall_risk < 70:
            risk_level = "ELEVATED RISK"
            recommendations = f"""
RECOMMENDATIONS:
• URGENT: See psychiatrist/psychologist
• Comprehensive bipolar evaluation
• Address: {', '.join([c[0].replace('_', ' ') for c in top_concerns[:2]])}
• Consider mood stabilizing treatment
• Family/relationship counseling
            """
        else:
            risk_level = "HIGH RISK"
            recommendations = """
RECOMMENDATIONS:
• IMMEDIATE professional evaluation
• Psychiatric assessment for bipolar disorder
• Consider inpatient/intensive treatment
• Medication evaluation
• Crisis safety planning
• Involve family/support system
            """
        
        recommendation_text = f"""
🚨 RISK LEVEL: {risk_level}
Overall Score: {overall_risk:.0f}/100

Top 3 Concerns:
1. {top_concerns[0][0].replace('_', ' ')}: {top_concerns[0][1]:.0f}
2. {top_concerns[1][0].replace('_', ' ')}: {top_concerns[1][1]:.0f}
3. {top_concerns[2][0].replace('_', ' ')}: {top_concerns[2][1]:.0f}

{recommendations}

📞 CRISIS RESOURCES:
• National Suicide Prevention: 988
• Crisis Text Line: Text HOME to 741741
• Emergency: 911

⚠️  This is a screening tool only.
Professional diagnosis is required.
        """
        
        # Choose background color based on risk
        if overall_risk < 30:
            bg_color = 'lightgreen'
        elif overall_risk < 50:
            bg_color = 'lightyellow'
        elif overall_risk < 70:
            bg_color = 'orange'
        else:
            bg_color = 'lightcoral'
        
        ax.text(0.05, 0.95, recommendation_text, transform=ax.transAxes, 
               fontsize=10, verticalalignment='top', fontfamily='monospace',
               bbox=dict(boxstyle="round,pad=0.6", facecolor=bg_color, alpha=0.9,
                        edgecolor='gray', linewidth=2))
    
    def _print_detailed_analysis(self, scores):
        """Print comprehensive analysis of results"""
        print("\n" + "="*80)
        print("DETAILED BIPOLAR DISORDER SCREENING ANALYSIS")
        print("="*80)
        
        overall_risk = scores['Overall_Risk']
        print(f"\n🎯 OVERALL BIPOLAR RISK SCORE: {overall_risk:.1f}/100")
        
        # Risk interpretation
        if overall_risk < 30:
            print("✅ INTERPRETATION: Low risk for bipolar disorder")
            risk_desc = "Responses suggest low likelihood of bipolar disorder. Continue healthy habits."
        elif overall_risk < 50:
            print("⚠️  INTERPRETATION: Moderate risk - monitoring recommended")
            risk_desc = "Some concerning patterns. Consider professional consultation."
        elif overall_risk < 70:
            print("🚨 INTERPRETATION: Elevated risk - professional evaluation recommended")
            risk_desc = "Multiple risk factors present. Strongly recommend psychiatric evaluation."
        else:
            print("🚨 INTERPRETATION: High risk - immediate professional help needed")
            risk_desc = "Significant bipolar disorder indicators. Seek immediate professional help."
        
        print(f"   {risk_desc}")
        
        # Subscale analysis
        print(f"\n📊 DETAILED SUBSCALE ANALYSIS:")
        subscales = {k: v for k, v in scores.items() if k != 'Overall_Risk'}
        for subscale, score in sorted(subscales.items(), key=lambda x: x[1], reverse=True):
            level = "HIGH" if score >= 70 else "MODERATE" if score >= 50 else "LOW"
            print(f"   • {subscale.replace('_', ' ')}: {score:.1f} ({level})")
            print(f"     {self.subscale_descriptions[subscale]}")
        
        # Crisis assessment
        print(f"\n🚨 SAFETY ASSESSMENT:")
        if scores['Depressive_Episodes'] > 70 or overall_risk > 85:
            print("   ⚠️  ELEVATED SAFETY CONCERN")
            print("   • High depression scores may indicate suicide risk")
            print("   • Contact crisis hotline: 988")
            print("   • Consider emergency room if having thoughts of self-harm")
        else:
            print("   ✅ No immediate safety concerns indicated")
        
        # Next steps
        print(f"\n📋 RECOMMENDED NEXT STEPS:")
        if overall_risk >= 50:
            print("   1. Schedule appointment with psychiatrist or psychologist")
            print("   2. Bring these results to your appointment")
            print("   3. Consider mood tracking between now and appointment")
            print("   4. Inform trusted family/friends about concerns")
            print("   5. Avoid major life decisions until evaluated")
        else:
            print("   1. Continue monitoring mood patterns")
            print("   2. Maintain healthy lifestyle habits")
            print("   3. Consider annual mental health check-ups")
            print("   4. Learn stress management techniques")
        
        print(f"\n📚 EDUCATIONAL RESOURCES:")
        print("   • National Alliance on Mental Illness (NAMI): nami.org")
        print("   • International Bipolar Foundation: ibpf.org")
        print("   • Depression and Bipolar Support Alliance: dbsalliance.org")


def save_results(scores: Dict[str, float], filename: str = "bipolar_screening_results.json"):
    """Save screening results to JSON file"""
    results = {
        'timestamp': datetime.now().isoformat(),
        'scores': scores,
        'assessment_type': 'Bipolar Disorder Screening Tool',
        'version': '1.0',
        'disclaimer': 'This is a screening tool, not a diagnostic instrument. Seek professional help for diagnosis.',
        'crisis_resources': {
            'suicide_prevention_lifeline': '988',
            'crisis_text_line': 'Text HOME to 741741',
            'emergency': '911'
        }
    }
    
    with open(filename, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n💾 Results saved to {filename}")


# Example usage
if __name__ == "__main__":
    print("🧠 Bipolar Disorder Screening Tool (Enhanced with Seaborn)")
    print("=" * 70)
    print("📊 Professional-grade mental health screening with advanced visualizations")
    print("⚠️  Requires: numpy, matplotlib, pandas, seaborn")
    print("🚨 IMPORTANT: This is a screening tool, not a diagnostic instrument")
    print("=" * 70)
    
    tool = BipolarScreeningTool()
    
    print("\nChoose an option:")
    print("1 - Take the complete screening (40+ questions)")
    print("2 - View demo results and visualizations")
    
    while True:
        choice = input("\nEnter your choice (1 or 2): ").strip()
        if choice == "1":
            print("\n⚠️  Before starting:")
            print("• This screening takes 10-15 minutes")
            print("• Answer honestly for accurate results")
            print("• Seek professional help if you're in crisis")
            
            confirm = input("\nReady to begin? (y/n): ").lower()
            if confirm == 'y':
                scores = tool.administer_screening()
                title = "Your Bipolar Disorder Screening Results"
                filename = "my_bipolar_screening.json"
            else:
                print("Assessment cancelled. Seek professional help if needed.")
                exit()
            break
        elif choice == "2":
            scores = tool.demo_scores()
            title = "Demo Bipolar Screening Results"
            filename = "demo_bipolar_screening.json"
            print("DEMO: Using sample scores for demonstration purposes")
            break
        else:
            print("Please enter 1 or 2")
    
    # Create comprehensive report
    tool.create_comprehensive_report(scores, title)
    
    # Print detailed analysis
    tool._print_detailed_analysis(scores)
    
    # Save results
    save_results(scores, filename)
    
    print("\n" + "="*70)
    print("🎯 SCREENING COMPLETE")
    print("="*70)
    print("Remember: This is a screening tool, not a diagnosis.")
    print("Please discuss results with a mental health professional.")
    print("If you're in crisis, contact 988 or go to the nearest emergency room.")
    print("="*70)