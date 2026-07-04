<template>
  <header class="header">
    <div class="header__container container">
      <div class="header__logo">
        <img :src="logoIcon" alt="PlayVision" />
      </div>
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-item">
            <a class="header__nav-action" href="#news">{{ $t('Menu.News') }}</a>
          </li>
          <li class="header__nav-item">
            <a class="header__nav-action" href="#price">{{ $t('Menu.Price') }}</a>
          </li>
          <li class="header__nav-item">
            <a class="header__nav-action" href="#contacts">{{ $t('Menu.Contacts') }}</a>
          </li>
          <li class="header__nav-item">
            <button class="header__nav-action" type="button" @click="openLoginModal">
              {{ $t('Menu.Login') }}
            </button>
          </li>
          <li ref="langDropdown" class="header__nav-item relative">
            <button
              class="header__nav-action"
              type="button"
              aria-haspopup="menu"
              :aria-expanded="isDropdownOpen"
              @click.stop="toggleDropdown"
            >
              <img :src="langIcon" alt="" class="w-5 h-5" />
              {{ locale }}
            </button>
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <button
                v-for="language in LANGUAGES"
                :key="language.code"
                type="button"
                class="dropdown-menu__item"
                @click="selectLanguage(language.code)"
              >
                <img :src="language.flag" alt="" class="w-5 h-5 mr-2" />
                {{ language.label }}
              </button>
            </div>
          </li>
          <li class="header__nav-item">
            <button class="btn-animated" type="button" @click="openLoginModal">
              {{ $t('Menu.Try_it_for_free') }}
            </button>
          </li>
        </ul>
        <button
          class="header__hamburger"
          type="button"
          :aria-label="$t('Menu.Menu')"
          @click="toggleMenu"
        >
          <img :src="menuIcon" alt="" />
        </button>
      </nav>
    </div>
  </header>

  <div v-if="isMenuOpen" class="fullscreen-menu">
    <div class="fullscreen-menu__container">
      <div class="fullscreen-menu__header container">
        <div class="fullscreen-menu__header-container">
          <h2>{{ $t('Menu.Menu') }}</h2>
          <button
            class="fullscreen-menu__close"
            type="button"
            :aria-label="$t('Menu.Menu')"
            @click="toggleMenu"
          >
            <img :src="closeIcon" alt="" />
          </button>
        </div>
        <hr />
        <ul class="fullscreen-menu__list">
          <li>
            <a href="#" @click="toggleMenu">{{ $t('Menu.Main') }}</a>
          </li>
          <li>
            <a href="#news" @click="toggleMenu">{{ $t('Menu.News') }}</a>
          </li>
          <li>
            <a href="#price" @click="toggleMenu">{{ $t('Menu.Price') }}</a>
          </li>
          <li class="fullscreen-menu__language">
            <button
              v-for="language in LANGUAGES"
              :key="language.code"
              type="button"
              :class="['language-button', locale === language.code ? 'text-green' : '']"
              @click="selectLanguage(language.code)"
            >
              <img :src="language.flag" alt="" class="w-5 h-5 mr-2" />
              {{ language.label }}
            </button>
          </li>
        </ul>
      </div>
      <div class="fullscreen-menu__footer container">
        <p>{{ $t('Menu.Contact_us') }}</p>
        <a href="mailto:playvisionai@mail.ru" class="transition duration-500 ease-in-out hover:text-grey">
          playvisionai@mail.ru
        </a>
        <SocialLinks />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

import closeIcon from '@/assets/icons/close.svg';
import langIcon from '@/assets/icons/lang.svg';
import logoIcon from '@/assets/icons/logo.svg';
import menuIcon from '@/assets/icons/menu.svg';
import SocialLinks from '@/components/ui/SocialLinks.vue';
import { useLocale } from '@/composables/useLocale';
import { useLoginModal } from '@/composables/useLoginModal';
import { LANGUAGES } from '@/data/languages';

const { locale, setLocale } = useLocale();
const { open: openLoginModal } = useLoginModal();

const isDropdownOpen = ref(false);
const isMenuOpen = ref(false);
const langDropdown = ref(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectLanguage = (code) => {
  setLocale(code);
  isDropdownOpen.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
};

const handleClickOutside = (event) => {
  if (isDropdownOpen.value && !langDropdown.value?.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped>
.header {
  @apply bg-blue-middle-opacity-75 font-new_zelek rounded-full fixed top-3 z-50;
  left: 50%;
  transform: translateX(-50%);
  width: 98%;
  height: 75px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 16px 40px -12px rgba(0, 0, 0, 0.6);
  // 20px даёт тот же frosted-эффект на тонкой полосе, но в разы дешевле для GPU.
  backdrop-filter: blur(20px);

  @media (max-width: 991px) {
    @apply rounded-none w-full top-0 h-auto fixed bg-blue-middle;
    padding-top: 18px;
    padding-bottom: 18px;
    border: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    // Фон здесь непрозрачный — блюр не виден, но продолжал бы считаться.
    backdrop-filter: none;
  }

  &__hamburger {
    @apply hidden;

    @media screen and (max-width: 1280px) {
      @apply block;
    }
  }

  &__logo {
    flex-shrink: 0;
    margin: auto 0;
  }

  &__container {
    @apply flex justify-between m-auto h-full;
  }

  &__nav {
    @apply flex;

    &-list {
      @apply flex gap-2 my-auto items-center;

      @media screen and (max-width: 1115px) {
        @apply gap-0;
      }

      @media screen and (max-width: 1280px) {
        @apply hidden;
      }
    }

    &-item {
      @apply font-bold flex items-center justify-center h-fit;
      line-height: 20px;
      & .header__nav-action {
        @include text-20-white-montserrat-hover;
      }
      &:nth-child(5) .header__nav-action {
        text-transform: uppercase !important;
        @apply flex gap-3;
      }
    }

    &-action {
      padding: 9px 15px;
    }
  }
}

.dropdown-menu {
  @apply absolute left-0 z-50 w-40 bg-blue-middle rounded-md shadow-lg;
  transform: translateY(70px);

  &__item {
    @apply flex items-center w-full px-4 py-2 text-white font-montserrat hover:text-green hover:bg-blue-light;

    &:first-child:hover {
      @apply rounded-t-md;
    }
    &:last-child:hover {
      @apply rounded-b-md;
    }
  }
}

.fullscreen-menu {
  @apply bg-blue-middle fixed top-0 left-0 w-full h-full font-light py-8;
  @include text-20-white-montserrat;
  font-size: clamp(1.125rem, 1.75vw, 1.25rem);
  z-index: 1000;

  &__container {
    @apply flex flex-col justify-between h-full;
    max-width: 98%;
  }

  &__header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 24px;
      font-weight: bold;
    }
  }

  &__close {
    font-size: 24px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

  hr {
    border: 1px solid rgba(255, 255, 255, 0.5);
    margin: 20px 0;
  }

  &__list {
    list-style: none;
    padding: 0;
    @apply flex flex-col gap-8 mt-2;

    li {
      a {
        color: white;
        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
        @apply transition duration-500 ease-in-out hover:text-green-dark;
      }
    }
  }

  &__footer {
    text-align: center;
    @apply flex flex-col items-end gap-4;
  }

  &__language {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .language-button {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: none;
      border: none;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: color 0.3s ease;

      img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }
    }
  }
}
</style>
