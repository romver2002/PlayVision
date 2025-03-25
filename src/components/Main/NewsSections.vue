<template>
  <div class="news" id="news">
    <div class="news__title hidden-right">{{ $t('News.title') }}</div>
    <div class="news__swiper hidden-left">
      <swiper
          :modules="[Pagination]"
          :slides-per-view="3"
              :space-between="20"
              :pagination="{ clickable: true }"
              :breakpoints="{
          1200: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1 }
        }">
        <swiper-slide v-for="index in 4" :key="index" class="news__card">
          <div class="news__card-blur"></div>
          <p class="news__card-description">{{ $t(`News.cards.${index}.description`) }}</p>
          <img class="news__card-img" :src="images[index - 1]" alt="">
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const images = [
  require('../../../public/img/news1.png'),
  require('../../../public/img/news2.png'),
  require('../../../public/img/news3.png'),
  require('../../../public/img/news4.png'),
];
</script>

<style lang="scss">
@use '../../../public/content/styles/_mixins' as *;
.swiper {
  overflow: hidden;
  @apply flex flex-col-reverse gap-2;
}
.swiper-pagination {
  width: 100%;
  text-align: end;
  z-index: 10;
  pointer-events: none;
  position: relative !important;
  & .swiper-pagination-bullet-active{
    @apply bg-green;
  }
  & .swiper-pagination-bullet{
    @apply bg-green-dark mx-0.5;
    width: 10px;
    height: 10px;
    pointer-events: auto;
  }
}
.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet{
  margin: 0 2.5px;
}
.swiper-pagination-bullets.swiper-pagination-horizontal{
  bottom: 0;
}
.news {
  @apply flex flex-col gap-12;
  //overflow-y: visible !important;

  &__title {
    @include text-36-newZelek;
    @apply text-green text-center;
  }

  &__swiper{
    overflow-y: visible !important;
  }

  &__card {
    position: relative;
    width: 200px;
    transition: all 0.3s ease;
    z-index: 1;

    &:hover {
      transform: translateY(-10px);
      z-index: 10;

      & .news__card-blur {
        opacity: 0;
        visibility: hidden;
      }

      & .news__card-description{
        opacity: 0;
        visibility: hidden;
      }
    }

    &-description {
      @include text-20-white-montserrat;
      @apply absolute z-20;
      bottom: 20px;
      left: 20px;
      width: calc(100% - 40px);
      transition: all 0.3s ease;
    }

    &-img{
      position: relative;
      z-index: 0;
      border-radius: 12px;
      width: 100%;
    }
    &-blur{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 2;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 12px;
      transition: all 0.3s ease;
    }
  }
}
</style>