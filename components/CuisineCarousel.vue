<template>
  <div class="w-4/5 mx-auto flex flex-col justify-center">
  <h1 class="mt-4 font-semibold text-xl">Browse by Cuisine</h1>

  <div class="carousel w-full mt-5">
    <div id="slide1" class="carousel-item relative w-full">
      <div class="w-full mx-auto px-20 flex flex-row">
        <CuisineCard/>
        <CuisineCard/>
        <CuisineCard/>
      </div>
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide4" class="btn btn-circle">❮</a> 
        <a href="#slide2" class="btn btn-circle">❯</a>
      </div>
    </div> 
    <div id="slide2" class="carousel-item relative w-full">
      <div class="w-full mx-auto px-20 flex flex-row">
        <CuisineCard/>
        <CuisineCard/>
        <CuisineCard/>
      </div>
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide1" class="btn btn-circle">❮</a> 
        <a href="#slide3" class="btn btn-circle">❯</a>
      </div>
    </div> 
    <div id="slide3" class="carousel-item relative w-full">
      <div class="w-full mx-auto px-20 flex flex-row">
        <CuisineCard/>
        <CuisineCard/>
        <CuisineCard/>
      </div>
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide2" class="btn btn-circle">❮</a> 
        <a href="#slide4" class="btn btn-circle">❯</a>
      </div>
    </div> 
    <div id="slide4" class="carousel-item relative w-full">
      <div class="w-full mx-auto px-20 flex flex-row">
        <CuisineCard/>
        <CuisineCard/>
        <CuisineCard/>
      </div>  
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide3" class="btn btn-circle">❮</a> 
        <a href="#slide1" class="btn btn-circle">❯</a>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>