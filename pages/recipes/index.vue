<template>
  <div class="container mx-auto p-9">
    <h1 class="text-3xl font-semibold leading-relaxed mb-5">
      Browse by Cuisine
    </h1>
    <div><CuisineCarousel /></div>
    <h1
      class="text-3xl font-semibold leading-relaxed mt-12 mb-5 text-center md:text-left"
    >
      Popular Recipes
    </h1>
    <div
      class="grid gap-y-[50px] gap-x-[50px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[25px] 2xl:grid-cols-4"
    >
      <div class="justify-self-center md:justify-self-stretch">
        <RecipeCard />
      </div>
      <div class="justify-self-center md:justify-self-stretch">
        <RecipeCard />
      </div>
      <div class="justify-self-center md:justify-self-stretch">
        <RecipeCard />
      </div>
      <div class="justify-self-center md:justify-self-stretch">
        <RecipeCard />
      </div>
      <div class="justify-self-center md:justify-self-stretch">
        <RecipeCard />
      </div>
      <div class="justify-self-center md:justify-self-stretch">
        <RecipeCard />
      </div>
      <div class="justify-self-center md:justify-self-stretch">
        <RecipeCard />
      </div>
    </div>
  </div>
</template>

<script></script>

<style></style>
