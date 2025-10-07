import React, { useState } from 'react';
import { Upload, Zap, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { getRandomReceipt } from '../../data/sampleReceipts';

interface ProcessorInputProps {
  onProcess: (text: string) => void;
  isProcessing: boolean;
  error?: string | null;
}

export const ProcessorInput: React.FC<ProcessorInputProps> = ({
  onProcess,
  isProcessing,
  error
}) => {
  const [inputText, setInputText] = useState('');

  const handleProcess = () => {
    if (inputText.trim()) {
      onProcess(inputText.trim());
    }
  };

  const handleLoadDemo = () => {
    setInputText(getRandomReceipt());
  };

  const handleClear = () => {
    setInputText('');
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
            AI Expense Processor
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Paste receipt text or invoice details for instant AI analysis
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleLoadDemo}
          icon={<Zap className="h-4 w-4" />}
        >
          Load Demo
        </Button>
      </div>

      <Textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your receipt or invoice text here...&#10;&#10;Example:&#10;STARBUCKS COFFEE&#10;123 Main Street&#10;&#10;Grande Latte     $4.95&#10;Total:           $4.95&#10;&#10;Visa ****1234&#10;Date: 09/28/2024"
        rows={12}
        error={error || undefined}
        helperText="Supports receipts, invoices, and expense descriptions"
      />

      <div className="flex space-x-3 mt-4">
        <Button
          variant="primary"
          onClick={handleProcess}
          disabled={!inputText.trim() || isProcessing}
          loading={isProcessing}
          className="flex-1"
          icon={!isProcessing ? <Sparkles className="h-4 w-4" /> : undefined}
        >
          {isProcessing ? 'Processing with AI' : 'Process with AI'}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={isProcessing}
        >
          Clear
        </Button>
        
        <Button
          variant="ghost"
          disabled={isProcessing}
          icon={<Upload className="h-4 w-4" />}
        >
          Upload
        </Button>
      </div>

      {/* AI Capabilities Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
          <Sparkles className="h-4 w-4 mr-1 text-purple-600" />
          AI Processing Capabilities
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
            Vendor extraction
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
            Amount parsing
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
            Smart categorization
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
            Date recognition
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
            Tax calculation
          </div>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
            Payment method
          </div>
        </div>
      </div>
    </Card>
  );
};