<template>
  <section id="news" class="news">
    <h2 class="news__title hidden-right">{{ $t('News.title') }}</h2>
    <div class="news__swiper hidden-left">
      <swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="20"
        :pagination="{ clickable: true }"
        :breakpoints="{
          1200: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }"
      >
        <swiper-slide v-for="index in 4" :key="index" class="news__card">
          <div class="news__card-blur"></div>
          <p class="news__card-description">{{ $t(`News.cards.${index}.description`) }}</p>
          <img
            class="news__card-img"
            :src="images[index - 1]"
            alt=""
            width="494"
            height="272"
            loading="lazy"
            decoding="async"
          />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import news1 from '@/assets/img/news1.png';
import news2 from '@/assets/img/news2.png';
import news3 from '@/assets/img/news3.png';
import news4 from '@/assets/img/news4.png';

import 'swiper/css';
import 'swiper/css/pagination';

const modules = [Pagination];
const images = [news1, news2, news3, news4];
</script>

<style lang="scss">
.swiper {
  overflow: hidden;
  @apply flex flex-col;
  gap: 16px;
}
.swiper-pagination {
  width: 100%;
  text-align: center;
  z-index: 10;
  pointer-events: none;
  position: relative !important;
  & .swiper-pagination-bullet-active {
    @apply bg-green;
    width: 24px;
    border-radius: 5px;
  }
  & .swiper-pagination-bullet {
    @apply bg-green-dark mx-0.5;
    width: 10px;
    height: 10px;
    pointer-events: auto;
    transition: width 0.3s ease;
  }
}
.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 2.5px;
}
.swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: 0;
}

.news {
  @apply flex flex-col gap-12;

  &__title {
    @include section-title;
  }

  &__swiper {
    overflow-y: visible !important;
  }

  &__card {
    position: relative;
    width: 200px;
    border-radius: 16px;
    transition: transform 0.3s ease;
    z-index: 1;

    // Зелёный ореол при наведении (готовая тень, анимируется только opacity).
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 16px;
      box-shadow: 0 16px 40px -8px rgba(1, 195, 142, 0.25);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: -1;
    }

    &:hover {
      transform: translateY(-10px);
      z-index: 10;

      &::after {
        opacity: 1;
      }

      & .news__card-blur {
        opacity: 0;
        visibility: hidden;
      }

      & .news__card-description {
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
      transition:
        opacity 0.3s ease,
        visibility 0.3s;
    }

    &-img {
      position: relative;
      z-index: 0;
      border-radius: 16px;
      width: 100%;
    }

    // Затемнение снизу вверх: верх фото чистый, текст поверх низа читается.
    &-blur {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: linear-gradient(180deg, rgba(10, 13, 20, 0) 35%, rgba(10, 13, 20, 0.88) 100%);
      border-radius: 16px;
      transition:
        opacity 0.3s ease,
        visibility 0.3s;
    }
  }
}
</style>
