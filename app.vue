<script setup>
import { useUserStore } from "~/store/userStore";
const userCookie = useCookie("user");
const userStore = useUserStore();

if (userCookie?.value?.accessToken) {
  const { data } = await useFetch("/api/userDetails", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    body: {
      accessToken: userCookie.value.accessToken,
    },
  });

  if (data?.value?.user === null) {
    userStore.setUser(null);
    userCookie.value = null;
  } else if (data?.value?.Items) {
    userStore.setUser(data.value.Items[0]);
  }
}
</script>

<template>
  <div data-theme="">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>
* {
  font-family: "Poppins", "sans-serif";
}
</style>
