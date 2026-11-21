'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function AmbientSoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<any>(null);

  const startSoundscape = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2); // Soft fade-in
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Soft ambient chord drone (C Minor 9th / Cyber Lounge harmonic: C2, G2, D#3, A#3, D4)
      const frequencies = [65.41, 98.0, 155.56, 233.08, 293.66];
      const oscs: OscillatorNode[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Lowpass warm filter for warm cozy fine-dining ambiance
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350 + idx * 80, ctx.currentTime);

        // Subtle pan & volume
        oscGain.gain.setValueAtTime(0.2 / frequencies.length, ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscs.push(osc);
      });

      oscillatorsRef.current = oscs;
      setIsPlaying(true);

      // Periodically trigger a subtle glass chime tone
      intervalRef.current = setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        try {
          const chimeOsc = ctx.createOscillator();
          const chimeGain = ctx.createGain();
          chimeOsc.type = 'sine';
          const chimeNotes = [523.25, 659.25, 783.99, 1046.5];
          const note = chimeNotes[Math.floor(Math.random() * chimeNotes.length)];
          chimeOsc.frequency.setValueAtTime(note, ctx.currentTime);

          chimeGain.gain.setValueAtTime(0.001, ctx.currentTime);
          chimeGain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 0.1);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

          chimeOsc.connect(chimeGain);
          chimeGain.connect(masterGain);
          chimeOsc.start(ctx.currentTime);
          chimeOsc.stop(ctx.currentTime + 2.6);
        } catch {
          // ignore
        }
      }, 7000);
    } catch (e) {
      console.error('Audio could not start', e);
    }
  };

  const stopSoundscape = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
      setTimeout(() => {
        oscillatorsRef.current.forEach((o) => {
          try {
            o.stop();
          } catch {}
        });
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
      }, 900);
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  useEffect(() => {
    return () => {
      stopSoundscape();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className={`px-3 py-1.5 rounded-full border text-xs font-mono transition-all flex items-center gap-2 ${
        isPlaying
          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20'
          : 'glass-panel border-gray-700 text-gray-400 hover:text-gray-200'
      }`}
      title="Toggle Cyber Lounge Ambiance"
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-3 bg-amber-400 animate-pulse" />
            <span className="w-0.5 h-2 bg-amber-400 animate-pulse delay-75" />
            <span className="w-0.5 h-4 bg-amber-400 animate-pulse delay-150" />
            <span className="w-0.5 h-2.5 bg-amber-400 animate-pulse delay-100" />
          </div>
          <span className="hidden sm:inline">Ambiance On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Play Ambiance</span>
        </>
      )}
    </button>
  );
}
