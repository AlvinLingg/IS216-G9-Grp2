<script setup>
import { useApiStore } from "~/store/apiStore";
const apiStore = useApiStore();
const route = useRoute();
const rid = route.params.rid;

const recipes = ref(await getRecipeInformation(apiStore.apiIndex, rid));
const instructions = ref(
  await analyzeRecipeInstructions(apiStore.apiIndex, rid)
);
</script>
<template>
  <div>
    <div class="container mx-auto" v-if="recipes != null">
      <div class="pl-6 mt-5 lg:mb-0">
        <div class="text-sm breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/explore">Recipes</nuxt-link>
            </li>
            <li>
              <span class="text-ellipsis w-36 overflow-hidden">{{
                recipes.title
              }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- Recipe Details -->
      <div class="grid grid-cols-1 p-6 lg:grid-cols-12 lg:p-6">
        <div class="lg:col-span-4">
          <FoodCarousel
            :imageURL="
              recipes.image.length != 0 ? recipes.image : '../assets/Img404.PNG'
            "
            :rid="rid"
            :recipes="recipes"
          />
        </div>
        <div class="mt-10 gap-y-0 ml-0 lg:mt-0 lg:col-span-8 lg:ml-12">
          <RecipeDetails :recipes="recipes" :instructions="instructions" />
        </div>
      </div>
      <!-- Comments -->
      <div class="grid grid-cols-1 p-6 lg:grid-cols-12 lg:p-6">
        <div class="gap-y-0 lg:col-span-12 lg:mt-12 xl:mt-0">
          <Comments />
        </div>
      </div>
    </div>
    <div class="container mx-auto" v-else>
      <NoExist
        errorTitle="Recipe Not Found"
        errorMessage="This recipe does not exist or was removed!"
      />
    </div>
  </div>
</template>
<style></style>
