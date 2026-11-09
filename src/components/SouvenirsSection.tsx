import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Eye, X, Check, Sparkles, Filter, Info } from 'lucide-react';
import { Language, Product } from '../types/barah';
import { PRODUCTS } from '../data/barahData';

interface SouvenirsSectionProps {
  lang: Language;
  onAddToCart: (product: Product) => void;
  onOpenBag: () => void;
  cartProductIds: string[];
}

export const SouvenirsSection: React.FC<SouvenirsSectionProps> = ({
  lang,
  onAddToCart,
  onOpenBag,
  cartProductIds,
}) => {
  const isAr = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = useMemo(() => [
    { key: 'all', labelAr: 'جميع المنتجات', labelEn: 'All products' },
    { key: 'drinkware', labelAr: 'أكواب ومستلزمات', labelEn: 'Drinkware' },
    { key: 'lifestyle', labelAr: 'مقتنيات يومية', labelEn: 'Everyday essentials' },
    { key: 'stationery', labelAr: 'قرطاسية', labelEn: 'Stationery' },
    { key: 'prints', labelAr: 'مطبوعات وتذكارات', labelEn: 'Prints & keepsakes' },
    { key: 'keepsakes', labelAr: 'تذكارات بَراح', labelEn: 'BARAH Souvenirs' },
    { key: 'birding', labelAr: 'الطيور والاستكشاف', labelEn: 'Birdwatching & exploration' },
    { key: 'gifts', labelAr: 'علب الهدايا', labelEn: 'Gift boxes' },
  ], []);

  const getCategoryCount = (key: string) => {
    if (key === 'all') return PRODUCTS.length;
    return PRODUCTS.filter((p) => p.categoryKey.toLowerCase() === key.toLowerCase()).length;
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      const matchesCat =
        selectedCategory === 'all' ||
        p.categoryKey.toLowerCase() === selectedCategory.toLowerCase();

      // Search filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.nameAr.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.descAr.toLowerCase().includes(q) ||
        p.descEn.toLowerCase().includes(q) ||
        p.categoryAr.toLowerCase().includes(q) ||
        p.categoryEn.toLowerCase().includes(q) ||
        p.detailsAr.toLowerCase().includes(q) ||
        p.detailsEn.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="souvenirs" className="py-20 sm:py-28 bg-[#F8F5EF] text-[#2C3224]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3D8C6] text-[#515638] text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#515638]" />
            <span>{isAr ? 'ذكرى بَراح · المتجر المستدام' : 'BARAH Keepsakes & Design Store'}</span>
          </div>

          <h2 className="font-serif-ar text-3xl sm:text-5xl font-bold text-[#2C3224] leading-tight mb-4">
            {isAr ? (
              <>
                حكاية <span className="text-[#8D7255] italic">ترافقك.</span>
              </>
            ) : (
              <>
                A Story That <span className="text-[#8D7255] italic">Stays With You.</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[#57604F] font-light leading-relaxed mb-4">
            {isAr
              ? 'مجموعة متكاملة من ٢٧ منتجاً ومقتنى تذكارياً صُممت كجزء أصيل من تجربة مركز الزوار، مستوحاة من ألوان صخور وادي البحير وطيوره وطبيعته الخلابة.'
              : 'A curated collection of 27 conceptual keepsakes designed for the arrival centre, celebrating the earthy contours, wildlife, and flora of Wadi Al Buhair.'}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E3D8C6]/50 border border-[#D8CEBD] text-xs text-[#57604F]">
            <Info className="w-4 h-4 text-[#8D7255]" />
            <span>
              {isAr
                ? 'مقتنيات ذكرى بَراح متاحة حصرياً داخل متجر مركز الزوار في وادي البحير.'
                : 'BARAH Keepsakes are available exclusively inside the visitor centre boutique.'}
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mb-10 space-y-4">
          {/* Search Input & Cart Quick Status */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isAr
                    ? 'ابحث في المقتنيات (كوب، تيشيرت، دفتر، بطاقات الطيور...)'
                    : 'Search keepsakes (mug, shirt, journal, bird cards...)'
                }
                className="w-full pl-4 pr-10 py-3 rounded-2xl bg-white border border-[#D8CEBD] text-sm focus:outline-none focus:border-[#515638] shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={onOpenBag}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#515638] hover:bg-[#3C4229] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#CCB798]" />
              <span>{isAr ? 'حقيبة الاقتناء التقديرية' : 'View Keepsakes Bag'}</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[11px]">
                {cartProductIds.length}
              </span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#515638] text-white shadow-sm'
                      : 'bg-white border border-[#D8CEBD] text-[#4A533E] hover:border-[#515638] hover:bg-[#F8F5EF]'
                  }`}
                >
                  <span>{isAr ? cat.labelAr : cat.labelEn}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#E3D8C6]/60 text-[#515638]'
                    }`}
                  >
                    {getCategoryCount(cat.key)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid (27 items) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#D8CEBD]">
            <p className="text-sm text-[#57604F] mb-2">
              {isAr ? 'لم يتم العثور على مقتنيات مطابقة للبحث' : 'No keepsakes matched your search'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-[#515638] font-bold underline"
            >
              {isAr ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const inBag = cartProductIds.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="rounded-3xl bg-[#FFFCF7] border border-[#D8CEBD] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  {/* Photo area */}
                  <div
                    onClick={() => setActiveModalProduct(prod)}
                    className="relative aspect-4/3 overflow-hidden bg-[#E3D8C6]/40 cursor-pointer"
                  >
                    <img
                      src={prod.image}
                      alt={isAr ? prod.nameAr : prod.nameEn}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-[#515638] backdrop-blur-xs shadow-xs">
                        {String(prod.num).padStart(2, '0')} / 27
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalProduct(prod);
                      }}
                      className="absolute bottom-3 left-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                      title={isAr ? 'معاينة سريعة' : 'Quick View'}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-[#8D7255] mb-1">
                        {isAr ? prod.categoryAr : prod.categoryEn}
                      </div>

                      <h3
                        onClick={() => setActiveModalProduct(prod)}
                        className="font-bold text-[#2C3224] text-base mb-1.5 cursor-pointer hover:text-[#515638] transition-colors leading-snug line-clamp-1"
                      >
                        {isAr ? prod.nameAr : prod.nameEn}
                      </h3>

                      <p className="text-xs text-[#57604F] line-clamp-2 leading-relaxed mb-4">
                        {isAr ? prod.descAr : prod.descEn}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-3 border-t border-[#D8CEBD]/60 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] text-[#626B5E]">
                          {isAr ? 'سعر تقديري' : 'Concept Price'}
                        </div>
                        <div className="font-bold text-sm text-[#515638]">
                          {prod.priceBhd.toFixed(3)} {isAr ? 'د.ب' : 'BHD'}
                        </div>
                      </div>

                      <button
                        onClick={() => onAddToCart(prod)}
                        className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                          inBag
                            ? 'bg-[#515638] text-white shadow-xs'
                            : 'bg-[#E3D8C6]/70 hover:bg-[#515638] text-[#515638] hover:text-white'
                        }`}
                        title={isAr ? 'إضافة إلى الحقيبة' : 'Add to Bag'}
                      >
                        {inBag ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-[11px]">{isAr ? 'مضاف' : 'Added'}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span className="text-[11px]">{isAr ? 'اقتناء' : 'Add'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFFCF7] border border-[#D8CEBD] rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-scaleUp">
            <div className="relative aspect-16/10 bg-[#E3D8C6]/50">
              <img
                src={activeModalProduct.image}
                alt={isAr ? activeModalProduct.nameAr : activeModalProduct.nameEn}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-mono">
                {String(activeModalProduct.num).padStart(2, '0')} / 27
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#8D7255] tracking-wider">
                  {isAr ? activeModalProduct.categoryAr : activeModalProduct.categoryEn}
                </span>
                <h3 className="font-serif-ar text-2xl font-bold text-[#2C3224] mt-1">
                  {isAr ? activeModalProduct.nameAr : activeModalProduct.nameEn}
                </h3>
              </div>

              <p className="text-sm text-[#57604F] leading-relaxed">
                {isAr ? activeModalProduct.descAr : activeModalProduct.descEn}
              </p>

              {activeModalProduct.detailsAr && (
                <div className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#D8CEBD]/60 text-xs text-[#2C3224]">
                  <strong className="block text-[#515638] mb-1">
                    {isAr ? 'مواصفات ومحتويات المقتنى:' : 'Specifications & Inclusions:'}
                  </strong>
                  <span>
                    {isAr ? activeModalProduct.detailsAr : activeModalProduct.detailsEn}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[#D8CEBD]">
                <div>
                  <div className="text-xs text-[#626B5E]">
                    {isAr ? 'القيمة التقديرية المقترحة' : 'Concept Estimated Price'}
                  </div>
                  <div className="font-serif-ar text-xl font-bold text-[#515638]">
                    {activeModalProduct.priceBhd.toFixed(3)} {isAr ? 'د.ب' : 'BHD'}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(activeModalProduct);
                      setActiveModalProduct(null);
                    }}
                    className="py-2.5 px-5 rounded-xl bg-[#515638] hover:bg-[#3C4229] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isAr ? 'أضف للحقيبة' : 'Add to Bag'}</span>
                  </button>
                  <button
                    onClick={() => setActiveModalProduct(null)}
                    className="py-2.5 px-4 rounded-xl border border-[#D8CEBD] text-[#626B5E] text-xs font-semibold"
                  >
                    {isAr ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
