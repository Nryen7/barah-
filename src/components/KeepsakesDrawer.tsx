import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, Printer, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Language, CartItem } from '../types/barah';

interface KeepsakesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const KeepsakesDrawer: React.FC<KeepsakesDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.priceBhd * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFCF7] border-s border-[#D8CEBD] shadow-2xl flex flex-col justify-between animate-slideLeft">
          {/* Drawer Header */}
          <div className="p-6 bg-[#515638] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#CCB798]" />
              <div>
                <h3 className="font-serif-ar font-bold text-lg leading-tight">
                  {isAr ? 'حقيبة مقتنيات ذكرى بَراح' : 'Keepsakes Quotation Bag'}
                </h3>
                <span className="text-[11px] text-[#E0D3BE]">
                  {isAr
                    ? `${items.length} مقتنيات تذكارية مختارة`
                    : `${items.length} keepsakes selected`}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#57604F]">
                <div className="w-16 h-16 rounded-2xl bg-[#E3D8C6]/60 text-[#515638] flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif-ar text-xl font-bold text-[#2C3224] mb-1">
                  {isAr ? 'الحقيبة فارغة حالياً' : 'Your Keepsakes Bag is Empty'}
                </h4>
                <p className="text-xs max-w-xs leading-relaxed mb-6">
                  {isAr
                    ? 'استكشف كتالوج مقتنيات بَراح الـ ٢٧ واختر الهدايا والتذكارات المستدامة التي تنال إعجابك.'
                    : 'Explore the 27 curated keepsakes from Wadi Al Buhair and add items to your demonstration bag.'}
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-[#515638] text-white text-xs font-bold hover:bg-[#3C4229] transition-colors"
                >
                  {isAr ? 'تصفح المقتنيات الـ ٢٧' : 'Browse All 27 Keepsakes'}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-2xl border border-[#D8CEBD] bg-[#F8F5EF] flex items-center gap-3.5"
                >
                  <img
                    src={item.product.image}
                    alt={isAr ? item.product.nameAr : item.product.nameEn}
                    className="w-16 h-16 rounded-xl object-cover border border-[#D8CEBD] bg-white shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-[#2C3224] truncate">
                      {isAr ? item.product.nameAr : item.product.nameEn}
                    </h4>
                    <span className="text-[10px] text-[#8D7255] block">
                      {isAr ? item.product.categoryAr : item.product.categoryEn}
                    </span>
                    <span className="font-bold text-xs text-[#515638] mt-1 block">
                      {(item.product.priceBhd * item.quantity).toFixed(3)} {isAr ? 'د.ب' : 'BHD'}
                    </span>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      title={isAr ? 'إزالة' : 'Remove'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1 bg-white border border-[#D8CEBD] rounded-lg p-0.5">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-1 text-stone-500 hover:text-[#515638]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-1 text-stone-500 hover:text-[#515638]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-[#F8F5EF] border-t border-[#D8CEBD] space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#57604F] font-semibold">
                  {isAr ? 'الإجمالي التقديري للمقتنيات:' : 'Estimated Keepsakes Subtotal:'}
                </span>
                <span className="font-serif-ar text-xl font-bold text-[#515638]">
                  {subtotal.toFixed(3)} {isAr ? 'د.ب' : 'BHD'}
                </span>
              </div>

              <div className="text-[11px] text-[#626B5E] p-2.5 rounded-xl bg-white border border-[#D8CEBD]">
                {isAr
                  ? 'يمكنكم اقتناء هذه المقتنيات مباشرة عند زيارتكم لمتجر مركز زوار وادي البحير.'
                  : 'These keepsakes can be purchased directly during your visit to the Wadi Al Buhair visitor centre.'}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#515638] hover:bg-[#3C4229] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isAr ? 'طباعة بيان المقتنيات' : 'Print Keepsakes Quote'}</span>
                </button>
                <button
                  onClick={onClearCart}
                  className="px-4 py-3 rounded-xl border border-[#D8CEBD] text-[#626B5E] hover:text-red-600 text-xs font-semibold"
                >
                  {isAr ? 'إفراغ' : 'Clear'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
