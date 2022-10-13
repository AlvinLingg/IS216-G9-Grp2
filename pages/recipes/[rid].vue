<script setup>
const route = useRoute();
const rid = route.params.rid;
</script>
<template>
  <div>
    <Navbar />
    <div class="container mx-auto">
      <div class="grid sm:grid-cols-1 gap-10 md:grid-cols-2 gap-5 p-6">
        <div><FoodCarousel /></div>
        <div><RecipeDetails /></div>
        <div>
          <p>{{ rid }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // async asyncData({ $axios }) {
  //   try {
  //     const apiKey = "1e8aa973fadf4c31abf5e308dccafda7";
  //     const recipe = await $axios.$get(
  //       "https://api.spoonacular.com/recipes/findByIngredients?" +
  //         "apiKey=" +
  //         apiKey +
  //         "&ingredients=apples,+flour,+sugar&number=2"
  //     );
  //     console.log(recipe);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // data() {
  //   return {
  //     recipe: {},
  //   };
  // },
  setup() {},
};
</script>
<style></style>
