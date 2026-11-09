import React from 'react';
import { Sparkles, Sliders, Volume2, VolumeX, MessageSquarePlus, Compass } from 'lucide-react';
import { Persona } from '../types';

interface HeaderProps {
  currentPersona: Persona;
  autoSpeak: boolean;
  onToggleAutoSpeak: () => void;
  onOpenTopics: () => void;
  onOpenSettings: () => void;
  onNewChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPersona,
  autoSpeak,
  onToggleAutoSpeak,
  onOpenTopics,
  onOpenSettings,
  onNewChat,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20">
              ☕
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg text-slate-100 tracking-tight">
                ولد كلمني
              </h1>
              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
                {currentPersona.name}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">رفيقك الذكي للسوالف والضحك</p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* New Chat */}
          <button
            onClick={onNewChat}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 text-xs"
            title="محادثة جديدة"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">جلسة جديدة</span>
          </button>

          {/* Topics Button */}
          <button
            onClick={onOpenTopics}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all flex items-center gap-1.5 text-xs font-semibold"
            title="أفكار سوالف وألعاب"
          >
            <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span className="hidden sm:inline">وش نسولف؟</span>
          </button>

          {/* Audio Auto-speak Toggle */}
          <button
            onClick={onToggleAutoSpeak}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1 ${
              autoSpeak
                ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={autoSpeak ? 'الصوت التلقائي مفعّل' : 'الصوت التلقائي معطّل'}
          >
            {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Settings Modal */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-xs"
            title="الإعدادات واللهجات"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
