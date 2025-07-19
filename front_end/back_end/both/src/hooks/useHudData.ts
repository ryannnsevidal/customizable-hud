import { useState, useEffect, useRef } from 'react';

export interface CyclingMetrics {
  speed: number;
  heartRate: number;
  cadence: number;
  power: number;
  distance: number;
  time: number;
}

export interface HudDataReturn {
  metrics: CyclingMetrics;
  isConnected: boolean;
  connectionStatus: string;
  connect: () => void;
  disconnect: () => void;
  resetMetrics: () => void;
}

const initialMetrics: CyclingMetrics = {
  speed: 0,
  heartRate: 0,
  cadence: 0,
  power: 0,
  distance: 0,
  time: 0,
};

export const useHudData = (): HudDataReturn => {
  const [metrics, setMetrics] = useState<CyclingMetrics>(initialMetrics);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [simulateData, setSimulateData] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>(Date.now());

  // Simulate realistic cycling data
  const generateSimulatedData = (): CyclingMetrics => {
    const time = Date.now() - startTimeRef.current;
    const timeInSeconds = time / 1000;
    
    // Create realistic variations using sine waves with noise
    const baseSpeed = 25; // km/h
    const speedVariation = Math.sin(timeInSeconds * 0.1) * 5 + Math.random() * 2;
    const speed = Math.max(0, baseSpeed + speedVariation);
    
    const baseHeartRate = 140; // bpm
    const heartRateVariation = Math.sin(timeInSeconds * 0.05) * 20 + Math.random() * 5;
    const heartRate = Math.max(60, Math.min(200, baseHeartRate + heartRateVariation));
    
    const baseCadence = 85; // rpm
    const cadenceVariation = Math.sin(timeInSeconds * 0.08) * 15 + Math.random() * 3;
    const cadence = Math.max(0, baseCadence + cadenceVariation);
    
    const basePower = 200; // watts
    const powerVariation = Math.sin(timeInSeconds * 0.12) * 50 + Math.random() * 10;
    const power = Math.max(0, basePower + powerVariation);
    
    // Calculate distance based on speed (simplified)
    const distance = (speed * timeInSeconds) / 3600; // km
    
    return {
      speed: Math.round(speed * 10) / 10,
      heartRate: Math.round(heartRate),
      cadence: Math.round(cadence),
      power: Math.round(power),
      distance: Math.round(distance * 100) / 100,
      time: timeInSeconds,
    };
  };

  const connect = async () => {
    setConnectionStatus('Connecting...');
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setConnectionStatus('Connected');
      setSimulateData(true);
      startTimeRef.current = Date.now();
      
      // Start data simulation
      intervalRef.current = setInterval(() => {
        if (simulateData) {
          setMetrics(generateSimulatedData());
        }
      }, 250); // Update every 250ms for smooth animation
    }, 1500);
  };

  const disconnect = () => {
    setIsConnected(false);
    setConnectionStatus('Disconnected');
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    
    setMetrics(initialMetrics);
  };

  const resetMetrics = () => {
    startTimeRef.current = Date.now();
    setMetrics(initialMetrics);
  };

  // Auto-connect on mount for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      connect();
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Bluetooth connection simulation (in real implementation, this would handle actual Bluetooth)
  useEffect(() => {
    // Check for Web Bluetooth API support
    if ('bluetooth' in navigator) {
      setConnectionStatus('Bluetooth Available');
    } else {
      setConnectionStatus('Bluetooth Not Supported');
    }
  }, []);

  return {
    metrics,
    isConnected,
    connectionStatus,
    connect,
    disconnect,
    resetMetrics,
  };
};