import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHudSettings } from '@/hooks/useHudSettings';
import { Separator } from '@/components/ui/separator';

interface HudSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HudSettingsModal: React.FC<HudSettingsModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { settings, updateSettings, resetSettings } = useHudSettings();

  const handleMetricToggle = (metricId: string, enabled: boolean) => {
    updateSettings({
      enabledMetrics: {
        ...settings.enabledMetrics,
        [metricId]: enabled,
      },
    });
  };

  const handleUnitChange = (metricId: string, unit: string) => {
    updateSettings({
      units: {
        ...settings.units,
        [metricId]: unit,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="hud-glass max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary font-display">HUD Configuration</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Layout Settings */}
          <Card className="p-4 bg-card/50">
            <h3 className="text-lg font-semibold mb-4 text-primary">Layout</h3>
            <div className="space-y-4">
              <div>
                <Label>Display Layout</Label>
                <Select 
                  value={settings.layout} 
                  onValueChange={(value) => updateSettings({ layout: value as any })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid-2x2">2x2 Grid</SelectItem>
                    <SelectItem value="horizontal">Horizontal Strip</SelectItem>
                    <SelectItem value="vertical">Vertical Stack</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Metric Configuration */}
          <Card className="p-4 bg-card/50">
            <h3 className="text-lg font-semibold mb-4 text-primary">Metrics</h3>
            <div className="space-y-4">
              {/* Speed */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="text-metric-speed">Speed</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Switch
                      checked={settings.enabledMetrics.speed}
                      onCheckedChange={(checked) => handleMetricToggle('speed', checked)}
                    />
                    <Select 
                      value={settings.units.speed} 
                      onValueChange={(value) => handleUnitChange('speed', value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="km/h">km/h</SelectItem>
                        <SelectItem value="mph">mph</SelectItem>
                        <SelectItem value="m/s">m/s</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Heart Rate */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="text-metric-heart">Heart Rate</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Switch
                      checked={settings.enabledMetrics.heartRate}
                      onCheckedChange={(checked) => handleMetricToggle('heartRate', checked)}
                    />
                    <span className="text-sm text-muted-foreground w-32">bpm</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Cadence */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="text-metric-cadence">Cadence</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Switch
                      checked={settings.enabledMetrics.cadence}
                      onCheckedChange={(checked) => handleMetricToggle('cadence', checked)}
                    />
                    <span className="text-sm text-muted-foreground w-32">rpm</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Power */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label className="text-metric-power">Power</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Switch
                      checked={settings.enabledMetrics.power}
                      onCheckedChange={(checked) => handleMetricToggle('power', checked)}
                    />
                    <span className="text-sm text-muted-foreground w-32">W</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Data Source Settings */}
          <Card className="p-4 bg-card/50">
            <h3 className="text-lg font-semibold mb-4 text-primary">Data Source</h3>
            <div className="space-y-4">
              <div>
                <Label>Update Frequency</Label>
                <Select 
                  value={settings.updateFrequency.toString()} 
                  onValueChange={(value) => updateSettings({ updateFrequency: parseInt(value) })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">10 Hz (100ms)</SelectItem>
                    <SelectItem value="250">4 Hz (250ms)</SelectItem>
                    <SelectItem value="500">2 Hz (500ms)</SelectItem>
                    <SelectItem value="1000">1 Hz (1s)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.simulateData}
                  onCheckedChange={(checked) => updateSettings({ simulateData: checked })}
                />
                <Label>Simulate Demo Data</Label>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetSettings}>
              Reset to Defaults
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};