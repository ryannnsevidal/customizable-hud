import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Smartphone, 
  Glasses, 
  Bluetooth, 
  Database, 
  Settings, 
  Zap, 
  Heart, 
  Gauge, 
  MapPin, 
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Users,
  Lightbulb,
  Layers,
  Battery
} from "lucide-react";

import heroImage from "@/assets/hero-cycling-glasses.jpg";
import architectureImage from "@/assets/system-architecture.jpg";
import mobileUIImage from "@/assets/mobile-ui-mockup.jpg";
import hudViewImage from "@/assets/glasses-hud-view.jpg";

import { useAuth } from "../hooks/useAuth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

const Index = () => {
  const { user, login, logout } = useAuth();
  const [hudSettings, setHudSettings] = useState({ metrics: ["speed", "heart_rate", "cadence"] });
  const [saving, setSaving] = useState(false);

  // Save HUD settings to Firestore for the logged-in user
  const saveSettings = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "userSettings", user.uid), {
        hudCustomization: hudSettings,
        lastUpdated: new Date().toISOString(),
      });
      alert("Settings saved to your account.");
    } catch (e) {
      alert("Error saving settings.");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-surface-gradient">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-hero-gradient opacity-85" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            Era Mobile App Technical Assessment
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            HUD Data
            <br />
            <span className="text-accent">Customization</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
            Empowering cyclists with personalized, real-time performance insights
            <br />
            through smart glasses integration
          </p>
          {!user ? (
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow" onClick={login}>
              Sign in with Google
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="text-lg">Signed in as {user.displayName || user.email}</div>
              <Button size="sm" variant="outline" onClick={logout}>Sign Out</Button>
            </div>
          )}
        </div>
      </section>

      {/* Only show HUD customization if logged in */}
      {user && (
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <Card className="shadow-custom-lg border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Customize Your HUD</CardTitle>
              <CardDescription className="text-lg">
                Select up to three metrics to display on your glasses. Your choices are saved to your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-4">
                  {["speed", "heart_rate", "cadence", "power", "distance", "time"].map(metric => (
                    <Button
                      key={metric}
                      variant={hudSettings.metrics.includes(metric) ? "default" : "outline"}
                      disabled={
                        !hudSettings.metrics.includes(metric) && hudSettings.metrics.length >= 3
                      }
                      onClick={() => {
                        setHudSettings(prev => {
                          const exists = prev.metrics.includes(metric);
                          if (exists) {
                            return { ...prev, metrics: prev.metrics.filter(m => m !== metric) };
                          } else if (prev.metrics.length < 3) {
                            return { ...prev, metrics: [...prev.metrics, metric] };
                          }
                          return prev;
                        });
                      }}
                    >
                      {metric.replace("_", " ").toUpperCase()}
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <strong>Selected:</strong> {hudSettings.metrics.map(m => m.replace("_", " ")).join(", ")}
                </div>
                <Button onClick={saveSettings} disabled={saving} className="mt-4">
                  {saving ? "Saving..." : "Save HUD Settings"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Introduction */}
      <section id="introduction" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              1. Introduction
            </Badge>
            <h2 className="text-4xl font-bold mb-6">Why HUD Data Customization?</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                I chose <strong className="text-foreground">Option C: HUD Data Customization</strong> because it represents the perfect intersection of user personalization and technical innovation.
              </p>
              <p>
                Unlike basic notification systems or simple data display, HUD customization addresses a fundamental challenge in wearable technology: <strong className="text-foreground">information overload vs. personalization</strong>.
              </p>
              <p>
                Every cyclist has different priorities - recreational riders might focus on distance and heart rate, while competitive athletes need power output and cadence. This solution puts the user in complete control of their experience.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  User Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Personalized cycling experience</li>
                  <li>• Reduced cognitive load during rides</li>
                  <li>• Enhanced safety through relevant data</li>
                  <li>• Adaptable to different riding scenarios</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Technical Innovation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Real-time data synchronization</li>
                  <li>• Cross-platform compatibility</li>
                  <li>• Intelligent data prioritization</li>
                  <li>• Seamless device integration</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section id="architecture" className="py-16 px-6 max-w-6xl mx-auto bg-muted/30 rounded-3xl my-16">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          2. System Architecture
        </Badge>
        <h2 className="text-4xl font-bold mb-8">How Everything Connects</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <img 
              src={architectureImage} 
              alt="System Architecture Diagram" 
              className="w-full rounded-lg shadow-custom-md"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">The Big Picture</h3>
            <p className="text-lg text-muted-foreground">
              Think of this system like a <strong className="text-foreground">remote control setup for your TV</strong> - but instead of channels, you're controlling what data appears on your smart glasses.
            </p>
            <div className="space-y-4">
              {[
                { icon: Smartphone, title: "Mobile App", desc: "Your remote control - where you set preferences" },
                { icon: Bluetooth, title: "Bluetooth Connection", desc: "The invisible wire connecting your devices" },
                { icon: Glasses, title: "Smart Glasses", desc: "Your personalized display screen" },
                { icon: Database, title: "Cloud Storage", desc: "Your settings backup - like bookmarks in a browser" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="flow" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="flow">Data Flow</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="protocols">Communication</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flow" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold">Data Flow Process</h4>
                  <div className="grid gap-4">
                    {[
                      "User selects metrics in mobile app (Speed, Heart Rate, Power, etc.)",
                      "App saves preferences locally and syncs to cloud database",
                      "User starts cycling and connects glasses via Bluetooth",
                      "App sends real-time sensor data + display preferences to glasses",
                      "Glasses render customized HUD based on user preferences",
                      "Continuous updates maintain sync between all components"
                    ].map((step, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="components" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Mobile App Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>• Settings Interface (drag & drop metrics)</li>
                    <li>• Bluetooth Manager</li>
                    <li>• Data Synchronization Service</li>
                    <li>• Profile Management</li>
                    <li>• Real-time Sensor Integration</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Glasses className="h-5 w-5" />
                    Smart Glasses Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>• HUD Rendering Engine</li>
                    <li>• Bluetooth Receiver</li>
                    <li>• Display Layout Manager</li>
                    <li>• Data Processing Unit</li>
                    <li>• Error Handling System</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="protocols" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Communication Protocols</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h5 className="font-semibold text-primary">Bluetooth Low Energy (BLE)</h5>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Low power consumption</li>
                          <li>• Range: 10-30 meters</li>
                          <li>• Latency: {"<"}100ms</li>
                          <li>• Automatic reconnection</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h5 className="font-semibold text-primary">Data Format (JSON)</h5>
                        <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`{
  "metrics": [
    {
      "type": "speed",
      "value": 25.3,
      "position": "top-left",
      "priority": 1
    },
    {
      "type": "heartRate", 
      "value": 145,
      "position": "top-right",
      "priority": 2
    }
  ],
  "timestamp": 1640995200
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* User Journey */}
      <section id="journey" className="py-16 px-6 max-w-6xl mx-auto">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          3. User Journey
        </Badge>
        <h2 className="text-4xl font-bold mb-8">From Setup to Ride</h2>
        
        <div className="grid gap-8">
          {[
            {
              phase: "Before the Ride",
              icon: Settings,
              color: "primary",
              steps: [
                "Open the cycling app on their phone",
                "Navigate to 'HUD Settings'",
                "Drag and drop preferred metrics (speed, heart rate, power, etc.)",
                "Choose display positions and priorities",
                "Save profile (e.g., 'Training Ride' vs 'Easy Ride')",
                "App automatically syncs settings to cloud"
              ]
            },
            {
              phase: "Starting the Ride", 
              icon: Bluetooth,
              color: "accent",
              steps: [
                "Put on smart glasses and turn them on",
                "Glasses automatically search for paired phone",
                "Phone detects glasses and establishes connection",
                "App sends current HUD configuration to glasses",
                "Glasses confirm setup with brief welcome message",
                "User sees customized display appear in their vision"
              ]
            },
            {
              phase: "During the Ride",
              icon: Activity,
              color: "success", 
              steps: [
                "Phone continuously collects sensor data (GPS, heart rate monitor, power meter)",
                "App processes and filters data based on user preferences",
                "Only selected metrics are sent to glasses every 2-3 seconds",
                "Glasses update display smoothly without distraction",
                "If connection drops, glasses show 'reconnecting' indicator",
                "Emergency data (navigation alerts) always takes priority"
              ]
            },
            {
              phase: "After the Ride",
              icon: CheckCircle,
              color: "primary",
              steps: [
                "User can review which metrics were most helpful",
                "App suggests optimizations based on usage patterns",
                "Settings automatically save for next time",
                "User can create new profiles for different ride types",
                "Data syncs across all devices for consistency"
              ]
            }
          ].map((phase, index) => (
            <Card key={index} className={`border-${phase.color}/20 bg-${phase.color}/5`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${phase.color}/10`}>
                    <phase.icon className={`h-6 w-6 text-${phase.color}`} />
                  </div>
                  {phase.phase}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {phase.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full bg-${phase.color}/20 text-${phase.color} flex items-center justify-center text-sm font-semibold mt-0.5`}>
                        {stepIndex + 1}
                      </div>
                      <p className="text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical Design */}
      <section id="technical" className="py-16 px-6 max-w-6xl mx-auto bg-muted/30 rounded-3xl my-16">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          4. Technical Implementation
        </Badge>
        <h2 className="text-4xl font-bold mb-8">Under the Hood</h2>
        
        <Tabs defaultValue="storage" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="storage">Data Storage</TabsTrigger>
            <TabsTrigger value="bluetooth">Bluetooth</TabsTrigger>
            <TabsTrigger value="glasses">Glasses Logic</TabsTrigger>
            <TabsTrigger value="sync">Synchronization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="storage" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Local Storage (Phone)</CardTitle>
                  <CardDescription>Immediate access, works offline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Like saving your favorite TV channels - instantly available even without internet.
                    </p>
                    <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`// React Native AsyncStorage
const saveHUDSettings = async (settings) => {
  await AsyncStorage.setItem(
    'hudCustomization', 
    JSON.stringify(settings)
  );
};

// Quick retrieval for immediate use
const getHUDSettings = async () => {
  const settings = await AsyncStorage.getItem(
    'hudCustomization'
  );
  return JSON.parse(settings);
};`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Cloud Backup (Firebase)</CardTitle>
                  <CardDescription>Sync across devices, never lose settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Like having your Netflix profile work on any device - same preferences everywhere.
                    </p>
                    <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`// Firebase Firestore
const syncToCloud = async (userId, settings) => {
  await firestore()
    .collection('userSettings')
    .doc(userId)
    .set({
      hudCustomization: settings,
      lastUpdated: new Date(),
      deviceId: getDeviceId()
    });
};`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="bluetooth" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Bluetooth Communication Protocol</h4>
                    <p className="text-muted-foreground mb-4">
                      Think of Bluetooth like a walkie-talkie between your phone and glasses - they need to speak the same language.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold mb-3">Connection Setup</h5>
                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`// React Native Bluetooth Manager
const connectToGlasses = async () => {
  const devices = await BluetoothManager
    .scan(['cycling-glasses-service']);
  
  const glasses = devices.find(
    device => device.name === 'EraGlasses'
  );
  
  await BluetoothManager.connect(glasses.id);
  
  // Send initial configuration
  await sendHUDConfig(currentSettings);
};`}
                      </pre>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-3">Data Transmission</h5>
                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
{`// Send data every 2 seconds
const sendDataToGlasses = (metrics) => {
  const payload = {
    timestamp: Date.now(),
    data: metrics.filter(m => m.enabled),
    batteryLevel: getBatteryLevel()
  };
  
  BluetoothManager.writeCharacteristic(
    'hud-data-service',
    'metric-characteristic', 
    JSON.stringify(payload)
  );
};`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="glasses" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Smart Glasses Processing</h4>
                    <p className="text-muted-foreground mb-4">
                      The glasses are like a smart TV - they receive instructions and display content, but the real processing happens on your phone.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="font-semibold">What the Glasses Do:</h5>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-medium mb-2">Data Reception & Processing</h6>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Receive JSON data via Bluetooth</li>
                          <li>• Parse and validate incoming metrics</li>
                          <li>• Apply user-defined display positions</li>
                          <li>• Handle data prioritization (emergency {">"} normal)</li>
                          <li>• Manage display refresh rates (30fps smooth)</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium mb-2">Display Management</h6>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Render metrics in AR overlay</li>
                          <li>• Adjust brightness based on ambient light</li>
                          <li>• Handle text scaling for readability</li>
                          <li>• Show connection status indicators</li>
                          <li>• Display low battery warnings</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Simple Analogy:</strong> The glasses work like a digital billboard that receives instructions from a computer. The computer (phone) decides what to show and when, while the billboard (glasses) focuses on displaying it clearly and beautifully.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sync" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Data Synchronization Strategy</h4>
                    <p className="text-muted-foreground mb-4">
                      Like keeping your music playlist updated across all your devices - changes in one place appear everywhere.
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="border-primary/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Real-time Sync</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">Settings changes instantly update glasses during active connection</p>
                        </CardContent>
                      </Card>
                      <Card className="border-accent/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Background Sync</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">Cloud backup happens automatically when on WiFi or good cellular</p>
                        </CardContent>
                      </Card>
                      <Card className="border-success/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">Conflict Resolution</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">Most recent changes win, with manual override options</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-3">Sync Flow Example</h5>
                      <div className="bg-muted p-4 rounded-lg">
                        <ol className="space-y-2 text-sm">
                          <li><strong>1.</strong> User changes heart rate display position in app</li>
                          <li><strong>2.</strong> Change saves to local storage immediately</li>
                          <li><strong>3.</strong> If glasses connected, new position updates within 1 second</li>
                          <li><strong>4.</strong> Background service uploads to Firebase within 30 seconds</li>
                          <li><strong>5.</strong> Other devices receive update next time they launch app</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* UX/UI Design */}
      <section id="ux-ui" className="py-16 px-6 max-w-6xl mx-auto">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          5. User Experience Design
        </Badge>
        <h2 className="text-4xl font-bold mb-8">Interface & Interaction</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Mobile App Interface</h3>
            <img 
              src={mobileUIImage} 
              alt="Mobile App UI Mockup" 
              className="w-full rounded-lg shadow-custom-md mb-6"
            />
            <div className="space-y-4">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Drag & Drop Metrics</h4>
                  <p className="text-sm text-muted-foreground">
                    Users can drag cycling metrics like puzzle pieces onto a glasses preview. Think of arranging apps on your phone's home screen.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Smart Suggestions</h4>
                  <p className="text-sm text-muted-foreground">
                    App learns from usage patterns and suggests optimal layouts for different ride types (training vs. casual vs. racing).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Smart Glasses HUD</h3>
            <img 
              src={hudViewImage} 
              alt="Glasses HUD View" 
              className="w-full rounded-lg shadow-custom-md mb-6"
            />
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Gauge, metric: "Speed", value: "25 mph", position: "Top Left" },
                  { icon: Heart, metric: "Heart Rate", value: "145 bpm", position: "Top Right" },
                  { icon: Zap, metric: "Power", value: "280W", position: "Bottom Left" },
                  { icon: Activity, metric: "Cadence", value: "90 rpm", position: "Bottom Right" }
                ].map((item, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{item.metric}</span>
                    </div>
                    <p className="text-lg font-bold">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.position}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Key UX Principles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Glance-able Design",
                desc: "Information must be readable in under 2 seconds without losing focus on the road",
                icon: Clock
              },
              {
                title: "Progressive Disclosure", 
                desc: "Show essential metrics first, with secondary data available on demand",
                icon: Layers
              },
              {
                title: "Context Awareness",
                desc: "Display adapts to riding conditions (night mode, weather alerts, navigation priority)",
                icon: MapPin
              }
            ].map((principle, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <principle.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h4 className="text-lg font-semibold mb-2">{principle.title}</h4>
                  <p className="text-sm text-muted-foreground">{principle.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section id="error-handling" className="py-16 px-6 max-w-6xl mx-auto bg-muted/30 rounded-3xl my-16">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          6. Error Handling & Edge Cases
        </Badge>
        <h2 className="text-4xl font-bold mb-8">When Things Go Wrong</h2>
        
        <div className="grid gap-6">
          {[
            {
              scenario: "Bluetooth Connection Lost",
              icon: Bluetooth,
              color: "destructive",
              solutions: [
                "Glasses show 'Reconnecting...' indicator in corner",
                "App automatically attempts reconnection every 5 seconds",
                "Last known data remains visible with timestamp",
                "Manual reconnect button appears in app after 30 seconds",
                "Graceful fallback to basic time/speed display"
              ]
            },
            {
              scenario: "Glasses Can't Display Metric",
              icon: AlertTriangle,
              color: "warning", 
              solutions: [
                "App detects glasses capabilities during initial pairing",
                "Unsupported metrics are grayed out in selection interface",
                "Smart substitution (if power unavailable, show speed instead)",
                "Clear error message: 'Heart rate sensor not connected'",
                "Suggest alternative metrics or troubleshooting steps"
              ]
            },
            {
              scenario: "No Metrics Selected",
              icon: Settings,
              color: "muted",
              solutions: [
                "Default to essential metrics (speed, time, distance)",
                "Show helpful onboarding: 'Tap + to add your first metric'",
                "Suggest popular combinations based on ride type",
                "One-tap 'Quick Setup' for common configurations",
                "Prevent completely empty displays with minimum viable data"
              ]
            },
            {
              scenario: "Battery Low (Glasses)",
              icon: Battery,
              color: "accent",
              solutions: [
                "Progressive power saving: dim display, reduce refresh rate",
                "Priority mode: show only critical metrics (speed, navigation)",
                "Early warning at 20% battery with estimated remaining time",
                "Option to send data to phone for audio alerts instead",
                "Graceful shutdown with 'Save & Continue on Phone' option"
              ]
            }
          ].map((error, index) => (
            <Card key={index} className={`border-${error.color}/20`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${error.color}/10`}>
                    <error.icon className={`h-6 w-6 text-${error.color === 'muted' ? 'foreground' : error.color}`} />
                  </div>
                  {error.scenario}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {error.solutions.map((solution, sIndex) => (
                    <div key={sIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{solution}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Alert className="mt-8">
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            <strong>Golden Rule:</strong> Never leave the user stranded. Every error state should provide a clear next step, whether that's automatic recovery, manual intervention, or graceful degradation to basic functionality.
          </AlertDescription>
        </Alert>
      </section>

      {/* Learning Plan */}
      <section id="learning" className="py-16 px-6 max-w-6xl mx-auto">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
          7. Learning & Development Plan
        </Badge>
        <h2 className="text-4xl font-bold mb-8">Knowledge Acquisition Strategy</h2>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>If I Were Starting from Scratch...</CardTitle>
              <CardDescription>
                A realistic learning path for someone new to wearable technology integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Week 1-2: Foundations</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Bluetooth Basics:</strong> How BLE works, pairing, data transmission</li>
                    <li>• <strong>React Native Bluetooth:</strong> Libraries like react-native-ble-plx</li>
                    <li>• <strong>JSON Data Structures:</strong> Efficient data formats for real-time transmission</li>
                    <li>• <strong>State Management:</strong> Redux or Context for complex app state</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Week 3-4: Integration</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Wearable SDKs:</strong> Study existing platforms (Vuzix, Google Glass)</li>
                    <li>• <strong>Error Handling:</strong> Robust connection management and retry logic</li>
                    <li>• <strong>Performance:</strong> Battery optimization and data compression</li>
                    <li>• <strong>Testing:</strong> Bluetooth simulators and real device testing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                resource: "Documentation",
                items: [
                  "React Native Bluetooth documentation",
                  "Bluetooth SIG specifications", 
                  "Wearable platform developer guides",
                  "iOS/Android BLE guidelines"
                ]
              },
              {
                resource: "Hands-on Practice",
                items: [
                  "Build simple BLE scanner app",
                  "Create mock smart glasses simulator",
                  "Implement basic data sync patterns",
                  "Test with real Bluetooth devices"
                ]
              },
              {
                resource: "Community & Support",
                items: [
                  "Join wearable developer forums",
                  "Follow Bluetooth technology blogs",
                  "Attend AR/VR meetups and conferences",
                  "Connect with hardware manufacturers"
                ]
              }
            ].map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.resource}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Lightbulb className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2">Learning Philosophy</h4>
                  <p className="text-muted-foreground">
                    Start with existing Bluetooth apps (fitness trackers, smartwatches) to understand proven patterns. 
                    Build simple prototypes early and often. The key insight: <strong>most complexity is in reliable 
                    connection management, not the data transmission itself.</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Summary */}
      <section id="summary" className="py-16 px-6 max-w-6xl mx-auto bg-hero-gradient rounded-3xl text-white my-16">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            8. Executive Summary
          </Badge>
          <h2 className="text-4xl font-bold mb-6">Project Value & Feasibility</h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">User Value Proposition</h3>
            <div className="space-y-4">
              <Card className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">🎯 Personalization at Scale</h4>
                  <p className="text-sm text-white/80">
                    Every cyclist gets exactly the data they need, when they need it, without information overload
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">🚀 Enhanced Safety</h4>
                  <p className="text-sm text-white/80">
                    Eyes stay on the road while still accessing critical performance metrics and navigation
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">⚡ Seamless Integration</h4>
                  <p className="text-sm text-white/80">
                    Works with existing sensors and devices - no need to replace current cycling setup
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">Technical Feasibility</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-white" />
                <div>
                  <p className="font-semibold">Proven Technologies</p>
                  <p className="text-sm text-white/80">Bluetooth LE, React Native, Firebase - all battle-tested</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-white" />
                <div>
                  <p className="font-semibold">Incremental Development</p>
                  <p className="text-sm text-white/80">Can be built and tested in phases, reducing risk</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-white" />
                <div>
                  <p className="font-semibold">Scalable Architecture</p>
                  <p className="text-sm text-white/80">Design supports future features and different device types</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-white" />
                <div>
                  <p className="font-semibold">Clear Success Metrics</p>
                  <p className="text-sm text-white/80">User engagement, customization usage, connection reliability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 pt-8 border-t border-white/20">
          <h3 className="text-2xl font-semibold mb-4">Why This Matters</h3>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            HUD Data Customization isn't just about displaying numbers - it's about creating a truly personal cycling experience. 
            By putting users in control of their data, we're not just building an app; we're empowering cyclists to ride smarter, 
            safer, and with greater enjoyment. This is the kind of thoughtful innovation that turns good products into 
            indispensable tools.
          </p>
          <Button 
            size="lg" 
            className="mt-6 bg-white text-primary hover:bg-white/90"
          >
            Ready to Build the Future
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-muted-foreground border-t">
        <p>
          Prepared for Era Mobile App Technical Assessment • Option C: HUD Data Customization
        </p>
        <p className="text-sm mt-2">
          A comprehensive proposal demonstrating user-centered design and technical feasibility
        </p>
      </footer>
    </div>
  );
};

export default Index;
