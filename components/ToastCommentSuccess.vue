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
        <span>
          {{ props.toastMessage }}<br />
          Reload to view changes!
        </span>
      </div>
    </div>
  </div>
</template>

<style></style>
