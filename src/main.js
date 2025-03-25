import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';

import ru from './localization/ru.json';
import en from './localization/en.json';

import '../public/content/styles/style.scss';

// Создаём экземпляр i18n
const i18n = createI18n({
    legacy: false, // Используем Composition API
    locale: 'ru', // Язык по умолчанию
    fallbackLocale: 'en', // Резервный язык
    messages: {
        ru,
        en,
    },
});

// Создаём приложение
const app = createApp(App);

// Подключаем i18n
app.use(i18n);

// Монтируем приложение
app.mount('#app');

// Экспортируем экземпляр i18n для использования в других файлах
export default i18n;