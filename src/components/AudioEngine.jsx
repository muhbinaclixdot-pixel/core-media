// src/components/AudioEngine.jsx
// Silent no-op audio engine (audio disabled)
export function useAudioEngine() {
  const initAudio = () => {};
  const playBeamLaser = () => {};
  const playSubDrop = () => {};
  const playClickTick = () => {};

  return {
    initAudio,
    playBeamLaser,
    playSubDrop,
    playClickTick,
  };
}
