<script setup>
import HeartSolid from "~icons/clarity/heart-solid";
import { useUserStore } from "~~/store/userStore";

const userStore = useUserStore();
const props = defineProps({
  imageURL: {
    type: String,
  },
  rid: {
    type: String,
  },
  recipes: {
    type: Object,
  },
});
// Initialize isFavored
let isFavored;

// Initialize the state of the heart icon
const liked = ref(false);

// Initialize the state of the error toast
const hideToast = ref(true);

const getUserFavorites = async () => {
  const { data, error } = await useFetch("/api/getFavorite", {
    initialCache: false,
    method: "GET",
    query: {
      id: `${props.rid}${userStore.user.uniqueUserId.slice(9)}`,
    },
  });
  return data;
};

if (userStore.user != null) {
  isFavored = await getUserFavorites();
  liked.value = isFavored.value["Count"] == 0 ? false : true;
} else {
  liked.value = false;
}

const handleClick = async () => {
  if (userStore.user != null) {
    if (isFavored.value["Count"] == 0) {
      liked.value = true;
      // update db -> send to api
      await useFetch("/api/favorite", {
        initialCache: false,
        method: "POST",
        body: {
          rid: props.rid,
          uid: userStore.user.uniqueUserId,
        },
      });
    } else {
      liked.value = false;
      // delete from db -> send to api
      await useFetch("/api/deleteFavorite", {
        initialCache: false,
        method: "DELETE",
        body: {
          id: props.rid + userStore.user.uniqueUserId.slice(9),
        },
      });
    }
    isFavored = await getUserFavorites(); // re-update GET query
  } else {
    console.log("User not logged in");
    hideToast.value = false;
    setTimeout(function () {
      hideToast.value = true;
    }, 5000);
  }
};
</script>
<template>
  <div>
    <div class="card bg-base-100 shadow-xl w-full sm:w-4/5 md:w-3/5 lg:w-full">
      <figure class="relative">
        <img :src="props.imageURL" />
        <div
          class="rounded-full p-4 cursor-pointer bg-white absolute right-6 top-6"
          :class="{
            'text-red-600': liked,
            'hover:text-gray-600': liked,
            'text-gray-600': !liked,
            'hover:text-red-600': !liked,
          }"
          @click="handleClick"
          style="box-shadow: -2px 8px 15px -7px rgba(0, 0, 0, 0.46)"
        >
          <heart-solid class="text-xl" />
        </div>
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ props.recipes.title }}
        </h2>
        <p class="text-gray-500">By: {{ props.recipes.sourceName }}</p>
        <div class="card-actions mt-5">
          <div
            class="badge badge-outline"
            v-if="
              props.recipes.vegetarian && props.recipes.vegetarian.length != 0
            "
          >
            Vegetarian
          </div>
          <div
            class="badge badge-outline"
            v-if="props.recipes.vegan && props.recipes.vegan.length != 0"
          >
            Vegan
          </div>
          <div
            class="badge badge-outline"
            v-if="
              props.recipes.glutenFree && props.recipes.glutenFree.length != 0
            "
          >
            Gluten-Free
          </div>
          <div
            class="badge badge-outline"
            v-if="
              props.recipes.dairyFree && props.recipes.dairyFree.length != 0
            "
          >
            Dairy-Free
          </div>
          <div
            class="badge badge-outline"
            v-if="
              props.recipes.sustainable && props.recipes.sustainable.length != 0
            "
          >
            Sustainable
          </div>
        </div>
      </div>
    </div>
    <div
      class="toast toast-center justify-center"
      :class="{ hidden: hideToast }"
    >
      <div class="alert alert-error w-[325px] justify-center">
        <div>
          <span>Please log in to favorite recipes!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style></style>
