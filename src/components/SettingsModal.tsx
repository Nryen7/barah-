import React from 'react';
import { X, Sliders, Volume2, Trash2, CheckCircle2 } from 'lucide-react';
import { PERSONAS, DIALECTS } from '../data/personas';
import { PersonaId, DialectId } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPersona: PersonaId;
  onSelectPersona: (id: PersonaId) => void;
  selectedDialect: DialectId;
  onSelectDialect: (id: DialectId) => void;
  autoSpeak: boolean;
  onToggleAutoSpeak: (val: boolean) => void;
  soundEnabled: boolean;
  onToggleSound: (val: boolean) => void;
  selectedVoice: string;
  onSelectVoice: (voice: string) => void;
  onClearHistory: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  selectedPersona,
  onSelectPersona,
  selectedDialect,
  onSelectDialect,
  autoSpeak,
  onToggleAutoSpeak,
  soundEnabled,
  onToggleSound,
  selectedVoice,
  onSelectVoice,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  const voices = [
    { id: 'Puck', name: 'صوت شبابي مرح وحيوي (Puck)', tag: 'موصى به للولد' },
    { id: 'Zephyr', name: 'صوت هادئ ولطيف (Zephyr)', tag: 'رايق' },
    { id: 'Fenrir', name: 'صوت عميق ورزين (Fenrir)', tag: 'حكيم' },
    { id: 'Kore', name: 'صوت نسائي دافئ (Kore)', tag: 'ناعم' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">إعدادات "ولد كلمني"</h3>
              <p className="text-xs text-slate-400">خصص شخصية رفيقك وصوته ولهجته</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 mt-4 text-right">
          {/* Persona Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              شخصية الخوي:
            </label>
            <div className="grid grid-cols-1 gap-2">
              {PERSONAS.map((persona) => {
                const isSelected = selectedPersona === persona.id;
                return (
                  <button
                    key={persona.id}
                    onClick={() => onSelectPersona(persona.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-right transition-all ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/50 text-slate-100'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{persona.avatarEmoji}</span>
                      <div>
                        <div className="font-bold text-sm flex items-center gap-2">
                          <span>{persona.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-amber-300">
                            {persona.badge}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{persona.tagline}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dialect Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              اللهجة المفضلة:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DIALECTS.map((dialect) => {
                const isSelected = selectedDialect === dialect.id;
                return (
                  <button
                    key={dialect.id}
                    onClick={() => onSelectDialect(dialect.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 font-bold'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xl mb-1">{dialect.flag}</span>
                    <span className="text-xs">{dialect.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audio Voice Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>نبرة الصوت (Gemini Flash Audio):</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {voices.map((v) => (
                <button
                  key={v.id}
                  onClick={() => onSelectVoice(v.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs text-right transition-all ${
                    selectedVoice === v.id
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                      : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <div>{v.name}</div>
                    <span className="text-[10px] text-slate-400">{v.tag}</span>
                  </div>
                  {selectedVoice === v.id && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            {/* Auto speak */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-200">التحدث بالصوت تلقائياً</div>
                <div className="text-xs text-slate-400">ينطق الرد بصوته مباشرة بمجرد وصوله</div>
              </div>
              <button
                onClick={() => onToggleAutoSpeak(!autoSpeak)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  autoSpeak ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    autoSpeak ? '-translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Sound FX */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-200">المؤثرات الصوتية</div>
                <div className="text-xs text-slate-400">نغمات خفيفة وممتعة عند الإرسال والاستلام</div>
              </div>
              <button
                onClick={() => onToggleSound(!soundEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  soundEnabled ? 'bg-amber-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    soundEnabled ? '-translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Clear Chat */}
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                if (window.confirm('هل أنت متأكد من مسح جميع المحادثات والبدء من جديد؟')) {
                  onClearHistory();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 hover:bg-red-900/50 transition-colors text-xs font-medium"
            >
              <Trash2 className="w-4 h-4" />
              <span>مسح المحادثة والبدء من جديد</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
