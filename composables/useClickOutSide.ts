import { onMounted, onUnmounted } from "vue";

export default function useClickOutSide(
  elementRef: Ref<HTMLElement | null>,
  callback: () => void
) {
  const handleClick = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClick, {passive: true});
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClick);
  });
}
