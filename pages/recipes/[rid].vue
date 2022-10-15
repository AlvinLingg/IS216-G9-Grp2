<script setup>
import NoExist from "../../components/NoExist.vue";
const route = useRoute();
const rid = route.params.rid;

const { data: recipes, error } = await useAsyncData("recipes", async () => {
  const apiKey = "1e8aa973fadf4c31abf5e308dccafda7";
  const response = await $fetch(
    `https://api.spoonacular.com/recipes/${rid}/information?apiKey=${apiKey}`
  );
  return await response;
});
const { data: instructions, error2 } = await useAsyncData(
  "instructions",
  async () => {
    const apiKey = "1e8aa973fadf4c31abf5e308dccafda7";
    const response = await $fetch(
      `https://api.spoonacular.com/recipes/${rid}/analyzedInstructions?apiKey=${apiKey}`
    );
    return await response;
  }
);
</script>
<template>
  <div>
    <Navbar />
    <div class="container mx-auto pl-6 mt-5">
      <div class="text-sm breadcrumbs">
        <ul>
          <li><nuxt-link to="./">Recipes</nuxt-link></li>
          <li>
            <span class="text-ellipsis w-36 overflow-hidden">{{
              recipes.title
            }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="container mx-auto" v-if="recipes != null">
      <div class="grid sm:grid-cols-1 gap-10 lg:grid-cols-2 gap-5 p-6">
        <div>
          <FoodCarousel
            :imageURL="
              recipes.image.length != 0 ? recipes.image : '../assets/Img404.PNG'
            "
          />
        </div>
        <div>
          <RecipeDetails :recipes="recipes" :instructions="instructions" />
        </div>
      </div>
    </div>
    <div class="container mx-auto" v-else>
      <NoExist />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
