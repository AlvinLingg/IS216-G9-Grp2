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
useHead({
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  meta: [
    {
      name: "description",
      content: "A place to share your recipes and find new ones to try!",
    },
  ],
  title: "NOM.NOM - A zero waste initiative powered by spoonacular API",
});
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
