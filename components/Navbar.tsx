'use client';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { IconBrandInstagram } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '/' as const, key: 'home' },
  { href: '/offerings' as const, key: 'offerings' },
  { href: '/schedule' as const, key: 'schedule' },
  { href: '/about' as const, key: 'about' },
  { href: '/contact' as const, key: 'contact' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function switchLocale(next: 'en' | 'de') {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-white transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-xl font-semibold tracking-wide">
          Becca Rhew
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, key }) => (
            <li key={key}>
              <Link
                href={href}
                className={`text-sm transition-colors hover:text-accent ${
                  pathname === href ? 'text-accent' : 'text-text-primary'
                }`}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest">
            {(['en', 'de'] as const).map((code, index) => (
              <span key={code} className="flex items-center gap-2">
                {index > 0 && <span className="text-muted/60">|</span>}
                <button
                  onClick={() => switchLocale(code)}
                  aria-current={locale === code ? 'true' : undefined}
                  className={`transition-colors ${
                    locale === code
                      ? 'font-bold text-accent'
                      : 'text-muted/50 hover:text-accent'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted transition-colors hover:text-accent"
          >
            <IconBrandInstagram size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}
