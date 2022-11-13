<script setup>
import AngleLine from "~icons/clarity/angle-line";

let sortDirection = {
  new: "Newest to Oldest",
  old: "Oldest to Newest",
};
const selectedSortDirection = ref("old");

const communityRecipes = async () => {
  const { data } = await useFetch("/api/getAllCommunityRecipe", {
    method: "GET",
  });
  return data;
};
const allCommunityRecipe = ref(await communityRecipes());
let recipesToDisplay = ref(null);
let temp = [];
for (let item of allCommunityRecipe["_value"]) {
  temp.push({
    title: item.title,
    image: item.image,
    id: item.id,
  });
}
// sorting (default by oldest)
temp.sort((a, b) => a.id - b.id);
recipesToDisplay.value = temp;

watch([selectedSortDirection], async () => {
  if (selectedSortDirection.value == "new") {
    temp = temp.sort((a, b) => b.id - a.id);
    recipesToDisplay = temp;
  } else {
    temp = temp.sort((a, b) => a.id - b.id);
    recipesToDisplay = temp;
  }
});

useHead({
  title:`Explore Community Recipes - NOM.NOM`
})
</script>

<template>
  <div class="section p-10 max-w-6xl m-auto min-h-screen">
    <h1 class="text-5xl font-bold">Browse community recipes</h1>
    <div class="flex mt-2">
      <div class="flex flex-row">
        <p class="text-xl font-semibold text-slate-600 self-center mr-3">
          Sort by:
        </p>
        <div class="dropdown lg:inline-block">
          <label
            tabindex="0"
            class="btn m-1 grey-color rounded-3xl px-5"
            @click="toggleDropdown"
            @blur=""
          >
            {{ sortDirection[selectedSortDirection] }}
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li v-for="key in Object.keys(sortDirection)">
              <label class="label cursor-pointer">
                <span class="label-text">{{ sortDirection[key] }}</span>
                <input
                  type="radio"
                  name="radioSortDirection"
                  class="radio"
                  :value="key"
                  v-model="selectedSortDirection"
                />
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="grid gap-6 mt-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1"
    >
      <template v-if="recipesToDisplay !== null">
        <RecipeCard
          v-for="recipe in recipesToDisplay"
          :recipe="recipe"
          @click="navigateTo(`/community/recipes/${recipe.id}`)"
        />
      </template>
      <template v-else>
        <SkeletonRecipeCard :noOfLines="3" v-for="n in 12" :key="n" />
      </template>
    </div>
  </div>
</template>

<style></style>
