<template>
  <section class="create">
    <div class="create__text hidden-left">
      <h2 class="create__title">{{ $t('Create_Profile.title') }}</h2>
      <div class="create__list">
        <div v-for="index in 3" :key="index" class="create__item">
          <p>{{ $t(`Create_Profile.list.${index}.text`) }}</p>
        </div>
      </div>
      <button class="btn-animated" type="button" @click="openLoginModal">
        {{ $t('Menu.Try_it_for_free') }}
      </button>
    </div>
    <div class="create__slider hidden-right">
      <PlayersSlider />
    </div>
  </section>
</template>

<script setup>
import PlayersSlider from '@/components/ui/PlayersSlider.vue';
import { useLoginModal } from '@/composables/useLoginModal';

const { open: openLoginModal } = useLoginModal();
</script>

<style scoped lang="scss">
.create {
  @apply flex gap-5 justify-between text-white;
  width: 100%;
  @media screen and (max-width: 650px) {
    @apply flex-col;
  }

  &__title {
    @include section-title;

    @media (min-width: 651px) {
      text-align: left;

      &::after {
        margin: 14px 0 0;
        background: linear-gradient(90deg, #01c38e 0%, rgba(1, 195, 142, 0) 100%);
      }
    }
  }
  &__list {
    @apply flex flex-col gap-2;
  }
  &__slider {
    flex-grow: 1;
    overflow: hidden;
    width: 100%;
  }
  &__item {
    @include text-20-white-montserrat;
  }
  &__text {
    @apply font-light flex flex-col gap-8 w-full;
    flex-grow: 1;

    > .btn-animated {
      align-self: flex-start;
      min-width: 280px;

      @media (max-width: 650px) {
        align-self: stretch;
        min-width: 0;
      }
    }
  }
}
</style>
