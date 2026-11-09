import React from 'react';
import { X, Sparkles, Laugh, Shuffle, Heart, HelpCircle, Compass, BookOpen, Smile } from 'lucide-react';
import { CONVERSATION_TOPICS } from '../data/personas';
import { ConversationTopic } from '../types';

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topic: ConversationTopic) => void;
}

export const TopicModal: React.FC<TopicModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic,
}) => {
  if (!isOpen) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laugh':
        return <Laugh className="w-5 h-5 text-amber-400" />;
      case 'Shuffle':
        return <Shuffle className="w-5 h-5 text-indigo-400" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'HelpCircle':
        return <HelpCircle className="w-5 h-5 text-cyan-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-emerald-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-yellow-400" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-amber-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-100">وش نسولف فيه اليوم؟</h3>
              <p className="text-xs text-slate-400">اختر موضوع أو لعبة تفتح النفس</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {CONVERSATION_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                onSelectTopic(topic);
                onClose();
              }}
              className="flex flex-col text-right p-3.5 rounded-2xl bg-slate-800/50 hover:bg-amber-500/10 border border-slate-700/60 hover:border-amber-500/40 transition-all group active:scale-[0.98]"
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="p-2 rounded-xl bg-slate-800 group-hover:bg-amber-500/20 transition-colors">
                  {getIcon(topic.icon)}
                </div>
                {topic.badge && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-700/80 group-hover:bg-amber-500/20 text-amber-300 font-medium">
                    {topic.badge}
                  </span>
                )}
              </div>

              <div className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                {topic.title}
              </div>
              <div className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {topic.prompt}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
