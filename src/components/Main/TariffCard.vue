<template>
  <div class="tariff-card">
    <p class="title" :class="colorClass">{{ title }}</p>
    <p class="price" v-if="isMonthly"><b>{{ price.monthly }}</b> {{ currency }}</p>
    <p class="price" v-else><b>{{ price.annually }}</b> {{ currency }}</p>
    <div class="tariff-card__container">
      <ul class="flex flex-col gap-2 w-fit">
        <li v-for="(feature, index) in features" :key="index" class="flex gap-3 font-thin text">
          <img :src="feature.available ? '/content/icons/true.svg' : '/content/icons/false.svg'" alt="">
          <span class="tariff__feature-title">{{ feature.name }}</span>
        </li>
      </ul>
    </div>
    <button class="btn">{{$t('Tariff_Plans.buy')}}</button>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  name: "TariffPlan",
  props: {
    color: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Object,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    features: {
      type: Array,
      required: true,
    },
    isMonthly: {
      type: Boolean,
      required: true,
    },
  },
  setup(props){
    const colorClass = computed(() => {
      return {
        white: 'text-white',
        red: 'text-red',
        green: 'text-green',
      }[props.color] || '';
    });

    return {
      colorClass,
    }
  }
};
</script>

<style scoped lang="scss">
@use '../../../public/content/styles/_mixins' as *;
.tariff-card {
  @apply text-white relative w-full flex flex-col gap-10;
  padding: 50px 40px 40px;
  background: rgba(217, 217, 217, 0.05);
  backdrop-filter: blur(100px);
  border-radius: 50px;
  z-index: 1;
  overflow: hidden;
  transition: transform .3s ease-in;
  &:hover{
    transform: translateY(-15px);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50px;
    padding: 2px;
    background:linear-gradient(45deg,red,blue);
    mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
    mask-composite: exclude;
    z-index: -10;
  }

  &:first-child::before {

    background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 1),
            rgba(153, 153, 153, 0)
    );
  }

  &:nth-child(2)::before {
    background: linear-gradient(
            to bottom,
            rgba(1, 195, 142, 1),
            rgba(217, 217, 217, 0.05)
    );
  }

  &:last-child::before {
    background: linear-gradient(
            to bottom,
            rgba(244, 80, 80, 1),
            rgba(255, 255, 255, 0)
    );
  }

  &__container{
    @media (max-width: 1100px) {
      @apply flex;
    }
  }
}
.title{
  @include text-36-newZelek;
  @apply text-center;
  line-height: clamp(1.75rem, 4vw, 2.25rem);
}
.price{
  @include text-20-white-montserrat;
  @apply text-center;
}
.btn{
  @include btn-green-border;
  padding: 5px;
}
.tariff__feature-title{
  font-size: clamp(1.125rem, 2vw, 1.25rem);
}
</style>