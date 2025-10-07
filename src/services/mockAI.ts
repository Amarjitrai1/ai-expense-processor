import { AIAnalysisRequest, AIAnalysisResponse } from '../types';
import { EXPENSE_CATEGORIES, AI_PROCESSING_CONFIG } from '../utils/constants';
import { extractAmounts, extractDates, extractKeywords } from '../utils/textProcessing';

export class MockAIService {
  async analyze(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const startTime = performance.now();
    
    // Simulate API delay
    const delay = Math.random() * (AI_PROCESSING_CONFIG.MAX_DELAY - AI_PROCESSING_CONFIG.MIN_DELAY) + AI_PROCESSING_CONFIG.MIN_DELAY;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    const { text } = request;
    // const lines = text.toLowerCase().split('\n').filter(line => line.trim());
    
    // Extract amounts with improved logic
    const amounts = extractAmounts(text);
    
    // Prioritize the largest reasonable amount as the total
    // Look for "total" line specifically
    let amount = 0;
    const totalLine = text.split('\n').find(line => 
      line.toLowerCase().includes('total') && !line.toLowerCase().includes('subtotal')
    );
    
    if (totalLine) {
      // Extract amount from the total line
      const totalAmounts = extractAmounts(totalLine);
      if (totalAmounts.length > 0) {
        amount = totalAmounts[0];
      }
    }
    
    // Fallback to largest amount if no total found
    if (amount === 0) {
      amount = amounts.length > 0 ? amounts[0] : Math.random() * 100 + 10;
    }
    
    // Extract dates
    const dates = extractDates(text);
    const date = dates.length > 0 ? dates[0] : new Date().toISOString().split('T')[0];
    
    // Determine category
    let category = 'General';
    let confidence = 0.75;
    let matchedKeywords: string[] = [];
    
    for (const cat of EXPENSE_CATEGORIES) {
      const keywords = extractKeywords(text, [...cat.keywords]);
      if (keywords.length > 0) {
        category = cat.name;
        matchedKeywords = keywords;
        confidence = Math.min(0.95, 0.70 + (keywords.length * 0.08));
        break;
      }
    }
    
    // Extract vendor (first meaningful line)
    let vendor = 'Unknown Vendor';
    const textLines = text.split('\n').filter(line => line.trim());
    for (const line of textLines) {
      const trimmed = line.trim();
      // Look for lines that are likely vendor names
      if (trimmed.length > 3 && 
          trimmed.length < 50 && 
          !trimmed.includes('$') && 
          !trimmed.match(/\d{2}\/\d{2}/) &&
          !trimmed.toLowerCase().includes('receipt') &&
          !trimmed.toLowerCase().includes('invoice') &&
          !trimmed.toLowerCase().includes('total')) {
        vendor = trimmed.split(' ').slice(0, 4).join(' ');
        // Capitalize first letter of each word
        vendor = vendor.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        break;
      }
    }
    
    // Determine payment method
    let paymentMethod = 'Unknown';
    const lowerText = text.toLowerCase();
    if (lowerText.includes('visa')) paymentMethod = 'Visa';
    else if (lowerText.includes('mastercard')) paymentMethod = 'Mastercard';
    else if (lowerText.includes('amex') || lowerText.includes('american express')) paymentMethod = 'American Express';
    else if (lowerText.includes('debit')) paymentMethod = 'Debit Card';
    else if (lowerText.includes('cash')) paymentMethod = 'Cash';
    
    // Calculate tax if present
    let taxAmount: number | undefined;
    const taxLine = text.split('\n').find(line => line.toLowerCase().includes('tax'));
    if (taxLine) {
      const taxAmounts = extractAmounts(taxLine);
      if (taxAmounts.length > 0) {
        taxAmount = taxAmounts[0];
      }
    }
    
    // Add some randomness to confidence
    confidence += (Math.random() - 0.5) * 0.1;
    confidence = Math.max(0.5, Math.min(0.99, confidence));
    
    const processingTime = performance.now() - startTime;
    
    return {
      vendor,
      amount,
      date,
      category,
      description: `${category} expense at ${vendor}`,
      taxAmount,
      paymentMethod: paymentMethod !== 'Unknown' ? paymentMethod : undefined,
      confidence,
      reasoning: `Identified as ${category} based on keywords: ${matchedKeywords.join(', ') || 'context'}. Vendor extracted from receipt header. Total amount of $${amount.toFixed(2)} parsed from receipt${taxLine ? ` (includes $${taxAmount?.toFixed(2)} tax)` : ''}.`,
      processingTime
    };
  }
  
  async batchAnalyze(requests: AIAnalysisRequest[]): Promise<AIAnalysisResponse[]> {
    return Promise.all(requests.map(req => this.analyze(req)));
  }
}

export const aiService = new MockAIService();
