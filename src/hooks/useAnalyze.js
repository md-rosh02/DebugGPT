import { useEffect, useRef, useState } from 'react';
import { analyzeError } from '../utils/api.js';

export default function useAnalyze() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (rateLimitSeconds <= 0) {
      return undefined;
    }

    timerRef.current = window.setTimeout(() => {
      setRateLimitSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearTimeout(timerRef.current);
  }, [rateLimitSeconds]);

  const clearError = () => {
    setError('');
    setValidationError('');
  };

  const analyze = async (errorText, selectedLanguage) => {
    if (!errorText.trim()) {
      setValidationError('Please paste an error first');
      return null;
    }

    if (rateLimitSeconds > 0) {
      setError(`Taking a breather... try again in ${rateLimitSeconds}s`);
      return null;
    }

    setIsLoading(true);
    setError('');
    setValidationError('');

    try {
      return await analyzeError(errorText, selectedLanguage);
    } catch (caughtError) {
      if (caughtError.code === 'RATE_LIMIT') {
        setRateLimitSeconds(30);
        setError('Taking a breather... try again in 30s');
        return null;
      }

      setError(caughtError.message || 'Analysis failed. Try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyze,
    isLoading,
    error,
    validationError,
    rateLimitSeconds,
    clearError,
  };
}
