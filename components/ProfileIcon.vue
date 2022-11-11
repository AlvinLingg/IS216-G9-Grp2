<script setup>
const props = defineProps({
  profilePicture: {
    type: Object,
  },
  profileHandle: {
    type: String,
  },
  profilePage: {
    type: Boolean,
  },
});
console.log(props.profilePicture);
</script>

<template>
  <div
    class="inline-flex overflow-hidden relative justify-center items-center bg-gray-100 rounded-full dark:bg-gray-600"
    :class="profilePage ? 'w-[100px] h-[100px]' : 'w-[28px] h-[28px]'"
  >
    <span
      v-if="!props.profilePicture"
      class="font-medium text-gray-600 dark:text-gray-300"
      >{{ profileHandle.slice(0, 5) }}</span
    >
    <div v-else>
      <img
        :src="props.profilePicture"
        :class="profilePage ? 'w-[100px] h-[100px]' : 'w-[28px] h-[28px]'"
        class="object-cover rounded-full"
      />
    </div>
  </div>
</template>
