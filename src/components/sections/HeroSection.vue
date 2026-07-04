<template>
  <section class="hero">
    <div class="hero__bg">
      <div class="hero__gradient"></div>
    </div>
    <div class="hero__container">
      <div class="container">
        <div class="hero__text hidden-left">
          <!-- eslint-disable-next-line vue/no-v-html — содержимое из собственных файлов локализации -->
          <h1 class="hero__text-title" v-html="$t('Hero.Title')"></h1>
          <p class="hero__text-description">
            {{ $t('Hero.Description.Review') }}
            <span class="text-green">{{ $t('Hero.Description.Your') }}</span>
            {{ $t('Hero.Description.Game') }}
          </p>
          <button class="btn-animated hero__cta" type="button" @click="openLoginModal">
            {{ $t('Menu.Try_it_for_free') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLoginModal } from '@/composables/useLoginModal';

const { open: openLoginModal } = useLoginModal();
</script>

<style scoped lang="scss">
// Фон заполняет секцию на любой ширине через background-size: cover (адаптивно),
// раньше ширина была задана статично в пикселях и не тянулась под экран.
// Три WebP-версии (small/medium/large) подключаются по медиазапросам — это в
// 10+ раз легче исходных JPEG и без layout-shift.
.hero {
  @apply relative;
  height: 966px;

  @media (max-width: 1399px) {
    height: 748px;
  }
  @media (max-width: 767px) {
    height: 512px;
  }

  &__bg {
    @apply h-full w-full relative;
    background-image: url('../../assets/img/main_background.webp');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: cover;
    z-index: 1;

    @media (max-width: 1399px) {
      background-image: url('../../assets/img/main_background_medium.webp');
    }
    @media (max-width: 767px) {
      background-image: url('../../assets/img/main_background_small.webp');
      background-position: center;
    }
  }

  &__gradient {
    @apply w-full h-full bg-no-repeat absolute top-0 left-0 z-10;
    background:
      linear-gradient(90deg, #182029 0%, rgba(82, 75, 75, 0) 100%),
      radial-gradient(52% 64.35% at 64.34% 53.47%, rgba(48, 43, 43, 0) 17.45%, #182129 100%);
    @media (max-width: 767px) {
      // Нижнее затемнение, чтобы текст и CTA не тонули в фото.
      background:
        linear-gradient(180deg, rgba(14, 17, 25, 0) 35%, rgba(14, 17, 25, 0.9) 92%),
        linear-gradient(90deg, #182029 0%, rgba(82, 75, 75, 0) 100%),
        radial-gradient(
          52% 64.35% at 64.34% 53.47%,
          rgba(48, 43, 43, 0) 17.45%,
          rgba(24, 33, 41, 0.42) 100%
        );
    }
  }

  &__container {
    @apply flex items-center justify-center absolute top-0 left-0 w-full h-full z-10;
  }

  &__text {
    @apply flex flex-col text-white;
    gap: clamp(32px, 5vh, 56px);
    @include text-48-newZelek;
    @media (max-width: 767px) {
      @apply text-center absolute;
      gap: 20px;
      bottom: 32px;
    }

    &-title {
      font-size: clamp(2rem, 6.5vw, 4.25rem);
      line-height: 1.08;
      letter-spacing: 0.02em;
      background: linear-gradient(100deg, #ffffff 0%, #8cf5d6 55%, #01c38e 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      filter: drop-shadow(0 4px 24px rgba(1, 195, 142, 0.35));
    }

    &-description {
      font-size: clamp(1.5rem, 4vw, 2.25rem);
    }
  }

  &__cta {
    align-self: flex-start;
    font-size: clamp(1.125rem, 2vw, 1.375rem);
    padding: 16px 40px;

    @media (max-width: 767px) {
      align-self: center;
      width: 100%;
      max-width: 320px;
      padding: 14px 24px;
    }
  }
}
</style>
