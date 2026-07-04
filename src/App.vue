<template>
  <TheHeader />

  <div class="blurred-wrapper">
    <main class="page-content">
      <HeroSection />
      <div class="page-sections container">
        <AdvantagesSection />
        <CoachSection />
        <NewsSection />
        <CreateProfileSection />
        <PricingSection />
        <RequirementsSection />
      </div>
    </main>
    <TheFooter />
  </div>

  <LoginModal />

  <img
    v-for="(figure, index) in figures"
    :key="index"
    class="figure"
    :class="`figure_${index + 1}`"
    :src="figure"
    alt=""
    aria-hidden="true"
  />
</template>

<script setup>
import figure1 from '@/assets/icons/figures/1.svg';
import figure2 from '@/assets/icons/figures/2.svg';
import figure3 from '@/assets/icons/figures/3.svg';
import figure4 from '@/assets/icons/figures/4.svg';
import figure5 from '@/assets/icons/figures/5.svg';
import TheFooter from '@/components/layout/TheFooter.vue';
import TheHeader from '@/components/layout/TheHeader.vue';
import AdvantagesSection from '@/components/sections/AdvantagesSection.vue';
import CoachSection from '@/components/sections/CoachSection.vue';
import CreateProfileSection from '@/components/sections/CreateProfileSection.vue';
import HeroSection from '@/components/sections/HeroSection.vue';
import NewsSection from '@/components/sections/NewsSection.vue';
import PricingSection from '@/components/sections/PricingSection.vue';
import RequirementsSection from '@/components/sections/RequirementsSection.vue';
import LoginModal from '@/components/ui/LoginModal.vue';
import { useScrollReveal } from '@/composables/useScrollReveal';

const figures = [figure1, figure2, figure3, figure4, figure5];

useScrollReveal();
</script>

<style lang="scss">
#app {
  overflow-x: hidden;
  @apply bg-blue-middle;

  // Раньше здесь был backdrop-filter: blur(200px) на всю страницу — он размывал
  // декоративные фигуры позади, но заставлял GPU пересчитывать блюр всего
  // вьюпорта на каждый кадр скролла. Теперь размыты сами фигуры (статично).
  .blurred-wrapper {
    background: rgba(0, 0, 0, 0.07);
    position: relative;
    z-index: 1;
  }
}

.page-content {
  position: relative;
}

.page-sections {
  @apply flex flex-col;
  gap: clamp(88px, 9vw, 160px);
  padding-top: clamp(56px, 7vw, 128px);
}

.figure {
  position: absolute;
  z-index: 0;
  max-width: 100%;
  filter: blur(70px);
  pointer-events: none;
  &_1 {
    top: 1250px;
    left: 10%;
    @media (max-width: 1100px) {
      left: 0;
    }
  }
  &_2 {
    top: 1350px;
    right: 15%;
  }
  &_3 {
    top: 2000px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  &_4 {
    top: 3400px;
    left: 16%;
    @media (max-width: 1100px) {
      left: 0;
    }
  }
  &_5 {
    top: 3100px;
    right: 12%;
  }
}

// Анимация появления идёт только по opacity и transform — оба свойства
// обрабатываются композитором без пересчёта макета и перерисовки.
.hidden-left {
  opacity: 0;
  transform: translateX(-100%);
  transition:
    opacity 1s ease,
    transform 1s ease;
  will-change: opacity, transform;
}

.hidden-right {
  opacity: 0;
  transform: translateX(100%);
  transition:
    opacity 1s ease,
    transform 1s ease;
  will-change: opacity, transform;
}

.show {
  opacity: 1;
  transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .hidden-left,
  .hidden-right {
    transition: none;
    opacity: 1;
    transform: none;
  }

  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
</style>
