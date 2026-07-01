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

  function toggleLocale() {
    const next = locale === 'en' ? 'de' : 'en';
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
                  pathname === href ? 'font-medium text-accent' : 'text-text-primary'
                }`}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLocale}
            className="text-sm font-medium uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            {locale === 'en' ? 'DE' : 'EN'}
          </button>
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
