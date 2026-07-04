<template>
  <section id="price" class="tariff">
    <h2 class="tariff__title hidden-right">{{ $t('Tariff_Plans.title') }}</h2>
    <div class="tariff__toggle">
      <div
        class="tariff__slider"
        :style="{ transform: isMonthly ? 'translateX(0)' : 'translateX(100%)' }"
      ></div>
      <button
        class="tariff__toggle-monthly"
        :class="{ active: isMonthly }"
        type="button"
        @click="isMonthly = true"
      >
        {{ $t('Tariff_Plans.monthly') }}
      </button>
      <button
        class="tariff__toggle-annually"
        :class="{ active: !isMonthly }"
        type="button"
        @click="isMonthly = false"
      >
        {{ $t('Tariff_Plans.annually') }}
      </button>
    </div>
    <div class="tariff__cards">
      <TariffCard
        v-for="plan in plans"
        :key="plan.id"
        :plan="plan"
        :is-monthly="isMonthly"
        class="tariff__card hidden-left"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

import TariffCard from '@/components/ui/TariffCard.vue';
import { plans } from '@/data/tariffs';

const isMonthly = ref(true);
</script>

<style scoped lang="scss">
.tariff {
  @apply flex flex-col items-center gap-12;
  position: relative;

  // Сценическая подсветка позади прайса — статичный градиент.
  &::before {
    content: '';
    position: absolute;
    inset: -120px -10vw;
    z-index: -1;
    pointer-events: none;
    background: radial-gradient(
      55% 45% at 50% 45%,
      rgba(1, 195, 142, 0.07) 0%,
      rgba(1, 195, 142, 0) 70%
    );
  }

  &__toggle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    height: 50px;
    background: #151a26;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    overflow: hidden;

    & .tariff__slider {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      background: linear-gradient(135deg, #01c38e 0%, #00f052 100%);
      box-shadow: 0 2px 12px rgba(1, 195, 142, 0.5);
      border-radius: 999px;
      transition: transform 0.3s ease;
      z-index: 1;
    }

    & button {
      position: relative;
      z-index: 2;
      flex: 1;
      color: rgba(255, 255, 255, 0.55);
      font-weight: bold;
      cursor: pointer;
      transition: color 0.3s ease;

      &.active {
        color: #0e1119;
      }
    }
  }

  &__title {
    @include section-title;
  }

  &__card {
    &s {
      @apply flex w-full justify-between;
      gap: 30px;
      @media (max-width: 1100px) {
        @apply flex-col;
      }
    }
  }
}

</style>
