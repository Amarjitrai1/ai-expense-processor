import React from 'react';
import { TrendingUp, AlertTriangle, XCircle } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';

interface ConfidenceIndicatorProps {
  confidence: number;
  label?: string;
  showIcon?: boolean;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  confidence,
  label = 'Confidence Score',
  showIcon = true
}) => {
  const getIcon = () => {
    if (confidence >= 0.85) return <TrendingUp className="h-5 w-5 text-green-600" />;
    if (confidence >= 0.70) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  const getColor = (): 'green' | 'yellow' | 'red' => {
    if (confidence >= 0.85) return 'green';
    if (confidence >= 0.70) return 'yellow';
    return 'red';
  };

  const getMessage = () => {
    if (confidence >= 0.85) return 'High confidence - Ready to approve';
    if (confidence >= 0.70) return 'Medium confidence - Review recommended';
    return 'Low confidence - Manual review required';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {showIcon && getIcon()}
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {(confidence * 100).toFixed(1)}%
        </span>
      </div>
      
      <ProgressBar
        value={confidence * 100}
        color={getColor()}
        showPercentage={false}
      />
      
      <p className="text-xs text-gray-600">{getMessage()}</p>
    </div>
  );
};