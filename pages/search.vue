<template>
    <input class="input input-bordered w-full max-w-xs" type="text" v-model="searchQuery" />
    <span>{{searchQuery}}</span>
    <span>{{searchResults.length}}</span>
    <div class="grid gap-6 mt-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        <template v-if="searchResults.length > 0">
            <div v-for="result in searchResults"
                class="card bg-base-100 shadow-md hover:cursor-pointer hover:shadow-xl ease-in duration-150"
                @click="navigateTo(`/recipes/${result.id}`)">
                <img class="h=[100px] object-cover rounded-top-3xl border-b" :src="result.image" alt="" />
                <div class="card-body p-5 gap-0">
                    <h2 class="card-title truncate block">{{ result.title}}</h2>
                </div>
            </div>
        </template>
        <template v-else>
            <span class="text-slate-600">No recipes found.</span>
        </template>

    </div>
</template>
<script setup>

let searchQuery = ref("");
let searchResults = ref([]);

console.log(searchQuery.value);

let rotatingApiKey = [
    "1e8aa973fadf4c31abf5e308dccafda7",
];
watch(searchQuery, async (newValue, oldValue) => {
    console.log(newValue);
    console.log(oldValue);

    if (newValue === "") {
        searchResults.value = [];
        return;
    }

    let { data } = await useFetch("/recipes/complexSearch", {
        initialCache: false,
        method: "GET",
        baseURL: "https://api.spoonacular.com",
        params: {
            apiKey: rotatingApiKey[0],
            query: newValue,
            number: 10,
        }
    });

    searchResults.value = data.value.results;
});

</script>