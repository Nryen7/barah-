import { Component, lazy, Suspense, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { useReducedMotion, useScroll } from 'motion/react';
import type { Language } from '../types/barah';
import { models } from './models';

const Scene = lazy(() => import('./ExhibitionScene'));

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const control = 'rounded-xl border border-[#8D7255] px-3 py-2 text-sm font-semibold hover:bg-[#E3D8C6] aria-pressed:bg-[#515638] aria-pressed:text-white';

export default function BehindBarah({ lang }: { lang: Language }) {
  const isAr = lang === 'ar';
  const panel = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 81px', 'end end'] });
  const [index, setIndex] = useState(0);
  const [explosion, setExplosion] = useState(0);
  const [annotated, setAnnotated] = useState(true);
  const [guided, setGuided] = useState(false);
  const [reset, setReset] = useState(0);
  const [fullscreenError, setFullscreenError] = useState(false);
  const model = models[index];
  const scrollMode = guided && !reducedMotion;

  function select(next: number) {
    setIndex((next + models.length) % models.length);
    setExplosion(0);
  }

  function navigateByKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || !(event.target instanceof HTMLElement)) return;
    if (event.target.closest('input, select, textarea, [contenteditable]')) return;
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const forward = event.key === (isAr ? 'ArrowLeft' : 'ArrowRight');
    select(index + (forward ? 1 : -1));
  }

  async function fullscreen() {
    setFullscreenError(false);
    try {
      if (document.fullscreenElement === panel.current) {
        await document.exitFullscreen();
      } else {
        if (!panel.current?.requestFullscreen) throw new Error('Fullscreen unavailable');
        await panel.current.requestFullscreen();
        setGuided(false);
        panel.current.focus();
      }
    } catch {
      setFullscreenError(true);
    }
  }

  const unavailable = <p role="status" className="grid h-full place-items-center p-6 text-center">{isAr ? 'تعذّر تشغيل المجسّم ثلاثي الأبعاد.' : 'The 3D model could not be loaded.'}</p>;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20">
      <header className="mb-8 max-w-3xl">
        <h1 className="font-serif-ar text-5xl font-bold sm:text-7xl">{isAr ? 'ما وراء بَراح' : 'Behind BARAH'}</h1>
        <p className="mt-4 leading-relaxed text-[#57604F]">
          {isAr ? 'معرض معماري تفاعلي. جميع المجسّمات دراسات مفاهيمية بلا مقياس موقعي معتمد.' : 'An interactive architectural exhibition. All models are conceptual studies in arbitrary units.'}
        </p>
      </header>

      <div ref={track} className={scrollMode ? 'min-h-[145svh]' : undefined}>
        <div ref={panel} tabIndex={-1} onKeyDown={navigateByKey}
          className={`group rounded-3xl border border-[#D8CEBD] bg-[#FFFCF7] p-4 fullscreen:overflow-auto fullscreen:rounded-none sm:p-6 ${scrollMode ? 'md:sticky md:top-20' : ''}`}>
          <div role="group" aria-label={isAr ? 'اختيار المجسّم' : 'Model selection'} className="mb-4 flex flex-wrap gap-2">
            {models.map((item, i) => (
              <button key={item.id} type="button" className={control} aria-pressed={i === index} onClick={() => select(i)}>{item.title[lang]}</button>
            ))}
          </div>

          <div className="relative h-[clamp(17rem,48svh,31rem)] group-fullscreen:h-[65svh] overflow-hidden rounded-2xl bg-[#E3D8C6]">
            <SceneBoundary fallback={unavailable}>
              <Suspense fallback={<p role="status" className="p-6">{isAr ? 'جارٍ تحميل المجسّم…' : 'Loading model…'}</p>}>
                <Scene model={model} lang={lang} explosion={explosion} showAnnotation={annotated}
                  scrollProgress={scrollMode ? scrollYProgress : null} reset={reset} />
              </Suspense>
            </SceneBoundary>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div aria-live="polite">
              <h2 className="font-serif-ar text-3xl font-bold">{model.title[lang]}</h2>
              <p className="text-sm leading-relaxed text-[#57604F]">{model.description[lang]}</p>
              {annotated && <p className="mt-2 text-sm font-semibold">{model.annotation.label[lang]}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex w-full items-center gap-3 text-sm font-semibold">
                {isAr ? 'تفكيك المجسّم' : 'Exploded view'}
                <input type="range" min="0" max="100" value={explosion * 100}
                  className="min-w-0 flex-1 accent-[#515638]"
                  onChange={event => setExplosion(Number(event.target.value) / 100)} />
              </label>
              <button type="button" className={control} aria-pressed={annotated} onClick={() => setAnnotated(!annotated)}>
                {isAr ? 'تسميات' : 'Annotations'}
              </button>
              {!reducedMotion && (
                <button type="button" className={control} aria-pressed={guided} onClick={() => setGuided(!guided)}>
                  {isAr ? 'تحريك بالتمرير' : 'Scroll camera'}
                </button>
              )}
              <button type="button" className={control} onClick={() => { setGuided(false); setReset(value => value + 1); }}>
                {isAr ? 'إعادة ضبط المنظر' : 'Reset view'}
              </button>
              <button type="button" className={control} onClick={fullscreen}>{isAr ? 'ملء الشاشة' : 'Toggle fullscreen'}</button>
              {fullscreenError && <p role="status" className="w-full text-sm">{isAr ? 'ملء الشاشة غير متاح.' : 'Fullscreen is unavailable.'}</p>}
              <p className="w-full text-xs text-[#57604F]">
                {isAr ? 'استخدم مفاتيح الأسهم للتنقل بين المجسّمات ومفتاح Esc للخروج من ملء الشاشة.' : 'Use the arrow keys to change models and Esc to exit fullscreen.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
