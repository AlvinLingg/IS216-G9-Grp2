<script setup>
import { Form, Field } from "vee-validate";
import { useUserStore } from "~/store/userStore";
import { useApiStore } from "~/store/apiStore";

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

const menuOpen = ref(false);
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

const apiStore = useApiStore();
if (apiStore.apiIndex === null) {
  apiStore.setApiIndex(await getValidApiKey(0, 1));
}

const searchQuery = ref("");
</script>

<template>
  <div class="container mx-auto">
    <LoginModal />
    <div class="navbar bg-base-100 min-h-[5rem]">
      <div class="navbar-start gap-5">
        <nuxt-link to="/" class="btn btn-ghost normal-case text-2xl"
          >NOM.NOM
        </nuxt-link>
        <div class="hidden lg:flex gap-5">
          <ul class="menu menu-horizontal p-0">
            <li>
              <nuxt-link to="/" class="text-slate-600">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/spoonacular/explore" class="text-slate-600"
                >Explore</nuxt-link
              >
            </li>
            <li>
              <nuxt-link to="/community/explore" class="text-slate-600"
                >Community</nuxt-link
              >
            </li>
            <li>
              <nuxt-link to="/fridge" class="text-slate-600"
                >My Fridge</nuxt-link
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="navbar-end gap-5">
        <input
          type="text"
          placeholder="Search Recipes"
          class="input bg-[#16161a0a] active:bg-white focus:bg-white w-full max-w-xs rounded-3xl hidden lg:inline-flex"
          v-model="searchQuery"
          @keyup.enter="navigateTo(`/search?q=${searchQuery}`)"
        />

        <a
          v-if="!userStore.user"
          href="#login-register-modal"
          class="btn modal-button hidden lg:inline-flex"
          >Sign In</a
        >

        <template v-else>
          <nuxt-link to="/recipes/create" class="hidden lg:inline-flex">
            <button class="btn btn-action">Create Recipe</button>
          </nuxt-link>
          <div class="dropdown dropdown-end hidden lg:inline-block">
            <label
              tabindex="0"
              class="btn btn-ghost btn-circle border-1 border-[#ddd]"
              @click="toggleDropdown"
              @blur="
                () => {
                  dropdownOpen = false;
                }
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                class="w-6 h-6 stroke-slate-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <nuxt-link :to="`/profile/${userStore.user.profileHandle}`"
                  >View Profile</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/profile/edit">Edit Profile</nuxt-link>
              </li>
              <li><a @click="signOut">Sign Out</a></li>
            </ul>
          </div>
        </template>

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
        <li>
          <input
            type="text"
            placeholder="Search Recipes"
            class="input bg-[#16161a0a] active:bg-white focus:bg-white w-full rounded-3xl text-center"
            v-model="searchQuery"
            @keyup.enter="navigateTo(`/search?q=${searchQuery}`)"
          />
        </li>
        <li>
          <nuxt-link to="/" class="mx-auto" @click="toggleMenu()"
            >Home</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            to="/spoonacular/explore"
            class="mx-auto"
            @click="toggleMenu()"
            >Explore</nuxt-link
          >
        </li>

        <li>
          <nuxt-link
            to="/community/explore"
            class="mx-auto"
            @click="toggleMenu()"
            >Community</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/fridge" class="mx-auto" @click="toggleMenu()"
            >My Fridge</nuxt-link
          >
        </li>
        <div v-if="!userStore.user">
          <li></li>
          <li>
            <a
              v-if="!userStore.user"
              href="#login-register-modal"
              class="btn modal-button text-white mx-auto"
              >Sign In</a
            >
          </li>
        </div>
        <div v-else>
          <li>
            <nuxt-link
              to="/recipes/create"
              class="mx-auto"
              @click="toggleMenu()"
            >
              Upload a Recipe
            </nuxt-link>
          </li>
          <li></li>
          <li>
            <nuxt-link
              class="mx-auto"
              :to="`/profile/${userStore.user.profileHandle}`"
              @click="toggleMenu()"
              >View Profile</nuxt-link
            >
          </li>
          <li>
            <nuxt-link class="mx-auto" to="/profile/edit" @click="toggleMenu()"
              >Edit Profile</nuxt-link
            >
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

<style scoped></style>
