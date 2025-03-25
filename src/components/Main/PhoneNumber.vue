<template>
  <div class="phone-input-container relative w-full">
    <div class="input-wrapper flex items-center bg-blue-light rounded-full p-3">
      <!-- Country Selector -->
      <div class="country-selector flex items-center cursor-pointer" @click="toggleDropdown">
        <img :src="selectedCountry.flag" alt="flag" class="flag-icon" />
        <img src="/content/icons/arrow-down.svg" alt="arrow-down" class="arrow-icon ml-2" />
        <span class="country-code ml-5">{{ selectedCountry.code }}</span>
      </div>

      <input
          type="tel"
          placeholder="000 000-00-00"
          class="phone-input flex-1 ml-2"
          v-model="phoneNumber"
          @input="mask"
          @focus="mask"
          @blur="blurHandler"
      />
    </div>

    <!-- Dropdown Menu -->
    <ul v-if="isDropdownOpen" class="dropdown-menu absolute bg-white shadow-lg rounded-lg mt-2">
      <li
          v-for="country in countries"
          :key="country.code"
          class="dropdown-item flex items-center p-2 hover:bg-gray-100 cursor-pointer"
          @click="selectCountry(country)"
      >
        <img :src="country.flag" alt="flag" class="flag-icon" />
        <span class="country-code ml-2">{{ country.code }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});
const phoneNumber = ref('');
const emit = defineEmits(['update:modelValue']);

const formattedPhoneNumber = ref(props.modelValue);

watch(formattedPhoneNumber, (newValue) => {
  emit('update:modelValue', newValue);
});

// Dropdown logic
const isDropdownOpen = ref(false);
const countries = ref([
  { code: "+7", flag: "/content/icons/russia.svg" },
  { code: "+375", flag: "/content/icons/belarus.svg" },
  { code: "+7", flag: "/content/icons/kazakhstan.svg" },
]);
const selectedCountry = ref(countries.value[0]); // Default to Russia

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectCountry = (country) => {
  selectedCountry.value = country;
  isDropdownOpen.value = false;
  phoneNumber.value = ""; // Reset phone number when country changes
};

const mask = (event) => {
  const input = event.target;
  const keyCode = event.keyCode;

  const matrix = `___ ___-__-__`;
  let i = 0;
  const def = matrix.replace(/\D/g, "");
  const val = input.value.replace(/\D/g, "");
  let new_value = matrix.replace(/[_\d]/g, (a) => {
    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
  });

  i = new_value.indexOf("_");
  if (i !== -1) {
    i < 5 && (i = 3);
    new_value = new_value.slice(0, i);
  }

  const reg = matrix.substr(0, input.value.length).replace(/_+/g, (a) => {
    return "\\d{1," + a.length + "}";
  }).replace(/[+()]/g, "\\$&");

  const regex = new RegExp("^" + reg + "$");
  if (!regex.test(input.value) || input.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
    input.value = new_value;
  }

  if (event.type === "blur" && input.value.length < 5) {
    input.value = "";
  }

  phoneNumber.value = input.value;
  formattedPhoneNumber.value = formatPhoneNumber(phoneNumber.value);
};

const formatPhoneNumber = (number) => {
  const cleaned = number.replace(/\D/g, '');

  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return cleaned;
  } else if (cleaned.length === 10) {
    return '7' + cleaned;
  }

  return cleaned;
};

const blurHandler = (event) => {
  if (event.target.value.length < 5) {
    event.target.value = "";
    formattedPhoneNumber.value = "";
  }
};
</script>

<style scoped lang="scss">
input {
  @apply w-full text-xl font-thin;
  background: none;
  &:focus-visible{
  outline: none;
  }
}
.phone-input-container {
  position: relative;
}

.dropdown {
  position: relative;
  margin-bottom: 10px;

  &-button {
    @apply flex items-center rounded-lg;
    cursor: pointer;

    .flag-icon {
      width: 24px;
      height: 24px;
    }

    .country-code {
      margin-left: 8px;
      font-weight: bold;
    }

    .dropdown-icon {
      margin-left: auto;
      width: 16px;
      height: 16px;
    }
  }

  &-menu {
    @apply absolute bg-blue-light rounded-lg mt-2 z-10;
    max-height: 200px;
    overflow-y: auto;

    .dropdown-item {
      @apply flex items-center p-2 hover:bg-green cursor-pointer;

      .flag-icon {
        width: 24px;
        height: 24px;
      }

      .country-code {
        margin-left: auto;
        font-weight: bold;
      }
    }
  }
}
.flag-icon{
  width: 30px;
  height: 30px;
}
</style>