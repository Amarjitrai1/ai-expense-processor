import React from 'react';
import { CheckCircle, AlertCircle, Clock, Eye, Edit2, Trash2 } from 'lucide-react';
import { ProcessedExpense } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

interface ExpenseCardProps {
  expense: ProcessedExpense;
  onView: (expense: ProcessedExpense) => void;
  onEdit?: (expense: ProcessedExpense) => void;
  onDelete?: (id: string) => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense,
  onView,
  onEdit,
  onDelete
}) => {
  const getStatusIcon = () => {
    switch (expense.status) {
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'needs_review':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (): 'success' | 'warning' | 'error' | 'info' => {
    switch (expense.status) {
      case 'completed':
        return 'success';
      case 'needs_review':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const confidenceColor = (): 'green' | 'yellow' | 'red' => {
    if (expense.extractedData.confidence >= 0.85) return 'green';
    if (expense.extractedData.confidence >= 0.70) return 'yellow';
    return 'red';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group" padding="md">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            {getStatusIcon()}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {expense.extractedData.vendor || 'Processing...'}
              </h3>
              <p className="text-sm text-gray-500">
                {formatDateTime(expense.timestamp)}
              </p>
            </div>
          </div>
          <Badge variant={getStatusVariant()}>
            {expense.status.replace('_', ' ')}
          </Badge>
        </div>

        {/* Amount and Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Amount</p>
            <p className="text-lg font-bold text-gray-900">
              {expense.extractedData.amount 
                ? formatCurrency(expense.extractedData.amount)
                : 'Processing...'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Category</p>
            <p className="text-sm font-medium text-gray-700">
              {expense.extractedData.category || 'Processing...'}
            </p>
          </div>
        </div>

        {/* Confidence Score */}
        {expense.extractedData.confidence > 0 && (
          <ProgressBar
            value={expense.extractedData.confidence * 100}
            label="AI Confidence"
            color={confidenceColor()}
            size="sm"
          />
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onView(expense)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </button>
          
          <div className="flex space-x-2">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(expense);
                }}
                className="p-1 text-gray-600 hover:text-blue-600 rounded"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('Delete this expense?')) {
                    onDelete(expense.id);
                  }
                }}
                className="p-1 text-gray-600 hover:text-red-600 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
