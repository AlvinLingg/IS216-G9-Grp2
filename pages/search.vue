<template>
  <div>
    <div class="section p-5 max-w-6xl m-auto">
      <div class="flex flex-col gap-5">
        <div>
          <h1 class="text-5xl font-bold">Search recipes</h1>
          <p v-if="searchResults !== null" class="mt-2">
            {{ searchResults.totalResults }} Results found
          </p>
        </div>
        <div
          class="grid gap-6 mt-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1"
          ref="scrollComponent"
        >
          <template v-if="searchResults !== null">
            <template v-if="searchResults.totalResults !== 0">
              <template v-for="recipe in Object.values(searchResults.results)">
                <RecipeCard
                  :recipe="recipe"
                  @click="navigateTo(`/spoonacular/recipes/${recipe.id}`)"
                />
              </template>
            </template>
            <span v-else class="text-slate-600">No recipes found.</span>
          </template>
          <template v-else>
            <span class="text-slate-600">No recipes found.</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useApiStore } from "~/store/apiStore";

const apiStore = useApiStore();
const route = useRoute();
let searchQuery = computed(() => route.query.q);
let searchResults = ref(null);
let offset = ref(0);
let scrollComponent = ref(null);

searchResults.value = await searchRecipe(
  apiStore.apiIndex,
  searchQuery.value,
  12,
  offset.value
);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = (e) => {
  const endOfPage =
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endOfPage) {
    offset.value += 12;
  }
};

watch(searchQuery, async () => {
  searchResults.value = await searchRecipe(
    apiStore.apiIndex,
    searchQuery.value,
    12
  );
});

watch(offset, async () => {
  let temp = await searchRecipe(
    apiStore.apiIndex,
    searchQuery.value,
    12,
    offset.value
  );
  searchResults.value.results = searchResults.value.results.concat(
    temp.results
  );
});
</script>
