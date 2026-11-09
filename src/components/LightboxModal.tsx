import React from 'react';
import { X } from 'lucide-react';

interface LightboxModalProps {
  imageUrl: string | null;
  caption: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ imageUrl, caption, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[90vh] bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-hidden flex items-center justify-center bg-black">
          <img
            src={imageUrl}
            alt={caption}
            className="max-h-[80vh] w-auto object-contain"
          />
        </div>

        {caption && (
          <div className="p-4 bg-stone-900 text-white text-center text-xs font-medium border-t border-white/10">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};
