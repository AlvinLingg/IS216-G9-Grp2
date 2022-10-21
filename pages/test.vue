<script setup>
const testApi = async () => {
  console.log("hello");
  const { data } = await useFetch("/api/getCommentsForRecipe", {
    method: "GET",
    params: {
      recipeId: "1",
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(data);
};
</script>

<template>
  <div>
    <Navbar />
    <Comments />
    <button @click="testApi">dasd sa</button>
  </div>
</template>

<style></style>
