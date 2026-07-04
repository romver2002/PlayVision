<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="modal"
      role="dialog"
      aria-modal="true"
      :aria-label="$t('Authorization.Log_in_or_create')"
      @click="close"
    >
      <div class="modal__container" @click.stop>
        <h2 class="text-3xl font-semibold mb-4">{{ $t('Authorization.Log_in_or_create') }}</h2>
        <form class="modal__form" @submit.prevent="requestCode">
          <PhoneInput v-model="phone" />
          <div class="flex gap-2 items-center">
            <input
              id="agreement-checkbox"
              v-model="isChecked"
              type="checkbox"
              class="custom-checkbox"
            />
            <label for="agreement-checkbox" class="checkbox-label">
              <span class="checkbox-box"></span>
              <span class="ml-2">
                <a
                  class="text-grey"
                  href="https://yandex.ru/legal/rules/"
                  target="_blank"
                  rel="noopener"
                >
                  {{ $t('Authorization.Agreement_start') }}
                </a>
                {{ $t('Authorization.Agreement_end') }}
              </span>
            </label>
          </div>

          <button class="btnLogIn" type="submit" :disabled="!canSubmit">
            <p>{{ $t('Authorization.Get_the_code') }}</p>
          </button>
        </form>
        <div class="modal__line">
          <span>{{ $t('Authorization.Or_log') }}</span>
        </div>
        <button class="btn" type="button">
          <img :src="googleIcon" alt="" />
          <p>{{ $t('Authorization.Google') }}</p>
        </button>
        <button class="btn" type="button">
          <img :src="facebookIcon" alt="" />
          <p>{{ $t('Authorization.Facebook') }}</p>
        </button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';

import facebookIcon from '@/assets/icons/facebook.svg';
import googleIcon from '@/assets/icons/google.svg';
import PhoneInput from '@/components/ui/PhoneInput.vue';
import { useLoginModal } from '@/composables/useLoginModal';

const { isOpen, close } = useLoginModal();

const phone = ref('');
const isChecked = ref(false);

// PhoneInput эмитит непустое значение только для полностью заполненного номера.
const canSubmit = computed(() => isChecked.value && phone.value !== '');

const requestCode = () => {
  // TODO: подключить бэкенд отправки кода подтверждения.
};

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    close();
  }
};

watch(isOpen, (open) => {
  if (open) {
    isChecked.value = false;
    phone.value = '';
    document.addEventListener('keydown', onKeydown);
  } else {
    document.removeEventListener('keydown', onKeydown);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped lang="scss">
.btn {
  @include btn-green-border;
  @apply flex gap-5 w-full justify-center;
}

.btnLogIn {
  @include btn-green;
  @apply text-blue-dark w-full;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.modal__form {
  @apply flex flex-col items-center gap-8 w-full;
}

.modal {
  @apply fixed text-white inset-0 flex items-center justify-center bg-blue-middle-opacity-75;
  backdrop-filter: blur(10px);
  z-index: 1050;

  &__container {
    @apply bg-blue-middle shadow-lg p-6 z-50 relative flex flex-col items-center gap-8;
    padding: clamp(1.75rem, 5vw, 3rem);
    border-radius: clamp(1.75rem, 5vw, 3rem);
    animation: modal-slide-in 1s ease;
    max-width: 90%;

    // Пульсирующее свечение — на псевдоэлементе через opacity (см. _mixins.scss).
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      box-shadow: 0 0 50px 2px #01c38e;
      animation: pulse-glow-modal 3s infinite;
      pointer-events: none;
    }

    @keyframes modal-slide-in {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes pulse-glow-modal {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  }

  &__line {
    @apply flex items-center justify-center relative w-full;
    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: #01c38e;
    }
    &::before {
      margin-right: 10px;
    }
    &::after {
      margin-left: 10px;
    }
  }
}

// Чекбокс скрыт визуально, но остаётся фокусируемым с клавиатуры.
.custom-checkbox {
  position: absolute;
  width: 1px;
  height: 1px;
  clip-path: inset(50%);
  overflow: hidden;
}

.custom-checkbox:focus-visible + .checkbox-label .checkbox-box {
  outline: 2px solid #01c38e;
  outline-offset: 2px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-box {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-radius: 4px;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.checkbox-box::after {
  content: '';
  width: 16px;
  height: 16px;
  background-image: url('../../assets/icons/checkMark.svg');
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-checkbox:checked + .checkbox-label .checkbox-box {
  border-color: white;
}

.custom-checkbox:checked + .checkbox-label .checkbox-box::after {
  opacity: 1;
}
</style>
