// src/components/Layout/Header.tsx
import React from 'react';
import { Brain, Settings, Download, Trash2, Info } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onExport?: () => void;
  onClearHistory?: () => void;
  onSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onExport, 
  onClearHistory,
  onSettings 
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Main Header Content */}
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                AI Expense Processor
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                Intelligent receipt and invoice analysis powered by AI
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {onExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm hidden md:flex"
                icon={<Download className="h-4 w-4" />}
              >
                Export
              </Button>
            )}
            
            {onClearHistory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearHistory}
                className="text-white hover:bg-white/10 backdrop-blur-sm hidden md:flex"
                icon={<Trash2 className="h-4 w-4" />}
              >
                Clear
              </Button>
            )}

            {/* Mobile Export Button */}
            {onExport && (
              <button 
                onClick={onExport}
                className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm"
                title="Export"
              >
                <Download className="h-5 w-5" />
              </button>
            )}

            {/* Mobile Clear Button */}
            {onClearHistory && (
              <button 
                onClick={onClearHistory}
                className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm"
                title="Clear History"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
            
            {/* Settings Button */}
            <button 
              onClick={onSettings}
              className="p-2 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Feature Highlights - Optional Info Banner */}
        <div className="mt-4 pt-4 border-t border-white/20 hidden lg:block">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-blue-100">AI Processing Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-blue-200" />
                <span className="text-blue-100">
                  Supports receipts, invoices, and expense documents
                </span>
              </div>
            </div>
            <div className="text-blue-100 font-medium">
              Processing Time: ~1-2 seconds
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};