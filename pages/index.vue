

<template>
  <div>
    <Navbar />
    <div class="section p-10 max-w-6xl m-auto">
      <div class="flex flex-col gap-5">
        <h1 class="text-5xl font-bold">Recipes of the day</h1>
        <div class="grid gap-6 mt-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          <div class="card bg-base-100 shadow-md hover:cursor-pointer hover:shadow-xl ease-in duration-150"
            v-for="recipe in recipeOfTheDay.recipes" @click="navigateTo('/recipes/' + recipe.id)">
            <img class="h=[100px] object-cover rounded-top-3xl border-b" :src="recipe.image" alt="" />
            <div class="card-body p-5 gap-0">
              <h2 class="card-title truncate block">{{recipe.title}}</h2>
              <p class="text-gray-500 text-sm">{{recipe.extendedIngredients.length}} Ingredients</p>
              <p class="text-gray-500 text-sm">{{recipe.readyInMinutes}} Minutes</p>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <h1 class="text-5xl font-bold">Popular recipes</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
// const recipeOfTheDay = ref(null)
let rotatingApiKey = [
  "1e8aa973fadf4c31abf5e308dccafda7",
];

const retrieveRandomRecipe = async (apiIndex) => {
  const { data } = await useFetch("/recipes/random", {
    method: "GET",
    baseURL: "https://api.spoonacular.com",
    params: {
      apiKey: rotatingApiKey[apiIndex],
      number: 4,
    }
  });
  return data.value;
};

const recipeOfTheDay = ref(await retrieveRandomRecipe(0));
console.log(recipeOfTheDay.value);
</script>