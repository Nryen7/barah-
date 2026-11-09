import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Mic, BrainCircuit } from 'lucide-react';
import { Persona } from '../types';

interface AvatarVisualizerProps {
  persona: Persona;
  status: 'idle' | 'thinking' | 'talking' | 'listening';
  isPlayingAudio: boolean;
  onStopAudio: () => void;
  onAvatarClick?: () => void;
}

export const AvatarVisualizer: React.FC<AvatarVisualizerProps> = ({
  persona,
  status,
  isPlayingAudio,
  onStopAudio,
  onAvatarClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusText = () => {
    switch (status) {
      case 'talking':
        return 'يسولف معك الحين 🎙️';
      case 'thinking':
        return 'يفكر في رد يونسك 💭';
      case 'listening':
        return 'يسمع كلامك بكل تركيز 👂';
      default:
        return 'جاهز لأحلى سوالف ☕';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'talking':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse';
      case 'thinking':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40 animate-pulse';
      case 'listening':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse';
      default:
        return 'bg-slate-800/80 text-slate-300 border-slate-700/60';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 select-none">
      {/* Outer Glow Container */}
      <div className="relative group cursor-pointer" onClick={onAvatarClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* Animated Sound Wave Rings when talking */}
        {status === 'talking' && (
          <>
            <div className="absolute -inset-4 rounded-full bg-amber-500/20 animate-ping opacity-60" />
            <div className="absolute -inset-8 rounded-full border border-amber-500/30 animate-pulse-ring" />
          </>
        )}

        {/* Listening wave ring */}
        {status === 'listening' && (
          <div className="absolute -inset-4 rounded-full bg-emerald-500/25 animate-ping opacity-75" />
        )}

        {/* Thinking wave ring */}
        {status === 'thinking' && (
          <div className="absolute -inset-3 rounded-full bg-purple-500/20 animate-spin opacity-50 duration-3000" />
        )}

        {/* Avatar Circle */}
        <div
          className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center bg-gradient-to-br ${persona.color} p-1 shadow-2xl shadow-amber-500/20 transition-all duration-300 transform ${
            status === 'talking' ? 'scale-105 ring-4 ring-amber-400/50' : 'hover:scale-105'
          }`}
        >
          {/* Inner Avatar face container */}
          <div className="w-full h-full rounded-full bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden border border-white/10">
            {/* Expressive Face Elements */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Eyes */}
              <div className="flex items-center gap-3 sm:gap-4 mb-2">
                {status === 'thinking' ? (
                  // Looking up thoughtfully
                  <>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 translate-y-[-2px] transition-transform" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 translate-y-[-2px] transition-transform" />
                  </>
                ) : status === 'listening' ? (
                  // Focused wide eyes
                  <>
                    <div className="w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-emerald-300/40" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-emerald-300/40" />
                  </>
                ) : status === 'talking' ? (
                  // Expressive lively eyes
                  <>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-bounce" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-bounce delay-75" />
                  </>
                ) : (
                  // Friendly smiling eyes (blinking periodically)
                  <>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                  </>
                )}
              </div>

              {/* Mouth */}
              {status === 'talking' ? (
                // Moving mouth animation
                <div className="w-4 h-3 rounded-full bg-amber-400/90 animate-pulse scale-y-125 border border-amber-300" />
              ) : status === 'thinking' ? (
                // Curious small line
                <div className="w-3 h-0.5 rounded-full bg-amber-300/70 translate-x-0.5" />
              ) : status === 'listening' ? (
                // Gentle open smile
                <div className="w-4 h-1.5 rounded-b-full border-b-2 border-emerald-400" />
              ) : (
                // Warm friendly grin
                <div className="w-4 h-2 rounded-b-full border-b-2 border-amber-400" />
              )}
            </div>

            {/* Persona Emoji Badge in bottom corner */}
            <div className="absolute bottom-0 right-1 text-sm sm:text-base drop-shadow-md">
              {persona.avatarEmoji}
            </div>

            {/* Subtle background light reflection */}
            <div className="absolute -top-6 -right-6 w-14 h-14 bg-white/10 rounded-full blur-sm pointer-events-none" />
          </div>
        </div>

        {/* Audio Stop Button Overlay when audio is active */}
        {isPlayingAudio && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStopAudio();
            }}
            title="إيقاف الصوت"
            className="absolute -bottom-1 -left-1 p-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/40 transition-transform active:scale-90 z-20 flex items-center justify-center"
          >
            <VolumeX className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Voice Visualizer Equalizer Waves when speaking */}
      {status === 'talking' && (
        <div className="flex items-center gap-1 mt-2.5 h-6">
          <span className="w-1 bg-amber-400 rounded-full wave-bar-1" />
          <span className="w-1 bg-amber-400 rounded-full wave-bar-2" />
          <span className="w-1 bg-amber-300 rounded-full wave-bar-3" />
          <span className="w-1 bg-amber-400 rounded-full wave-bar-4" />
          <span className="w-1 bg-amber-500 rounded-full wave-bar-5" />
        </div>
      )}

      {/* Character Name & Interactive Status Badge */}
      <div className="flex flex-col items-center mt-2 text-center">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-sm sm:text-base text-slate-100 flex items-center gap-1">
            {persona.name}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
            {persona.badge}
          </span>
        </div>

        {/* Status text pill */}
        <div
          className={`mt-1 text-xs px-2.5 py-0.5 rounded-full border transition-all flex items-center gap-1.5 ${getStatusBadge()}`}
        >
          {status === 'listening' && <Mic className="w-3 h-3 animate-pulse text-emerald-400" />}
          {status === 'thinking' && <BrainCircuit className="w-3 h-3 animate-spin text-purple-400" />}
          {status === 'talking' && <Volume2 className="w-3 h-3 animate-pulse text-amber-400" />}
          {status === 'idle' && <Sparkles className="w-3 h-3 text-amber-400" />}
          <span>{getStatusText()}</span>
        </div>
      </div>
    </div>
  );
};
