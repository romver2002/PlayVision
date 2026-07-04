<template>
  <div class="tariff-card">
    <p class="title" :class="colorClass">{{ $t(`Tariff_Plans.plans.${plan.id}`) }}</p>
    <p class="price">
      <b>{{ isMonthly ? plan.price.monthly : plan.price.annually }}</b>
      {{ $t(isMonthly ? 'Tariff_Plans.per_month' : 'Tariff_Plans.per_year') }}
    </p>
    <div class="tariff-card__container">
      <ul class="flex flex-col gap-2 w-fit">
        <li v-for="feature in features" :key="feature.key" class="flex gap-3 font-thin">
          <img
            :src="feature.available ? trueIcon : falseIcon"
            :alt="$t(feature.available ? 'Tariff_Plans.available' : 'Tariff_Plans.not_available')"
            width="25"
            height="25"
          />
          <span class="tariff-card__feature-title">
            {{ $t(`Tariff_Plans.features.${feature.key}`) }}
          </span>
        </li>
      </ul>
    </div>
    <button class="btn" type="button" @click="openLoginModal">{{ $t('Tariff_Plans.buy') }}</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import falseIcon from '@/assets/icons/false.png';
import trueIcon from '@/assets/icons/true.png';
import { useLoginModal } from '@/composables/useLoginModal';
import { FEATURE_KEYS } from '@/data/tariffs';

const { open: openLoginModal } = useLoginModal();

const props = defineProps({
  plan: {
    type: Object,
    required: true,
  },
  isMonthly: {
    type: Boolean,
    required: true,
  },
});

const features = computed(() =>
  FEATURE_KEYS.map((key, index) => ({
    key,
    available: index < props.plan.featuresIncluded,
  }))
);

const colorClass = computed(
  () =>
    ({
      white: 'text-white',
      red: 'text-red',
      green: 'text-green',
    })[props.plan.color] || ''
);
</script>

<style scoped lang="scss">
.tariff-card {
  @apply text-white relative w-full flex flex-col gap-10;
  padding: 50px 40px 40px;
  background: linear-gradient(180deg, #1e2433 0%, #151a26 100%);
  border-radius: 24px;
  box-shadow: 0 24px 48px -16px rgba(0, 0, 0, 0.55);
  z-index: 1;
  overflow: hidden;
  transition: transform 0.3s ease-in;
  &:hover {
    transform: translateY(-15px);
  }

  // 1px световая кромка через mask-градиент.
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.04));
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
    z-index: -10;
  }

  &:first-child::before {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.04));
  }

  // «Стандарт» — герой прайса: сочная кромка, зелёный ореол, приподнят.
  &:nth-child(2) {
    box-shadow:
      0 0 80px -24px rgba(1, 195, 142, 0.45),
      0 24px 48px -16px rgba(0, 0, 0, 0.55);

    @media (min-width: 1101px) {
      transform: translateY(-12px);
      &:hover {
        transform: translateY(-24px);
      }
    }

    &::before {
      background: linear-gradient(180deg, #00f052 0%, #01c38e 45%, rgba(1, 195, 142, 0.15) 100%);
    }
  }

  &:last-child::before {
    background: linear-gradient(to bottom, rgba(244, 80, 80, 0.8), rgba(244, 80, 80, 0.04));
  }

  &__container {
    @media (max-width: 1100px) {
      @apply flex;
    }
  }

  &__feature-title {
    font-size: clamp(1.125rem, 2vw, 1.25rem);
  }
}

.title {
  @include text-36-newZelek;
  @apply text-center;
  line-height: clamp(1.75rem, 4vw, 2.25rem);
}

.price {
  @include text-20-white-montserrat;
  @apply text-center;

  // Крупная цифра над мелкой подписью — цена читается мгновенно.
  b {
    display: block;
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
}

.btn {
  @include btn-green;
}
</style>
