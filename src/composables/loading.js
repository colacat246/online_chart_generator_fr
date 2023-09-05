import { ref } from 'vue';

export default function useLoading(fn) {
  const isLoading = ref(false);
  const res = ref(null);
  const err = ref(null);
  async function call(...args) {
    isLoading.value = true;
    res.value = null;
    err.value = null;
    try {
      res.value = await fn(...args);
    } catch (err) {
      err.value = err;
    } finally {
      isLoading.value = false;
    }
  }
  return { call, isLoading, res, err };
}
