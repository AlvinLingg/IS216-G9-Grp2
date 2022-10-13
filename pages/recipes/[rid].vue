<script setup>
const route = useRoute();
const rid = route.params.rid;
// const { data: recipes, error } = await useAsyncData(async () => {
//   const apiKey = "1e8aa973fadf4c31abf5e308dccafda7";
//   const response = await $fetch(
//     `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=apples,+flour,+sugar&number=2`
//   );

//   return response;
// });
// console.log(recipes._value);
// console.log(recipes.value);
</script>
<template>
  <div>
    <Navbar />
    <div class="container mx-auto">
      <div class="grid sm:grid-cols-1 gap-10 lg:grid-cols-2 gap-5 p-6">
        <div><FoodCarousel /></div>
        <div><RecipeDetails /></div>
        <div>{{ rid }}</div>
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
  // data() {
  //   return {
  //     rid: "",
  //   };
  // },
  // mounted() {
  //   const route = useRoute();
  //   this.rid = route.params.rid;
  // },
};
</script>
<style></style>
