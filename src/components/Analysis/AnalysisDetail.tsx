import React from 'react';
import { X, FileText, Brain } from 'lucide-react';
import { ProcessedExpense } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ConfidenceIndicator } from './ConfidenceIndicator';
import { ExtractionResults } from './ExtractionResults';
import { formatProcessingTime } from '../../utils/formatters';

interface AnalysisDetailProps {
  expense: ProcessedExpense | null;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export const AnalysisDetail: React.FC<AnalysisDetailProps> = ({
  expense,
  onClose,
  onApprove,
  onReject
}) => {
  if (!expense) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-semibold text-gray-900">Expense Analysis</h3>
            <Badge variant={expense.status === 'completed' ? 'success' : 'warning'}>
              {expense.status.replace('_', ' ')}
            </Badge>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Original Text */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Original Receipt Text
            </h4>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="text-sm font-mono whitespace-pre-wrap text-gray-700">
                {expense.originalText}
              </pre>
            </div>
          </div>

          {/* AI Extracted Data */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Brain className="h-4 w-4 mr-2 text-purple-600" />
              AI Extracted Information
            </h4>
            <ExtractionResults data={expense.extractedData} />
          </div>

          {/* Confidence Score */}
          {expense.extractedData.confidence > 0 && (
            <div>
              <ConfidenceIndicator
                confidence={expense.extractedData.confidence}
                label="AI Confidence Score"
              />
            </div>
          )}

          {/* AI Reasoning */}
          {expense.extractedData.reasoning && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h5 className="text-sm font-semibold text-blue-900 mb-2">
                AI Analysis Reasoning
              </h5>
              <p className="text-sm text-blue-800">{expense.extractedData.reasoning}</p>
            </div>
          )}

          {/* Processing Metrics */}
          {expense.processingTime && (
            <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
              <span>Processing Time:</span>
              <span className="font-semibold">{formatProcessingTime(expense.processingTime)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-6 border-t bg-gray-50">
          {onApprove && (
            <Button
              variant="primary"
              onClick={() => {
                onApprove(expense.id);
                onClose();
              }}
              className="flex-1"
            >
              Approve & Export
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {onReject ? 'Cancel' : 'Close'}
          </Button>
          {onReject && (
            <Button
              variant="danger"
              onClick={() => {
                onReject(expense.id);
                onClose();
              }}
              className="flex-1"
            >
              Reject
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
