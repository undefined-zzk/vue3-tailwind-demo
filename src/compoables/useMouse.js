export const useMouse = () => {
  const x = ref(0);
  const y = ref(0);
  const resize = (e) => {
    x.value = e.clientX;
    y.value = e.clientY;
  };
  onMounted(() => {
    document.addEventListener("mousemove", resize);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("resize", resize);
  });

  return { x, y };
};
