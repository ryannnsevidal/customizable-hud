import React, { useState } from 'react';
import { HudDisplay } from '@/components/hud/HudDisplay';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHudData } from '@/hooks/useHudData';
import { useHudSettings } from '@/hooks/useHudSettings';
import { 
  Bike, 
  Bluetooth, 
  Settings, 
  Monitor, 
  Play, 
  Square,
  RefreshCw 
} from 'lucide-react';

const Index = () => {
  const [showDemo, setShowDemo] = useState(false);
  const { isConnected, connectionStatus, connect, disconnect, resetMetrics } = useHudData();
  const { settings, toggleFullscreen } = useHudSettings();

  const handleStartDemo = () => {
    setShowDemo(true);
    if (!isConnected) {
      connect();
    }
  };

  if (showDemo) {
    return <HudDisplay isFullscreen={settings.isFullscreen} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Bike className="w-20 h-20 text-hud-primary animate-pulse-glow" />
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 bg-hud-success rounded-full flex items-center justify-center">
                  <Monitor className="w-3 h-3 text-background" />
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-hud bg-clip-text text-transparent">
            Smart Cycling HUD
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A customizable heads-up display for smart cycling glasses. 
            Monitor your performance metrics in real-time with beautiful, 
            high-contrast visualizations designed for outdoor visibility.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="text-metric-speed border-metric-speed">
              Speed Tracking
            </Badge>
            <Badge variant="outline" className="text-metric-heart border-metric-heart">
              Heart Rate
            </Badge>
            <Badge variant="outline" className="text-metric-cadence border-metric-cadence">
              Cadence
            </Badge>
            <Badge variant="outline" className="text-metric-power border-metric-power">
              Power Output
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleStartDemo}
              className="bg-hud-primary hover:bg-hud-primary/90 text-hud-primary-foreground px-8 py-4 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Launch HUD Demo
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bluetooth className={`w-4 h-4 ${isConnected ? 'text-hud-success' : 'text-muted-foreground'}`} />
              {connectionStatus}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hud-glass p-6">
            <div className="flex items-center gap-3 mb-4">
              <Monitor className="w-8 h-8 text-hud-primary" />
              <h3 className="text-xl font-semibold">Customizable Layout</h3>
            </div>
            <p className="text-muted-foreground">
              Choose from multiple layout options: grid, horizontal, vertical, or compact views 
              to match your riding style and smart glasses interface.
            </p>
          </Card>

          <Card className="hud-glass p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bluetooth className="w-8 h-8 text-hud-secondary" />
              <h3 className="text-xl font-semibold">Bluetooth Integration</h3>
            </div>
            <p className="text-muted-foreground">
              Seamlessly connects to cycling sensors and smart devices via Bluetooth Low Energy 
              for real-time data transmission to your smart glasses.
            </p>
          </Card>

          <Card className="hud-glass p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-8 h-8 text-hud-success" />
              <h3 className="text-xl font-semibold">Smart Configuration</h3>
            </div>
            <p className="text-muted-foreground">
              Intelligent metric selection and unit conversion. Configure update frequencies 
              and enable/disable specific metrics based on your training needs.
            </p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-8">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={connect}
              disabled={isConnected}
              className="border-hud-primary text-hud-primary hover:bg-hud-primary/20"
            >
              <Bluetooth className="w-4 h-4 mr-2" />
              Connect Sensors
            </Button>
            
            <Button 
              variant="outline" 
              onClick={resetMetrics}
              className="border-hud-secondary text-hud-secondary hover:bg-hud-secondary/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Metrics
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setShowDemo(true)}
              className="border-hud-success text-hud-success hover:bg-hud-success/20"
            >
              <Monitor className="w-4 h-4 mr-2" />
              View HUD
            </Button>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-8">Built With Modern Technologies</h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>React + TypeScript</span>
            <span>•</span>
            <span>Web Bluetooth API</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Bluetooth Low Energy</span>
            <span>•</span>
            <span>Local Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
