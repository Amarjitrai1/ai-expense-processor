export interface ProcessedExpense {
  id: string;
  originalText: string;
  extractedData: ExtractedData;
  status: ProcessingStatus;
  timestamp: string;
  processingTime?: number;
}

export interface ExtractedData {
  amount?: number;
  vendor?: string;
  date?: string;
  category?: string;
  description?: string;
  taxAmount?: number;
  paymentMethod?: string;
  confidence: number;
  reasoning?: string;
}

export type ProcessingStatus = 'idle' | 'processing' | 'completed' | 'needs_review' | 'error';

export interface ExpenseCategory {
  name: string;
  keywords: string[];
  color: string;
}