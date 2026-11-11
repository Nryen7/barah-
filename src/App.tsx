import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Hero } from './components/Hero';
import { HomeHub } from './components/HomeHub';
import { PageHero } from './components/PageHero';
import { AboutSection } from './components/AboutSection';
import { StationsSection } from './components/StationsSection';
import { EventsSection } from './components/EventsSection';
import { ServicesSection } from './components/ServicesSection';
import { SouvenirsSection } from './components/SouvenirsSection';
import { VisitPlannerSection } from './components/VisitPlannerSection';
import { KeepsakesDrawer } from './components/KeepsakesDrawer';
import { VideoModal } from './components/VideoModal';
import { LightboxModal } from './components/LightboxModal';
import { AiGuideDrawer } from './components/AiGuideDrawer';
import { Footer } from './components/Footer';
import { Language, CartItem, Product } from './types/barah';
import { soundscape } from './utils/soundscape';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Language State
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('barah_lang') as Language) || 'ar';
  });

  // Active Multi-Page View
  const [activePage, setActivePage] = useState<string>('home');

  // Modals & Drawers
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAiGuideOpen, setIsAiGuideOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxCaption, setLightboxCaption] = useState<string>('');

  // Nature Soundscape
  const [soundPlaying, setSoundPlaying] = useState(false);

  // Keepsakes Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('barah_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Sync Language and Direction
  useEffect(() => {
    localStorage.setItem('barah_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar'
        ? 'براح | BARAH — للأرض حكاية'
        : 'BARAH | Wadi Al Buhair — Every Land Has a Story';
  }, [lang]);

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('barah_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const toggleSound = () => {
    const isNowPlaying = soundscape.toggle();
    setSoundPlaying(isNowPlaying);
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenLightbox = (url: string, caption: string) => {
    setLightboxImage(url);
    setLightboxCaption(caption);
  };

  const handleNavigatePage = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#303528] flex flex-col font-['IBM_Plex_Sans_Arabic',sans-serif]">
      {/* Top Navbar Matching Screenshot */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        activePage={activePage}
        onSelectPage={handleNavigatePage}
        onOpenBag={() => setIsBagOpen(true)}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        soundPlaying={soundPlaying}
        onToggleSound={toggleSound}
      />

      {/* Multi-Page Views (كل قسم في صفحة مستقلة) */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* VIEW 1: HOME PAGE */}
        {activePage === 'home' && (
          <div>
            <Hero
              lang={lang}
              onExploreStations={() => handleNavigatePage('stations')}
              onPlanVisit={() => handleNavigatePage('visit')}
              onPlayFilm={() => setIsVideoOpen(true)}
            />
            <HomeHub
              lang={lang}
              onNavigate={handleNavigatePage}
            />
          </div>
        )}

        {/* VIEW 2: ABOUT PAGE */}
        {activePage === 'about' && (
          <div>
            <PageHero
              lang={lang}
              eyebrowAr="عن بَراح والموقع"
              eyebrowEn="About & Location"
              titleAr="فكرة تنبع من المكان."
              titleEn="An Idea Born from the Landscape."
              descriptionAr="استكشف التكوينات الجيولوجية النادرة في وادي البحير، وفلسفة التصميم المعماري البيئي القائم على التدخل الخفيف وحماية الطبيعة."
              descriptionEn="Explore the rare limestone geological formations of Wadi Al Buhair, and our architectural commitment to minimal impact and maximum stewardship."
              image="/assets/wadi-lake.webp"
              onBackToHome={() => handleNavigatePage('home')}
            />
            <AboutSection
              lang={lang}
              onExploreStations={() => handleNavigatePage('stations')}
            />
          </div>
        )}

        {/* VIEW 3: STATIONS PAGE */}
        {activePage === 'stations' && (
          <div>
            <StationsSection
              lang={lang}
              onNavigatePage={handleNavigatePage}
              onOpenLightbox={handleOpenLightbox}
            />
          </div>
        )}

        {/* VIEW 4: EVENTS PAGE */}
        {activePage === 'events' && (
          <div>
            <PageHero
              lang={lang}
              eyebrowAr="الفعاليات والمناسبات"
              eyebrowEn="Events & Programmes"
              titleAr="تجارب تترك أثراً."
              titleEn="Experiences that Leave a Mark."
              descriptionAr="برنامج سنوي متكامل من المبادرات البيئية: غرس الشتلات الفطرية في «أثرك في بَراح»، ليالي الشتاء تحت النجوم، ورصد الطيور مع شروق الشمس."
              descriptionEn="Year-round environmental participation, from native tree planting and winter firesides to dawn birdwatching and photography workshops."
              image="/assets/concept-evening.webp"
              onBackToHome={() => handleNavigatePage('home')}
            />
            <EventsSection
              lang={lang}
              onOpenPlan={() => handleNavigatePage('visit')}
            />
          </div>
        )}

        {/* VIEW 5: SERVICES & EXPERIENCES PAGE */}
        {activePage === 'services' && (
          <div>
            <PageHero
              lang={lang}
              eyebrowAr="الخدمات والتجارب"
              eyebrowEn="Experiences & Services"
              titleAr="لكل زيارة تجربتها."
              titleEn="At Your Pace. Find Your Story."
              descriptionAr="خدمات متكاملة تلبي رغبات الباحثين عن الهدوء والمشي، وعشاق رصد الطيور، والرحلات المدرسية، بالإضافة لفرص الشراكات المؤسسية."
              descriptionEn="Tailored experiences catering to quiet walks, nature photography, school field visits, private groups, and corporate partnerships."
              image="/assets/concept-visitor.webp"
              onBackToHome={() => handleNavigatePage('home')}
            />
            <ServicesSection
              lang={lang}
              onPlanExperience={() => handleNavigatePage('visit')}
            />
          </div>
        )}

        {/* VIEW 6: SOUVENIRS / KEEPSAKES STORE PAGE */}
        {activePage === 'souvenirs' && (
          <div>
            <PageHero
              lang={lang}
              eyebrowAr="ذكرى بَراح"
              eyebrowEn="BARAH Keepsakes"
              titleAr="حكاية ترافقك."
              titleEn="A Story that Stays with You."
              descriptionAr="مجموعة حصرية من ٢٧ مقتنى تذكارياً صُممت لتجسيد ألوان وادي البحير وتضاريسه وتنوعه الأحيائي باستخدام مواد مستدامة وصديقة للبيئة."
              descriptionEn="An exclusive collection of 27 sustainable keepsakes designed to echo the contours, birdlife, and earthy tones of Wadi Al Buhair."
              image="/assets/product-19-premium-gift-box.webp"
              onBackToHome={() => handleNavigatePage('home')}
            />
            <SouvenirsSection
              lang={lang}
              onAddToCart={handleAddToCart}
              onOpenBag={() => setIsBagOpen(true)}
              cartProductIds={cart.map((item) => item.product.id)}
            />
          </div>
        )}

        {/* VIEW 7: VISIT PLANNER & SURVEY PAGE */}
        {activePage === 'visit' && (
          <div>
            <PageHero
              lang={lang}
              eyebrowAr="خطط لزيارتك"
              eyebrowEn="Plan Your Visit"
              titleAr="تخيّل زيارتك لبَراح."
              titleEn="Envision Your Journey."
              descriptionAr="خصص مسار زيارتك الافتراضي، واستخرج تصريح الزيارة الرسمي برمز QR، وشاركنا رأيك في استبيان تجربة الزوار."
              descriptionEn="Design your custom itinerary, generate your verified digital pass with QR code, and provide valuable visitor feedback."
              image="/assets/concept-path.webp"
              onBackToHome={() => handleNavigatePage('home')}
            />
            <VisitPlannerSection lang={lang} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onSelectTab={handleNavigatePage}
      />

      {/* Mobile Fixed Bottom Navigation Bar Matching User Screenshots */}
      <BottomNav
        activePage={activePage}
        onSelectPage={handleNavigatePage}
        lang={lang}
      />

      {/* Floating Action Button for AI Eco-Guide */}
      <div className="fixed bottom-20 md:bottom-6 left-5 z-30 flex flex-col items-start gap-2">
        <button
          onClick={() => setIsAiGuideOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#515638] hover:bg-[#3C4229] text-white font-bold text-xs shadow-xl shadow-black/25 border border-[#CCB798]/40 transition-all hover:scale-105 active:scale-95 group"
          title={lang === 'ar' ? 'اسأل مرشد بَراح البيئي' : 'Ask BARAH Eco-Guide'}
        >
          <div className="w-5 h-5 rounded-full bg-[#CCB798] text-[#2C3224] flex items-center justify-center shrink-0">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="hidden sm:inline">
            {lang === 'ar' ? 'مرشد بَراح البيئي' : 'BARAH Eco-Guide'}
          </span>
        </button>
      </div>

      {/* Drawers & Modals */}
      <KeepsakesDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        lang={lang}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        lang={lang}
      />

      <LightboxModal
        imageUrl={lightboxImage}
        caption={lightboxCaption}
        onClose={() => setLightboxImage(null)}
      />

      <AiGuideDrawer
        isOpen={isAiGuideOpen}
        onClose={() => setIsAiGuideOpen(false)}
        lang={lang}
      />
    </div>
  );
}
