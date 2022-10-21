import { defineStore } from "pinia";

export const useApiStore = defineStore("apiIndex", () => {
  const apiIndex = ref(null);
  function setApiIndex(newIndex) {
    apiIndex.value = newIndex;
  }

  return { apiIndex, setApiIndex };
});
