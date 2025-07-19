import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
  color: 'speed' | 'heart' | 'cadence' | 'power';
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  label,
  value,
  unit,
  color,
  isActive = false,
  onClick,
  className
}) => {
  const formatValue = (val: number) => {
    if (val === 0) return '--';
    return val.toFixed(label === 'Speed' ? 1 : 0);
  };

  return (
    <Card 
      className={cn(
        'hud-glass cursor-pointer transition-all duration-300 hover:scale-105',
        'border-2 p-6 flex flex-col items-center justify-center text-center',
        `border-metric-${color}`,
        isActive && 'hud-active',
        className
      )}
      onClick={onClick}
    >
      {/* Icon */}
      <div className={`mb-4 p-3 rounded-full bg-metric-${color}/20 border border-metric-${color}/30`}>
        <Icon className={`w-8 h-8 text-metric-${color}`} />
      </div>

      {/* Value */}
      <div className={`hud-metric text-metric-${color} mb-2`}>
        {formatValue(value)}
      </div>

      {/* Unit */}
      <div className="hud-metric-label mb-2">
        {unit}
      </div>

      {/* Label */}
      <div className="hud-metric-label">
        {label}
      </div>

      {/* Active Indicator */}
      {isActive && (
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-metric-${color} animate-pulse-glow`} />
      )}
    </Card>
  );
};