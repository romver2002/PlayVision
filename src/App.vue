<template>
  <HeaderNavigation></HeaderNavigation>

  <div class="blurred-wrapper">
    <div class="MainSection" :style="{top: top + 'px'}">
      <MainSection></MainSection>
    </div>
    <FooterNavigation></FooterNavigation>
  </div>
  <img class="figure figure_1" src="../public/content/icons/figures/1.svg" alt="">

      <img class="figure figure_2" src="../public/content/icons/figures/2.svg" alt="">
      <img class="figure figure_3" src="../public/content/icons/figures/3.svg" alt="">
      <img class="figure figure_4" src="../public/content/icons/figures/4.svg" alt="">
      <img class="figure figure_5" src="../public/content/icons/figures/5.svg" alt="">
</template>

<script>
import {onMounted, ref} from "vue";
import {useI18n} from 'vue-i18n';
import HeaderNavigation from "@/components/HeaderNavigation.vue";
import FooterNavigation from "@/components/FooterNavigation.vue";
import MainSection from "@/components/MainSection.vue";

export default {
  name: 'App',
  components: {MainSection, FooterNavigation, HeaderNavigation },
  setup() {
    const { locale } = useI18n();
    const lang = ref(localStorage.getItem('lang') || '');
    const top = ref(0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add('show');
       }else{
         entry.target.classList.remove('show');
       }
      });
    });

    onMounted(() => {
      const isRu = navigator.language;
      if (lang.value !== '' ) {
        locale.value = lang.value;
      }else{
        if (isRu === 'ru-RU' || isRu === 'ru') {
          lang.value = 'ru';
          localStorage.setItem('lang', 'ru');
          locale.value = 'ru';
        } else {
          lang.value = 'en';
          localStorage.setItem('lang', 'en');
          locale.value = 'en';
        }
      }

      const hiddenElementsLeft = document.querySelectorAll('.hidden-left');
      const hiddenElementsRight = document.querySelectorAll('.hidden-right');

      hiddenElementsLeft.forEach((el) => observer.observe(el));
      hiddenElementsRight.forEach((el) => observer.observe(el));
    });

    return {
      lang,
      top
    };
  },
}
</script>

<style lang="scss">
#app{
  overflow-x: hidden;
  @apply bg-blue-middle;

  .blurred-wrapper{
    background: rgba(0, 0, 0, 0.07);

    backdrop-filter: blur(200px);
    position: relative;
    z-index: 1;
  }
}
.MainSection{
  position: relative;
}
.figure{
  position: absolute;
  z-index: 0;
  max-width: 100%;
  &_1{
    top: 1250px;
    left: 10%;
    @media (max-width: 1100px) {
      left: 0;
    }
  }
  &_2{
    top: 1350px;
    right: 15%;
  }
  &_3{
    top: 2000px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  &_4{
    top: 3400px;
    left: 16%;
    @media (max-width: 1100px) {
      left: 0;
    }
  }
  &_5{
    top: 3100px;
    right: 12%;
  }
}
.hidden-left{
  opacity: 0;
  filter: blur(5px);
  transform: translateX(-100%);
  transition: all 1s ease;
}
.hidden-right{
  opacity: 0;
  filter: blur(5px);
  transform: translateX(100%);
  transition: all 1s;
}
.show{
  opacity: 1;
  filter: blur(0);
  transform: translateX(0);
}
@media (prefers-reduced-motion) {
  .hidden-left, .hidden-right{
    transition: none;
  }
}
</style>
