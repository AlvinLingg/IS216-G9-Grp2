<template>
  <div class="container mx-auto">
    <div v-if="userProfile === undefined" class="section p-10 max-w-6xl m-auto">
      <NoExist />
    </div>
    <div v-else class="section p-10 max-w-6xl m-auto">
      <div class="flex gap-5 justify-center">
        <ProfileIcon :profilePicture="userProfile.profilePicture" :profileHandle="userProfile.profileHandle"
          :profilePage="true" />

        <div class="self-center">
          <h1 v-if="userProfile.displayName === undefined" class="text-3xl font-bold">
            {{ userProfile.profileHandle }}
          </h1>
          <h1 v-else class="text-3xl font-bold">
            {{ userProfile.displayName }}
          </h1>
          <p class="text-sm text-slate-600">@{{ userProfile.profileHandle }}</p>

          <div v-if="
            userStore.user !== null &&
            userStore.user.profileHandle === userProfile.profileHandle
          " class="flex gap-3 mt-3">
            <button class="btn" @click="navigateTo('/profile/edit')">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div class="tabs font-semibold mt-10">
        <a @click="toggleTab(0)" :class="{
          'tab text-3xl tab-active': openTab === 0,
          'tab text-3xl': openTab !== 0,
        }">My recipes</a>
        <a @click="toggleTab(1)" :class="{
          'tab text-3xl tab-active': openTab === 1,
          'tab text-3xl': openTab !== 1,
        }">Liked recipes</a>
      </div>

      <div :class="{
        'h-[100px] mt-10 px-[1rem]': openTab === 0,
        'h-[100px] mt-10 px-[1rem] hidden': openTab !== 0,
      }">
        <div v-if="userStore.user" class="text-center p-16 bg-[#f3f4f6] rounded-3xl">
          <h1 class="text-3xl font-bold">Oops!</h1>
          <p class="mt-3">Looks like you have not created any recipes.</p>
          <p>Have a recipe you wanna share?</p>
          <button class="btn rounded-3xl primary-color mt-3" @click="navigateTo('/recipes/create')">
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
      <div :class="{
        'h-[100px] bg-blue mt-10 px-[1rem]': openTab === 1,
        'h-[100px] bg-blue mt-10 px-[1rem] hidden': openTab !== 1,
      }">
        <div v-if="userStore.user" class="text-center p-16 bg-[#f3f4f6] rounded-3xl">
          <div v-if="favoritedRecipes.length == 0">
            <h1 class="text-3xl font-bold">Oops!</h1>
            <p class="mt-3">Looks like you have not liked any recipes.</p>
            <p>Let&#39;s go explore some recipes!</p>
            <button class="btn rounded-3xl primary-color mt-3" @click="navigateTo('/')">
              Discover Recipes
            </button>
          </div>
          <div class="grid gap-4 mt-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1" v-else>
            <RecipeCard v-for="recipe in Object.values(recipesToDisplay)" :recipe="recipe"
              @click="navigateTo(`/recipes/${recipe.id}`)" />
          </div>
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
import { useApiStore } from "~/store/apiStore";
const apiStore = useApiStore();
const route = useRoute();
const openTab = ref(0);
const userProfile = ref({});
const userStore = useUserStore();
const favoritedRecipes = ref([]);
const recipesToDisplay = ref([]);

const fetchUserProfile = async () => {
  const { data } = await useFetch("/api/getProfileByHandle", {
    method: "GET",
    params: {
      handle: route.params.uid,
    },
    initialCache: false,
  });
  return data.value[0];
};
userProfile.value = await fetchUserProfile();

const toggleTab = (index) => {
  openTab.value = index;
};

// Likes
if (userProfile.value != undefined) {
  const getUserFavorites = async () => {
    const { data } = await useFetch("/api/getFavoriteByUID", {
      initialCache: false,
      method: "GET",
      query: {
        uid: `${userProfile.value["uniqueUserId"].slice(9)}`,
      },
    });
    return data.value;
  };

  favoritedRecipes.value = await getUserFavorites();
  recipesToDisplay.value = await getRecipeInformationBulk(
    apiStore.apiIndex,
    favoritedRecipes.value.map((x) => x.rid).join(",")
  );
  // console.log(recipesToDisplay.value);
}
</script>
