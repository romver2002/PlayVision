<template>
<div class="requirements">
  <div class="requirements__title hidden-right">{{$t('Shoot_Match.title')}}</div>
  <div class="requirements__body">
    <picture class="requirements__image hidden-left">

      <img
          ref="backgroundImage"
          src="/img/phone.png"
          @load="setBgHeight"
          alt="Background"
      />
    </picture>
    <div class="requirements__container hidden-right">
      <div class="requirements__minimum">
        <div class="requirements__minimum-title">
          {{$t('Shoot_Match.requirements.minimum.title')}}
        </div>
        <ul class="requirements__minimum-list">
          <li class="requirements__minimum-item" v-html="$t('Shoot_Match.requirements.minimum.os')"></li>
          <li class="requirements__minimum-item" v-html="$t('Shoot_Match.requirements.minimum.cpu')"></li>
          <li class="requirements__minimum-item" v-html="$t('Shoot_Match.requirements.minimum.ram')"></li>
          <li class="requirements__minimum-item" v-html="$t('Shoot_Match.requirements.minimum.storage')"></li>
          <li class="requirements__minimum-item" v-html="$t('Shoot_Match.requirements.minimum.gpu')"></li>
        </ul>
      </div>

      <div class="requirements__recommended">
        <div class="requirements__recommended-title">
          {{$t('Shoot_Match.requirements.recommended.title')}}
        </div>
        <ul class="requirements__recommended-list">
          <li class="requirements__recommended-item" v-html="$t('Shoot_Match.requirements.recommended.os')"></li>
          <li class="requirements__recommended-item" v-html="$t('Shoot_Match.requirements.recommended.cpu')"></li>
          <li class="requirements__recommended-item" v-html="$t('Shoot_Match.requirements.recommended.ram')"></li>
          <li class="requirements__recommended-item" v-html="$t('Shoot_Match.requirements.recommended.storage')"></li>
          <li class="requirements__recommended-item" v-html="$t('Shoot_Match.requirements.recommended.gpu')"></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import {onMounted, onUnmounted, ref, watch} from "vue";

const backgroundImage = ref(null);
const bgHeight = ref(0);
const bgWidth = ref(0);
const screenWidth = ref(window.innerWidth);
const topPosition = ref(0);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};
const updateTopPosition = () => {
  const element = document.querySelector('.requirements__minimum');
  const image = document.querySelector('.requirements__image');

  if (element && image) {
    const rect = element.getBoundingClientRect();
    topPosition.value = rect.top + window.scrollY;

    // Если ширина экрана меньше 991px, задаем top для изображения
    if (screenWidth.value < 991) {
      image.style.position = 'absolute';
      image.style.top = `${topPosition.value}px`;
    } else {
      // Убираем стили, если ширина экрана больше 991px
      image.style.position = '';
      image.style.top = '';
    }
  }
};
watch(screenWidth, updateTopPosition);

const setBgHeight = () => {
  if (backgroundImage.value) {
    bgHeight.value = backgroundImage.value.naturalHeight;
    bgWidth.value = backgroundImage.value.naturalWidth;
  }
};
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
  updateTopPosition();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});
</script>

<style scoped lang="scss">
  @use '../../../public/content/styles/_mixins' as *;
  .requirements {
    @apply text-white flex flex-col gap-12 items-center;
    
    &__image{
      @apply flex items-end;
      @media (max-width: 991px) {
        @apply hidden;
      }
    }
    
    &__title{
      @include text-36-newZelek;
      @apply text-green text-center;
    }
    
    &__body{
      @apply flex w-full justify-between;
      @media (max-width:991px) {
        @apply justify-center;
      }
    }
    
    &__container{
      @apply flex gap-5 h-max mb-7;
      @media (max-width:991px) {
        @apply flex-col;
      }
    }
    &__minimum{
      &-title{
        border-left: 3px solid;
        @include text-20-white-montserrat;
        @apply border-green pl-1.5 text-3xl font-bold;

      }
      &-list{
        padding-left: 17px;
        margin-top: 7px;
      }
      &-item:before{
        content: "•";
        color: #fff;
        font-size: 1.2em;
        margin-right: 5px;
      }
    }
    &__recommended{
      &-title{
        border-left: 3px solid;
        @include text-20-white-montserrat;
        @apply border-green pl-1.5 text-3xl font-bold;

      }
      &-list{
        padding-left: 17px;
        margin-top: 7px;
      }
      &-item:before{
        content: "•";
        color: #fff;
        font-size: 1.2em;
        margin-right: 5px;
      }
    }
  }
</style>