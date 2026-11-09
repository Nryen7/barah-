import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageItemProps {
  message: Message;
  isPlayingThis: boolean;
  onPlayAudio: (msg: Message) => void;
  onStopAudio: () => void;
  onSuggestionClick: (suggestion: string) => void;
  onReact: (messageId: string, reaction: 'like' | 'dislike') => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  isPlayingThis,
  onPlayAudio,
  onStopAudio,
  onSuggestionClick,
  onReact,
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col w-full my-2.5 ${isUser ? 'items-start' : 'items-end'}`}>
      <div
        className={`relative max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-sm sm:text-base leading-relaxed transition-all shadow-md ${
          isUser
            ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-br-none ml-auto'
            : 'bg-slate-900/90 border border-slate-800 text-slate-100 rounded-bl-none mr-auto backdrop-blur-sm'
        }`}
      >
        {/* Header label for Model */}
        {!isUser && (
          <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-slate-800/80 text-xs text-amber-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <span>☕ ولد</span>
              <span className="text-[10px] text-slate-400 font-normal">خويك الرايق</span>
            </span>
            <span className="text-[11px] text-slate-500 font-normal">{message.timestamp}</span>
          </div>
        )}

        {/* User timestamp */}
        {isUser && (
          <div className="flex justify-end text-[11px] text-amber-200/80 mb-1">
            <span>{message.timestamp}</span>
          </div>
        )}

        {/* Message Content */}
        <div className="whitespace-pre-wrap break-words dir-rtl font-normal">
          {message.text}
        </div>

        {/* Action Toolbar on Model Messages */}
        {!isUser && (
          <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-800/80 text-xs text-slate-400">
            {/* Audio Voice Player */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => (isPlayingThis ? onStopAudio() : onPlayAudio(message))}
                disabled={message.isAudioLoading}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  isPlayingThis
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60'
                }`}
              >
                {message.isAudioLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                    <span>جاري التجهيز...</span>
                  </>
                ) : isPlayingThis ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>إيقاف الصوت</span>
                    <span className="flex items-center gap-0.5 ml-1">
                      <span className="w-1 h-2 bg-slate-950 rounded-full animate-bounce" />
                      <span className="w-1 h-3 bg-slate-950 rounded-full animate-bounce delay-100" />
                    </span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>اسمع الصوت 🔊</span>
                  </>
                )}
              </button>
            </div>

            {/* Reactions & Copy */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onReact(message.id, 'like')}
                className={`p-1.5 rounded-md hover:bg-slate-800 transition-colors ${
                  message.reaction === 'like' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="أعجبني الرد"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onReact(message.id, 'dislike')}
                className={`p-1.5 rounded-md hover:bg-slate-800 transition-colors ${
                  message.reaction === 'dislike' ? 'text-red-400 bg-red-500/10' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="لم يعجبني"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                title="نسخ النص"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Follow-up chips for model messages */}
      {!isUser && message.suggestions && message.suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2 mr-1 max-w-[85%] justify-start">
          {message.suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => onSuggestionClick(suggestion)}
              className="text-xs bg-slate-900/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 rounded-full px-3 py-1 transition-all flex items-center gap-1 active:scale-95"
            >
              <span>💬</span>
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
