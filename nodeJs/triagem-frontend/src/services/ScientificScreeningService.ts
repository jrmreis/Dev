// src/services/ScientificScreeningService.ts - Fixed for backend compatibility
export interface ScientificQuestion {
  id: string;
  text: string;
  category: string;
  subscale?: string;
}

export interface QuestionMetadata {
  totalQuestions: number;
  estimatedTime: number;
  scientificBasis: string;
  description: string;
}

export interface ScreeningResult {
  sessionId: string;
  tipo_triagem: string;
  totalQuestions: number;
  estimatedTime: number;
  scientificBasis: string;
  timestamp: string;
}

export interface ScreeningResponse {
  success: boolean;
  data?: any;
  error?: string;
  details?: string;
}

export interface ScientificResult {
  sessionId: string;
  tipo_triagem: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  riskLevel: string;
  interpretation: string;
  responses: Record<string, number>;
  timeSpent: number;
  scientificBasis: string;
  timestamp: string;
}

export class ScientificScreeningService {
  private baseURL = 'http://localhost:3000/api';

  // Enhanced error handling
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage: string;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorJson.message || `HTTP ${response.status}`;
      } catch {
        errorMessage = `HTTP ${response.status}: ${errorText}`;
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || result.message || 'Unknown error occurred');
    }
    
    return result.data || result;
  }

  async testConnection(): Promise<any> {
    try {
      console.log('🔗 Testing backend connection...');
      
      const response = await fetch(`${this.baseURL}/test`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      const result = await this.handleResponse(response);
      console.log('✅ Backend connection successful:', result);
      return result;
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      if (error instanceof Error) {
        throw new Error(`Falha na conexão com backend: ${error.message}`);
      } else {
        throw new Error('Falha na conexão com backend: erro desconhecido');
      }
    }
  }

  async initializeSession(screeningType: string): Promise<ScreeningResult> {
    try {
      console.log(`🚀 Initializing session for: ${screeningType}`);
      
      const response = await fetch(`${this.baseURL}/iniciar`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ tipo_triagem: screeningType })
      });

      const result = await this.handleResponse<ScreeningResult>(response);
      
      console.log('✅ Session initialized successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Error initializing session:', error);
      if (error instanceof Error) {
        throw new Error(`Erro ao inicializar sessão: ${error.message}`);
      } else {
        throw new Error('Erro ao inicializar sessão: erro desconhecido');
      }
    }
  }

  async getQuestions(screeningType: string): Promise<{
    questions: ScientificQuestion[];
    metadata: QuestionMetadata;
  }> {
    try {
      console.log(`📋 Fetching questions for: ${screeningType}`);
      
      const response = await fetch(`${this.baseURL}/questions/${screeningType}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      const result = await this.handleResponse(response) as {
        questions: ScientificQuestion[];
        metadata: QuestionMetadata;
      };
      
      // Validate response structure
      if (!result.questions || !Array.isArray(result.questions)) {
        throw new Error('Invalid response: questions array not found');
      }
      
      if (!result.metadata || typeof result.metadata !== 'object') {
        throw new Error('Invalid response: metadata not found');
      }
      
      console.log(`✅ Loaded ${result.questions.length} scientific questions`);
      return {
        questions: result.questions,
        metadata: result.metadata
      };
    } catch (error) {
      console.error('❌ Error fetching questions:', error);
      if (error instanceof Error) {
        throw new Error(`Erro ao carregar questões: ${error.message}`);
      } else {
        throw new Error('Erro ao carregar questões: erro desconhecido');
      }
    }
  }

  async submitResponses(
    sessionId: string, 
    responses: Record<string, number>, 
    screeningType: string,
    timeSpent: number
  ): Promise<ScientificResult> {
    try {
      console.log(`📊 Submitting responses for session: ${sessionId}`);
      console.log(`📝 Responses count: ${Object.keys(responses).length}`);
      console.log(`⏱️ Time spent: ${timeSpent}s`);
      
      const response = await fetch(`${this.baseURL}/finalizar/${sessionId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          respostas: responses,
          tipo_triagem: screeningType,
          tempo_resposta: timeSpent
        })
      });

      const result = await this.handleResponse(response) as { resultado?: ScientificResult };
      
      // Validate response contains resultado
      if (!result.resultado) {
        throw new Error('Invalid response: resultado not found');
      }
      
      console.log('✅ Responses submitted successfully');
      console.log(`📈 Score: ${result.resultado.totalScore}/${result.resultado.maxScore} (${result.resultado.percentage}%)`);
      console.log(`🎯 Risk Level: ${result.resultado.riskLevel}`);
      
      return result.resultado;
    } catch (error) {
      console.error('❌ Error submitting responses:', error);
      if (error instanceof Error) {
        throw new Error(`Erro ao enviar respostas: ${error.message}`);
      } else {
        throw new Error('Erro ao enviar respostas: erro desconhecido');
      }
    }
  }

  // Get session status
  async getSessionStatus(sessionId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/session/${sessionId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const result = await this.handleResponse(response);
      return result;
    } catch (error) {
      console.error('Error getting session status:', error);
      throw error;
    }
  }

  // Check if backend is running
  async checkBackendHealth(): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:3000/health', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      console.warn('Backend health check failed:', error);
      return false;
    }
  }

  // Validate screening type
  private validateScreeningType(screeningType: string): boolean {
    const validTypes = ['anxiety', 'depression', 'bipolar', 'adhd', 'narcisismo', 'mitomania'];
    return validTypes.includes(screeningType);
  }

  // Get available screening types
  async getAvailableScreeningTypes(): Promise<string[]> {
    return ['anxiety', 'depression', 'bipolar', 'adhd', 'narcisismo', 'mitomania'];
  }

  // Validate responses format
  private validateResponses(responses: Record<string, number>): boolean {
    for (const [questionId, response] of Object.entries(responses)) {
      if (typeof response !== 'number' || response < 0 || response > 4) {
        console.error(`Invalid response for question ${questionId}: ${response}`);
        return false;
      }
    }
    return true;
  }

  // Enhanced submit with validation
  async submitResponsesWithValidation(
    sessionId: string,
    responses: Record<string, number>,
    screeningType: string,
    timeSpent: number
  ): Promise<ScientificResult> {
    // Validate inputs
    if (!sessionId || !sessionId.trim()) {
      throw new Error('Session ID is required');
    }

    if (!this.validateScreeningType(screeningType)) {
      throw new Error(`Invalid screening type: ${screeningType}`);
    }

    if (!responses || Object.keys(responses).length === 0) {
      throw new Error('No responses provided');
    }

    if (!this.validateResponses(responses)) {
      throw new Error('Invalid response values (must be 0-4)');
    }

    if (timeSpent < 0) {
      throw new Error('Time spent cannot be negative');
    }

    return this.submitResponses(sessionId, responses, screeningType, timeSpent);
  }
}

// Export default instance
export const screeningService = new ScientificScreeningService();
export default ScientificScreeningService;