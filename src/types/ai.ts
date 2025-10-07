export interface AIAnalysisRequest {
  text: string;
  options?: AIAnalysisOptions;
}

export interface AIAnalysisOptions {
  includeReasoning?: boolean;
  confidenceThreshold?: number;
  extractTax?: boolean;
  extractPaymentMethod?: boolean;
}

export interface AIAnalysisResponse {
  vendor: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  taxAmount?: number;
  paymentMethod?: string;
  confidence: number;
  reasoning: string;
  processingTime: number;
}

export interface AIError {
  code: string;
  message: string;
  details?: any;
}

export interface PerformanceMetrics {
  totalProcessed: number;
  averageProcessingTime: number;
  averageConfidence: number;
  successRate: number;
  lastProcessedAt?: string;
}