<script setup>
import HeartSolid from "~icons/clarity/heart-solid";
import ShareSolid from "~icons/clarity/share-solid";
import Twitter from "~icons/cib/twitter";
import FacebookF from "~icons/cib/facebook-f";
import Reddit from "~icons/cib/reddit";

import { useUserStore } from "~~/store/userStore";

const route = useRoute();

// URL to Share
const UrlPath = "https://wad2-nomnom.vercel.app";

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
  nomnom: {
    type: Boolean,
  },
  name: {
    type: String,
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
    // console.log("User not logged in");
    hideToast.value = false;
    setTimeout(function () {
      hideToast.value = true;
    }, 5000);
  }
};
</script>
<template>
  <div>
    <div
      class="card bg-base-100 shadow-xl w-full overflow-visible sm:w-4/5 md:w-3/5 lg:w-full"
    >
      <figure class="relative">
        <img :src="props.imageURL" class="rounded-xl" />
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
      <div class="card-body p-8 pb-5">
        <template v-if="props.nomnom == false">
          <h2 class="card-title">
            {{ props.recipes.title }}
          </h2>
          <p class="text-gray-500">By: {{ props.recipes.sourceName }}</p>
        </template>
        <template v-else>
          <h2 class="card-title">
            {{ props.name }}
          </h2>
          <p class="text-gray-500">By: NomNom community!</p>
        </template>
        <div class="mt-2">
          <template v-if="props.nomnom == false">
            <div
              class="badge badge-outline mr-3"
              v-if="
                props.recipes.vegetarian && props.recipes.vegetarian.length != 0
              "
            >
              Vegetarian
            </div>
            <div
              class="badge badge-outline mr-3"
              v-if="props.recipes.vegan && props.recipes.vegan.length != 0"
            >
              Vegan
            </div>
            <div
              class="badge badge-outline mr-3"
              v-if="
                props.recipes.glutenFree && props.recipes.glutenFree.length != 0
              "
            >
              Gluten-Free
            </div>
            <div
              class="badge badge-outline mr-3"
              v-if="
                props.recipes.dairyFree && props.recipes.dairyFree.length != 0
              "
            >
              Dairy-Free
            </div>
            <div
              class="badge badge-outline mr-3"
              v-if="
                props.recipes.sustainable &&
                props.recipes.sustainable.length != 0
              "
            >
              Sustainable
            </div>
          </template>
        </div>
        <div class="card-actions justify-end mt-3">
          <div class="dropdown dropdown-bottom dropdown-end">
            <label tabindex="0" class="btn m-1">
              <share-solid class="text-xl mr-3" /> Share
            </label>
            <ul
              tabindex="0"
              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <template v-if="props.nomnom == false">
                <li>
                  <a
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${UrlPath}${route.path}`"
                    ><facebook-f class="text-xl mr-1" />Facebook</a
                  >
                </li>
                <li>
                  <a
                    :href="`https://twitter.com/share?url=${UrlPath}${route.path}&text=Check%20this%20recipe%20out!%20%0A%0A${props.recipes.title}:%0A%0A`"
                    ><twitter class="text-xl mr-1" />Twitter</a
                  >
                </li>
                <li>
                  <a
                    :href="`https://reddit.com/submit?url=Check%20this%20recipe%20out!%20%0A%0A${UrlPath}${route.path}&title=${props.recipes.title}`"
                    ><reddit class="text-xl mr-1" />Reddit</a
                  >
                </li>
              </template>
              <template v-else>
                <li>
                  <a
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${UrlPath}${route.path}`"
                    ><facebook-f class="text-xl mr-1" />Facebook</a
                  >
                </li>
                <li>
                  <a
                    :href="`https://twitter.com/share?url=${UrlPath}${route.path}&text=Check%20this%20recipe%20out!%20%0A%0A${props.name}:%0A%0A`"
                    ><twitter class="text-xl mr-1" />Twitter</a
                  >
                </li>
                <li>
                  <a
                    :href="`https://reddit.com/submit?url=Check%20this%20recipe%20out!%20%0A%0A${UrlPath}${route.path}&title=${props.name}`"
                    ><reddit class="text-xl mr-1" />Reddit</a
                  >
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div
      class="toast toast-center justify-center z-50"
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

<style></style>
