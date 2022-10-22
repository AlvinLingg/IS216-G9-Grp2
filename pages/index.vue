<template>
  <div class="section p-5 max-w-6xl m-auto">
    <div class="flex flex-col md:flex-row gap-[100px] min-h-[400px] p-10 justify-center">
      <div class="self-center">
        <h1 class="text-5xl font-black">NOM.NOM</h1>
        <div class="py-6 text-slate-600">
          <p>A zero waste initiative powered by spoonacular API</p>
          <p>Find recipes by ingredients you have at home</p>
        </div>
        <div class="flex gap-5">
          <nuxt-link to="/explore">
            <button class="btn primary-color">Explore</button>
          </nuxt-link>
          <nuxt-link to="/fridge"><button class="btn btn-ghost">My Fridge ›</button></nuxt-link>
        </div>
      </div>
      <div class="w-full lg:w-[40%] rounded-3xl relative">
        <template v-if="recipesOfTheDay !== null">
          <div v-for="(recipe, index) in recipesOfTheDay.recipes" class="w-full sm:w-[400px] mx-auto" :key="index">
            <div v-show="currentCard === index"
              class="card bg-base-100 p-2 border rounded-2xl hover:cursor-pointer hover:shadow-md ease-in duration-150 mt-2">
              <img class="h-full sm:h-[300px] object-cover rounded-lg" :src="recipe.image" alt="" />
              <div class="card-body pt-4 pb-2 px-2 gap-0">
                <p class="text-[#d54215] font-bold text-xs uppercase">Today's special</p>
                <h2 class="card-title truncate block text-md">{{recipe.title}}</h2>
                <p class="text-gray-500 text-sm">
                  {{recipe.extendedIngredients.length}} Ingredients
                </p>
                <p class="text-gray-500 text-sm">
                  {{recipe.readyInMinutes}} Minutes
                </p>
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center space-x-5 mt-5">
            <div v-for="(_, index) in recipesOfTheDay.recipes" class="dot w-2 h-2 rounded-full cursor-pointer"
              :class="[(currentCard === index) ? 'bg-black': 'bg-[#cbcbcb]']" @click="updateCurrentCard(index)">
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="flex flex-col gap-5 mt-10">
      <h1 class="text-5xl font-bold">Popular recipes</h1>
      <div class="grid gap-6 mt-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        <template v-if="popularRecipesInfo !== null">
          <div v-for="recipe in Object.values(popularRecipesInfo)" class="w-full">
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
let popularRecipes = ref(null);
let popularRecipesID = computed(() => {
  return popularRecipes.value.results.map((recipe) => recipe.id);
})

const currentCard = ref(0);

const updateCurrentCard = (index) => {
  currentCard.value = index;
}

onBeforeMount(async () => {
  popularRecipes.value = await getPopularRecipes(apiStore.apiIndex, 4, 0);
  recipesOfTheDay.value = await getRandomRecipe(apiStore.apiIndex, 4);
  popularRecipesInfo.value = await getRecipeInformationBulk(apiStore.apiIndex, popularRecipesID.value.join(","));
});

</script>