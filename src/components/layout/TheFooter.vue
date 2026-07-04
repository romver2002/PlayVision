<template>
  <footer id="contacts" class="footer">
    <div class="footer__container container">
      <div class="footer__nav hidden-left">
        <div class="footer__nav-logo">
          <img :src="logoIcon" alt="PlayVision" />
        </div>
        <ul class="footer__nav-list">
          <li class="footer__nav-item">
            <a class="footer__nav-link" href="#news">{{ $t('Menu.News') }}</a>
          </li>
          <li class="footer__nav-item">
            <a class="footer__nav-link" href="#price">{{ $t('Menu.Price') }}</a>
          </li>
          <li class="footer__nav-item">
            <a class="footer__nav-link" href="#contacts">{{ $t('Menu.Contacts') }}</a>
          </li>
          <li class="footer__nav-item">
            <a class="footer__nav-link" href="#system-requirements">
              {{ $t('Menu.System_requirements') }}
            </a>
          </li>
        </ul>
      </div>
      <div class="footer__contactUs hidden-right">
        <p class="footer__contactUs-text">{{ $t('Menu.Contact_us') }}</p>
        <a href="mailto:playvisionai@mail.ru" class="footer__contactUs-link">
          playvisionai@mail.ru
        </a>
        <SocialLinks />
      </div>
    </div>
    <div class="footer__foundation container">
      <div class="footer__foundation-logos">
        <img
          :src="foundationLogoColor"
          :alt="$t('Footer.foundation_logo_alt')"
          class="footer__foundation-logo"
        />
        <img
          :src="foundationLogoWhite"
          :alt="$t('Footer.foundation_logo_alt')"
          class="footer__foundation-logo"
        />
      </div>
      <p class="footer__foundation-text">{{ $t('Footer.foundation') }}</p>
    </div>
  </footer>
</template>

<script setup>
import foundationLogoColor from '@/assets/icons/fond-logo-color.png';
import foundationLogoWhite from '@/assets/icons/fond-logo-white.png';
import logoIcon from '@/assets/icons/logo.svg';
import SocialLinks from '@/components/ui/SocialLinks.vue';
</script>

<style scoped lang="scss">
.footer {
  @apply w-full py-12 relative;
  background: linear-gradient(180deg, #10141d 0%, #0a0d14 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  &__container {
    @apply flex justify-between;

    @media (max-width: 771px) {
      @apply flex-col;
      gap: 40px;
    }
  }

  &__nav {
    @apply flex;
    gap: 50px;
    @media (max-width: 771px) {
      @apply flex-col;
      gap: 25px;
    }
    &-list {
      @apply flex flex-col gap-4;
    }

    &-link {
      @apply font-light hover:text-grey;
      @include text-20-white-montserrat;
    }
  }

  &__contactUs {
    @apply flex flex-col items-end gap-4 text-white;

    @media (max-width: 771px) {
      @apply items-start;
      text-align: left;
    }
    &-text {
      @include text-20-white-montserrat;
    }
    &-link {
      @include text-20-white-montserrat;
      font-size: clamp(1.125rem, 1.75vw, 1.25rem);
      @apply font-light hover:text-grey;
    }
  }

  &__foundation {
    @apply flex items-center gap-6 mt-8 pt-8;
    border-top: 1px solid rgba(255, 255, 255, 0.08);

    @media (max-width: 771px) {
      @apply flex-col text-center gap-4;
    }

    &-logos {
      @apply flex-shrink-0 flex items-center gap-6;

      @media (max-width: 771px) {
        @apply gap-4;
      }
    }

    // Логотипы выровнены по одной высоте — компактная строка без пустых полей.
    &-logo {
      width: auto;
      height: 72px;

      @media (max-width: 771px) {
        height: 52px;
      }
    }

    &-text {
      @apply text-white leading-relaxed;
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 300;
      opacity: 0.9;

      @media (max-width: 771px) {
        font-size: 11px;
      }
    }
  }
}
</style>
