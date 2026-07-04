<template>
  <div class="social-links">
    <a
      href="https://t.me/romver_o"
      target="_blank"
      rel="noopener"
      class="social-links__item social-links__item--telegram"
      aria-label="Telegram"
    ></a>
    <a
      href="https://vk.com/r.zverev2000"
      target="_blank"
      rel="noopener"
      class="social-links__item social-links__item--vk"
      aria-label="VK"
    ></a>
    <a
      href="https://www.youtube.com/"
      target="_blank"
      rel="noopener"
      class="social-links__item social-links__item--youtube"
      aria-label="YouTube"
    ></a>
  </div>
</template>

<style scoped lang="scss">
.social-links {
  @apply flex gap-4;

  &__item {
    width: 57px;
    height: 57px;
    @media (max-width: 1100px) {
      width: 40px;
      height: 40px;
    }

    &--telegram {
      @include background-hover(
        '../../assets/icons/telegram.svg',
        '../../assets/icons/telegram-hover.svg'
      );
    }
    &--vk {
      @include background-hover('../../assets/icons/vk.svg', '../../assets/icons/vk-hover.svg');
    }
    &--youtube {
      @include background-hover(
        '../../assets/icons/youtube.svg',
        '../../assets/icons/youtube-hover.svg'
      );
    }
  }
}
</style>
