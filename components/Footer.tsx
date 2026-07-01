import { getTranslations } from 'next-intl/server';
import { IconBrandInstagram } from '@tabler/icons-react';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-beige py-8">
      <div className="mx-auto flex max-w-container flex-col items-center gap-3 px-6">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-muted transition-colors hover:text-accent"
        >
          <IconBrandInstagram size={22} />
        </a>
        <p className="text-sm text-muted">{t('copyright', { year })}</p>
      </div>
    </footer>
  );
}
