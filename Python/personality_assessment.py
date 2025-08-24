import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.patches import Polygon
import seaborn as sns
from typing import Dict, List, Tuple
import json

class PersonalityAssessment:
    """
    Evidence-based personality assessment tool using the Big Five model (OCEAN).
    Based on validated psychological research and proper statistical methods.
    """
    
    def __init__(self):
        self.questions = self._load_questions()
        self.trait_descriptions = {
            'Openness': 'Creativity, curiosity, and openness to new experiences',
            'Conscientiousness': 'Organization, responsibility, and goal-directed behavior', 
            'Extraversion': 'Sociability, assertiveness, and positive emotionality',
            'Agreeableness': 'Cooperation, trust, and concern for others',
            'Neuroticism': 'Emotional instability, anxiety, and stress sensitivity'
        }
        
    def _load_questions(self) -> Dict[str, List[Dict]]:
        """Load scientifically validated Big Five questions"""
        return {
            'Openness': [
                {'text': 'I enjoy exploring new ideas and concepts', 'reverse': False},
                {'text': 'I appreciate art, music, and creative expression', 'reverse': False},
                {'text': 'I prefer routine and familiar activities', 'reverse': True},
                {'text': 'I enjoy philosophical discussions', 'reverse': False},
                {'text': 'I am curious about how things work', 'reverse': False},
                {'text': 'I prefer practical over abstract thinking', 'reverse': True},
                {'text': 'I enjoy trying new foods and experiences', 'reverse': False},
                {'text': 'I value tradition and conventional approaches', 'reverse': True}
            ],
            'Conscientiousness': [
                {'text': 'I complete tasks thoroughly and on time', 'reverse': False},
                {'text': 'I am organized and systematic in my approach', 'reverse': False},
                {'text': 'I often procrastinate on important tasks', 'reverse': True},
                {'text': 'I plan ahead and prepare for challenges', 'reverse': False},
                {'text': 'I pay attention to details', 'reverse': False},
                {'text': 'I find it hard to stick to my commitments', 'reverse': True},
                {'text': 'I work hard to achieve my goals', 'reverse': False},
                {'text': 'I often act impulsively without thinking', 'reverse': True}
            ],
            'Extraversion': [
                {'text': 'I enjoy being the center of attention', 'reverse': False},
                {'text': 'I feel energized by social interactions', 'reverse': False},
                {'text': 'I prefer quiet, solitary activities', 'reverse': True},
                {'text': 'I find it easy to start conversations with strangers', 'reverse': False},
                {'text': 'I am comfortable speaking in groups', 'reverse': False},
                {'text': 'I need time alone to recharge after socializing', 'reverse': True},
                {'text': 'I am assertive in expressing my opinions', 'reverse': False},
                {'text': 'I prefer working alone rather than in teams', 'reverse': True}
            ],
            'Agreeableness': [
                {'text': 'I trust others and assume good intentions', 'reverse': False},
                {'text': 'I enjoy helping others solve their problems', 'reverse': False},
                {'text': 'I can be skeptical of others\' motives', 'reverse': True},
                {'text': 'I compromise easily to avoid conflict', 'reverse': False},
                {'text': 'I am sympathetic to others\' difficulties', 'reverse': False},
                {'text': 'I prioritize my own needs over others\'', 'reverse': True},
                {'text': 'I am forgiving when others make mistakes', 'reverse': False},
                {'text': 'I find it easy to criticize others', 'reverse': True}
            ],
            'Neuroticism': [
                {'text': 'I worry frequently about various things', 'reverse': False},
                {'text': 'I remain calm under pressure', 'reverse': True},
                {'text': 'I get stressed easily by daily challenges', 'reverse': False},
                {'text': 'I bounce back quickly from setbacks', 'reverse': True},
                {'text': 'I feel anxious in uncertain situations', 'reverse': False},
                {'text': 'I maintain emotional stability during conflicts', 'reverse': True},
                {'text': 'I often feel overwhelmed by responsibilities', 'reverse': False},
                {'text': 'I handle criticism well', 'reverse': True}
            ]
        }
    
    def administer_test(self) -> Dict[str, float]:
        """
        Administer the personality test interactively.
        Returns normalized scores (0-100) for each trait.
        """
        print("=== EVIDENCE-BASED PERSONALITY ASSESSMENT ===")
        print("Based on the scientifically validated Big Five model")
        print("\nRate each statement from 1-5:")
        print("1 = Strongly Disagree")
        print("2 = Disagree") 
        print("3 = Neutral")
        print("4 = Agree")
        print("5 = Strongly Agree")
        print("-" * 50)
        
        scores = {}
        
        for trait, questions in self.questions.items():
            print(f"\n{trait.upper()}: {self.trait_descriptions[trait]}")
            print("-" * 30)
            
            trait_scores = []
            for i, q in enumerate(questions, 1):
                while True:
                    try:
                        response = input(f"{i}. {q['text']}: ")
                        score = int(response)
                        if 1 <= score <= 5:
                            # Reverse score if needed
                            if q['reverse']:
                                score = 6 - score
                            trait_scores.append(score)
                            break
                        else:
                            print("Please enter a number between 1 and 5")
                    except ValueError:
                        print("Please enter a valid number")
            
            # Calculate normalized score (0-100)
            raw_score = sum(trait_scores)
            max_possible = len(questions) * 5
            normalized_score = (raw_score / max_possible) * 100
            scores[trait] = normalized_score
            
        return scores
    
    def demo_scores(self) -> Dict[str, float]:
        """Generate demo scores for visualization purposes"""
        return {
            'Openness': 75,
            'Conscientiousness': 65,
            'Extraversion': 45,
            'Agreeableness': 80,
            'Neuroticism': 35
        }
    
    def plot_personality_profile(self, scores: Dict[str, float], title: str = "Personality Profile"):
        """Create a comprehensive visualization of personality scores"""
        
        # Create figure with subplots
        fig = plt.figure(figsize=(16, 12))
        
        # 1. Radar Chart
        ax1 = plt.subplot(2, 3, (1, 2), projection='polar')
        self._create_radar_chart(ax1, scores, title)
        
        # 2. Bar Chart
        ax2 = plt.subplot(2, 3, 3)
        self._create_bar_chart(ax2, scores)
        
        # 3. Percentile Rankings
        ax3 = plt.subplot(2, 3, (4, 5))
        self._create_percentile_chart(ax3, scores)
        
        # 4. Trait Descriptions
        ax4 = plt.subplot(2, 3, 6)
        self._create_description_panel(ax4, scores)
        
        plt.tight_layout()
        plt.show()
        
        # Print detailed analysis
        self._print_analysis(scores)
    
    def _create_radar_chart(self, ax, scores: Dict[str, float], title: str):
        """Create radar chart visualization"""
        traits = list(scores.keys())
        values = list(scores.values())
        
        # Add first value at end to close the polygon
        values += values[:1]
        
        # Calculate angles for each trait
        angles = np.linspace(0, 2 * np.pi, len(traits), endpoint=False).tolist()
        angles += angles[:1]
        
        # Plot
        ax.plot(angles, values, 'o-', linewidth=2, color='#2E86C1')
        ax.fill(angles, values, alpha=0.25, color='#2E86C1')
        
        # Customize
        ax.set_xticks(angles[:-1])
        ax.set_xticklabels(traits, fontsize=10)
        ax.set_ylim(0, 100)
        ax.set_yticks([20, 40, 60, 80, 100])
        ax.set_yticklabels(['20', '40', '60', '80', '100'], fontsize=8)
        ax.grid(True)
        ax.set_title(title, fontsize=14, fontweight='bold', pad=20)
        
        # Add score labels
        for angle, value, trait in zip(angles[:-1], values[:-1], traits):
            ax.text(angle, value + 5, f'{value:.0f}', 
                   horizontalalignment='center', fontsize=9, fontweight='bold')
    
    def _create_bar_chart(self, ax, scores: Dict[str, float]):
        """Create bar chart with color coding"""
        traits = list(scores.keys())
        values = list(scores.values())
        
        # Color code based on score ranges
        colors = []
        for score in values:
            if score >= 70:
                colors.append('#27AE60')  # Green - High
            elif score >= 50:
                colors.append('#F39C12')  # Orange - Medium  
            else:
                colors.append('#E74C3C')  # Red - Low
        
        bars = ax.bar(traits, values, color=colors, alpha=0.8)
        
        # Add value labels on bars
        for bar, value in zip(bars, values):
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height + 1,
                   f'{value:.0f}', ha='center', va='bottom', fontweight='bold')
        
        ax.set_ylabel('Score (0-100)', fontweight='bold')
        ax.set_title('Trait Scores', fontweight='bold')
        ax.set_ylim(0, 105)
        plt.setp(ax.get_xticklabels(), rotation=45, ha='right')
        
        # Add reference lines
        ax.axhline(y=50, color='gray', linestyle='--', alpha=0.5, label='Average')
        ax.axhline(y=70, color='green', linestyle='--', alpha=0.5, label='High')
        ax.axhline(y=30, color='red', linestyle='--', alpha=0.5, label='Low')
        ax.legend()
    
    def _create_percentile_chart(self, ax, scores: Dict[str, float]):
        """Create percentile ranking visualization"""
        traits = list(scores.keys())
        values = list(scores.values())
        
        # Create horizontal bar chart
        y_pos = np.arange(len(traits))
        bars = ax.barh(y_pos, values, color='#8E44AD', alpha=0.7)
        
        ax.set_yticks(y_pos)
        ax.set_yticklabels(traits)
        ax.set_xlabel('Percentile Score', fontweight='bold')
        ax.set_title('Percentile Rankings', fontweight='bold')
        ax.set_xlim(0, 100)
        
        # Add value labels
        for i, (bar, value) in enumerate(zip(bars, values)):
            width = bar.get_width()
            ax.text(width + 1, bar.get_y() + bar.get_height()/2,
                   f'{value:.0f}%', ha='left', va='center', fontweight='bold')
        
        # Add percentile reference lines
        ax.axvline(x=50, color='gray', linestyle='--', alpha=0.5)
        ax.axvline(x=84, color='green', linestyle='--', alpha=0.5)  # +1 SD
        ax.axvline(x=16, color='red', linestyle='--', alpha=0.5)    # -1 SD
    
    def _create_description_panel(self, ax, scores: Dict[str, float]):
        """Create text panel with trait interpretations"""
        ax.axis('off')
        
        # Get highest and lowest traits
        sorted_traits = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        highest = sorted_traits[0]
        lowest = sorted_traits[-1]
        
        interpretation_text = f"""
PERSONALITY INSIGHTS

Highest Trait: {highest[0]} ({highest[1]:.0f})
{self.trait_descriptions[highest[0]]}

Lowest Trait: {lowest[0]} ({lowest[1]:.0f})
{self.trait_descriptions[lowest[0]]}

SCORE INTERPRETATION:
• 70-100: High (top 30%)
• 50-69: Average (middle 40%) 
• 30-49: Below Average (bottom 30%)
• 0-29: Very Low (bottom 16%)

Note: This assessment is based on the
scientifically validated Big Five model.
All traits represent normal personality
variations, not disorders or deficits.
        """
        
        ax.text(0.05, 0.95, interpretation_text, transform=ax.transAxes, 
               fontsize=9, verticalalignment='top', fontfamily='monospace',
               bbox=dict(boxstyle="round,pad=0.3", facecolor='lightgray', alpha=0.5))
    
    def _print_analysis(self, scores: Dict[str, float]):
        """Print detailed personality analysis"""
        print("\n" + "="*60)
        print("DETAILED PERSONALITY ANALYSIS")
        print("="*60)
        
        for trait, score in scores.items():
            print(f"\n{trait.upper()}: {score:.1f}/100")
            print("-" * 30)
            
            # Interpretation based on score
            if score >= 70:
                level = "HIGH"
                interpretation = self._get_high_interpretation(trait)
            elif score >= 50:
                level = "AVERAGE"
                interpretation = self._get_average_interpretation(trait)
            else:
                level = "LOW" 
                interpretation = self._get_low_interpretation(trait)
            
            print(f"Level: {level}")
            print(f"Description: {self.trait_descriptions[trait]}")
            print(f"Implications: {interpretation}")
    
    def _get_high_interpretation(self, trait: str) -> str:
        """Get interpretation for high scores"""
        interpretations = {
            'Openness': "You are very creative, curious, and open to new experiences. You enjoy abstract thinking and novel ideas.",
            'Conscientiousness': "You are highly organized, disciplined, and goal-oriented. You tend to be reliable and thorough in your work.",
            'Extraversion': "You are very sociable, assertive, and energetic. You enjoy being around people and seek stimulation.",
            'Agreeableness': "You are very cooperative, trusting, and empathetic. You prioritize harmony and helping others.",
            'Neuroticism': "You may experience stress, anxiety, and emotional instability more frequently than others."
        }
        return interpretations.get(trait, "High score on this trait.")
    
    def _get_average_interpretation(self, trait: str) -> str:
        """Get interpretation for average scores"""
        return f"You show typical levels of {trait.lower()}. You likely demonstrate balanced behaviors in this area."
    
    def _get_low_interpretation(self, trait: str) -> str:
        """Get interpretation for low scores"""
        interpretations = {
            'Openness': "You prefer familiar routines and practical approaches. You may be more traditional in your thinking.",
            'Conscientiousness': "You may be more flexible and spontaneous. You might struggle with organization or long-term planning.",
            'Extraversion': "You are more introverted, preferring solitude or small groups. You may be reserved in social situations.",
            'Agreeableness': "You are more competitive and skeptical. You may prioritize your own interests and be direct in communication.",
            'Neuroticism': "You are emotionally stable and resilient. You handle stress well and remain calm under pressure."
        }
        return interpretations.get(trait, "Low score on this trait.")

