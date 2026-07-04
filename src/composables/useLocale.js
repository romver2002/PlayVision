import { useI18n } from 'vue-i18n';

import { LOCALE_STORAGE_KEY, SUPPORTED_LOCALES } from '@/plugins/i18n';

// Единая точка переключения языка: обновляет vue-i18n, localStorage
// и атрибут lang у <html> (важно для доступности и SEO).
export function useLocale() {
  const { locale } = useI18n({ useScope: 'global' });

  const setLocale = (value) => {
    if (!SUPPORTED_LOCALES.includes(value)) {
      return;
    }
    locale.value = value;
    localStorage.setItem(LOCALE_STORAGE_KEY, value);
    document.documentElement.lang = value;
  };

  return { locale, setLocale };
}
