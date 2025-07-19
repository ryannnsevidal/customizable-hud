import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MetricCard } from './MetricCard';
import { HudControls } from './HudControls';
import { useHudData } from '@/hooks/useHudData';
import { useHudSettings } from '@/hooks/useHudSettings';
import { Activity, Zap, Heart, Gauge } from 'lucide-react';

interface HudDisplayProps {
  isFullscreen?: boolean;
}

export const HudDisplay: React.FC<HudDisplayProps> = ({ isFullscreen = false }) => {
  const { metrics, isConnected, connectionStatus } = useHudData();
  const { settings, updateLayout, toggleMetric } = useHudSettings();

  const metricConfigs = [
    {
      id: 'speed',
      icon: Gauge,
      label: 'Speed',
      value: metrics.speed,
      unit: settings.units.speed,
      color: 'speed',
      enabled: settings.enabledMetrics.speed,
    },
    {
      id: 'heartRate',
      icon: Heart,
      label: 'Heart Rate',
      value: metrics.heartRate,
      unit: 'bpm',
      color: 'heart',
      enabled: settings.enabledMetrics.heartRate,
    },
    {
      id: 'cadence',
      icon: Activity,
      label: 'Cadence',
      value: metrics.cadence,
      unit: 'rpm',
      color: 'cadence',
      enabled: settings.enabledMetrics.cadence,
    },
    {
      id: 'power',
      icon: Zap,
      label: 'Power',
      value: metrics.power,
      unit: 'W',
      color: 'power',
      enabled: settings.enabledMetrics.power,
    },
  ];

  const enabledMetrics = metricConfigs.filter(metric => metric.enabled);

  return (
    <div className={`hud-display ${isFullscreen ? 'fixed inset-0' : 'w-full h-full'} bg-background`}>
      {/* Connection Status Indicator */}
      <div className="absolute top-4 right-4 z-50">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono ${
          isConnected 
            ? 'bg-hud-success/20 text-hud-success border border-hud-success/30' 
            : 'bg-hud-danger/20 text-hud-danger border border-hud-danger/30'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-hud-success animate-pulse-glow' : 'bg-hud-danger'
          }`} />
          {connectionStatus}
        </div>
      </div>

      {/* Main HUD Layout */}
      <div className={`
        grid gap-4 p-6 h-full
        ${settings.layout === 'grid-2x2' ? 'grid-cols-2 grid-rows-2' : ''}
        ${settings.layout === 'horizontal' ? 'grid-cols-4 grid-rows-1' : ''}
        ${settings.layout === 'vertical' ? 'grid-cols-1 grid-rows-4' : ''}
        ${settings.layout === 'compact' ? 'grid-cols-2 grid-rows-2 max-w-2xl mx-auto' : ''}
      `}>
        {enabledMetrics.map((metric, index) => (
          <MetricCard
            key={metric.id}
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            color={metric.color as 'speed' | 'heart' | 'cadence' | 'power'}
            isActive={settings.activeMetric === metric.id}
            onClick={() => toggleMetric(metric.id)}
            className={`
              ${settings.layout === 'compact' ? 'text-lg' : 'text-2xl'}
              ${index === 0 && settings.layout === 'grid-2x2' ? 'col-span-1 row-span-1' : ''}
            `}
          />
        ))}
      </div>

      {/* Controls Overlay */}
      {!isFullscreen && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <HudControls />
        </div>
      )}

      {/* Glass Overlay Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hud-glass w-full h-full opacity-10" />
      </div>
    </div>
  );
};