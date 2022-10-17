<template>
    <div class="container mx-auto">
        <Navbar />
        <div class="section p-10 max-w-6xl m-auto">
            <h1 class="text-5xl font-bold">What's in my fridge?</h1>

            <div class="my-5 gap-4">
                <input type="text" class="input input-bordered w-full" placeholder="Enter an ingredient"
                    v-model="searchTerm" />
                <ul v-if="searchIngredients.length"
                    class="rounded bg-white border border-gray-300 px-4 py-2 space-y-1 z-10 absolute">
                    <li class="px-1 pt-1 pb-2 font-bold border-b border-gray-200">
                        Showing {{ searchIngredients.length }} of {{ ingredients.length }} results
                    </li>
                    <li v-for="ingredient in searchIngredients" @click="selectIngredient(ingredient)"
                        class="cursor-pointer hover:bg-gray-100 p-1">
                        {{ ingredient }}
                    </li>
                </ul>
            </div>


            <div class="mt-5">
                <h2 class="font-bold text-slate-600">Fridge Information</h2>
                <div class="flex flex-wrap gap-2 mt-3">
                    <div v-for="ingredient in selectedIngredients"
                        class="badge border-[#ffd780] bg-[#ffd780] text-[#3d4451] p-5 cursor-pointer hover:bg-[#e94249] hover:border-[#e94249] hover:text-white"
                        @click="removeIngredient(ingredient)">
                        <span class="mr-2 font-semibold">{{ingredient}}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-4 h-4 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>

                    </div>

                </div>
            </div>

            <div class="mt-5">

            </div>

            <div class="mt-5">
                <h2 class="font-bold text-slate-600">Suggested Recipe</h2>
                <div class="grid  gap-6 mt-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
                    <div v-for="recipe in Object.keys(suggestedRecipes)"
                        class="card bg-base-100 shadow-md hover:cursor-pointer hover:shadow-xl ease-in duration-150"
                        @click="redirectUser(suggestedRecipes[recipe])">
                        <img class="h=[100px] object-cover rounded-top-3xl border-b"
                            :src="suggestedRecipes[recipe].image" alt="" />
                        <div class="card-body p-5 gap-0">
                            <h2 class="card-title truncate block">{{suggestedRecipes[recipe].title}}</h2>
                            <div>
                                <p v-if="suggestedRecipes[recipe].missedIngredientCount > 0"
                                    class="text-gray-500 text-sm">
                                    {{suggestedRecipes[recipe].missedIngredientCount + " Missing Ingredients"}}
                                </p>
                                <p v-else class="text-gray-500 text-sm">
                                    No Missing Ingredients
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import categories from "../data/categories.json";
import ingredients from "../data/ingredients.json";

const categoriesData = ref(categories);
let selected = ref({});
let suggestedRecipes = ref({});
let searchTerm = ref("");
let parsedCategories = {};

let selectedIngredients = ref(new Set(["Water", "Flour", "Sugar", "Cooking Oil", "Salt"])); // common pantry items
let strIngredients = Array.from(selectedIngredients.value).join(",");

for (let category of Object.keys(categories)) {
    parsedCategories[category] = {
        total: categories[category].total,
        image: "/categories/" + categories[category].image,
        source: categories[category].source,
        ingredients: new Set(categories[category].ingredients),
    };
}

const searchIngredients = computed(() => {
    if (searchTerm.value === "") {
        return []
    }
    let matches = 0;
    return ingredients.filter((x) => {
        if (x.includes(searchTerm.value.toLowerCase()) && matches < 10) {
            matches++
            return x;
        }
    })
});

const selectIngredient = async (ingredient) => {
    selectedIngredients.value.add(ingredient);
    searchTerm.value = ''

    let strIngredients = Array.from(selectedIngredients.value).join(",");
    for (let category of Object.keys(parsedCategories)) {
        if (parsedCategories[category].ingredients.has(ingredient)) {
            if (category in selected.value) {
                selected.value[category].add(ingredient);
            }
            else {
                selected.value[category] = new Set([ingredient]);
            }
        }
    }
    retrieveRecipe(strIngredients, 0, 12);
}

const removeIngredient = (ingredient) => {
    selectedIngredients.value.delete(ingredient);
    let strIngredients = Array.from(selectedIngredients.value).join(",");

    for (let category of Object.keys(parsedCategories)) {
        if (parsedCategories[category].ingredients.has(ingredient)) {
            selected.value[category].delete(ingredient);
            if (selected.value[category].size === 0) {
                delete selected.value[category];
            }
        }
    }
    console.log(strIngredients);
    retrieveRecipe(strIngredients, 0, 12);
}

let rotatingApiKey = [
    "1e8aa973fadf4c31abf5e308dccafda7",
];

const retrieveRecipe = async (ingredients, apiIndex = 0, number = 12) => {
    console.log("running", ingredients);
    const { data } = await useFetch("/recipes/findByIngredients", {
        initialCache: false,
        method: "GET",
        baseURL: "https://api.spoonacular.com",
        params: {
            apiKey: rotatingApiKey[apiIndex],
            ingredients: ingredients,
            number: number,
        }
    });
    suggestedRecipes.value = data.value;
}

const redirectUser = (recipeData) => {
    navigateTo("/recipes/" + recipeData.id);
}

retrieveRecipe(strIngredients, 0, 12);
</script>