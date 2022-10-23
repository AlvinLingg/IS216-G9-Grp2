<script setup>
const props = defineProps({
  toastMessage: {
    type: String,
  },
});
console.log(props);
</script>

<template>
  <div class="toast toast-end mt-[80px]">
    <div class="alert alert-success w-[300px]">
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
