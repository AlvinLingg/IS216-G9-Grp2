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
});

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
var isFavored = await getUserFavorites();

// Initialize the state of the heart icon
var liked = ref(false);
liked.value = isFavored.value["Count"] == 0 ? false : true;

const handleClick = async () => {
  console.log(isFavored.value["Count"]);
  if (isFavored.value["Count"] == 0) {
    // update db -> send to api
    await useFetch("/api/favorite", {
      initialCache: false,
      method: "POST",
      body: {
        rid: props.rid,
        uid: userStore.user.uniqueUserId,
      },
    });
    liked.value = true;
  } else {
    // delete from db -> send to api
    await useFetch("/api/deleteFavorite", {
      initialCache: false,
      method: "DELETE",
      body: {
        id: props.rid + userStore.user.uniqueUserId.slice(9),
      },
    });
    liked.value = false;
  }
  isFavored = await getUserFavorites(); // re-update GET query
};
</script>
<template>
  <div class="relative">
    <img :src="props.imageURL" class="w-full rounded-3xl" />
    <div
      class="absolute top-[20px] right-[20px] bg-gray-200 rounded-xl shadow-xl"
    >
      <heart-solid
        class="text-md m-3 cursor-pointer"
        @click="handleClick"
        :class="{ 'text-red-600': liked, 'text-gray-600': !liked }"
      />
    </div>
  </div>
</template>

<script></script>

<style></style>
