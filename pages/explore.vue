<template>
  <div class="section p-10 max-w-6xl m-auto">
    <h1 class="text-5xl font-bold">Browse recipes</h1>
    <div class="flex mt-2 justify-between">
      <div class="flex flex-row">
        <p class="text-xl font-semibold text-slate-600 self-center mr-3">
          Filter by
        </p>
        <div class="dropdown dropdown-end inline-block">
          <label tabindex="0" class="btn m-1 grey-color rounded-3xl px-5" @click="toggleDropdown" @blur="">
            Intolerance
            <span>
              <AngleLine width="24" height="24" class="rotate-180 cursor-pointer mx-1" />
            </span>
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li v-for="intolerance in intolerances">
              <label class="label cursor-pointer">
                <span class="label-text">{{ intolerance }}</span>
                <input type="checkbox" class="checkbox" :value="intolerance" v-model="intoleranceFilter" />
              </label>
            </li>
          </ul>
        </div>
        <div class="dropdown dropdown-end inline-block">
          <label tabindex="0" class="btn m-1 grey-color rounded-3xl px-5" @click="toggleDropdown" @blur="">
            Cuisine
            <span>
              <AngleLine width="24" height="24" class="rotate-180 cursor-pointer mx-1" />
            </span>
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <label class="label cursor-pointer" @click="cuisineFilter = []">
                Clear All
              </label>
            </li>
            <li v-for="cuisine in cuisines">
              <label class="label cursor-pointer">
                <span class="label-text">{{ cuisine }}</span>
                <input type="checkbox" class="checkbox" :value="cuisine" v-model="cuisineFilter" />
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div class="dropdown dropdown-end hidden lg:inline-block">
          <label tabindex="0" class="btn m-1 grey-color rounded-3xl px-5" @click="toggleDropdown" @blur="">
            {{ sortOptions[selectedSortFilter] }}
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li v-for="key of Object.keys(sortOptions)">
              <label class="label cursor-pointer">
                <span class="label-text">{{ sortOptions[key] }}</span>
                <input type="radio" name="radioSortFilter" class="radio" :value="key" v-model="selectedSortFilter" />
              </label>
            </li>
          </ul>
        </div>
        <div class="dropdown dropdown-end hidden lg:inline-block">
          <label tabindex="0" class="btn m-1 grey-color rounded-3xl px-5" @click="toggleDropdown" @blur="">
            {{ sortDirection[selectedSortDirection] }}
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li v-for="key in Object.keys(sortDirection)">
              <label class="label cursor-pointer">
                <span class="label-text">{{ sortDirection[key] }}</span>
                <input type="radio" name="radioSortDirection" class="radio" :value="key"
                  v-model="selectedSortDirection" />
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="grid gap-6 mt-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1" ref="scrollComponent">
      <template v-if="recipesToDisplay !== null">
        <RecipeCard v-for="recipe in recipesToDisplay" :recipe="recipe" @click="navigateTo(`/recipes/${recipe.id}`)" />
      </template>
      <template v-else>
        <SkeletonRecipeCard :noOfLines="3" v-for="n in 12" :key="n" />
      </template>
    </div>
  </div>
</template>

<script setup>
import AngleLine from "~icons/clarity/angle-line";
import intolerancesData from "../data/intolerances.json";
import cuisinesData from "../data/cuisines.json";
import { useApiStore } from "~/store/apiStore";

const apiStore = useApiStore();
const intolerances = ref(intolerancesData);
const cuisines = ref(cuisinesData);

console.log("cuisines", cuisines.value);

let sortOptions = {
  popularity: "Popularity",
  healthiness: "Health Score",
  "max-used-ingredients": "Ingredients Used",
  time: "Preparation Time",
};

let sortDirection = {
  asc: "Ascending",
  desc: "Descending",
};

const dropdownOpen = ref(false);
const toggleDropdown = (event) => {
  dropdownOpen.value = !dropdownOpen.value;
  if (!dropdownOpen.value) {
    event.target.blur();
  } else {
    event.target.focus();
  }
};

const intoleranceFilter = ref([]);
const cuisineFilter = ref(cuisinesData);
const selectedSortFilter = ref("popularity");
const selectedSortDirection = ref("desc");

const intoleranceQuery = computed(() => {
  if (intoleranceFilter.value.length === 0) {
    return "";
  }
  return intoleranceFilter.value.join(",");
});

const cuisineQuery = computed(() => {
  if (cuisineFilter.value.length === 0) {
    return "";
  }
  return cuisineFilter.value.join(",");
});


const recipesToDisplay = ref(null);

let offset = ref(0);
let scrollComponent = ref(null)

onBeforeMount(async () => {
  let temp = await searchRecipeComplex(
    apiStore.apiIndex,
    cuisineQuery.value,
    intoleranceQuery.value,
    selectedSortFilter.value,
    selectedSortDirection.value,
    12,
    offset.value
  );
  recipesToDisplay.value = temp.results;
});

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = (e) => {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endOfPage) {
    offset.value += 12;
  }
}

watch(
  [intoleranceQuery, cuisineQuery, selectedSortFilter, selectedSortDirection],
  async () => {
    let temp = await searchRecipeComplex(
      apiStore.apiIndex,
      cuisineQuery.value,
      intoleranceQuery.value,
      selectedSortFilter.value,
      selectedSortDirection.value,
      12,
      offset.value
    );
    recipesToDisplay.value = temp.results;
  }
);

watch(offset, async () => {
  let temp = await searchRecipeComplex(
    apiStore.apiIndex,
    cuisineQuery.value,
    intoleranceQuery.value,
    selectedSortFilter.value,
    selectedSortDirection.value,
    12,
    offset.value
  );
  recipesToDisplay.value = recipesToDisplay.value.concat(temp.results);
});
</script>
<style>

</style>
