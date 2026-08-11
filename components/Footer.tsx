import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-mint py-8">
      <div className="mx-auto flex max-w-container flex-col items-center gap-3 px-6">
        <p className="text-sm text-muted">{t('copyright', { year })}</p>
      </div>
    </footer>
  );
}
