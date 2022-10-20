<template>
  <Navbar />
  <div class="section p-5 max-w-6xl m-auto">
    <div class="flex flex-col gap-5">
      <h1 class="text-5xl font-bold">Recipes of the day</h1>
      <div class="grid gap-6 mt-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        <RecipeCard :recipes="recipesOfTheDay.recipes" :showIngredients="true" :showPreparationTime="true" />
      </div>
    </div>
    <div class="flex flex-col gap-5 mt-10">
      <h1 class="text-5xl font-bold">Popular recipes</h1>
      <div class="grid gap-6 mt-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        <RecipeCard :recipes="Object.values(popularRecipesInfo)" :showIngredients="true" :showPreparationTime="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
let recipesOfTheDay = ref(await getRandomRecipe(0, 1)); // change to 4 results later 
let popularRecipes = ref(await getPopularRecipes(0, 1, 0)); // change to 4 results later
let popularRecipesID = computed(() => {
  return popularRecipes.value.results.map((recipe) => recipe.id);
})
let popularRecipesInfo = ref(await getRecipeInformationBulk(0, popularRecipesID.value.join(",")));
</script>