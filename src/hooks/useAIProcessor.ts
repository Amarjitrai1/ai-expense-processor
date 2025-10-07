import { useState, useCallback } from 'react';
import { ProcessedExpense, ProcessingStatus } from '../types';
import { aiServiceInstance } from '../services/aiService';
import { validateReceiptText } from '../utils/validation';

export const useAIProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processExpense = useCallback(async (text: string): Promise<ProcessedExpense | null> => {
    // Validate input
    const validation = validateReceiptText(text);
    if (!validation.valid) {
      setError(validation.errors.join(', '));
      return null;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await aiServiceInstance.processExpense(text);
      
      const expense: ProcessedExpense = {
        id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        originalText: text,
        extractedData: {
          amount: result.amount,
          vendor: result.vendor,
          date: result.date,
          category: result.category,
          description: result.description,
          taxAmount: result.taxAmount,
          paymentMethod: result.paymentMethod,
          confidence: result.confidence,
          reasoning: result.reasoning
        },
        status: result.confidence >= 0.7 ? 'completed' : 'needs_review',
        timestamp: new Date().toISOString(),
        processingTime: result.processingTime
      };

      return expense;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process expense';
      setError(errorMessage);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setIsProcessing(false);
  }, []);

  return {
    processExpense,
    isProcessing,
    error,
    reset
  };
};