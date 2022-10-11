<script setup>
const route = useRoute();
const rid = route.params.rid;
</script>
<template>
  <div>
    <Navbar />
    <div class="container mx-auto h-max">
      <div class="grid sm:grid-cols-1 gap-10 md:grid-cols-2 gap-5 p-6">
        <div><FoodCarousel /></div>
        <div><RecipeDetails /></div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style></style>
