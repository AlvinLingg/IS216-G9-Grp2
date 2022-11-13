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
const userCreatedRecipes = ref([]);
const userOwner = ref(false);
const communityLiked = ref([]);
const communityRecipesDisplay = ref([]);

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

// Likes and Created Recipes
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

  for (let i = 0; i < favoritedRecipes.value.length; i++) {
    if (favoritedRecipes.value[i]["rid"].length == 13) {
      communityLiked.value.push(favoritedRecipes.value[i]);
    }
  }

  recipesToDisplay.value = await getRecipeInformationBulk(
    apiStore.apiIndex,
    favoritedRecipes.value.map((x) => x.rid).join(",")
  );

  const getRecipeDetails = async (rid) => {
    const { data, error } = await useFetch("/api/getRecipeDetails", {
      initialCache: false,
      method: "GET",
      query: {
        id: rid,
      },
    });
    return data;
  };

  for (let like of communityLiked.value) {
    const recipe = await getRecipeDetails(like.rid);
    communityRecipesDisplay.value.push(recipe.value);
  }

  const fetchUserCreatedRecipes = async () => {
    const { data } = await useFetch("/api/getRecipeByUser", {
      method: "GET",
      params: {
        userId: userProfile.value.uniqueUserId,
      },
      initialCache: false,
    });
    userCreatedRecipes.value = data.value;
  };
  fetchUserCreatedRecipes();
}
if (userProfile?.value?.uniqueUserId == userStore?.user?.uniqueUserId) {
  userOwner.value = true;
}

useHead({
  title: userProfile?.value?.profileHandle
    ? userProfile.value.profileHandle + " - NOM.NOM"
    : "User Not Found - NOM.NOM",
});
</script>

<template>
  <div class="container mx-auto min-h-screen">
    <div v-if="userProfile === undefined" class="section p-10 max-w-6xl m-auto">
      <NoExist
        errorCode="404"
        errorTitle="User Not Found"
        errorMessage="Invalid user handle! Please check the URL and try again."
      />
    </div>
    <div v-else class="section p-10 max-w-6xl m-auto">
      <div class="flex gap-5 justify-center flex-col xs:flex-row">
        <div class="my-auto mx-auto xs:mx-0 basis-[100px] grow-0 shrink-0">
          <ProfileIcon
            :profilePicture="userProfile.profilePicture"
            :profileHandle="userProfile.profileHandle"
            :profilePage="true"
          />
        </div>

        <div class="self-center">
          <h1 v-if="!userProfile.displayName" class="text-3xl font-bold">
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
          class="mb-4"
          :class="{
            'tab text-3xl tab-active': openTab === 0,
            'tab text-3xl': openTab !== 0,
          }"
          >My recipes</a
        >
        <a
          @click="toggleTab(1)"
          class="mb-4"
          :class="{
            'tab text-3xl tab-active': openTab === 1,
            'tab text-3xl': openTab !== 1,
          }"
          >Liked recipes</a
        >
      </div>

      <div
        :class="{
          'min-h-[100px] mt-6 px-[1rem]': openTab === 0,
          'min-h-[100px] mt-6 px-[1rem] hidden': openTab !== 0,
        }"
      >
        <div
          v-if="userCreatedRecipes.length == 0"
          class="text-center p-0 xs:p-16 bg-[#ffffff] xs:bg-[#f3f4f6] rounded-3xl"
        >
          <h1 class="text-3xl font-bold">Oops!</h1>
          <p class="mt-3">
            Looks like
            <span>{{
              userOwner ? "you have " : userProfile.profileHandle + " has "
            }}</span>
            not created any recipes.
          </p>
          <div v-if="userOwner">
            <p>Have a recipe you wanna share?</p>
            <button
              class="btn rounded-3xl primary-color mt-3"
              @click="navigateTo('/recipes/create')"
            >
              Upload Recipe
            </button>
          </div>
        </div>

        <div
          v-else
          class="text-center p-0 xs:p-16 bg-[#ffffff] xs:bg-[#f3f4f6] rounded-3xl grid gap-4 mt-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
        >
          <RecipeCard
            v-for="recipe in userCreatedRecipes"
            :recipe="recipe"
            @click="navigateTo(`/community/recipes/${recipe.id}`)"
          />
        </div>
      </div>

      <div
        :class="{
          'min-h-[100px] bg-blue mt-6 px-[1rem]': openTab === 1,
          'min-h-[100px] bg-blue mt-6 px-[1rem] hidden': openTab !== 1,
        }"
      >
        <div
          v-if="userStore.user"
          class="text-center p-0 xs:p-16 bg-[#ffffff] xs:bg-[#f3f4f6] rounded-3xl"
        >
          <div v-if="favoritedRecipes.length == 0">
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
          <div
            class="grid gap-4 mt-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
            v-else
          >
            <RecipeCard
              v-for="recipe in Object.values(recipesToDisplay)"
              :recipe="recipe"
              @click="navigateTo(`/spoonacular/recipes/${recipe.id}`)"
            />
            <RecipeCard
              v-for="recipe in communityRecipesDisplay"
              :recipe="recipe.Items[0]"
              @click="navigateTo(`/community/recipes/${recipe.Items[0].id}`)"
            />
          </div>
        </div>

        <div v-else class="text-center p-16 bg-[#f3f4f6] rounded-3xl">
          <h1 class="text-3xl font-bold">Oops!</h1>
          <p class="mt-3">
            Please log in to view
            <span class="font-bold">
              {{ userProfile.profileHandle }}
            </span>
            likes!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
