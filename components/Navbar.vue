<script setup>
import { Form, Field } from "vee-validate";
import { useUserStore } from "~/store/userStore";
const userStore = useUserStore();
const userCookie = useCookie("user");
const { $magic } = useNuxtApp();

const signOut = async () => {
  userStore.setUser(null);
  userCookie.value = null;
  try {
    await $magic.user.logout();
  } catch (error) {
    console.log(error);
  }
  window.location.reload();
};

const menuOpen = ref(true);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const dropdownOpen = ref(false);
const toggleDropdown = (event) => {
  dropdownOpen.value = !dropdownOpen.value;
  if (!dropdownOpen.value) {
    event.target.blur();
  } else {
    event.target.focus();
  }
};

const searchQuery = ref("");
</script>

<template>
  <div class="container mx-auto">
    <div class="navbar bg-base-100 min-h-[5rem]">
      <div class="navbar-start gap-5">
        <nuxt-link to="/" class="btn btn-ghost normal-case text-2xl">NOM.NOM
        </nuxt-link>
        <div class="hidden lg:flex gap-5">
          <ul class="menu menu-horizontal p-0">
            <li>
              <nuxt-link to="/" class="text-slate-600">Explore</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/fridge" class="text-slate-600">My Fridge</nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="navbar-end gap-5"><input type="text" placeholder="Search Recipes"
          class="input bg-[#16161a0a] active:bg-white focus:bg-white w-full max-w-xs rounded-3xl" v-model="searchQuery"
          @keyup.enter="navigateTo(`/search?query=${searchQuery}`)" />

        <LoginModal v-if="!userStore.user" modal-name="Sign In" :mobile="false" />
        <div v-else class="dropdown dropdown-end hidden lg:inline-block">
          <label tabindex="0" class="btn m-1" @click="toggleDropdown" @blur="
            () => {
              dropdownOpen = false;
            }
          ">
            <img class="w-[20px] h-[20px] mr-[10px] invert" src="~/assets/user.png" alt="Rounded avatar" />{{
            userStore.user.displayName == "" // TODO: WHAT TO DISPLAY HERE??
            ? "no name"
            : userStore.user.displayName
            }}</label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <button @click="navigateTo('/profile/' + userStore.user.profileHandle)">
                View Profile
              </button>
            </li>
            <li>
              <button @click="navigateTo('/profile/edit')">Edit Profile</button>
            </li>
            <li><a @click="signOut">Sign Out</a></li>
          </ul>
        </div>
        <label class="btn btn-ghost lg:hidden swap swap-rotate" @click="toggleMenu()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6" :class="menuOpen ? 'swap-on' : 'swap-off'">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6" :class="menuOpen ? 'swap-off' : 'swap-on'">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </label>
      </div>
    </div>
    <div class="lg:hidden" v-if="menuOpen">
      <ul tabindex="0" class="menu menu-compact mt-0 mb-3 p-2 pt-0 bg-base-100 rounded-box">
        <li>
          <!-- TODO: Search route (Form @submit="??") -->
          <Form>
            <Field name="search" type="text" placeholder="Search for a recipe"
              class="input input-bordered input-sm w-full max-w-xs mx-auto text-center" />
          </Form>
        </li>
        <li>
          <nuxt-link to="/" class="mx-auto">Discover</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/fridge" class="mx-auto">My Fridge</nuxt-link>
        </li>
        <div v-if="!userStore.user">
          <li></li>
          <li>
            <LoginModal modal-name="Sign In" :mobile="true" />
          </li>
        </div>
        <div v-else>
          <li>
            <nuxt-link to="/recipes/create" class="mx-auto">
              Upload a Recipe
            </nuxt-link>
          </li>
          <li></li>
          <li>
            <nuxt-link class="mx-auto" :to="'/profile/' + userStore.user.profileHandle">View Profile</nuxt-link>
          </li>
          <li>
            <nuxt-link class="mx-auto" to="/profile/edit">Edit Profile</nuxt-link>
          </li>
          <li></li>
          <li>
            <a @click="signOut" class="mx-auto">Sign Out</a>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>
