

# HUD Customization – Front End

This is the front end for the Era cycling glasses HUD. It lets you pick which stats show up on your glasses while riding. You get three slots. Pick what matters. The UI is simple: select, preview, send.

## What it does

- Lets you choose up to three metrics (speed, heart rate, cadence, etc.)
- Shows a live preview of what you’ll see on the glasses
- Saves your choices locally
- Sends your config to the glasses over Bluetooth (when connected)
- Checks if the sensors you picked are actually available
- If something’s missing, it swaps in a default

## How it works

You open the HUD settings. Pick your stats. The preview updates instantly. When you connect the glasses, your config is sent over BLE. During the ride, only your selected stats show up.

## Main files

- `src/pages/Index.tsx` – HUD settings and preview logic
- `src/components/ui/` – UI elements
- `src/hooks/use-mobile.tsx` – Detects mobile
- `src/lib/utils.ts` – Utilities

## BLE logic (planned)

```js
const manager = new BleManager();
manager.onStateChange((state) => {
  if (state === 'PoweredOn') {
    manager.startDeviceScan(null, null, (error, device) => {
      if (device.name?.includes('EraGlasses')) {
        manager.stopDeviceScan();
        device.connect().then((d) => d.discoverAllServicesAndCharacteristics());
      }
    });
  }
});
```

## Simulated preview data

```js
useEffect(() => {
  const interval = setInterval(() => {
    setPreviewData({
      speed: (Math.random() * 40).toFixed(1),
      heart_rate: Math.floor(Math.random() * 70 + 100),
      cadence: Math.floor(Math.random() * 90 + 60),
    });
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

## Tech stack

| Layer         | Technology             | Purpose                                 |
|---------------|-----------------------|-----------------------------------------|
| Frontend      | React, Vite, TS       | UI, logic, fast dev                     |
| UI            | shadcn-ui, Tailwind   | Modern, responsive components           |
| BLE           | react-native-ble-plx  | Bluetooth sync (planned)                |
| Storage       | AsyncStorage          | Local config persistence                |

## What’s next

- Finalize BLE UUIDs and real sensor integration
- Add error handling for disconnects
- Polish UI for demo

---

This repo is the front end and preview logic. BLE connection and config sync are ready for integration. The UX is direct and clean for quick settings changes.
