<script setup>
const props = defineProps({
  modalState: {
    type: Object,
    required: true,
  },
  modalID: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="modal">
    <div class="modal-box py-8">
      <label
        v-if="modalState.status !== 'loading'"
        :for="modalID"
        class="btn btn-ghost absolute right-2 top-2"
        >✕</label
      >
      <div v-if="modalState.status === 'loading'" class="mt-6">
        <div style="border-top-color: transparent" class="spinner"></div>
      </div>
      <div v-else-if="modalState.status === 'success'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#5cb85c"
          class="w-20 h-20 mx-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#cd0e00"
          class="w-20 h-20 mx-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div class="text-center py-6">
        <p class="font-bold text-3xl">{{ modalState.title }}</p>
        <p class="mt-2">{{ modalState.message }}</p>
        <p class="mt-2">{{ modalState.message1 }}</p>
      </div>
    </div>
  </div>
</template>
