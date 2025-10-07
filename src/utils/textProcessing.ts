export const extractAmounts = (text: string): number[] => {
  // More sophisticated regex that captures currency amounts
  // Looks for $ followed by numbers, or numbers followed by common amount indicators
  const lines = text.split('\n');
  const amounts: number[] = [];
  
  // Common amount-related keywords
  const amountKeywords = [
    'total', 'subtotal', 'amount', 'price', 'cost', 'fare', 'fee', 
    'charge', 'payment', 'tax', 'tip', 'gratuity', 'balance', 'due'
  ];
  
  // Keywords that indicate NOT an amount (to exclude card numbers, etc)
  const excludeKeywords = [
    'card', 'ending', 'account', 'number', '#', 'ref', 'confirmation',
    'order', 'invoice', 'receipt', 'transaction', 'id'
  ];
  
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    
    // Skip lines with exclude keywords
    if (excludeKeywords.some(keyword => lowerLine.includes(keyword))) {
      continue;
    }
    
    // Look for dollar amounts in format: $XX.XX or $XX,XXX.XX
    const dollarMatches = line.match(/\$\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g);
    if (dollarMatches) {
      dollarMatches.forEach(match => {
        const cleanAmount = match.replace(/[$,\s]/g, '');
        const amount = parseFloat(cleanAmount);
        if (!isNaN(amount) && amount > 0 && amount < 100000) {
          amounts.push(amount);
        }
      });
      continue;
    }
    
    // Look for amounts on lines with amount keywords
    const hasAmountKeyword = amountKeywords.some(keyword => lowerLine.includes(keyword));
    if (hasAmountKeyword) {
      // Extract numbers that look like amounts (with decimal points)
      const numberMatches = line.match(/(\d{1,3}(?:,\d{3})*\.\d{2})/g);
      if (numberMatches) {
        numberMatches.forEach(match => {
          const cleanAmount = match.replace(/,/g, '');
          const amount = parseFloat(cleanAmount);
          if (!isNaN(amount) && amount > 0 && amount < 100000) {
            amounts.push(amount);
          }
        });
      }
    }
  }
  
  // Remove duplicates and sort
  return Array.from(new Set(amounts)).sort((a, b) => b - a);
};

export const extractDates = (text: string): string[] => {
  const datePatterns = [
    /\d{1,2}\/\d{1,2}\/\d{4}/g,      // MM/DD/YYYY
    /\d{4}-\d{2}-\d{2}/g,             // YYYY-MM-DD
    /\d{1,2}-\d{1,2}-\d{4}/g,        // MM-DD-YYYY
  ];
  
  const dates: string[] = [];
  datePatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) dates.push(...matches);
  });
  
  return dates;
};

export const extractKeywords = (text: string, keywords: string[]): string[] => {
  const lowerText = text.toLowerCase();
  return keywords.filter(keyword => lowerText.includes(keyword.toLowerCase()));
};

export const cleanText = (text: string): string => {
  return text
    .replace(/[^\w\s$.,:-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const highlightMatches = (text: string, keywords: string[]): string => {
  let highlighted = text;
  keywords.forEach(keyword => {
    const regex = new RegExp(`(${keyword})`, 'gi');
    highlighted = highlighted.replace(regex, '<mark>$1</mark>');
  });
  return highlighted;
};
