<template>
  <div class="container mx-auto">
    <div v-if="userProfile === undefined" class="section p-10 max-w-6xl m-auto">
      <NoExist />
    </div>
    <div v-else class="section p-10 max-w-6xl m-auto">
      <div class="flex gap-5 justify-center">
        <div
          v-if="userProfile.profilePicture === undefined"
          class="inline-flex overflow-hidden relative justify-center items-center w-[100px] h-[100px] bg-gray-100 rounded-full dark:bg-gray-600"
        >
          <span class="font-medium text-gray-600 dark:text-gray-300">{{
            userProfile.profileHandle.slice(0, 5)
          }}</span>
        </div>
        <div v-else>
          <div>hello</div>
        </div>

        <div class="self-center">
          <h1
            v-if="userProfile.displayName === undefined"
            class="text-3xl font-bold"
          >
            {{ userProfile.profileHandle }}
          </h1>
          <h1 v-else class="text-3xl font-bold">
            {{ userProfile.displayName }}
          </h1>
          <p class="text-sm text-slate-600">@{{ userProfile.profileHandle }}</p>

          <div
            v-if="
              userStore.user !== null &&
              userStore.user.profileHandle === userProfile.profileHandle
            "
            class="flex gap-3 mt-3"
          >
            <button class="btn" @click="navigateTo('/profile/edit')">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div class="tabs font-semibold mt-10">
        <a
          @click="toggleTab(0)"
          :class="{
            'tab text-3xl tab-active': openTab === 0,
            'tab text-3xl': openTab !== 0,
          }"
          >My recipes</a
        >
        <a
          @click="toggleTab(1)"
          :class="{
            'tab text-3xl tab-active': openTab === 1,
            'tab text-3xl': openTab !== 1,
          }"
          >Liked recipes</a
        >
      </div>

      <div
        :class="{
          'h-[100px] mt-10 px-[1rem]': openTab === 0,
          'h-[100px] mt-10 px-[1rem] hidden': openTab !== 0,
        }"
      >
        <div
          v-if="userStore.user"
          class="text-center p-16 bg-[#f3f4f6] rounded-3xl"
        >
          <h1 class="text-3xl font-bold">Oops!</h1>
          <p class="mt-3">Looks like you have not created any recipes.</p>
          <p>Have a recipe you wanna share?</p>
          <button
            class="btn rounded-3xl primary-color mt-3"
            @click="navigateTo('/recipes/create')"
          >
            Upload Recipe
          </button>
        </div>
        <div v-else class="text-center p-16 bg-[#f3f4f6] rounded-3xl">
          <h1 class="text-3xl font-bold">Oops!</h1>
          <p class="mt-3">
            Looks like
            <span class="font-bold">
              {{ userProfile.profileHandle }}
            </span>
            has not created any recipes.
          </p>
        </div>
      </div>
      <div
        :class="{
          'h-[100px] bg-blue mt-10 px-[1rem]': openTab === 1,
          'h-[100px] bg-blue mt-10 px-[1rem] hidden': openTab !== 1,
        }"
      >
        <div
          v-if="userStore.user"
          class="text-center p-16 bg-[#f3f4f6] rounded-3xl"
        >
          <h1 class="text-3xl font-bold">Oops!</h1>
          <p class="mt-3">Looks like you have not liked any recipes.</p>
          <p>Let&#39;s go explore some recipes!</p>
          <button
            class="btn rounded-3xl primary-color mt-3"
            @click="navigateTo('/')"
          >
            Discover Recipes
          </button>
        </div>
        <div v-else class="text-center p-16 bg-[#f3f4f6] rounded-3xl">
          <h1 class="text-3xl font-bold">Oops!</h1>
          <p class="mt-3">
            Looks like
            <span class="font-bold">
              {{ userProfile.profileHandle }}
            </span>
            has not liked any recipes.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~~/store/userStore";
const route = useRoute();
const openTab = ref(0);
const userProfile = ref({});
const userStore = useUserStore();

const fetchUserProfile = async () => {
  const { data } = await useFetch("/api/getProfileByHandle", {
    method: "GET",
    params: {
      handle: route.params.uid,
    },
  });
  return data.value[0];
};
userProfile.value = await fetchUserProfile();

const toggleTab = (index) => {
  openTab.value = index;
};
</script>
