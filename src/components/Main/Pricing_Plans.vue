<template>
  <div class="tariff" id="price">
    <div class="tariff__title hidden-right">
      {{$t('Tariff_Plans.title')}}
    </div>
    <div class="tariff__toggle ">
      <div class="tariff__slider" :style="{ transform: isMonthly ? 'translateX(0)' : 'translateX(100%)' }"></div>
      <button
          class="tariff__toggle-monthly"
          :class="{ active: isMonthly }"
          @click="togglePlan('monthly')"
      >
        {{ $t('Tariff_Plans.monthly') }}
      </button>
      <button
          class="tariff__toggle-annually"
          :class="{ active: !isMonthly }"
          @click="togglePlan('annually')"
      >
        {{ $t('Tariff_Plans.annually') }}
      </button>
    </div>
    <div class="tariff__cards">
      <TariffPlan
          color="white"
          :title="tariff.basic.title"
          :price="tariff.basic.price"
          :currency="tariff['r/m']"
          :features="tariff.basic.features"
          :isMonthly="isMonthly"
          class="tariff__card hidden-left"
      />
      <TariffPlan
          color="green"
          :title="tariff.standard.title"
          :price="tariff.standard.price"
          :currency="tariff['r/m']"
          :features="tariff.standard.features"
          :isMonthly="isMonthly"
          class="tariff__card hidden-left"
      />
      <TariffPlan
          color="red"
          :title="tariff.pro.title"
          :price="tariff.pro.price"
          :currency="tariff['r/m']"
          :features="tariff.pro.features"
          :isMonthly="isMonthly"
          class="tariff__card hidden-left"
      />
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import TariffPlan from "@/components/Main/TariffCard.vue";

const { locale, messages } = useI18n();
const isMonthly = ref(true);
const tariff = computed(() => {
  return locale.value === 'ru'
      ? messages.value.ru.Tariff_Plans
      : messages.value.en.Tariff_Plans
});
const togglePlan = (plan) => {
  isMonthly.value = plan === 'monthly';
};

onMounted(() => {});
</script>

<style scoped lang="scss">
@use '../../../public/content/styles/_mixins' as *;

.tariff {
  @apply flex flex-col items-center gap-12;

  &__toggle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    height: 50px;
    @apply bg-blue-light;
    border-radius: 999px;
    overflow: hidden;

    & .tariff__slider {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      @apply bg-green-dark;
      border-radius: 999px;
      transition: transform 0.3s ease;
      z-index: 1;
    }

    & button {
      position: relative;
      z-index: 2;
      flex: 1;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      transition: color 0.3s ease;

      &.active {
        color: #fff;
      }
    }
  }

  &__title {
    @include text-36-newZelek;
    @apply text-green;
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

.tariff__title {
  @include text-36-newZelek;
  @apply text-green;
}

.tariff__card:nth-child(2) {
  transition-delay: .05s;
}

.tariff__card:nth-child(3) {
  transition-delay: 0.1s;
}
</style>