<template>
  <header class="header">
    <div class="header__container container">
      <div class="header__logo">
        <img src="../../public/content/icons/logo.svg" alt="logo" />
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
            <button @click="toggleMenu" class="header__nav-action" type="button">
              {{ $t('Menu.Login') }}
            </button>
          </li>
          <li class="header__nav-item relative">
            <button
                @click="toggleDropdown"
                class="header__nav-action"
                @click.stop
            >
              <img src="../../public/content/icons/lang.svg" alt="Language" class="w-5 h-5" />
              {{ lang }}
            </button>
            <div
                v-if="isOpenDrop"
                class="dropdown-menu"
            >
              <button
                  @click="changeLanguage('ru')"
                  class="flex items-center w-full px-4 py-2 text-white font-montserrat hover:text-green hover:bg-blue-light hover:rounded-t-md"
              >
                <img src="/content/icons/russia.svg" alt="Русский" class="w-5 h-5 mr-2" />
                Русский
              </button>
              <button
                  @click="changeLanguage('en')"
                  class="flex items-center w-full px-4 py-2 text-white font-montserrat hover:text-green hover:bg-blue-light hover:rounded-b-md"
              >
                <img src="/content/icons/england.svg" alt="English" class="w-5 h-5 mr-2" />
                English
              </button>
            </div>
          </li>
          <li class="header__nav-item">
            <ModalLogIn custom-class="btn-animated" :text-button="$t('Menu.Try_it_for_free')"></ModalLogIn>
          </li>
        </ul>
        <button @click="toggleMenu" class="header__hamburger">
          <img src="../../public/content/icons/menu.svg" alt="menu" />
        </button>
      </nav>
    </div>
  </header>

  <div v-if="isMenuOpen" class="fullscreen-menu">
    <div class="fullscreen-menu__container">
      <div class="fullscreen-menu__header container">
        <div class="fullscreen-menu__header-container">
          <h2>{{$t('Menu.Menu')}}</h2>
          <button @click="toggleMenu" class="fullscreen-menu__close">
            <img src="../../public/content/icons/close.svg" alt="menu" />
          </button>
        </div>
        <hr />
        <ul class="fullscreen-menu__list">
          <li><a href="#" @click="toggleMenu">{{$t('Menu.Main')}}</a></li>
          <li><a href="#news" @click="toggleMenu">{{$t('Menu.News')}}</a></li>
          <li><a href="#price" @click="toggleMenu">{{$t('Menu.Price')}}</a></li>
          <li class="fullscreen-menu__language">
            <button @click="changeLanguage('ru')" :class="['language-button', lang === 'ru' ? 'text-green' : '']">
              <img src="/content/icons/russia.svg" alt="Русский" class="w-5 h-5 mr-2" />
              Русский
            </button>
            <button @click="changeLanguage('en')" :class="['language-button', lang === 'en' ? 'text-green' : '']">
              <img src="/content/icons/england.svg" alt="English" class="w-5 h-5 mr-2" />
              English
            </button>
          </li>
        </ul>
      </div>
      <div class="fullscreen-menu__footer container">
        <p>{{$t('Menu.Contact_us')}}</p>
        <a href="mailto:playvisionai@mail.ru" target="_blank" class="transition duration-500 ease-in-out hover:text-grey">playvisionai@mail.ru</a>
        <div class="flex gap-4 justify-end">
          <a href="https://t.me/romver_o" target="_blank" class="footer__contactUs-telegram"></a>
          <a href="https://vk.com/r.zverev2000" target="_blank" class="footer__contactUs-vk"></a>
          <a href="https://www.youtube.com/" target="_blank" class="footer__contactUs-youtube"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ModalLogIn from "@/components/Main/ModalLogIn.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const isOpenDrop = ref(false);
const isMenuOpen = ref(false);
const lang = ref("ru");

const changeLanguage = (langValue) => {
  locale.value = langValue;
  lang.value = langValue;
  localStorage.setItem('lang', langValue);
  isOpenDrop.value = !isOpenDrop.value;
};

const toggleDropdown = () => {
  isOpenDrop.value = !isOpenDrop.value;
};
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? "hidden" : '';
};
const handleClickOutside = (event) => {
  const dropdown = document.querySelector(".dropdown-menu");
  const button = document.querySelector(".header__nav-button");
  if (dropdown && button) {
    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
      isOpenDrop.value = false;
    }
  } else {
    isOpenDrop.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  lang.value = localStorage.getItem('lang');
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped>
@use '../../public/content/styles/_mixins' as *;

.header {
  @apply bg-blue-middle-opacity-75 font-new_zelek rounded-full fixed top-3 z-50;
  left: 50%;
  transform: translateX(-50%);
  width: 98%;
  height: 75px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(100px);

  @media (max-width: 991px) {
    @apply rounded-none w-full top-0 pt-4 h-auto fixed bg-blue-middle;
    padding-top: 30px;
    padding-bottom: 20px;
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
      & .header__nav-action{
        @include text-20-white-montserrat-hover;
      }
      &:nth-child(5) .header__nav-action{
        text-transform: uppercase !important;
        @apply flex gap-3;
      }
    }

    &-action{
      padding: 9px 15px;
    }
  }
}

.header__nav-item-button {
  position: relative;
}

.dropdown-menu {
  @apply absolute left-0 z-50 w-40 bg-blue-middle rounded-md shadow-lg;
  transform: translateY(70px);
}

.fullscreen-menu {
   @apply bg-blue-middle fixed top-0 left-0 w-full h-full font-light py-8;
   @include text-20-white-montserrat;
   font-size: clamp(1.125rem, 1.75vw, 1.25rem);
   z-index: 1000;

    &__container{
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

   &__close {
     font-size: 24px;
     background: none;
     border: none;
     color: white;
     cursor: pointer;
   }
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
       @apply transition duration-500 ease-in-out hover:text-green-dark ;
     }
   }
  }

  &__footer {
   text-align: center;
   @apply flex flex-col items-end gap-4;
   &__icons {
     display: flex;
     justify-content: center;
     align-items: end;
     gap: 10px;

     img {
       width: 24px;
       height: 24px;
       cursor: pointer;

       &:hover {
         filter: brightness(1.5);
       }
     }
    }
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

.footer__contactUs{
  &-telegram, &-vk, &-youtube{
    width: 57px;
    height: 57px;
    @media (max-width: 1100px) {
      width: 40px;
      height: 40px;
    }
  }
}

</style>