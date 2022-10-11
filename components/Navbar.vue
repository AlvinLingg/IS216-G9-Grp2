<template>
  <div class="container mx-auto">
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <nuxt-link to="/" class="btn btn-ghost normal-case text-2xl"
          >NOM.NOM
        </nuxt-link>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
          <li><nuxt-link to="/">Discover</nuxt-link></li>
          <li><nuxt-link to="/fridge">My Fridge</nuxt-link></li>
        </ul>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <a class="btn hidden lg:inline-flex"
          >Login/Register
          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
            />
          </svg>
        </a>
        <label
          class="btn btn-ghost lg:hidden swap swap-rotate"
          @click="toggleMenu()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            :class="menuOpen ? 'swap-on' : 'swap-off'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            :class="menuOpen ? 'swap-off' : 'swap-on'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </div>
    </div>
    <div class="lg:hidden" v-if="menuOpen">
      <ul
        tabindex="0"
        class="menu menu-compact mt-0 mb-3 p-2 pt-0 bg-base-100 rounded-box"
      >
        <li><nuxt-link to="/" class="mx-auto">Discover</nuxt-link></li>
        <li>
          <nuxt-link to="/fridge" class="mx-auto">My Fridge</nuxt-link>
        </li>
        <li>
          <a class="btn text-white mx-auto">Login/Register</a>
        </li>
      </ul>
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
