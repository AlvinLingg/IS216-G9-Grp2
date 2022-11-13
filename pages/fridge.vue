<template>
  <div class="section p-10 max-w-6xl m-auto min-h-screen">
    <h1 class="text-5xl font-bold">What's in my fridge?</h1>

    <div class="my-5 gap-4">
      <input
        type="text"
        class="input input-bordered w-full"
        placeholder="Enter an ingredient"
        v-model="searchTerm"
      />
      <ul
        v-if="searchIngredients.length"
        class="rounded bg-white border border-gray-300 px-4 py-2 space-y-1 z-10 absolute"
      >
        <li class="px-1 pt-1 pb-2 font-bold border-b border-gray-200">
          Showing {{ searchIngredients.length }} of
          {{ ingredients.length }} results
        </li>
        <li
          v-for="ingredient in searchIngredients"
          @click="selectIngredient(ingredient)"
          class="cursor-pointer hover:bg-gray-100 p-1"
        >
          {{ ingredient }}
        </li>
      </ul>
    </div>

    <div class="mt-5">
      <h2 class="font-bold text-slate-600">Fridge Information</h2>
      <div class="flex flex-wrap gap-2 mt-3">
        <div
          v-for="ingredient in selectedIngredients"
          class="badge primary-color p-5 cursor-pointer hover:bg-[#e94249] hover:border-[#e94249] hover:text-white"
          @click="removeIngredient(ingredient)"
        >
          <span class="mr-2 font-semibold">{{ ingredient }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-4 h-4 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <h2 class="font-bold text-slate-600">Suggested Recipe</h2>
      <div
        class="grid gap-6 mt-3 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1"
      >
        <template v-if="suggestedRecipes !== undefined">
          <div v-for="recipe in Object.values(suggestedRecipes)">
            <RecipeCard
              :showIngredients="true"
              :showPreparationTime="true"
              :recipe="recipe"
              :isFridgeRecipe="true"
              @click="navigateTo(`/spoonacular/recipes/${recipe.id}`)"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import categories from "../data/categories.json";
import ingredients from "../data/ingredients.json";
import { useApiStore } from "~/store/apiStore";

const apiStore = useApiStore();

let selected = ref({});
let searchTerm = ref("");
let selectedIngredients = ref(
  new Set(["water", "flour", "sugar", "cooking oil", "salt"])
); // common pantry items
let strIngredients = computed(() =>
  Array.from(selectedIngredients.value).join(",")
);
let suggestedRecipes = ref(
  await findByIngredients(apiStore.apiIndex, strIngredients.value, 8)
); //remember to change to 12 later

let parsedCategories = computed(() => {
  let temp = {};
  for (let category of Object.keys(categories)) {
    temp[category] = {
      total: categories[category].total,
      image: "/categories/" + categories[category].image,
      source: categories[category].source,
      ingredients: new Set(categories[category].ingredients),
    };
  }
  return temp;
});

const searchIngredients = computed(() => {
  if (searchTerm.value === "") {
    return [];
  }
  let matches = 0;
  return ingredients.filter((x) => {
    if (x.includes(searchTerm.value.toLowerCase()) && matches < 10) {
      matches++;
      return x;
    }
  });
});

const selectIngredient = async (ingredient) => {
  selectedIngredients.value.add(ingredient);
  searchTerm.value = "";

  for (let category of Object.keys(parsedCategories.value)) {
    if (parsedCategories.value[category].ingredients.has(ingredient)) {
      if (category in selected.value) {
        selected.value[category].add(ingredient);
      } else {
        selected.value[category] = new Set([ingredient]);
      }
    }
  }
  suggestedRecipes.value = await findByIngredients(0, strIngredients.value, 8);
};

const removeIngredient = async (ingredient) => {
  selectedIngredients.value.delete(ingredient);

  for (let category of Object.keys(parsedCategories.value)) {
    if (parsedCategories.value[category].ingredients.has(ingredient)) {
      selected.value[category].delete(ingredient);
      if (selected.value[category].size === 0) {
        delete selected.value[category];
      }
    }
  }

  suggestedRecipes.value = await findByIngredients(0, strIngredients.value, 8);
};

useHead({
  title: `What's in my fridge? - NOM.NOM`,
});
</script>
