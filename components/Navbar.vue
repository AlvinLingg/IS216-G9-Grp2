<template>
  <div class="flex items-center justify-between flex-wrap w-full p-5">
    <div class="text-2xl font-bold">NOM.NOM</div>
    <div class="block md:hidden" @click="toggleMenu" style="color: #4b4d4c">
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
        class="items-center flex flex-col sm:flex-row justify-center sm:justify-between md:justify-end text-sm"
      >
        <nuxt-link href="/discover">
          <span> Discover </span>
        </nuxt-link>

        <nuxt-link href="/recipes">
          <span> My Recipes </span>
        </nuxt-link>

        <nuxt-link href="/fridge">
          <span> My Fridge </span>
        </nuxt-link>
        <div class="md:hidden">
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
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
};
</script>

<style>
span {
  margin: 8px;
}
</style>
