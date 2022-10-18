<script setup>
import { useUserStore } from "~/store/userStore";
const userStore = useUserStore();
const userCookie = useCookie("user");

const signOut = () => {
  userStore.setUser(null);
  userCookie.value = null;
  window.location.reload();
};

const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

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
        <LoginModal
          v-if="!userStore.user"
          modal-name="Login/Register"
          :mobile="false"
        />
        <div v-else class="dropdown dropdown-end hidden lg:inline-block">
          <label tabindex="0" class="btn m-1"
            ><img
              class="w-[20px] h-[20px] mr-[10px]"
              src="~/assets/user.png"
              alt="Rounded avatar"
            />{{
              userStore.user.displayName == "" // TODO: WHAT TO DISPLAY HERE??
                ? "no name"
                : userStore.user.displayName
            }}</label
          >
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><nuxt-link to="/">View Profile (route not set)</nuxt-link></li>
            <li><nuxt-link to="/">Edit Profile (route not set)</nuxt-link></li>
            <li><a @click="signOut">Sign Out</a></li>
          </ul>
        </div>
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
        <li v-if="!userStore.user">
          <LoginModal modal-name="Login/Register" :mobile="true" />
        </li>
        <li v-else>
          <!-- TODO: nuxt link to profile page -->
          <nuxt-link class="mx-auto">
            <img
              class="w-[20px] h-[20px]"
              src="~/assets/user.png"
              alt="Rounded avatar"
            />{{
              userStore.user.displayName == ""
                ? "no name"
                : userStore.user.displayName
            }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>
