<template>
  <div class="phone-input-container relative w-full">
    <div class="input-wrapper flex items-center bg-blue-light rounded-full p-3">
      <button
        class="country-selector flex items-center"
        type="button"
        aria-haspopup="listbox"
        :aria-expanded="isDropdownOpen"
        @click="toggleDropdown"
      >
        <img :src="selectedCountry.flag" alt="" class="flag-icon" />
        <img :src="arrowDownIcon" alt="" class="arrow-icon ml-2" />
        <span class="country-code ml-5">{{ selectedCountry.code }}</span>
      </button>

      <input
        type="tel"
        placeholder="000 000-00-00"
        class="phone-input flex-1 ml-2"
        :value="phoneNumber"
        :aria-label="$t('Authorization.Phone')"
        @input="onInput"
        @blur="onBlur"
      />
    </div>

    <ul v-if="isDropdownOpen" class="dropdown-menu absolute shadow-lg rounded-lg mt-2">
      <li
        v-for="country in COUNTRIES"
        :key="country.id"
        class="dropdown-item flex items-center p-2 cursor-pointer"
        @click="selectCountry(country)"
      >
        <img :src="country.flag" alt="" class="flag-icon" />
        <span class="country-code ml-2">{{ country.code }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

import arrowDownIcon from '@/assets/icons/arrow-down.svg';
import belarusFlag from '@/assets/icons/belarus.svg';
import kazakhstanFlag from '@/assets/icons/kazakhstan.svg';
import russiaFlag from '@/assets/icons/russia.svg';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const COUNTRIES = [
  { id: 'ru', code: '+7', flag: russiaFlag },
  { id: 'by', code: '+375', flag: belarusFlag },
  { id: 'kz', code: '+7', flag: kazakhstanFlag },
];

const MASK = '___ ___-__-__';

const phoneNumber = ref('');
const isDropdownOpen = ref(false);
const selectedCountry = ref(COUNTRIES[0]);

// Родитель может сбросить значение (например, при повторном открытии модалки).
watch(
  () => props.modelValue,
  (value) => {
    if (!value) {
      phoneNumber.value = '';
    }
  }
);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectCountry = (country) => {
  selectedCountry.value = country;
  isDropdownOpen.value = false;
  phoneNumber.value = '';
  emitValue();
};

// Приводит ввод к маске «000 000-00-00», оставляя только цифры.
const applyMask = (value) => {
  const digits = value.replace(/\D/g, '');
  let i = 0;
  let masked = MASK.replace(/_/g, () => (i < digits.length ? digits.charAt(i++) : '_'));

  const firstEmpty = masked.indexOf('_');
  if (firstEmpty !== -1) {
    masked = masked.slice(0, Math.max(firstEmpty, 0)).replace(/[\s-]+$/, '');
  }
  return masked;
};

// Наружу уходит номер в международном формате (без «+») и только когда
// маска заполнена целиком — иначе пустая строка, чтобы форма не считала
// частичный ввод валидным номером.
const emitValue = () => {
  const digits = phoneNumber.value.replace(/\D/g, '');
  emit(
    'update:modelValue',
    digits.length === 10 ? selectedCountry.value.code.replace(/\D/g, '') + digits : ''
  );
};

const onInput = (event) => {
  phoneNumber.value = applyMask(event.target.value);
  event.target.value = phoneNumber.value;
  emitValue();
};

const onBlur = (event) => {
  if (event.target.value.replace(/\D/g, '').length < 3) {
    phoneNumber.value = '';
    event.target.value = '';
    emitValue();
  }
};
</script>

<style scoped lang="scss">
input {
  @apply w-full text-xl font-thin;
  background: none;
  &:focus-visible {
    outline: none;
  }
}

// Видимый индикатор фокуса на обёртке вместо стандартного outline у input.
.input-wrapper:focus-within {
  outline: 2px solid #01c38e;
  outline-offset: 2px;
}

.phone-input-container {
  position: relative;
}

.country-selector {
  cursor: pointer;
}

.dropdown-menu {
  @apply absolute bg-blue-light rounded-lg mt-2 z-10;
  max-height: 200px;
  overflow-y: auto;

  .dropdown-item {
    @apply flex items-center p-2 hover:bg-green cursor-pointer;

    .country-code {
      margin-left: auto;
      font-weight: bold;
    }
  }
}

.flag-icon {
  width: 30px;
  height: 30px;
}
</style>
