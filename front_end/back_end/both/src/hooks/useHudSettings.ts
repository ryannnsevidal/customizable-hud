import { useState, useEffect } from 'react';

export interface HudSettings {
  layout: 'grid-2x2' | 'horizontal' | 'vertical' | 'compact';
  enabledMetrics: {
    speed: boolean;
    heartRate: boolean;
    cadence: boolean;
    power: boolean;
  };
  units: {
    speed: 'km/h' | 'mph' | 'm/s';
    distance: 'km' | 'mi';
    temperature: 'C' | 'F';
  };
  updateFrequency: number; // milliseconds
  simulateData: boolean;
  activeMetric: string | null;
  isFullscreen: boolean;
  theme: 'dark' | 'light' | 'auto';
  glassEffect: boolean;
}

const defaultSettings: HudSettings = {
  layout: 'grid-2x2',
  enabledMetrics: {
    speed: true,
    heartRate: true,
    cadence: true,
    power: true,
  },
  units: {
    speed: 'km/h',
    distance: 'km',
    temperature: 'C',
  },
  updateFrequency: 250,
  simulateData: true,
  activeMetric: null,
  isFullscreen: false,
  theme: 'dark',
  glassEffect: true,
};

const STORAGE_KEY = 'hud-settings';

export interface HudSettingsReturn {
  settings: HudSettings;
  updateSettings: (updates: Partial<HudSettings>) => void;
  updateLayout: (layout: HudSettings['layout']) => void;
  toggleMetric: (metricId: string) => void;
  toggleFullscreen: () => void;
  resetSettings: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
}

export const useHudSettings = (): HudSettingsReturn => {
  const [settings, setSettings] = useState<HudSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultSettings, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load HUD settings from localStorage:', error);
    }
    return defaultSettings;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save HUD settings to localStorage:', error);
    }
  }, [settings]);

  const updateSettings = (updates: Partial<HudSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const updateLayout = (layout: HudSettings['layout']) => {
    updateSettings({ layout });
  };

  const toggleMetric = (metricId: string) => {
    if (metricId in settings.enabledMetrics) {
      const key = metricId as keyof typeof settings.enabledMetrics;
      updateSettings({
        enabledMetrics: {
          ...settings.enabledMetrics,
          [key]: !settings.enabledMetrics[key],
        },
        activeMetric: settings.activeMetric === metricId ? null : metricId,
      });
    }
  };

  const toggleFullscreen = () => {
    updateSettings({ isFullscreen: !settings.isFullscreen });
    
    // Handle actual fullscreen API
    if (!settings.isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(console.warn);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(console.warn);
      }
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportSettings = (): string => {
    return JSON.stringify(settings, null, 2);
  };

  const importSettings = (settingsJson: string): boolean => {
    try {
      const parsed = JSON.parse(settingsJson);
      
      // Validate the imported settings have required structure
      if (typeof parsed === 'object' && parsed !== null) {
        const validatedSettings = { ...defaultSettings, ...parsed };
        setSettings(validatedSettings);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Failed to import settings:', error);
      return false;
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = Boolean(document.fullscreenElement);
      if (isCurrentlyFullscreen !== settings.isFullscreen) {
        updateSettings({ isFullscreen: isCurrentlyFullscreen });
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [settings.isFullscreen]);

  return {
    settings,
    updateSettings,
    updateLayout,
    toggleMetric,
    toggleFullscreen,
    resetSettings,
    exportSettings,
    importSettings,
  };
};