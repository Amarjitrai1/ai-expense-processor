import React from 'react';
import { Building, DollarSign, Calendar, Tag, CreditCard, Receipt } from 'lucide-react';
import { ExtractedData } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface ExtractionResultsProps {
  data: ExtractedData;
}

export const ExtractionResults: React.FC<ExtractionResultsProps> = ({ data }) => {
  const fields = [
    {
      icon: Building,
      label: 'Vendor',
      value: data.vendor,
      color: 'blue'
    },
    {
      icon: DollarSign,
      label: 'Amount',
      value: data.amount ? formatCurrency(data.amount) : undefined,
      color: 'green',
      highlight: true
    },
    {
      icon: Calendar,
      label: 'Date',
      value: data.date ? formatDate(data.date) : undefined,
      color: 'purple'
    },
    {
      icon: Tag,
      label: 'Category',
      value: data.category,
      color: 'orange'
    },
    {
      icon: CreditCard,
      label: 'Payment Method',
      value: data.paymentMethod,
      color: 'indigo'
    },
    {
      icon: Receipt,
      label: 'Tax Amount',
      value: data.taxAmount ? formatCurrency(data.taxAmount) : undefined,
      color: 'red'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    purple: 'bg-purple-50 text-purple-700',
    orange: 'bg-orange-50 text-orange-700',
    indigo: 'bg-indigo-50 text-indigo-700',
    red: 'bg-red-50 text-red-700'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((field, index) => {
        if (!field.value) return null;
        
        const Icon = field.icon;
        const colorClass = colorClasses[field.color as keyof typeof colorClasses];
        
        return (
          <div
            key={index}
            className={`${colorClass} rounded-lg p-4 ${field.highlight ? 'md:col-span-2' : ''}`}
          >
            <div className="flex items-center mb-2">
              <Icon className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{field.label}</span>
            </div>
            <p className={`font-semibold ${field.highlight ? 'text-2xl' : 'text-lg'}`}>
              {field.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};
