// src/hooks/useHealthMonitor.ts
import { useState, useCallback, useEffect } from 'react';
import { HealthService } from '../services/api/health.service';
import { HealthStatus, APIError } from '../types';

interface UseHealthMonitorState {
  health: HealthStatus | null;
  detailedHealth: any | null;
  loading: boolean;
  error: string | null;
  lastChecked: Date | null;
}

export const useHealthMonitor = (
  healthService: HealthService,
  checkInterval = 30000 // 30 seconds
) => {
  const [state, setState] = useState<UseHealthMonitorState>({
    health: null,
    detailedHealth: null,
    loading: false,
    error: null,
    lastChecked: null,
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const checkHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const health = await healthService.getBasicHealth();
      setState(prev => ({ 
        ...prev, 
        health, 
        lastChecked: new Date() 
      }));
      
      return health;
    } catch (err) {
      const error = err as APIError;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [healthService]);

  const checkDetailedHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const detailedHealth = await healthService.getDetailedHealth();
      setState(prev => ({ ...prev, detailedHealth }));
      
      return detailedHealth;
    } catch (err) {
      const error = err as APIError;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [healthService]);

  // Auto health checking
  useEffect(() => {
    if (checkInterval > 0) {
      checkHealth(); // Initial check
      
      const interval = setInterval(checkHealth, checkInterval);
      return () => clearInterval(interval);
    }
  }, [checkHealth, checkInterval]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    ...state,
    checkHealth,
    checkDetailedHealth,
    clearError,
  };
};