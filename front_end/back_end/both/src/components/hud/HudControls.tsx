import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Settings, Maximize, Grid, MoreHorizontal, MoreVertical, Square } from 'lucide-react';
import { useHudSettings } from '@/hooks/useHudSettings';
import { HudSettingsModal } from './HudSettingsModal';

export const HudControls: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { settings, updateLayout, toggleFullscreen } = useHudSettings();

  const layoutOptions = [
    { id: 'grid-2x2', icon: Grid, label: '2x2 Grid' },
    { id: 'horizontal', icon: MoreHorizontal, label: 'Horizontal' },
    { id: 'vertical', icon: MoreVertical, label: 'Vertical' },
    { id: 'compact', icon: Square, label: 'Compact' },
  ];

  return (
    <>
      <Card className="hud-glass p-2 flex items-center gap-2">
        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:bg-primary/20"
        >
          <Settings className="w-4 h-4" />
        </Button>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="flex items-center gap-2 animate-slide-up">
            {/* Layout Options */}
            {layoutOptions.map((layout) => (
              <Button
                key={layout.id}
                variant="ghost"
                size="sm"
                onClick={() => updateLayout(layout.id as any)}
                className={`
                  text-xs px-2 transition-all
                  ${settings.layout === layout.id 
                    ? 'bg-primary/30 text-primary' 
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/20'
                  }
                `}
              >
                <layout.icon className="w-4 h-4" />
              </Button>
            ))}

            {/* Fullscreen Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-muted-foreground hover:text-primary hover:bg-primary/20"
            >
              <Maximize className="w-4 h-4" />
            </Button>

            {/* Settings Modal */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="text-muted-foreground hover:text-primary hover:bg-primary/20"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        )}
      </Card>

      {/* Settings Modal */}
      <HudSettingsModal
        open={showSettings}
        onOpenChange={setShowSettings}
      />
    </>
  );
};