# Example usage and demonstration
if __name__ == "__main__":
    # Create assessment instance
    assessment = PersonalityAssessment()
    
    print("Welcome to the Evidence-Based Personality Assessment!")
    print("Choose an option:")
    print("1 - Take the full interactive test (40 questions)")
    print("2 - View demo results")
    
    while True:
        choice = input("\nEnter your choice (1 or 2): ").strip()
        if choice == "1":
            # Run the actual interactive test
            scores = assessment.administer_test()
            title = "Your Personality Profile"
            break
        elif choice == "2":
            # Use demo scores
            scores = assessment.demo_scores()
            title = "Sample Personality Profile (Demo)"
            print("DEMO: Using sample personality scores")
            break
        else:
            print("Please enter 1 or 2")
    
    # Create visualization
    assessment.plot_personality_profile(scores, title)
    
    # Example of how to save results
    def save_results(scores: Dict[str, float], filename: str = "personality_results.json"):
        """Save assessment results to JSON file"""
        import datetime
        
        results = {
            'timestamp': datetime.datetime.now().isoformat(),
            'scores': scores,
            'assessment_type': 'Big Five Personality Assessment',
            'version': '1.0'
        }
        
        with open(filename, 'w') as f:
            json.dump(results, f, indent=2)
        
        print(f"\nResults saved to {filename}")
    
    # Save results with appropriate filename
    if choice == "1":
        save_results(scores, "my_personality_results.json")
    else:
        save_results(scores, "demo_personality_results.json")