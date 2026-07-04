import { onBeforeUnmount, onMounted } from 'vue';

// Анимация появления секций при прокрутке: элементы с классами
// .hidden-left / .hidden-right получают .show, когда попадают в вьюпорт.
// Срабатывает один раз на элемент (unobserve) — повторные проигрывания
// при каждом пересечении границы только зря нагружали рендер.
export function useScrollReveal(selector = '.hidden-left, .hidden-right') {
  let observer = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });
}
