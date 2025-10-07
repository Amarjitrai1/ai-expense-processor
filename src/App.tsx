import React, { useState, useCallback } from 'react';
import { Header } from './components/Layout/Header';
import { StatsOverview } from './components/Layout/StatsOverview';
import { ProcessorInput } from './components/Processor/ProcessorInput';
import { ProcessorResults } from './components/Processor/ProcessorResults';
import { AnalysisDetail } from './components/Analysis/AnalysisDetail';
import { useAIProcessor } from './hooks/useAIProcessor';
import { useExpenseHistory } from './hooks/useExpenseHistory';
import { ProcessedExpense } from './types';

function App() {
  const { processExpense, isProcessing, error } = useAIProcessor();
  const { expenses, stats, addExpense, deleteExpense, clearHistory } = useExpenseHistory();
  const [selectedExpense, setSelectedExpense] = useState<ProcessedExpense | null>(null);

  const handleProcess = useCallback(async (text: string) => {
    const result = await processExpense(text);
    if (result) {
      addExpense(result);
    }
  }, [processExpense, addExpense]);

  const handleExport = useCallback(() => {
    const csvContent = [
      ['Date', 'Vendor', 'Category', 'Amount', 'Confidence', 'Status'].join(','),
      ...expenses.map(exp => [
        exp.extractedData.date || '',
        exp.extractedData.vendor || '',
        exp.extractedData.category || '',
        exp.extractedData.amount?.toFixed(2) || '',
        (exp.extractedData.confidence * 100).toFixed(1) + '%',
        exp.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-expenses-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }, [expenses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onExport={handleExport} onClearHistory={clearHistory} />

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Stats Overview */}
        <div className="mb-8">
          <StatsOverview
            totalProcessed={stats.totalProcessed}
            completed={stats.completed}
            needsReview={stats.needsReview}
            totalAmount={stats.totalAmount}
            averageConfidence={stats.averageConfidence}
            averageProcessingTime={stats.averageProcessingTime}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            <ProcessorInput
              onProcess={handleProcess}
              isProcessing={isProcessing}
              error={error}
            />
          </div>

          {/* Results Section */}
          <div>
            <ProcessorResults
              expenses={expenses}
              onView={setSelectedExpense}
              onDelete={deleteExpense}
            />
          </div>
        </div>

        {/* Performance Info */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            AI Processing Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2">Machine Learning</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Natural language processing</li>
                <li>Pattern recognition</li>
                <li>Context-aware analysis</li>
                <li>Continuous learning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Data Extraction</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Vendor identification</li>
                <li>Amount parsing with tax</li>
                <li>Date recognition</li>
                <li>Payment method detection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Smart Categorization</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Keyword-based matching</li>
                <li>Context understanding</li>
                <li>Confidence scoring</li>
                <li>Manual review flagging</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Analysis Detail Modal */}
      <AnalysisDetail
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
        onApprove={(id) => {
          console.log('Approved:', id);
          // Could update status here
        }}
      />
    </div>
  );
}

export default App;