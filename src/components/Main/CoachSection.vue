<template>
  <div class="coach">
    <div class="coach__video">
      <div class="coach__video-wrapper hidden-left">
        <VideoPlayer ref="videoPlayer" :videoSrc="src"/>
      </div>
    </div>
    <div class="coach__text hidden-right">
      <div class="coach__text-title">{{ $t('Coach.title') }}</div>
      <div class="coach__text-description">{{ $t('Coach.description') }}</div>
      <div class="coach__text-buttons">
        <ModalLogIn custom-class="btn-animated" id-checkbox="checkbox2" :text-button="$t('Menu.Try_it_for_free')"></ModalLogIn>
        <a class="coach__text-button" href="https://www.youtube.com/" target="_blank">{{ $t('Coach.Watch_the_trailer') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import VideoPlayer from './VideoPlayer.vue';
import src from '../../../public/video/videoCoach.mp4'
import ModalLogIn from "@/components/Main/ModalLogIn.vue";
</script>

<style scoped lang="scss">
@use '../../../public/content/styles/_mixins' as *;
  .coach{
    @apply flex justify-between gap-12;
    @media (max-width: 1400px) {
      flex-direction: column-reverse;
    }
    &__video{
      flex: 1 1 auto; // Блок видео будет гибким и уменьшаться при необходимости
      max-width: 100%;
      &-wrapper{
        padding: 15px;
        border-radius: 20px;
        background: radial-gradient(107.75% 66.46% at 50.06% 50.12%, #1A1E29 0%, #008F68 100%);
        @media (max-width: 500px) {
          padding: 10px;
          border-radius: 7px;
        }
      }
    }
    &__text{
      @apply flex flex-col justify-between gap-6;
      flex: 0 0 484px;
      max-width: 484px;
      @media (max-width: 1400px) {
        max-width: 100%;
        flex: content;
      }
      &-title{
        @include text-36-newZelek;
        @apply text-green;
        @media screen and (max-width: 1400px) {
          @apply text-center mb-6;
        }
      }
      &-description{
        @include text-20-white-montserrat;
        text-indent: 30px;
      }
      &-buttons{
        @apply flex gap-6 justify-center;
        @media screen and (max-width: 615px) {
          @apply flex-col gap-2;
        }
        & *{
          @apply flex-shrink w-full;
        }
      }
      &-button:first-child{
        @include btn-green-border-with-animation;
      }
      &-button:last-child{
        @include btn-green;
        @apply flex justify-center items-center;
      }
    }
  }
</style>