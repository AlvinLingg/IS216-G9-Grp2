import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  function setUser(newUser) {
    user.value = newUser;
  }

  return { user, setUser };
});
