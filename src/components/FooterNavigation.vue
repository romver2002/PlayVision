<template>
<footer class="footer" id="contacts" :style="{top: top}">
  <div class="footer__container container">
    <div class="footer__nav hidden-left">
      <div class="footer__nav-logo">
        <img src="../../public/content/icons/logo.svg">
      </div>
      <ul class="footer__nav-list">
        <li class="footer__nav-item">
          <a class="footer__nav-link" href="#news">{{ $t('Menu.News') }}</a>
        </li>
        <li class="footer__nav-item">
          <a class="footer__nav-link" href="#Price">{{ $t('Menu.Price') }}</a>
        </li>
        <li class="footer__nav-item">
          <a class="footer__nav-link" href="#Contacts">{{ $t('Menu.Contacts') }}</a>
        </li>
        <li class="footer__nav-item">
          <a class="footer__nav-link" href="#System_requirements">{{ $t('Menu.System_requirements') }}</a>
        </li>
      </ul>
    </div>
    <div class="footer__contactUs hidden-right">
      <p class="footer__contactUs-text">{{$t('Menu.Contact_us')}}</p>
      <a href="https://mail.google.com/" target="_blank" class="footer__contactUs-link">
        playvisionai@mail.ru
      </a>
      <div class="footer__contactUs-icons">
        <a href="https://t.me/romver_o" target="_blank" class="footer__contactUs-telegram"></a>
        <a href="https://vk.com/r.zverev2000" target="_blank" class="footer__contactUs-vk"></a>
        <a href="https://www.youtube.com/" target="_blank" class="footer__contactUs-youtube"></a>
      </div>
    </div>
  </div>
</footer>
</template>

<script setup>
  import {onMounted, ref} from "vue";

  const top = ref(0);
  onMounted(() => {
    const headerElement  = document.getElementsByClassName("header")[0];
    const footer = document.getElementsByClassName("footer")[0];
    if (headerElement) {
      if (footer && window.innerWidth < 767) {
        top.value = headerElement.offsetHeight
        console.log(headerElement.offsetHeight)
      }
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < 767) {
        top.value = headerElement.offsetHeight
      } else {
        top.value = 0
      }
    });
  });
</script>

<style lang="scss">
@use '../../public/content/styles/_mixins' as *;
  .footer{
    @apply w-full py-12 bg-blue-dark relative;

    &__container{
      @apply flex justify-between
    }

    &__nav{
      @apply flex;
      gap: 50px;
      @media (max-width: 771px) {
        @apply flex-col;
        gap: 25px;

      }
      &-list{
        @apply flex flex-col gap-4;
      }

      &-link{
        @apply font-light hover:text-grey;
        @include text-20-white-montserrat;
      }
    }
    &__contactUs{
      @apply flex flex-col items-end gap-4 text-white;
      &-text{
        @include text-20-white-montserrat;
      }
      &-link{
        @include text-20-white-montserrat;
        font-size: clamp(1.125rem, 1.75vw, 1.25rem);
        @apply font-light hover:text-grey;
      }
      &-icons{
        @apply flex gap-4;
      }
      &-telegram{
        @include background-hover('../../public/content/icons/telegram.svg','../../public/content/icons/telegram-hover.svg');
      }
      &-vk{
        @include background-hover('../../public/content/icons/vk.svg','../../public/content/icons/vk-hover.svg');
      }
      &-youtube{
        @include background-hover('../../public/content/icons/youtube.svg','../../public/content/icons/youtube-hover.svg');
      }
      &-telegram, &-vk, &-youtube{
        width: 57px;
        height: 57px;
        @media (max-width: 1100px) {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
</style>