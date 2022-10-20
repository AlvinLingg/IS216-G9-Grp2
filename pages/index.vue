

<template>
  <div>
    <Navbar />
    <div class="section p-10 max-w-6xl m-auto">
      <div class="flex flex-col gap-5">
        <h1 class="text-5xl font-bold">Recipes of the day</h1>
        <div class="grid gap-6 mt-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          <!-- <template v-if="recipesOfTheDay !== undefined">
            <div class="card bg-base-100 shadow-md hover:cursor-pointer hover:shadow-xl ease-in duration-150"
              v-for="recipe in recipesOfTheDay.recipes" @click="navigateTo('/recipes/' + recipe.id)">
              <img class="h=[100px] object-cover rounded-top-3xl border-b" :src="recipe.image" alt="" />
              <div class="card-body p-5 gap-0">
                <h2 class="card-title truncate block">{{recipe.title}}</h2>
                <p class="text-gray-500 text-sm">{{recipe.extendedIngredients.length}} Ingredients</p>
                <p class="text-gray-500 text-sm">{{recipe.readyInMinutes}} Minutes</p>
              </div>
            </div>
          </template> -->

        </div>
      </div>
      <div class="flex flex-col gap-5 mt-10">
        <!-- <h1 class="text-5xl font-bold">Popular recipes</h1>
        <div class="grid gap-6 mt-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          <template v-if="popularRecipes !== undefined">
            <div class="card bg-base-100 shadow-md hover:cursor-pointer hover:shadow-xl ease-in duration-150"
              v-for="recipe in popularRecipes.results" @click="navigateTo('/recipes/' + recipe.id)">
              <img class="h=[100px] object-cover rounded-top-3xl border-b" :src="recipe.image" alt="" />
              <div class="card-body p-5 gap-0">
                <h2 class="card-title truncate block">{{recipe.title}}</h2>
              </div>
            </div>
          </template>

        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
let recipeOfTheDay = await retrieveRandomRecipe(0, 4);
console.log("hehe", recipeOfTheDay);
</script>