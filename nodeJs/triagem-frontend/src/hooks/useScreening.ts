// src/hooks/useScreening.ts
import { useState, useCallback } from 'react';
import { ScreeningService } from '../services/api/screening.service';
import { SessionData, SessionStatus, QuestionResponse, Results, APIError } from '../types';

interface UseScreeningState {
  session: SessionData | null;
  status: SessionStatus | null;
  results: Results | null;
  loading: boolean;
  error: string | null;
  validSubescales: string[] | null;
}

export const useScreening = (screeningService: ScreeningService) => {
  const [state, setState] = useState<UseScreeningState>({
    session: null,
    status: null,
    results: null,
    loading: false,
    error: null,
    validSubescales: null,
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setError = (error: string | null, validSubescales?: string[]) => {
    setState(prev => ({ 
      ...prev, 
      error, 
      validSubescales: validSubescales || null 
    }));
  };

  const startSession = useCallback(async (type: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const sessionData = await screeningService.startSession(type);
      setState(prev => ({ 
        ...prev, 
        session: sessionData, 
        status: null, 
        results: null 
      }));
      
      return sessionData;
    } catch (err) {
      const error = err as APIError;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [screeningService]);

  const submitAnswer = useCallback(async (
    type: string,
    sessionId: string,
    answer: QuestionResponse
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      const progressData = await screeningService.submitAnswer(type, sessionId, answer);
      
      // Update session status based on progress
      setState(prev => ({
        ...prev,
        status: {
          sessionId: progressData.sessionId,
          type,
          currentQuestion: progressData.currentQuestion,
          totalQuestions: progressData.totalQuestions,
          timeElapsed: 0, // This would come from a separate timer
        }
      }));
      
      return progressData;
    } catch (err) {
      const error = err as APIError;
      setError(error.message, error.details);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [screeningService]);

  const getSessionStatus = useCallback(async (type: string, sessionId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const statusData = await screeningService.getSessionStatus(type, sessionId);
      setState(prev => ({ ...prev, status: statusData }));
      
      return statusData;
    } catch (err) {
      const error = err as APIError;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [screeningService]);

  const finalizeSession = useCallback(async (type: string, sessionId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const results = await screeningService.finalizeSession(type, sessionId);
      setState(prev => ({ ...prev, results }));
      
      return results;
    } catch (err) {
      const error = err as APIError;
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [screeningService]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetSession = useCallback(() => {
    setState({
      session: null,
      status: null,
      results: null,
      loading: false,
      error: null,
      validSubescales: null,
    });
  }, []);

  return {
    ...state,
    startSession,
    submitAnswer,
    getSessionStatus,
    finalizeSession,
    clearError,
    resetSession,
  };
};

