<script setup>
const props = defineProps({
  toastMessage: {
    type: String,
  },
});
</script>

<template>
  <div class="toast toast-end">
    <div class="alert alert-success">
      <div class="mx-auto">
        <span> {{ props.toastMessage }}</span>
      </div>
    </div>
  </div>
</template>

<style></style>
