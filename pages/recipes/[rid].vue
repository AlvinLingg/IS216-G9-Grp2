<script setup>
const route = useRoute();
const rid = route.params.rid;

const { data: recipes, error } = await useAsyncData("recipes", async () => {
  const apiKey = "4d0942790e7a416aae65fbe85928171c";
  const response = await $fetch(
    `https://api.spoonacular.com/recipes/${rid}/information?apiKey=${apiKey}`
  );
  return await response;
});
const { data: instructions, error2 } = await useAsyncData(
  "instructions",
  async () => {
    const apiKey = "4d0942790e7a416aae65fbe85928171c";
    const response = await $fetch(
      `https://api.spoonacular.com/recipes/${rid}/analyzedInstructions?apiKey=${apiKey}`
    );
    return await response;
  }
);
</script>
<template>
  <div>
    <div class="container mx-auto" v-if="recipes != null">
      <div class="pl-6 mt-5 lg:mb-0">
        <div class="text-sm breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="./">Recipes</nuxt-link>
            </li>
            <li>
              <span class="text-ellipsis w-36 overflow-hidden">{{
                recipes.title
              }}</span>
            </li>
          </ul>
        </div>
      </div>
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
        <div class="gap-y-0 lg:col-span-12">
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
<script>
export default {};
</script>
<style></style>
