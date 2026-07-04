<template>
  <section id="system-requirements" class="requirements">
    <h2 class="requirements__title hidden-right">{{ $t('Shoot_Match.title') }}</h2>
    <div class="requirements__body">
      <picture class="requirements__image hidden-left">
        <img :src="phoneImage" alt="" width="368" height="277" loading="lazy" decoding="async" />
      </picture>
      <div class="requirements__container hidden-right">
        <div
          v-for="group in ['minimum', 'recommended']"
          :key="group"
          class="requirements__group"
        >
          <h3 class="requirements__group-title">
            {{ $t(`Shoot_Match.requirements.${group}.title`) }}
          </h3>
          <ul class="requirements__group-list">
            <!-- eslint-disable-next-line vue/no-v-html — содержимое из собственных файлов локализации -->
            <li
              v-for="key in REQUIREMENT_KEYS"
              :key="key"
              class="requirements__group-item"
              v-html="$t(`Shoot_Match.requirements.${group}.${key}`)"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import phoneImage from '@/assets/img/phone.png';

const REQUIREMENT_KEYS = ['os', 'cpu', 'ram', 'storage', 'gpu'];
</script>

<style scoped lang="scss">
.requirements {
  @apply text-white flex flex-col gap-12 items-center;

  &__image {
    @apply flex items-end;
    @media (max-width: 991px) {
      @apply hidden;
    }
  }

  &__title {
    @include section-title;
  }

  &__body {
    @apply flex w-full;
    justify-content: center;
    gap: clamp(48px, 8vw, 120px);
  }

  &__container {
    @apply flex gap-5 h-max;
    @media (max-width: 991px) {
      @apply flex-col;
    }
  }

  &__group {
    padding: 28px 32px;
    @include card-premium;

    &-title {
      @include text-20-white-montserrat;
      @apply font-bold;
      font-size: clamp(1.25rem, 2.2vw, 1.5rem);
      border-left: 3px solid #01c38e;
      padding-left: 12px;
    }

    &-list {
      padding-left: 16px;
      margin-top: 12px;
      display: grid;
      gap: 6px;
    }

    &-item:before {
      content: '•';
      color: #fff;
      font-size: 1.2em;
      margin-right: 5px;
    }
  }
}
</style>
