import { createApp } from 'vue';

import App from './App.vue';
import { i18n } from './plugins/i18n';

import './assets/styles/tailwind.css';
import './assets/styles/style.scss';

document.documentElement.lang = i18n.global.locale.value;

createApp(App).use(i18n).mount('#app');
