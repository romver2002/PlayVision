# PlayVision

Лендинг PlayVision — виртуального футбольного тренера на основе ИИ.
Опубликован на GitHub Pages: <https://romver2002.github.io/PlayVision/>

## Стек

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vite](https://vite.dev/) — сборка и дев-сервер
- [Tailwind CSS](https://tailwindcss.com/) + SCSS (миксины подключены глобально через `vite.config.js`)
- [vue-i18n](https://vue-i18n.intlify.dev/) — локализация (ru/en)
- [Swiper](https://swiperjs.com/) — слайдеры

## Команды

```bash
npm install      # установка зависимостей
npm run dev      # дев-сервер на http://localhost:3000
npm run build    # продакшен-сборка в dist/
npm run preview  # локальный просмотр продакшен-сборки
npm run lint     # проверка ESLint
```

## Структура

```
public/            статика, копируемая как есть (favicon, видео)
src/
  assets/          шрифты, иконки, изображения, стили (бандлятся Vite)
  components/
    layout/        шапка и футер
    sections/      секции лендинга
    ui/            переиспользуемые компоненты (модалка, слайдеры, плеер)
  composables/     useLocale, useLoginModal, useScrollReveal
  data/            не зависящие от языка данные (тарифы, игроки, языки)
  locales/         переводы ru/en (только строки, без путей к файлам)
  plugins/         инициализация vue-i18n
```

## Деплой

Пуш в `master` автоматически собирает проект и публикует `dist/` в ветку
`gh-pages` через GitHub Actions (`.github/workflows/deploy.yml`).
Сайт живёт в подпапке `/PlayVision/`, поэтому в продакшен-сборке
`base: '/PlayVision/'` (см. `vite.config.js`).
