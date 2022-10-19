<script setup>
const props = defineProps({
  errorMessage: {
    type: String,
    required: true,
  },
  errorTitle: {
    type: String,
    required: true,
  },
});
const router = useRouter();
</script>

<template>
  <div class="grid grid-cols-1 h-[70vh] lg:grid-cols-2 mt-[0px] p-10">
    <div class="self-center">
      <h1 class="bold mb-4 text-4xl sm:text-6xl">404</h1>
      <h1 class="bold mb-4 text-4xl sm:text-6xl">Oooops!</h1>
      <h1 class="bold mb-7 text-4xl sm:text-6xl">{{ errorTitle }}</h1>
      <p class="text-lg text-gray-500 mb-9 sm:text-2xl">
        {{ errorMessage }}
      </p>
      <button class="rounded-full bg-[#FFD67E] py-5 px-10 font-bold">
        <nuxt-link @click="router.back()">Back to Previous Page :-)</nuxt-link>
      </button>
    </div>
    <div class="self-center hidden lg:block w-[80%]">
      <img src="../assets/SadTaco.jpg" alt="" />
    </div>
  </div>
</template>

<style></style>
