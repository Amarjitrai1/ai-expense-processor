import { ExtractedData } from '../types/expense';

export const validateReceiptText = (text: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!text || text.trim().length === 0) {
    errors.push('Receipt text cannot be empty');
  }
  
  if (text.length < 10) {
    errors.push('Receipt text is too short (minimum 10 characters)');
  }
  
  if (text.length > 5000) {
    errors.push('Receipt text is too long (maximum 5000 characters)');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export const validateExtractedData = (data: Partial<ExtractedData>): boolean => {
  return !!(
    data.amount && data.amount > 0 &&
    data.vendor && data.vendor.length > 0 &&
    data.category && data.category.length > 0
  );
};