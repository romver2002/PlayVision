import { createI18n } from 'vue-i18n';

import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

export const SUPPORTED_LOCALES = ['ru', 'en'];
export const LOCALE_STORAGE_KEY = 'lang';

export function detectInitialLocale() {
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (SUPPORTED_LOCALES.includes(saved)) {
    return saved;
  }
  return navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

export const i18n = createI18n({
  legacy: false,
  locale: detectInitialLocale(),
  fallbackLocale: 'en',
  messages: { ru, en },
});
