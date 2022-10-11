<script setup>
const route = useRoute();
const rid = route.params.rid;
</script>
<template>
  <div>
    <Navbar />
    <div class="container mx-auto">
      <div class="grid sm:grid-cols-1 gap-4 md:grid-cols-2 gap-4">
        <div><FoodCarousel /></div>
        <div><RecipeDetails /></div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style></style>
