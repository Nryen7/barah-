import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Sparkles, Send, X, User, RefreshCw, Feather, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../types/barah';

interface AiGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AiGuideDrawer: React.FC<AiGuideDrawerProps> = ({ isOpen, onClose, lang }) => {
  const isAr = lang === 'ar';

  const defaultSuggestions = useMemo(() => isAr
    ? [
        'شنو فكرة بَراح؟',
        'وين موقع المشروع؟',
        'شنو المحطات الأربع؟',
        'شنو الفعاليات المقترحة؟',
        'شنو أقدر أشتري من ذكرى بَراح؟',
        'شلون أخطط لزيارتي؟',
        'هل بَراح مفتوح حاليًا؟',
      ]
    : [
        'What is the concept of BARAH?',
        'Where is the project located?',
        'What are the four stations?',
        'What are the proposed events?',
        'What can I buy from BARAH Keepsakes?',
        'How do I plan my visit?',
        'Is BARAH currently open?',
      ],
  [isAr]);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: isAr
        ? 'يا هلا والله ومسهلا بك في وادي البحير! 🌿 أنا «مرشد بَراح الذكي»، رفيقك للإجابة عن هوية بَراح وفلسفته، والمحطات الأربع، والموقع البيئي، والفعاليات المقترحة، والمقتنيات التذكارية، وخطة الزيارة. تفضل يا غالي، شنو تحب تسألني عنه؟'
        : 'Welcome to Wadi Al Buhair! 🌿 I am the BARAH Smart Guide. I am here to assist you with our identity, the 4 stations, location details, proposed events, keepsakes, and visit planning. What would you like to explore today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(defaultSuggestions);
  const [voiceActive, setVoiceActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  // Speak reply using Web Speech or audio
  const speakText = (text: string) => {
    if (!voiceActive) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text.replace(/[*#_~`]/g, ''));
        utterance.lang = isAr ? 'ar-SA' : 'en-US';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Audio fallback silent
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.slice(-6),
          persona: 'barah_guide',
          dialect: isAr ? 'bahraini' : 'english',
        }),
      });

      const data = await res.json();
      const reply = data.text || (isAr ? 'يا هلا بك في بَراح! سعيد بالتواصل معك.' : 'Welcome to BARAH! Great to connect with you.');
      
      setMessages((prev) => [...prev, { role: 'model', text: reply }]);
      
      if (data.suggestions && Array.isArray(data.suggestions) && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
      } else {
        setSuggestions(defaultSuggestions);
      }

      if (voiceActive) {
        speakText(reply);
      }
    } catch {
      const fallbackReply = isAr
        ? 'يا مرحب بك في «بَراح» بوادي البحير 🌿. أنا مرشدك البيئي الذكي لمساعدتك في التعرّف على المحطات الأربع، والموقع الجيولوجي، والفعاليات المقترحة، والمقتنيات التذكارية، وخطة الزيارة.'
        : 'Welcome to BARAH at Wadi Al Buhair 🌿. I am your Smart Eco-Guide to help you discover our 4 stations, geological landscape, proposed events, keepsakes, and visit planner.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: fallbackReply,
        },
      ]);
      setSuggestions(defaultSuggestions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FFFCF7] border-s border-[#D8CEBD] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#515638] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#CCB798] text-[#2C3224] flex items-center justify-center shadow-inner">
                <Sparkles className="w-5 h-5 text-[#2C3224]" />
              </div>
              <div>
                <h3 className="font-serif-ar font-bold text-lg leading-tight text-white">
                  {isAr ? 'مرشد بَراح الذكي' : 'BARAH Smart Guide'}
                </h3>
                <span className="text-[11px] text-[#E0D3BE] flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {isAr ? 'متفاعل معك 24/7 لأي سالفة واستفسار' : 'Live companion & eco-guide'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setVoiceActive(!voiceActive)}
                className={`p-2 rounded-xl border transition-colors ${
                  voiceActive
                    ? 'bg-[#CCB798] text-[#2C3224] border-[#CCB798]'
                    : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                }`}
                title={voiceActive ? (isAr ? 'كتم الصوت' : 'Mute Voice') : (isAr ? 'تفعيل النطق الصوتي' : 'Enable Voice')}
              >
                {voiceActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3.5 bg-[#FAF7F0]/60">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-[#515638] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Feather className="w-4 h-4 text-[#CCB798]" />
                  </div>
                )}
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm max-w-[85%] leading-relaxed shadow-xs whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#515638] text-white rounded-br-none font-medium'
                      : 'bg-white text-[#2C3224] border border-[#D8CEBD] rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#CCB798] text-[#2C3224] flex items-center justify-center shrink-0 mt-1 font-bold text-xs shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-[#D8CEBD] text-xs text-[#515638] max-w-[75%] shadow-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8D7255]" />
                <span className="font-medium">{isAr ? 'المرشد يكتب لك رداً...' : 'BARAH Guide is typing...'}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Interactive Quick Suggestions */}
          <div className="p-3 bg-[#F2ECE1] border-t border-[#D8CEBD] flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-[#8D7255] uppercase tracking-wider shrink-0 px-1">
              {isAr ? 'اقتراحات:' : 'Suggestions:'}
            </span>
            {suggestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#D8CEBD] hover:border-[#515638] hover:bg-[#515638] hover:text-white text-[11px] text-[#4A533E] whitespace-nowrap transition-all shadow-2xs font-medium active:scale-95"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3.5 sm:p-4 bg-[#FFFCF7] border-t border-[#D8CEBD] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isAr ? 'اكتب أي سالفة، شحالك، أو استفسار عن المكان...' : 'Type anything, say hi, or ask about the valley...'}
              className="flex-1 px-4 py-3 rounded-xl border border-[#D8CEBD] bg-white text-xs sm:text-sm focus:outline-none focus:border-[#515638] focus:ring-1 focus:ring-[#515638] text-[#2C3224] placeholder:text-[#57604F]/60"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-3 rounded-xl bg-[#515638] hover:bg-[#3C4229] disabled:opacity-40 text-white transition-all shadow-md active:scale-95 shrink-0"
              title={isAr ? 'إرسال' : 'Send'}
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
