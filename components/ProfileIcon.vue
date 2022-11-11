<script setup>
const props = defineProps({
  profilePicture: {
    type: String,
  },
  profileHandle: {
    type: String,
  },
  profilePage: {
    type: Boolean,
  },
});
let profileHandleLength = props.profilePage ? 5 : 1;
</script>

<template>
  <div
    v-if="!props.profilePicture"
    class="inline-flex overflow-hidden relative justify-center items-center bg-gray-100 rounded-full dark:bg-gray-600"
    :class="profilePage ? 'w-[100px] h-[100px]' : 'w-[28px] h-[28px]'"
  >
    <span class="font-medium text-gray-600 dark:text-gray-300">{{
      profileHandle.slice(0, profileHandleLength)
    }}</span>
  </div>
  <img
    v-else
    :src="props.profilePicture"
    :class="profilePage ? 'w-[100px] h-[100px]' : 'w-[28px] h-[28px]'"
    class="object-cover rounded-full inline mr-[3px]"
  />
</template>
