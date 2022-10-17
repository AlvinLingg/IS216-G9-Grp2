<script setup>
import { useUserStore } from "~~/store/userStore";
const userStore = useUserStore();

console.log(userStore.user);
</script>

<template>
  <div>
    <Navbar />
    <div class="container mx-auto">
      <RecipeCard />
    </div>
  </div>
</template>

<style></style>
