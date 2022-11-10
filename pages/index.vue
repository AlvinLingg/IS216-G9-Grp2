<template>
  <div class="section p-5 max-w-6xl m-auto">
    <div
      class="flex flex-col md:flex-row md:flex-row gap-[100px] min-h-[400px] sm:p-10 justify-center"
    >
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
          <nuxt-link to="/fridge"
            ><button class="btn btn-ghost">My Fridge ›</button></nuxt-link
          >
        </div>
      </div>
      <div class="w-full md:w-[40%] rounded-3xl relative">
        <template v-if="recipesOfTheDay !== null">
          <Carousel>
            <Slide
              v-for="(recipe, index) in recipesOfTheDay.recipes"
              :key="index"
            >
              <div class="w-full mx-auto">
                <nuxt-link :to="`/recipes/${recipe.id}`">
                  <div
                    class="card bg-base-100 p-2 border rounded-2xl hover:cursor-pointer hover:shadow-md ease-in duration-150 mt-2"
                  >
                    <img
                      class="h-[200px] object-cover rounded-lg"
                      :src="recipe.image"
                      alt=""
                    />
                    <div class="card-body pt-4 pb-2 px-2 gap-0">
                      <p class="text-[#d54215] font-bold text-xs uppercase">
                        Today's special
                      </p>
                      <h2
                        class="card-title truncate block text-md w-[95%] mx-auto"
                      >
                        {{ recipe.title }}
                      </h2>
                      <p class="text-gray-500 text-sm">
                        {{ recipe.extendedIngredients.length }} Ingredients
                      </p>
                      <p class="text-gray-500 text-sm">
                        {{ recipe.readyInMinutes }} Minutes
                      </p>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </Slide>
            <template #addons>
              <navigation />
              <pagination />
            </template>
          </Carousel>
        </template>
      </div>
    </div>
    <div class="flex flex-col gap-5 mt-10">
      <h1 class="text-5xl font-bold">Popular recipes</h1>
      <div
        class="grid gap-6 mt-2 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1"
      >
        <template v-if="popularRecipesInfo !== null">
          <RecipeCard
            v-for="recipe in Object.values(popularRecipesInfo)"
            :showIngredients="true"
            :showPreparationTime="true"
            :recipe="recipe"
            @click="navigateTo(`/recipes/${recipe.id}`)"
          />
        </template>
      </div>
      <nuxt-link to="/explore">
        <button class="btn w-full grey-color btn-action">Explore</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import { useApiStore } from "~/store/apiStore";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const apiStore = useApiStore();
let recipesOfTheDay = ref(null);
let popularRecipesInfo = ref(null);
let popularRecipes = ref(null);
let popularRecipesID = computed(() => {
  return popularRecipes.value.results.map((recipe) => recipe.id);
});

onBeforeMount(async () => {
  popularRecipes.value = await getPopularRecipes(apiStore.apiIndex, 4, 0);
  recipesOfTheDay.value = await getRandomRecipe(apiStore.apiIndex, 4);
  popularRecipesInfo.value = await getRecipeInformationBulk(
    apiStore.apiIndex,
    popularRecipesID.value.join(",")
  );
});
</script>

<style>
.carousel__pagination-button {
  background-color: #090f207f;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 50%;
}

.carousel__pagination-button--active {
  background-color: #000;
}

.carousel__pagination-button::after {
  content: none;
}

.carousel__pagination {
  margin-top: 20px;
}
</style>
