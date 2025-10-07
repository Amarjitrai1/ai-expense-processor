import { useState, useEffect, useCallback, useMemo } from 'react';
import { ProcessedExpense } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

export const useExpenseHistory = () => {
  const [expenses, setExpenses] = useState<ProcessedExpense[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    } catch (error) {
      console.error('Failed to save expenses:', error);
    }
  }, [expenses]);

  const addExpense = useCallback((expense: ProcessedExpense) => {
    setExpenses(prev => [expense, ...prev]);
  }, []);

  const updateExpense = useCallback((id: string, updates: Partial<ProcessedExpense>) => {
    setExpenses(prev =>
      prev.map(exp => exp.id === id ? { ...exp, ...updates } : exp)
    );
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all expense history?')) {
      setExpenses([]);
    }
  }, []);

  // Statistics
  const stats = useMemo(() => {
    return {
      totalProcessed: expenses.length,
      completed: expenses.filter(e => e.status === 'completed').length,
      needsReview: expenses.filter(e => e.status === 'needs_review').length,
      totalAmount: expenses.reduce((sum, e) => sum + (e.extractedData.amount || 0), 0),
      averageConfidence: expenses.length > 0
        ? expenses.reduce((sum, e) => sum + e.extractedData.confidence, 0) / expenses.length
        : 0,
      averageProcessingTime: expenses.length > 0
        ? expenses.reduce((sum, e) => sum + (e.processingTime || 0), 0) / expenses.length
        : 0
    };
  }, [expenses]);

  return {
    expenses,
    stats,
    addExpense,
    updateExpense,
    deleteExpense,
    clearHistory
  };
};