<script setup>
const route = useRoute();
const rid = route.params.rid;

const getRecipeDetails = async () => {
  const { data, error } = await useFetch("/api/getRecipeDetails", {
    initialCache: false,
    method: "GET",
    query: {
      id: rid,
    },
  });
  return data;
};
const recipe = ref(await getRecipeDetails());
const item = recipe["value"]["Items"][0];

// instructions
const instructions = item["instructions"].slice(2, -2).split('","');
console.log(instructions);

// ingredients and other misc. details
const payload = {
  title: item["recipeName"],
  readyInMinutes: item["cookingTime"],
  servings: item["servingSize"],
  extendedIngredients: [],
  dishTypes: [],
};
</script>
<template>
  <div>
    <div class="container mx-auto" v-if="recipe.Items.length != 0">
      <div class="pl-6 mt-5 lg:mb-0">
        <div class="text-sm breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/explore">Recipes</nuxt-link>
            </li>
            <li>
              <span class="text-ellipsis w-36 overflow-hidden">{{
                recipe.Items[0].recipeName
              }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="grid grid-cols-1 p-6 lg:grid-cols-12 lg:p-6">
        <div class="lg:col-span-4">
          <FoodCarousel
            :imageURL="
              recipe.Items[0].images.length != 0
                ? recipe.Items[0].images.slice(2, -2)
                : '../assets/Img404.PNG'
            "
            :rid="rid"
            :nomnom="true"
            :name="recipe.Items[0].recipeName"
          />
        </div>
        <div class="mt-10 gap-y-0 ml-0 lg:mt-0 lg:col-span-8 lg:ml-12">
          <RecipeDetails
            :recipes="payload"
            :instructions="instructions"
            :nomnom="true"
          />
        </div>
      </div>
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
