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
let instructions = ref();
let payload = ref(null);

const item = recipe["value"]["Items"][0];
if (recipe.value.Count != 0) {
  // instructions
  instructions = item["instructions"].slice(2, -2).split('","');

  // ingredients and other misc. details
  payload = {
    title: item["title"],
    readyInMinutes: item["readyInMinutes"],
    servings: item["servings"],
    extendedIngredients: item["extendedIngredients"],
    dishTypes: [],
  };
}

console.log(payload);
useHead({
  title:
    payload.value !== null
      ? `${payload.title} - NOM.NOM`
      : "Recipe Not Found - NOM.NOM",
});
</script>

<template>
  <div>
    <div class="container mx-auto min-h-screen" v-if="recipe.Items.length != 0">
      <div class="pl-6 lg:mb-0">
        <div class="text-sm breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/community/explore">Recipes</nuxt-link>
            </li>
            <li>
              <span class="text-ellipsis w-36 overflow-hidden">{{
                recipe.Items[0].title
              }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="grid grid-cols-1 p-6 lg:grid-cols-12 lg:p-6">
        <div class="lg:col-span-4">
          <FoodCarousel
            :imageURL="
              recipe.Items[0].image != null
                ? recipe.Items[0].image
                : '../assets/Img404.PNG'
            "
            :rid="rid"
            :nomnom="true"
            :name="recipe.Items[0].title"
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
    </div>
    <div class="container mx-auto min-h-screen" v-else>
      <NoExist
        errorCode="404"
        errorTitle="Recipe Not Found"
        errorMessage="This recipe does not exist or was removed!"
      />
    </div>
  </div>
</template>
<style></style>
