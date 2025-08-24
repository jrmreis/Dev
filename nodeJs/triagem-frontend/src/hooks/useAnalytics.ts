// src/hooks/useAnalytics.ts
import { useState, useCallback } from 'react';
import { AnalyticsService } from '../services/api/analytics.service';
import { APIError } from '../types';

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

interface UseAnalyticsState {
  dashboard: DashboardData | null;
  typeStats: Record<string, any>;
  loading: boolean;
  error: string | null;
}

export const useAnalytics = (analyticsService: AnalyticsService) => {
  const [state, setState] = useState<UseAnalyticsState>({
    dashboard: null,
    typeStats: {},
    loading: false,
    error: null,
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const dashboard = await analyticsService.getDashboard();
      setState(prev => ({ ...prev, dashboard }));
      
      return dashboard;
    } catch (err) {
      const error = err as APIError;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [analyticsService]);

  const loadTypeStats = useCallback(async (type: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const stats = await analyticsService.getTypeStats(type);
      setState(prev => ({
        ...prev,
        typeStats: { ...prev.typeStats, [type]: stats }
      }));
      
      return stats;
    } catch (err) {
      const error = err as APIError;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [analyticsService]);

  const searchSessions = useCallback(async (criteria: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const sessions = await analyticsService.searchSessions(criteria);
      return sessions;
    } catch (err) {
      const error = err as APIError;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [analyticsService]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    ...state,
    loadDashboard,
    loadTypeStats,
    searchSessions,
    clearError,
  };
};

