<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between flex-wrap w-full p-5">
      <div class="text-2xl font-bold px-5">
        <nuxt-link href="/">NOM.NOM</nuxt-link>
      </div>
      <div
        class="block md:hidden mx-5"
        @click="toggleMenu"
        style="color: #4b4d4c"
      >
        <svg v-if="menuOpen" class="w-6" viewBox="0 0 20 20">
          <title>Close</title>
          <path
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
          />
        </svg>
        <svg v-else class="w-6" viewBox="0 0 20 20">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </div>
      <div
        class="md:block basis-full md:basis-auto"
        :class="menuOpen ? 'block' : 'hidden'"
      >
        <div
          class="items-center flex flex-col sm:flex-row justify-center sm:justify-between md:justify-end text-base"
        >
          <nuxt-link href="/discover" class="md:my-0 my-4">
            <span class="px-5"> Discover </span>
          </nuxt-link>

          <nuxt-link href="/recipes" class="md:my-0 my-4">
            <span class="px-5"> My Recipes </span>
          </nuxt-link>

          <nuxt-link href="/fridge" class="md:my-0 my-4">
            <span class="px-5"> My Fridge </span>
          </nuxt-link>
          <div class="md:hidden my-4">
            <button
              class="px-5 py-2 rounded-xl bg-brand text-secondary font-bold"
            >
              Login
            </button>
            <button class="px-5 py-2 text-secondary">Register</button>
          </div>
        </div>
      </div>
      <div class="hidden md:block">
        <button class="px-5 py-2 rounded-xl bg-brand text-secondary font-bold">
          Login
        </button>
        <button class="px-5 py-2 text-secondary">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style></style>
