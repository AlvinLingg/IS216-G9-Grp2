<template>
  <div class="section p-5 max-w-6xl m-auto">
    <div class="flex flex-col gap-5">
      <div class="hero min-h-[400px] ">
        <div class="hero-content h-full flex-col lg:flex-row gap-20 p-10">
          <div class="bg-black rounded-3xl p-10 h-full">
            <h1 class="text-5xl font-black">NOM.NOM</h1>
            <div class="py-6 text-slate-600">
              <p>A zero waste initiative powered by spoonacular API</p>
              <p>Find recipes by ingredients you have at home</p>
            </div>
            <button class="btn ">Get Started</button>
          </div>
          <template v-if="recipesOfTheDay !== null">
            <div v-for="recipe in recipesOfTheDay.recipes" class="w-[250px]">
              <RecipeCard :showIngredients="true" :showPreparationTime="true" :recipe="recipe"
                @click="navigateTo(`/recipes/${recipe.id}`)" />
            </div>
          </template>
        </div>
      </div>
      <h1 class="text-5xl font-bold">Today's Special</h1>

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
      <nuxt-link to="/explore">
        <button class="btn w-full grey-color btn-action">Explore</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { useApiStore } from "~/store/apiStore";

const apiStore = useApiStore();
let recipesOfTheDay = ref(null);
let popularRecipesInfo = ref(null);
let popularRecipes = ref(null); // change to 4 results later
let popularRecipesID = computed(() => {
  if (popularRecipes.value === null)
    return null;
  else {
    return popularRecipes.value.results.map((recipe) => recipe.id);
  }
})

onBeforeMount(async () => {
  // popularRecipes.value = await getPopularRecipes(apiStore.apiIndex, 4, 0);
  recipesOfTheDay.value = await getRandomRecipe(apiStore.apiIndex, 1);
});

watch(popularRecipesID, async () => {
  popularRecipesInfo.value = await getRecipeInformationBulk(apiStore.apiIndex, popularRecipesID.value.join(","));
})

</script>