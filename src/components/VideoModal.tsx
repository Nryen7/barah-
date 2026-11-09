import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../types/barah';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, lang }) => {
  const isAr = lang === 'ar';
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-scaleUp">
        <div className="p-4 bg-stone-900/90 text-white flex items-center justify-between border-b border-white/10">
          <div className="font-serif-ar font-bold text-base">
            {isAr ? 'فيلم رحلة بَراح · وادي البحير' : 'BARAH Journey Film · Wadi Al Buhair'}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="aspect-16/9 bg-black flex items-center justify-center">
          <video
            controls
            autoPlay
            src="/assets/barah-journey-film.mp4"
            className="w-full h-full object-contain"
          >
            {isAr ? 'متصفحك لا يدعم تشغيل الفيديو.' : 'Your browser does not support the video tag.'}
          </video>
        </div>
      </div>
    </div>
  );
};
