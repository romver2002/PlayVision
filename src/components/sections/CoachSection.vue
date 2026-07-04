<template>
  <section class="coach">
    <div class="coach__video">
      <div class="coach__video-wrapper hidden-left">
        <VideoPlayer :src="videoSrc" />
      </div>
    </div>
    <div class="coach__text hidden-right">
      <h2 class="coach__text-title">{{ $t('Coach.title') }}</h2>
      <p class="coach__text-description">{{ $t('Coach.description') }}</p>
      <div class="coach__text-buttons">
        <button class="btn-animated" type="button" @click="openLoginModal">
          {{ $t('Menu.Try_it_for_free') }}
        </button>
        <a
          class="coach__text-button"
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener"
        >
          {{ $t('Coach.Watch_the_trailer') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import VideoPlayer from '@/components/ui/VideoPlayer.vue';
import { useLoginModal } from '@/composables/useLoginModal';

const { open: openLoginModal } = useLoginModal();

// Видео весит десятки мегабайт, поэтому не бандлится,
// а лежит в public/ и подгружается по требованию.
const videoSrc = `${import.meta.env.BASE_URL}video/videoCoach.mp4`;
</script>

<style scoped lang="scss">
.coach {
  @apply flex justify-between gap-12;
  position: relative;
  @media (max-width: 1400px) {
    flex-direction: column-reverse;
  }

  // Сценическая подсветка позади секции — статичный градиент.
  &::before {
    content: '';
    position: absolute;
    inset: -120px -10vw;
    z-index: -1;
    pointer-events: none;
    background: radial-gradient(
      55% 45% at 50% 45%,
      rgba(1, 195, 142, 0.07) 0%,
      rgba(1, 195, 142, 0) 70%
    );
  }

  &__video {
    flex: 1 1 auto;
    max-width: 100%;

    // Тонкая световая кромка вместо толстого зелёного поля.
    &-wrapper {
      padding: 2px;
      border-radius: 24px;
      background: linear-gradient(180deg, rgba(1, 195, 142, 0.65) 0%, rgba(1, 195, 142, 0.08) 100%);
      box-shadow:
        0 32px 64px -24px rgba(0, 0, 0, 0.6),
        0 0 60px -20px rgba(1, 195, 142, 0.25);
      @media (max-width: 500px) {
        border-radius: 12px;
      }

      :deep(.video-player__video) {
        border-radius: 22px;
        @media (max-width: 500px) {
          border-radius: 10px;
        }
      }
    }
  }
  &__text {
    @apply flex flex-col justify-between gap-6;
    flex: 0 0 484px;
    max-width: 484px;
    @media (max-width: 1400px) {
      max-width: 100%;
      flex: content;
    }
    &-title {
      @include section-title;

      @media (min-width: 1401px) {
        text-align: left;

        &::after {
          margin: 14px 0 0;
          background: linear-gradient(90deg, #01c38e 0%, rgba(1, 195, 142, 0) 100%);
        }
      }
      @media screen and (max-width: 1400px) {
        @apply mb-6;
      }
    }
    &-description {
      @include text-20-white-montserrat;
    }
    // Кнопки не сжимают текст: каждая занимает естественную ширину,
    // при нехватке места переносится на новый ряд и растягивается.
    &-buttons {
      @apply flex flex-wrap gap-4 justify-center;

      > * {
        flex: 1 1 auto;
      }
    }
    &-button:last-child {
      @include btn-green-border;
      @apply flex justify-center items-center;
    }
  }
}
</style>
