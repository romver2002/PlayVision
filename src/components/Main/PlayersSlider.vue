<template>
  <swiper
      :modules="[Pagination]"
      :slides-per-view="3"
      :pagination="{ clickable: true }"
      :space-between="10"
      :breakpoints="{
            1340: { slidesPerView: 3 },
            1024: { slidesPerView: 2 },
            650: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }">
    <swiper-slide v-for="(index) in 9" :key="index" class="player__card " style="width: fit-content">
      <div class="player__container">
        <div class="player__img-wrapper">
          <img :src="$t(`Players[${index - 1}].image`)" alt="Player Image" class="player__img" />
        </div>
        <p class="player__stats">{{ $t(`Players[${index - 1}].stats`) }}</p>
        <img :src="$t(`Players[${index - 1}].football_team`)" alt="Player Image" class="player__team" />
      </div>

      <div class="player__name">
        <p>{{ $t(`Players[${index - 1}].name`) }} </p>
        <p>{{ $t(`Players[${index - 1}].surname`) }} </p>
      </div>

      <div class="player__characteristic">
        <div class="player__age">
          <p class="player__characteristic-title">{{ $t('Create_Profile.age')}}</p>
          <p class="player__characteristic-data">{{ $t(`Players[${index - 1}].age`) }}</p>
        </div>
        <div class="player__position">
          <p class="player__characteristic-title">{{ $t('Create_Profile.position')}}</p>
          <p class="player__characteristic-data">{{ $t(`Players[${index - 1}].position`) }}</p>
        </div>
        <div class="player__country">
          <p class="player__characteristic-title">{{ $t('Create_Profile.country')}}</p>
          <img :src="$t(`Players[${index - 1}].country`)" alt="country" class="player__characteristic-data m-auto"/>
        </div>
      </div>
      <img src="../../../public/content/icons/logo_mini.svg" alt="logo_mini" class="mx-auto">
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
</script>

<style lang="scss">
@use '../../../public/content/styles/_mixins' as *;
.swiper{
  @apply w-full h-full;
}
.player{
  &__card{
    @apply flex flex-col p-4 bg-blue-light items-center;
    width: fit-content;
    background: url("../../../public/content/icons/cardBackground.svg") no-repeat top center;
    background-size: contain;
    border-radius: 10px;
    overflow: hidden;
  }
  &__age,&__position,&__country{
    @apply flex flex-col gap-2.5;
  }
  &__img{
    @apply h-auto ;
    border-radius: 10px 10px 0 0;

    &-wrapper{
      @apply relative flex justify-center;

      &:before{
          content: '';
          position: absolute;
          top: 0;
          left: 0;
        width: 100%;
        height: 100%;
          background: linear-gradient(0deg, #292F41 0%, rgba(41, 47, 65, 0.00) 25.12%);
      }
    }
  }
  &__container{
    @apply relative ;
  }
  &__stats{
    @include text-12-montserrat;
    @apply absolute text-blue-middle;
    top: 5px;
    left: 5px;
    border-radius: 7px;
    padding: 5px;
    background: rgba(255, 255, 255, 0.5);
  }
  &__team{
    @apply absolute;
    top: 5px;
    right: 5px;
  }
  &__characteristic{
    @apply text-center flex justify-between text-sm gap-2 relative;
    top:-10px;
    &-title{
      @apply text-white opacity-50;
    }
  }
  &__name{
    @include text-20-white-montserrat;
    @apply text-center relative font-bold;
    top: -20px;
    line-height: 20px;
  }
}
</style>