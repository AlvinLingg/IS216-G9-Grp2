<script setup>
import { useUserStore } from "~~/store/userStore";
const route = useRoute();
const userStore = useUserStore();
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
const getUserFavorites = async () => {
  const { data, error } = await useFetch("/api/getFavorite", {
    method: "GET",
    query: {
      id: `${rid}${userStore.user.uniqueUserId}`,
    },
  });
  return data;
};
const test = await getUserFavorites();
console.log("hello", test.value["Items"].length);

const handleClick = async () => {
  // update db -> send to api
  await useFetch("/api/favorite", {
    method: "POST",
    body: {
      rid: rid,
      uid: userStore.user.uniqueUserId,
    },
  });
};
</script>
<template>
  <div>
    <Navbar />
    {{ test["Items"] }}
    <div class="container mx-auto" v-if="recipes != null">
      <div class="pl-6 mt-5">
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
      <button @click="handleClick">post</button>
    </div>
    <div class="container mx-auto" v-else>
      <NoExist
        errorTitle="Recipe Not Found"
        errorMessage="This recipe does not exist or was removed!"
      />
      <button @click="handleClick">post</button>
    </div>
    <Comments />
  </div>
</template>
<script>
export default {};
</script>
<style></style>
