<template>
  <div>
    <Navbar />
    <div class="section p-5 max-w-6xl m-auto">
      <div class="flex flex-col gap-5">
        <h1 class="text-5xl font-bold">Recipes of the day</h1>
        <div class="grid gap-6 mt-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">

          <template v-if="recipesOfTheDay !== null">
            <div v-for="recipe in recipesOfTheDay.recipes">
              <RecipeCard :showIngredients="true" :showPreparationTime="true" :recipe="recipe"
                @click="navigateTo(`/recipes/${recipe.id}`)" />
            </div>
          </template>
        </div>
      </div>
      <div class="flex flex-col gap-5 mt-10">
        <h1 class="text-5xl font-bold">Popular recipes</h1>
        <div class="grid gap-6 mt-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">

          <template v-if="popularRecipesInfo !== null">
            <div v-for="recipe in Object.values(popularRecipesInfo)">
              <RecipeCard :showIngredients="true" :showPreparationTime="true" :recipe="recipe"
                @click="navigateTo(`/recipes/${recipe.id}`)" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useApiStore } from "~/store/apiStore";

const apiStore = useApiStore();
let recipesOfTheDay = ref(null);
let popularRecipesInfo = ref(null);
let popularRecipes = ref(await getPopularRecipes(apiStore.apiIndex, 4, 0)); // change to 4 results later
let popularRecipesID = computed(() => {
  return popularRecipes.value.results.map((recipe) => recipe.id);
})

let promises = [getRandomRecipe(apiStore.apiIndex, 4), getRecipeInformationBulk(apiStore.apiIndex, popularRecipesID.value.join(","))];
Promise.all(promises).then(values => {
  recipesOfTheDay.value = values[0];
  popularRecipesInfo.value = values[1];
});

</script>