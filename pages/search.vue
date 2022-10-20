<template>
    <Navbar />
    <div class="section p-5 max-w-6xl m-auto">

        <div class="flex flex-col gap-5">
            <h1 class="text-5xl font-bold">Search Results</h1>
            <template v-if="searchResults.results.length > 0">
                <div class="grid gap-6 mt-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
                    <RecipeCard :recipes="Object.values(searchResults.results)" />
                </div>
            </template>
            <template v-else>
                <span class="text-slate-600">No recipes found.</span>
            </template>

        </div>
    </div>
</template>
<script setup>

const route = useRoute();
let searchQuery = ref(route.query.query);
console.log(searchQuery.value);
let searchResults = ref(await searchRecipe(0, searchQuery.value, 1));
console.log(searchResults.value);
</script>