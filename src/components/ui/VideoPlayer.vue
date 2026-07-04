<template>
  <div class="video-player">
    <video
      ref="videoEl"
      class="video-player__video"
      :src="src"
      :controls="started"
      :poster="posterImage"
      preload="none"
      loop
      playsinline
      @play="started = true"
    ></video>
    <button
      v-show="!started"
      class="video-player__play"
      type="button"
      :aria-label="$t('Coach.Play_video')"
      @click="play"
    >
      <img :src="playIcon" alt="" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import playIcon from '@/assets/img/player.png';
import posterImage from '@/assets/img/video-poster.jpg';

defineProps({
  src: {
    type: String,
    required: true,
  },
});

const videoEl = ref(null);
const started = ref(false);

const play = () => {
  videoEl.value?.play();
};
</script>

<style scoped lang="scss">
.video-player {
  position: relative;

  &__video {
    display: block;
    width: 100%;
    aspect-ratio: 2.97 / 1;
    height: auto;
    background: linear-gradient(0deg, rgba(0, 46, 34, 0.5) 0%, rgba(0, 46, 34, 0) 100%);
  }

  &__play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: none;
    border: none;
    cursor: pointer;
    transition: scale 600ms ease-in-out;

    &:hover,
    &:focus {
      scale: 1.1;
    }

    @media (max-width: 500px) {
      scale: 0.8;
    }
  }
}
</style>
