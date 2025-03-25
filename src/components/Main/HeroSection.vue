<template>
  <div class="hero" :style="{ height: bgHeight + 'px' }">
    <div class="hero__bg" :style="{ width: bgWidth + 'px', margin: '0 auto' }">
      <div class="hero__gradient"></div>
    </div>
    <div class="hero__container">
      <div class="container">
        <div class="hero__text hidden-left">
          <p class="hero__text-title" v-html="$t('Hero.Title')"></p>
          <p class="hero__text-description">
            {{ $t('Hero.Description.Review') }}
            <span class="text-green">{{ $t('Hero.Description.Your') }}</span>
            {{ $t('Hero.Description.Game') }}
          </p>
        </div>
      </div>
    </div>
    <picture>
      <source
          srcset="/img/main_background_small.jpg"
          media="(max-width: 767px)"
      />
      <source
          srcset="/img/main_background_medium.jpg"
          media="(max-width: 1399px)"
      />
      <source
          srcset="/img/main_background.jpg"
          media="(min-width: 1400px)"
      />
      <img
          ref="backgroundImage"
          src="/img/main_background.jpg"
          @load="setBgHeight"
          alt="Background"
          style="visibility: hidden;"
      />
    </picture>
  </div>
</template>

<script setup>
  import {onMounted, ref} from 'vue';

  const bgHeight = ref(0);
  const bgWidth = ref(0);
  const backgroundImage = ref(null);
  const header = ref(null);

  const setBgHeight = () => {
    if (backgroundImage.value) {
      bgHeight.value = backgroundImage.value.naturalHeight;
      bgWidth.value = backgroundImage.value.naturalWidth;
    }
  };

  onMounted(()=>{
    header.value = document.getElementsByClassName('header')[0];
  })
</script>

<style scoped lang="scss">
  @use '../../../public/content/styles/_mixins' as *;

  .hero {
    @apply relative;

    &__bg {
      @apply h-full bg-no-repeat relative bg-contain;
      background: url('../../../public/img/main_background.jpg') no-repeat right  center;
      margin: 0 auto;
      z-index: 1;
      @media (max-width: 767px) {
        position: relative;
      }
    }

    &__gradient {
      @apply w-full h-full bg-no-repeat absolute top-0 left-0 z-10;
      background:
          linear-gradient(90deg, #182029 0%, rgba(82, 75, 75, 0.00) 100%),
          radial-gradient(52% 64.35% at 64.34% 53.47%, rgba(48, 43, 43, 0.00) 17.45%, #182129 100%);
      @media (max-width: 1400px) {
        background:
            linear-gradient(90deg, #182029 0%, rgba(82, 75, 75, 0.00) 100%),
            radial-gradient(52% 64.35% at 64.34% 53.47%, rgba(48, 43, 43, 0.00) 17.45%, #182129 100%);
      }
      @media (max-width: 767px) {
        background:
            linear-gradient(90deg, #182029 0%, rgba(82, 75, 75, 0.00) 100%),
            radial-gradient(52% 64.35% at 64.34% 53.47%, rgba(48, 43, 43, 0.00) 17.45%, rgba(24, 33, 41, 0.42) 100%);
      }
    }

    &__container {
      @apply flex items-center justify-center absolute top-0 left-0 w-full h-full z-10;
    }

    &__text {
      @apply flex flex-col gap-28 text-white overflow-hidden;
      @include text-48-newZelek ;
      @media (max-width: 767px) {
        @apply text-center gap-12 absolute bottom-3.5;
      }
    }
  }
</style>