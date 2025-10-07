import { useState, useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage?: number;
  componentMounts: number;
  lastUpdate: number;
}

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    componentMounts: 0,
    lastUpdate: Date.now()
  });

  const mountCount = useRef(0);
  const renderStart = useRef(0);

  useEffect(() => {
    mountCount.current += 1;
    renderStart.current = performance.now();

    const updateMetrics = () => {
      const renderTime = performance.now() - renderStart.current;
      
      setMetrics({
        renderTime: Math.round(renderTime * 100) / 100,
        memoryUsage: (performance as any).memory?.usedJSHeapSize,
        componentMounts: mountCount.current,
        lastUpdate: Date.now()
      });
    };

    requestAnimationFrame(updateMetrics);
  });

  return metrics;
};
