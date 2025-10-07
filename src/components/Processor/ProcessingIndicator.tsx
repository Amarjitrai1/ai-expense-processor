import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface ProcessingIndicatorProps {
  message?: string;
}

export const ProcessingIndicator: React.FC<ProcessingIndicatorProps> = ({
  message = 'AI is analyzing your expense...'
}) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="relative inline-block">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          <Sparkles className="h-6 w-6 text-purple-600 absolute top-0 right-0 animate-pulse" />
        </div>
        <p className="mt-4 text-gray-600 font-medium">{message}</p>
        <p className="mt-2 text-sm text-gray-500">This usually takes 1-2 seconds</p>
      </div>
    </div>
  );
};
