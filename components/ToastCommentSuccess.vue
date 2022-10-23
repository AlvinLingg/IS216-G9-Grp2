<script setup>
const props = defineProps({
  toastMessage: {
    type: String,
  },
});
</script>

<template>
  <div class="toast toast-top toast-center">
    <div class="alert alert-success w-[300px]">
      <div class="mx-auto">
        <span>{{ props.toastMessage }} Reload to view changes!</span>
      </div>
    </div>
  </div>
</template>

<style></style>
