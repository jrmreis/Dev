// src/services/api/base.service.ts
import { APIError, APIResponse } from '../../types';

export abstract class BaseAPIService {
  protected baseURL: string;
  protected abstract endpoint: string;

  constructor(baseURL = 'http://localhost:3000') {
    this.baseURL = baseURL;
  }

  protected async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${this.endpoint}${path}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new APIError(
          data.error || `HTTP error! status: ${response.status}`,
          response.status,
          data.details
        );
      }

      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Network error occurred', 0, error);
    }
  }

  protected async get<T>(path: string): Promise<APIResponse<T>> {
    return this.request<T>(path, { method: 'GET' });
  }

  protected async post<T>(path: string, data?: any): Promise<APIResponse<T>> {
    return this.request<T>(path, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// src/services/api/screening.service.ts
import { BaseAPIService } from './base.service';
import { SessionData, SessionStatus, QuestionResponse, Results, ProgressData } from '../../types';

export class ScreeningService extends BaseAPIService {
  protected endpoint = '/api/v1/triagem';

  async startSession(type: string): Promise<SessionData> {
    const response = await this.post<SessionData>(`/${type}/iniciar`);
    if (!response.success || !response.data) {
      throw new APIError('Failed to start session', 400, response.error);
    }
    return response.data;
  }

  async submitAnswer(
    type: string,
    sessionId: string,
    answer: QuestionResponse
  ): Promise<ProgressData> {
    const response = await this.post<ProgressData>(
      `/${type}/responder/${sessionId}`,
      answer
    );
    
    if (!response.success || !response.data) {
      throw new APIError(
        response.error || 'Failed to submit answer',
        400,
        response.details || response.validSubescales
      );
    }
    
    return response.data;
  }

  async getSessionStatus(type: string, sessionId: string): Promise<SessionStatus> {
    const response = await this.get<SessionStatus>(`/${type}/status/${sessionId}`);
    if (!response.success || !response.data) {
      throw new APIError('Failed to get session status', 400, response.error);
    }
    return response.data;
  }

  async finalizeSession(type: string, sessionId: string): Promise<Results> {
    const response = await this.post<Results>(`/${type}/finalizar/${sessionId}`);
    if (!response.success || !response.data) {
      throw new APIError('Failed to finalize session', 400, response.error);
    }
    return response.data;
  }
}

// src/services/api/analytics.service.ts
import { BaseAPIService } from './base.service';

interface DashboardData {
  byType: Record<string, any>;
  global: {
    totalSessionsAllTypes: number;
    systemHealth: string;
    alertas: string[];
    lastUpdated: string;
  };
  insights: string[];
}

interface TypeStats {
  totalSessions: number;
  averageScore: number;
  riskDistribution: Record<string, number>;
  completionRate: number;
}

export class AnalyticsService extends BaseAPIService {
  protected endpoint = '/api/v1/analytics';

  async getDashboard(): Promise<DashboardData> {
    const response = await this.get<DashboardData>('/dashboard');
    if (!response.success || !response.data) {
      throw new APIError('Failed to get dashboard data', 400, response.error);
    }
    return response.data;
  }

  async getTypeStats(type: string): Promise<TypeStats> {
    const response = await this.get<TypeStats>(`/stats/${type}`);
    if (!response.success || !response.data) {
      throw new APIError(`Failed to get stats for ${type}`, 400, response.error);
    }
    return response.data;
  }

  async searchSessions(criteria: any): Promise<any[]> {
    const response = await this.post<any[]>('/sessions/search', criteria);
    if (!response.success || !response.data) {
      throw new APIError('Failed to search sessions', 400, response.error);
    }
    return response.data;
  }
}

// src/services/api/health.service.ts
import { BaseAPIService } from './base.service';
import { HealthStatus } from '../../types';

export class HealthService extends BaseAPIService {
  protected endpoint = '/api/v1/health';

  async getBasicHealth(): Promise<HealthStatus> {
    // Use the basic /health endpoint
    const response = await fetch(`${this.baseURL}/health`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new APIError('Health check failed', response.status, data);
    }
    
    return data;
  }

  async getDetailedHealth(): Promise<any> {
    const response = await this.get<any>('/detailed');
    if (!response.success || !response.data) {
      throw new APIError('Failed to get detailed health', 400, response.error);
    }
    return response.data;
  }

  async getSystemMetrics(): Promise<any> {
    const response = await this.get<any>('/metrics');
    if (!response.success || !response.data) {
      throw new APIError('Failed to get system metrics', 400, response.error);
    }
    return response.data;
  }
}

// src/services/api/index.ts - Service factory (Dependency Injection)
import { ScreeningService } from './screening.service';
import { AnalyticsService } from './analytics.service';
import { HealthService } from './health.service';

export interface APIServices {
  screening: ScreeningService;
  analytics: AnalyticsService;
  health: HealthService;
}

export class APIServiceFactory {
  private services: APIServices;

  constructor(baseURL?: string) {
    this.services = {
      screening: new ScreeningService(baseURL),
      analytics: new AnalyticsService(baseURL),
      health: new HealthService(baseURL),
    };
  }

  getServices(): APIServices {
    return this.services;
  }

  getScreeningService(): ScreeningService {
    return this.services.screening;
  }

  getAnalyticsService(): AnalyticsService {
    return this.services.analytics;
  }

  getHealthService(): HealthService {
    return this.services.health;
  }
}

// Default instance for the app
export const apiServices = new APIServiceFactory(
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
).getServices();

export * from './screening.service';
export * from './analytics.service';
export * from './health.service';