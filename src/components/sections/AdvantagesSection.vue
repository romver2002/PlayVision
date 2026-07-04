<template>
  <section class="advantages">
    <h2 class="advantages__title hidden-right">{{ $t('Advantages.title') }}</h2>
    <div class="advantages__cards">
      <div v-for="index in 3" :key="index" class="advantages__card-container hidden-left">
        <div class="advantages__card-wrapper">
          <div class="advantages__card-rectangle"></div>
          <div class="advantages__card">
            <p class="advantages__card-title">{{ $t(`Advantages.cards.${index}.title`) }}</p>
            <p class="advantages__card-description">
              {{ $t(`Advantages.cards.${index}.description`) }}
            </p>
          </div>
        </div>
        <img
          class="advantages__card-img"
          :src="images[index - 1]"
          :alt="$t(`Advantages.cards.${index}.title`)"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import analysis1 from '@/assets/img/analysis1.png';
import analysis2 from '@/assets/img/analysis2.png';
import analysis3 from '@/assets/img/analysis3.png';

const images = [analysis1, analysis2, analysis3];
</script>

<style scoped lang="scss">
$adaptive-width-m: 1400px;
$adaptive-width-s: 640px;

.advantages {
  @apply flex flex-col gap-12;
  &__title {
    @include section-title;
  }
  &__cards {
    @apply flex gap-5 relative;
    margin-bottom: clamp(110px, 10vw, 150px);
    @media (max-width: $adaptive-width-m) {
      @apply flex-col gap-36;
    }
  }
  &__card {
    @apply flex flex-col gap-6 items-center relative z-10;
    padding: 40px 25px;
    height: 400px;
    // Полупрозрачный графит: зелёное свечение card-rectangle позади просвечивает.
    background: linear-gradient(180deg, rgba(30, 36, 51, 0.85) 0%, rgba(21, 26, 38, 0.55) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);

    &-title {
      @apply text-white;
      @include text-24-newZelek;
    }

    &-description {
      @apply text-center;
      @include text-20-white-montserrat;
    }

    &-container {
      @apply relative flex flex-col items-center;
      width: 33%;
      @media (max-width: $adaptive-width-m) {
        @apply w-full;
      }

      // Зелёный глоу при наведении — на контейнере, т.к. wrapper обрезает тени.
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 24px;
        border: 1px solid rgba(1, 195, 142, 0.4);
        box-shadow: 0 0 40px -12px rgba(1, 195, 142, 0.35);
        opacity: 0;
        transition: opacity 0.35s ease;
        pointer-events: none;
        z-index: 20;
      }

      &:hover {
        .advantages__card-wrapper {
          transform: translateY(-8px);
        }
        &::after {
          opacity: 1;
        }
      }
    }
    &-wrapper {
      position: relative;
      overflow: hidden;
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: transform 0.35s ease;
    }
  }
  &__card-rectangle {
    width: 280px;
    height: 120px;
    @apply bg-green-dark absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    filter: blur(100px);
  }
  &__card-img {
    position: absolute;
    z-index: 100;
    top: 280px;
    @media (max-width: $adaptive-width-m) {
      top: 220px;
    }
    @media (max-width: $adaptive-width-s) {
      top: 255px;
      scale: 0.8;
    }
  }
}
</style>
