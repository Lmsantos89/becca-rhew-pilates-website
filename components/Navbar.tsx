'use client';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { IconBrandInstagram } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { id: 'home', key: 'home' },
  { id: 'experiences', key: 'experiences' },
  { id: 'schedule', key: 'schedule' },
  { id: 'about', key: 'about' },
  { id: 'contact', key: 'contact' },
] as const;

type Translator = ReturnType<typeof useTranslations>;

function NavAnchors({ activeId, t }: { activeId: string; t: Translator }) {
  return (
    <ul className="hidden items-center gap-6 md:flex">
      {NAV_LINKS.map(({ id, key }) => (
        <li key={key}>
          <a
            href={`#${id}`}
            className={`text-sm transition-colors hover:text-steel ${
              activeId === id ? 'text-steel' : 'text-ink'
            }`}
          >
            {t(key)}
          </a>
        </li>
      ))}
    </ul>
  );
}

function LocaleSwitcher({
  locale,
  onSwitch,
}: {
  locale: string;
  onSwitch: (next: 'en' | 'de') => void;
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest">
      {(['en', 'de'] as const).map((code, index) => (
        <span key={code} className="flex items-center gap-2">
          {index > 0 && <span className="text-muted/60">|</span>}
          <button
            onClick={() => onSwitch(code)}
            aria-current={locale === code ? 'true' : undefined}
            className={`transition-colors ${
              locale === code ? 'font-bold text-steel' : 'text-muted/60 hover:text-steel'
            }`}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

function NavActions({
  locale,
  onSwitchLocale,
}: {
  locale: string;
  onSwitchLocale: (next: 'en' | 'de') => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <LocaleSwitcher locale={locale} onSwitch={onSwitchLocale} />
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-muted transition-colors hover:text-steel"
      >
        <IconBrandInstagram size={20} />
      </a>
    </div>
  );
}

// tracks header shadow toggle on scroll
function useScrollShadow(): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrolled;
}

// tracks which section is in view to highlight its nav link
function useActiveSectionId(): string {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    for (const link of NAV_LINKS) {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return activeId;
}

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const scrolled = useScrollShadow();
  const activeId = useActiveSectionId();

  function switchLocale(next: 'en' | 'de') {
    if (next === locale) return;
    // CAVEMAN: scroll false keeps reader at same spot on one-page site
    router.replace(pathname, { locale: next, scroll: false });
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-white transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4">
        {/* CAVEMAN: logo image drops in here when client sends it */}
        <a href="#home" className="font-heading text-2xl font-semibold tracking-wide text-ink md:text-3xl">
          Vitality Pilates
        </a>

        <NavAnchors activeId={activeId} t={t} />

        <NavActions locale={locale} onSwitchLocale={switchLocale} />
      </div>
    </nav>
  );
}
