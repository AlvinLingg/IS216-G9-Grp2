<script setup>
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const props = defineProps(["recipes", "instructions"]);
</script>
<template>
  <div class="h-[750px] lg:h-[550px] xl:h-[750px]">
    <div class="h-fit">
      <h1 class="text-3xl font-semibold leading-relaxed">
        {{ props.recipes.title }}
      </h1>
      <p class="text-s text-gray-500">
        {{ capitalizeFirstLetter(props.recipes.dishTypes[0]) }} •
        {{ props.recipes.readyInMinutes }} minutes •
        {{ props.recipes.servings }} servings
      </p>
      <h2 class="text-xl mt-5 mb-2 font-semibold">Ingredients</h2>
    </div>
    <div class="overflow-auto max-h-[40%] lg:max-h-[28%]">
      <ul class="leading-loose text-s text-gray-500">
        <li v-for="ingredients in props.recipes.extendedIngredients">
          {{ ingredients.original }}
        </li>
      </ul>
    </div>
    <h2 class="text-xl mt-5 mb-2 font-semibold">Directions</h2>
    <div class="overflow-auto max-h-[40%] lg:max-h-[37%]">
      <ul
        class="leading-loose text-s text-gray-500 pr-3"
        v-if="instructions.length != 0"
      >
        <li class="mb-3" v-for="step in props.instructions[0].steps">
          <p class="font-semibold pb-2">Step {{ step.number }}</p>
          <p class="leading-tight">{{ step.step }}</p>
        </li>
      </ul>
      <p class="mt-2 text-s text-gray-500" v-else>
        There are no instructions for this recipe :-(
      </p>
    </div>
  </div>
</template>
<script></script>
<style>
* {
  scrollbar-width: auto;
  scrollbar-color: #949494 #ffffff;
}

*::-webkit-scrollbar {
  width: 11px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: #949494;
  border-radius: 20px;
  border: 3px solid #ffffff;
}
</style>
