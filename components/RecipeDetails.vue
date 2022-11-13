<script setup>
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const props = defineProps({
  recipes: {
    type: Object,
    required: true,
  },
  instructions: {
    type: Object,
    required: true,
  },
  nomnom: {
    type: Boolean,
    required: true,
  },
});
const obj = ref({});
if (props.nomnom == true) {
  obj.value = JSON.parse(props.recipes.extendedIngredients);
}

const showMoreDirections = ref(false);
</script>
<template>
  <template v-if="nomnom == false">
    <div
      class="lg:min-h-[500px] xl:min-h-[600px] min-h-screen"
      :class="{ 'h-[450px]': instructions.length == 0 }"
    >
      <div class="h-fit">
        <h1 class="text-3xl font-semibold leading-relaxed">
          {{ props.recipes.title }}
        </h1>
        <p class="text-gray-500">
          {{
            props.recipes.dishTypes.length != 0
              ? capitalizeFirstLetter(props.recipes.dishTypes[0])
              : "Others"
          }}
          •
          {{
            props.recipes.readyInMinutes.length != 0
              ? props.recipes.readyInMinutes
              : "Nil"
          }}
          minutes •
          {{
            props.recipes.servings.length != 0 ? props.recipes.servings : ">1"
          }}
          serving(s)
        </p>
      </div>
      <!-- Ingredients -->
      <div class="py-5 rounded-3xl">
        <h2 class="text-xl mb-2 font-semibold">Ingredients</h2>
        <ul
          class="leading-loose text-gray-500 list-inside lg:columns-3 md:columns-2"
        >
          <li
            class="list-disc"
            v-for="(ingredient, index) in props.recipes.extendedIngredients"
          >
            {{ ingredient.original }}
          </li>
        </ul>
      </div>
      <div class="mb-8">
        <h2 class="text-xl mt-5 mb-2 font-semibold">Directions</h2>

        <div v-if="instructions.length != 0">
          <ul class="leading-loose text-gray-500 pr-3">
            <template v-if="props.instructions[0].steps.length < 3">
              <li class="mb-3" v-for="step in props.instructions[0].steps">
                <p class="font-semibold pb-2">Step {{ step.number }}</p>
                <p class="leading-tight">{{ step.step }}</p>
              </li>
            </template>
            <template v-else>
              <template v-for="(step, index) in props.instructions[0].steps">
                <li class="mb-3" v-if="index < 3">
                  <p class="font-semibold pb-2">Step {{ step.number }}</p>
                  <p class="leading-tight">{{ step.step }}</p>
                </li>
              </template>
              <template v-if="showMoreDirections">
                <li
                  class="mb-3"
                  v-for="step in props.instructions[0].steps.slice(
                    3,
                    props.instructions[0].steps.length
                  )"
                >
                  <p class="font-semibold pb-2">Step {{ step.number }}</p>
                  <p class="leading-tight">{{ step.step }}</p>
                </li>
              </template>
            </template>
          </ul>
          <template v-if="props.instructions[0].steps.length >= 3">
            <button
              v-if="showMoreDirections"
              class="btn grey-color px-8 mt-3 btn-action"
              @click="showMoreDirections = false"
            >
              Show less
            </button>
            <button
              v-else
              class="btn grey-color px-8 mt-3 btn-action"
              @click="showMoreDirections = true"
            >
              Show more
            </button>
          </template>
        </div>
        <p class="mt-2 text-s text-gray-500" v-else>
          There are no instructions for this recipe :-(
        </p>
      </div>
      <Comments />
    </div>
  </template>
  <template v-else>
    <div
      class="lg:min-h-[500px] xl:min-h-[600px] min-h-screen"
      :class="{ 'min-h-[450px]': instructions.length == 0 }"
    >
      <div class="h-fit">
        <h1 class="text-3xl font-semibold leading-relaxed">
          {{ props.recipes.title }}
        </h1>
        <p class="text-s text-gray-500">
          {{
            props.recipes.dishTypes.length != 0
              ? capitalizeFirstLetter(props.recipes.dishTypes[0])
              : "Others"
          }}
          •
          {{
            props.recipes.readyInMinutes.length != 0
              ? props.recipes.readyInMinutes
              : "Nil"
          }}
          minutes •
          {{
            props.recipes.servings.length != 0 ? props.recipes.servings : ">1"
          }}
          serving(s)
        </p>
      </div>

      <!-- Ingredients -->
      <div class="py-5 rounded-3xl">
        <h2 class="text-xl mb-2 font-semibold">Ingredients</h2>
        <ul
          class="leading-loose text-gray-500 list-inside lg:columns-3 md:columns-2"
        >
          <li class="list-disc" v-for="(ingredients, key) in obj">
            {{ obj[key]["amount"] }} {{ obj[key]["unit"] }} {{ key }}
          </li>
        </ul>
      </div>
      <div class="mb-8">
        <h2 class="text-xl mt-5 mb-2 font-semibold">Directions</h2>

        <div v-if="instructions.length != 0">
          <ul class="leading-loose text-gray-500 pr-3">
            <template v-if="props.instructions.length < 3">
              <li class="mb-3" v-for="(step, index) in props.instructions">
                <p class="font-semibold pb-2">Step {{ index + 1 }}</p>
                <p class="leading-tight">{{ step }}</p>
              </li>
            </template>
            <template v-else>
              <template v-for="(step, index) in props.instructions">
                <li class="mb-3" v-if="index < 3">
                  <p class="font-semibold pb-2">Step {{ index + 1 }}</p>
                  <p class="leading-tight">{{ step }}</p>
                </li>
              </template>
              <template v-if="showMoreDirections">
                <li
                  class="mb-3"
                  v-for="(step, index) in props.instructions.slice(
                    3,
                    props.instructions.length
                  )"
                >
                  <p class="font-semibold pb-2">Step {{ index + 1 }}</p>
                  <p class="leading-tight">{{ step }}</p>
                </li>
              </template>
            </template>
          </ul>
          <template v-if="props.instructions.length >= 3">
            <button
              v-if="showMoreDirections"
              class="btn grey-color px-8 mt-3 btn-action"
              @click="showMoreDirections = false"
            >
              Show less
            </button>
            <button
              v-else
              class="btn grey-color px-8 mt-3 btn-action"
              @click="showMoreDirections = true"
            >
              Show more
            </button>
          </template>
        </div>

        <p class="mt-2 text-s text-gray-500" v-else>
          There are no instructions for this recipe :-(
        </p>
      </div>
      <Comments />
    </div>
  </template>
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
