<template>
  <div id="card" class="flex flex-col content-center">
    <img
      class="object-cover rounded-3xl aspect-[16/9]"
      src="../assets/test-img.jpg"
      alt=""
    />
    <div class="h-7">
      <h2 class="absolute font-semibold text-md">Mediterranean</h2>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@media (max-width: 500px) {
  #card > img {
    aspect-ratio: 4/3;
  }
}

@media (max-width: 400px) {
  #card > img {
    aspect-ratio: 3/3;
  }
}
</style>
