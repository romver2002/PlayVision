<template>
  <swiper
    :modules="modules"
    :slides-per-view="3"
    :pagination="{ clickable: true }"
    :space-between="10"
    :breakpoints="{
      1340: { slidesPerView: 3 },
      1024: { slidesPerView: 2 },
      650: { slidesPerView: 1 },
      480: { slidesPerView: 2 },
      0: { slidesPerView: 1 },
    }"
  >
    <swiper-slide
      v-for="player in players"
      :key="player.id"
      class="player__card"
      style="width: fit-content"
    >
      <div class="player__container">
        <div class="player__img-wrapper">
          <img
            :src="player.image"
            :alt="`${$t(`Players.${player.id}.name`)} ${$t(`Players.${player.id}.surname`)}`"
            class="player__img"
            width="230"
            height="217"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p class="player__stats">{{ player.stats }}</p>
        <img :src="player.teamLogo" alt="" class="player__team" />
      </div>

      <div class="player__name">
        <p>{{ $t(`Players.${player.id}.name`) }}</p>
        <p>{{ $t(`Players.${player.id}.surname`) }}</p>
      </div>

      <div class="player__characteristic">
        <div class="player__age">
          <p class="player__characteristic-title">{{ $t('Create_Profile.age') }}</p>
          <p class="player__characteristic-data">{{ player.age }}</p>
        </div>
        <div class="player__position">
          <p class="player__characteristic-title">{{ $t('Create_Profile.position') }}</p>
          <p class="player__characteristic-data">{{ $t(`Players.${player.id}.position`) }}</p>
        </div>
        <div class="player__country">
          <p class="player__characteristic-title">{{ $t('Create_Profile.country') }}</p>
          <img :src="player.countryFlag" alt="" class="player__characteristic-data m-auto" />
        </div>
      </div>
      <img :src="logoMini" alt="" class="mx-auto" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import logoMini from '@/assets/icons/logo_mini.svg';
import { players } from '@/data/players';

import 'swiper/css';
import 'swiper/css/pagination';

const modules = [Pagination];
</script>

<style lang="scss">
.swiper {
  @apply w-full h-full;
}
.player {
  &__card {
    @apply flex flex-col p-4 bg-blue-light items-center;
    width: fit-content;
    background: url('../../assets/icons/cardBackground.svg') no-repeat top center;
    background-size: contain;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 16px 32px -16px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }
  &__age,
  &__position,
  &__country {
    @apply flex flex-col gap-2.5;
  }
  &__img {
    @apply h-auto;
    border-radius: 10px 10px 0 0;

    &-wrapper {
      @apply relative flex justify-center;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, #292f41 0%, rgba(41, 47, 65, 0) 25.12%);
      }
    }
  }
  &__container {
    @apply relative;
  }
  // Читаемый чип рейтинга: светлый текст на тёмной подложке.
  &__stats {
    @include text-12-montserrat;
    @apply absolute;
    color: #ffffff;
    top: 5px;
    left: 5px;
    border-radius: 8px;
    padding: 5px 8px;
    background: rgba(14, 17, 25, 0.78);
    border: 1px solid rgba(255, 255, 255, 0.14);
  }
  &__team {
    @apply absolute;
    top: 5px;
    right: 5px;
  }
  &__characteristic {
    @apply text-center flex justify-between text-sm gap-2 relative;
    top: -10px;
    &-title {
      @apply text-white opacity-50;
    }
  }
  &__name {
    @include text-20-white-montserrat;
    @apply text-center relative font-bold;
    top: -20px;
    line-height: 20px;
  }
}
</style>
