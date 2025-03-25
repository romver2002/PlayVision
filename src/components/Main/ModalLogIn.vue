<template>
  <button @click="toggleModal" :class="customClass" type="button">
    {{textButton}}
  </button>
  <teleport to="body">
    <div
        id="static-modal"
        data-modal-backdrop="static"
        :inert="!isModalOpen"
        @click="toggleModal"
        :class="{
        'hidden': !isModalOpen,
        'modal fade': isModalOpen
      }"
    >
      <div class="modal__container hidden-right" @click.stop>
        <h2 class="text-3xl font-semibold mb-4">{{$t('Authorization.Log_in_or_create')}}</h2>
        <PhoneNumber v-model="userPhoneNumber" />
        <div class="flex gap-2 items-center">
          <input
              type="checkbox"
              :id="idCheckbox"
              class="custom-checkbox"
              v-model="isChecked"
          />
            <label
                :for="idCheckbox"
                class="checkbox-label"
            >
            <span class="checkbox-box"></span>
            <span class="ml-2">
              <a class="text-grey" href="https://yandex.ru/legal/rules/" target="_blank">
                {{$t('Authorization.Agreement_start')}}
              </a>
              {{$t('Authorization.Agreement_end')}}
            </span>
          </label>
        </div>

        <button class="btnLogIn">
          <p>{{$t('Authorization.Get_the_code')}}</p>
        </button>
        <div class="modal__line">
          <span class="modal__line-text">{{$t('Authorization.Or_log')}}</span>
        </div>
        <button class="btn">
          <img src="/content/icons/google.svg" alt="google" />
          <p>{{$t('Authorization.Google')}}</p>
        </button>
        <button class="btn">
          <img src="/content/icons/facebook.svg" alt="facebook" />
          <p>{{$t('Authorization.Facebook')}}</p>
        </button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import PhoneNumber from "@/components/Main/PhoneNumber.vue";
defineProps({
  customClass: {
    type: String,
    default: '',
  },
   textButton:{
    type: String,
     default: ''
   },
   idCheckbox: {
    type:String,
     default: 'checkbox1'
   },
   onOpen: Function
});
const isChecked = ref(false);

const userPhoneNumber = ref(null);
const isModalOpen = ref(false);
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
  isChecked.value = false;
  console.log(isModalOpen.value);

  document.body.style.overflow = isModalOpen.value ? "hidden" : '';
};
</script>

<style scoped lang="scss">
@use '../../../public/content/styles/_mixins' as *;

.btn-animated{
  @include btn-green-border-with-animation;
  padding: 12px 23px;
}
.btn{
  @include btn-green-border;
  @apply flex gap-5 w-full justify-center;
}
.btnLogIn{
  @include btn-green;
  @apply text-blue-dark w-full;
}
.modal{
  @apply fixed text-white inset-0 top-0 left-0 flex items-center justify-center bg-blue-middle-opacity-75 bg-opacity-50;
  backdrop-filter: blur(10px);
  z-index: 1050!important;
  &__container{
    @apply bg-blue-middle shadow-lg p-6 z-50 relative flex flex-col items-center gap-8;
    padding: clamp(1.75rem, 5vw, 3rem) clamp(1.75rem, 5vw, 3rem);
    border-radius: clamp(1.75rem, 5vw, 3rem);
    animation: blink-shadow-modal 3s infinite;
    max-width: 90%;
    @keyframes blink-shadow-modal {
      0%, 100% {
        box-shadow: 0 0 50px 2px #01C38E;
      }
      50% {
        box-shadow: 0 0 50px 2px rgba(1, 195, 142, 0.5);
      }
    }
  }
  &__line{
    @apply flex items-center justify-center relative w-full;
    &::before, &::after{
      content: '';
      flex: 1;
      height: 1px;
      background-color: #01C38E;
    }
    &::before{
      margin-right: 10px;
    }
    &::after{
      margin-left: 10px;
    }
    &-text{
    }
  }
}
.custom-checkbox {
display: none;
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
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.checkbox-box::after {
  content: '';
  width: 16px;
  height: 16px;
  background-image: url('../../../public/content/icons/checkMark.svg');
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
.checked-style {
  background-color: green;
  color: white;
  border: 2px solid green;
}

.unchecked-style {
  background-color: red;
  color: black;
  border: 2px solid red;
}
</style>