export const EXPENSE_CATEGORIES = [
  { 
    name: 'Meals & Entertainment', 
    keywords: ['coffee', 'restaurant', 'food', 'lunch', 'dinner', 'starbucks', 'cafe'], 
    color: '#F59E0B' 
  },
  { 
    name: 'Transportation', 
    keywords: ['uber', 'lyft', 'taxi', 'transit', 'parking', 'gas', 'fuel'], 
    color: '#3B82F6' 
  },
  { 
    name: 'Office Supplies', 
    keywords: ['office', 'supplies', 'paper', 'depot', 'staples', 'equipment'], 
    color: '#8B5CF6' 
  },
  { 
    name: 'Travel', 
    keywords: ['hotel', 'flight', 'airline', 'rental', 'travel', 'lodging', 'hilton', 'marriott'], 
    color: '#10B981' 
  },
  { 
    name: 'Technology', 
    keywords: ['software', 'saas', 'cloud', 'hosting', 'domain', 'aws', 'azure'], 
    color: '#06B6D4' 
  },
  { 
    name: 'Marketing', 
    keywords: ['ads', 'advertising', 'marketing', 'social', 'campaign'], 
    color: '#EC4899' 
  },
  { 
    name: 'Professional Services', 
    keywords: ['legal', 'consulting', 'accounting', 'professional', 'service'], 
    color: '#6366F1' 
  },
  { 
    name: 'Utilities', 
    keywords: ['electric', 'utility', 'internet', 'phone', 'water'], 
    color: '#84CC16' 
  },
  { 
    name: 'General', 
    keywords: [], 
    color: '#6B7280' 
  }
];

export const PAYMENT_METHODS = ['Credit Card', 'Debit Card', 'Cash', 'Check', 'Bank Transfer', 'Mobile Payment'];

export const CONFIDENCE_LEVELS = {
  HIGH: 0.85,
  MEDIUM: 0.70,
  LOW: 0.50
} as const;

export const PROCESSING_STATUS_CONFIG = {
  idle: { label: 'Idle', color: 'gray' },
  processing: { label: 'Processing', color: 'yellow' },
  completed: { label: 'Completed', color: 'green' },
  needs_review: { label: 'Needs Review', color: 'orange' },
  error: { label: 'Error', color: 'red' }
} as const;

export const DEMO_RECEIPTS = [
  "STARBUCKS COFFEE\n123 Main Street\nSeattle, WA 98101\n\nGrande Latte           $4.95\nChocolate Croissant    $3.50\nSubtotal:              $8.45\nTax:                   $0.85\nTotal:                 $9.30\n\nVisa ****1234\nDate: 09/28/2024 10:30 AM\nThank you for your visit!",
  
  "UBER TECHNOLOGIES\nTrip Receipt\n\nFrom: 123 Oak Street\nTo: Downtown Office Building\nDistance: 5.2 miles\n\nTrip Fare:             $23.45\nService Fee:           $2.50\nTotal:                 $25.95\n\nCharged to Visa ending in 5678\nTrip Date: 09/27/2024 2:15 PM",
  
  "AMAZON BUSINESS\nOrder #123-4567890-1234567\n\nOffice Chair - Ergonomic Mesh\nQuantity: 1\nPrice:                 $299.99\nShipping:              $0.00\nTotal:                 $299.99\n\nDelivered to: Office Address\nDate: 09/26/2024"
];

export const AI_PROCESSING_CONFIG = {
  MIN_DELAY: 1000,
  MAX_DELAY: 2500,
  RETRY_ATTEMPTS: 3,
  TIMEOUT: 10000
} as const;

export const STORAGE_KEYS = {
  EXPENSES: 'ai-expense-processor-expenses',
  METRICS: 'ai-expense-processor-metrics'
} as const;
