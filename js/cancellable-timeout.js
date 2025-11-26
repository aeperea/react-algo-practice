export default function setCancellableTimeout(...args) {
  let timeoutId = setTimeout(...args);
  return () => {
    clearTimeout(timeoutId);
  }
}
