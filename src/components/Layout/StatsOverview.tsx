import React from 'react';
import { FileText, CheckCircle, DollarSign, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency, formatProcessingTime } from '../../utils/formatters';

interface StatsOverviewProps {
  totalProcessed: number;
  completed: number;
  needsReview: number;
  totalAmount: number;
  averageConfidence: number;
  averageProcessingTime: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  totalProcessed,
  completed,
  needsReview,
  totalAmount,
  averageConfidence,
  averageProcessingTime
}) => {
  const stats = [
    {
      icon: FileText,
      label: 'Total Processed',
      value: totalProcessed.toString(),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: CheckCircle,
      label: 'Auto-Approved',
      value: completed.toString(),
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: DollarSign,
      label: 'Total Value',
      value: formatCurrency(totalAmount),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Sparkles,
      label: 'Avg Confidence',
      value: `${Math.round(averageConfidence * 100)}%`,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: Clock,
      label: 'Avg Processing',
      value: formatProcessingTime(averageProcessingTime),
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: TrendingUp,
      label: 'Needs Review',
      value: needsReview.toString(),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className={stat.bgColor} padding="sm">
          <div className="flex flex-col items-center text-center">
            <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
            <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
