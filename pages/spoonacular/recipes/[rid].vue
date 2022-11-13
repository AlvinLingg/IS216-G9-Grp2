<script setup>
import { useApiStore } from "~/store/apiStore";
const apiStore = useApiStore();
const route = useRoute();
const rid = route.params.rid;

const recipes = ref(await getRecipeInformation(apiStore.apiIndex, rid));
const instructions = ref(
  await analyzeRecipeInstructions(apiStore.apiIndex, rid)
);

useHead({
  title:
    recipes?.value?.title != null
      ? `${recipes?.value?.title} - NOM.NOM`
      : "Recipe Not Found - NOM.NOM",
});
</script>

<template>
  <div>
    <div class="container mx-auto min-h-screen" v-if="recipes != null">
      <div class="px-6 lg:mb-0">
        <div class="text-sm breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/spoonacular/explore">Recipes</nuxt-link>
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
          <RecipeDetails
            :recipes="recipes"
            :instructions="instructions"
            :nomnom="false"
          />
        </div>
      </div>
    </div>
    <div class="container mx-auto min-h-screen" v-else>
      <NoExist
        errorCode="404"
        errorTitle="Recipe Not Found"
        errorMessage="This recipe was either removed or does not exist!"
      />
    </div>
  </div>
</template>
