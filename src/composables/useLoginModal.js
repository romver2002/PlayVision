import { ref } from 'vue';

// Состояние модального окна входа — общее для всего приложения:
// модалка рендерится один раз в App.vue, а открыть её можно из любого места.
const isOpen = ref(false);

function setBodyScrollLock(locked) {
  document.body.style.overflow = locked ? 'hidden' : '';
}

export function useLoginModal() {
  const open = () => {
    isOpen.value = true;
    setBodyScrollLock(true);
  };

  const close = () => {
    isOpen.value = false;
    setBodyScrollLock(false);
  };

  return { isOpen, open, close };
}
