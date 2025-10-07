import React from 'react';
import { ProcessedExpense } from '../../types';
import { ExpenseCard } from './ExpenseCard';

interface ProcessorResultsProps {
  expenses: ProcessedExpense[];
  onView: (expense: ProcessedExpense) => void;
  onEdit?: (expense: ProcessedExpense) => void;
  onDelete?: (id: string) => void;
}

export const ProcessorResults: React.FC<ProcessorResultsProps> = ({
  expenses,
  onView,
  onEdit,
  onDelete
}) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No expenses processed yet</p>
        <p className="text-sm mt-2">Process your first receipt to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Processed Expenses ({expenses.length})
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};