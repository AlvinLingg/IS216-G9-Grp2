<template>
  <div id="row">
    <div id="header">
      <div id="progressbar"></div>
    </div>
    <div id="container">
      <button
        v-on:click="shiftleft()"
        id="handle"
        class="bg-gray-600 hover:bg-gray-700 active:scale-y-110 rounded-r-xl"
      >
        &#8249;
      </button>
      <div id="slider" ref="slider" class="">
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
        <CuisineCard />
      </div>
      <button
        v-on:click="shiftright()"
        id="handle"
        class="bg-gray-600 hover:bg-gray-700 active:scale-y-110 rounded-l-xl"
      >
        &#8250;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const progressbar = document.getElementById("progressbar");
    this.calculateProgressBar(progressbar);
    const throttleProgressBar = this.throttle(() => {
      this.calculateProgressBar(progressbar);
    }, 250);
    window.addEventListener("resize", throttleProgressBar);
  },

  methods: {
    shiftleft() {
      const progressbar = document.getElementById("progressbar");
      const progressBarItemCount = progressbar.children.length;
      const slider = document.getElementById("slider");
      console.log(slider);
      const sliderindex = parseInt(
        getComputedStyle(slider).getPropertyValue("--slider-index")
      );

      if (sliderindex - 1 < 0) {
        slider.style.setProperty("--slider-index", progressBarItemCount - 1);
        progressbar.children[progressBarItemCount - 1].setAttribute(
          "id",
          "progressboxa"
        );
        progressbar.children[0].setAttribute("id", "progressbox");
      } else {
        slider.style.setProperty("--slider-index", sliderindex - 1);
        progressbar.children[sliderindex].setAttribute("id", "progressbox");
        progressbar.children[sliderindex - 1].setAttribute(
          "id",
          "progressboxa"
        );
      }
    },

    shiftright() {
      const progressbar = document.getElementById("progressbar");
      const progressBarItemCount = progressbar.children.length;
      const slider = document.getElementById("slider");
      const sliderindex = parseInt(
        getComputedStyle(slider).getPropertyValue("--slider-index")
      );

      if (sliderindex + 1 >= progressBarItemCount) {
        slider.style.setProperty("--slider-index", 0);
        progressbar.children[sliderindex].setAttribute("id", "progressbox");
        progressbar.children[0].setAttribute("id", "progressboxa");
      } else {
        slider.style.setProperty("--slider-index", sliderindex + 1);
        progressbar.children[sliderindex].setAttribute("id", "progressbox");
        progressbar.children[sliderindex + 1].setAttribute(
          "id",
          "progressboxa"
        );
      }
    },

    calculateProgressBar(progressbar) {
      progressbar.innerHTML = "";
      const slider = document.getElementById("slider");
      const itemCount = slider.children.length;
      const itemsPerScreen = parseInt(
        getComputedStyle(slider).getPropertyValue("--items-per-screen")
      );
      let sliderindex = parseInt(
        getComputedStyle(slider).getPropertyValue("--slider-index")
      );
      const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);

      if (sliderindex >= progressBarItemCount) {
        slider.style.setProperty("--slider-index", progressBarItemCount - 1);
        sliderindex = progressBarItemCount - 1;
      }

      for (let i = 0; i < progressBarItemCount; i++) {
        const barItem = document.createElement("div");
        if (i === sliderindex) {
          barItem.setAttribute("id", "progressboxa");
        } else {
          barItem.setAttribute("id", "progressbox");
        }
        progressbar.append(barItem);
      }
    },
    throttle(cb, delay = 1000) {
      let shouldWait = false;
      let waitingArgs;
      const timeoutFunc = () => {
        if (waitingArgs == null) {
          shouldWait = false;
        } else {
          cb(...waitingArgs);
          waitingArgs = null;
          setTimeout(timeoutFunc, delay);
        }
      };
      return (...args) => {
        if (shouldWait) {
          waitingArgs = args;
          return;
        }

        cb(...args);
        shouldWait = true;
        setTimeout(timeoutFunc, delay);
      };
    },
  },
};
</script>

<style scoped>
:root {
  --handle-size: 2rem;
  --img-gap: 0.25rem;
}

body {
  margin: 0;
}

#container {
  display: flex;
  justify-content: center;
  overflow: hidden;
}

#slider {
  --items-per-screen: 4;
  --slider-index: 0;
  display: flex;
  flex-grow: 1;
  margin: 0 var(--img-gap);
  transform: translateX(calc(var(--slider-index) * -100%));
  transition: transform 250ms ease-in-out;
}

#slider > div,
h3 {
  flex: 0 0 calc(100% / var(--items-per-screen));
  max-width: calc(100% / var(--items-per-screen));
  aspect-ratio: 16 / 9;
  padding: var(--img-gap);
}

#handle {
  border: none;
  flex-grow: 0;
  flex-shrink: 0;
  z-index: 10;
  margin: var(--img-gap) 0;
  width: var(--handle-size);
  padding: 0 0.5rem;
  color: white;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  line-height: 0;
}

/* #header {
display: flex;
padding: .5rem calc(var(--img-gap)*2 + var(--handle-size));
align-items: center;
} */

#progressbar {
  margin-left: 0;
  margin-right: auto;
  display: flex;
  gap: 0.25rem;
}

#progressbox {
  flex: 0 0 0.5rem;
  width: 0.5rem;
  height: 0.2rem;
  background-color: rgb(105, 105, 105);
}

#progressboxa {
  flex: 0 0 0.5rem;
  width: 0.5rem;
  height: 0.2rem;
  background-color: rgb(173, 173, 173);
}

@media (max-width: 1000px) {
  #slider {
    --items-per-screen: 3;
  }
}

@media (max-width: 700px) {
  #slider {
    --items-per-screen: 2;
  }
}

@media (max-width: 500px) {
  #slider {
    --items-per-screen: 1;
  }

  #slider > div {
    aspect-ratio: 4/3;
  }
}

@media (max-width: 400px) {
  #slider {
    --items-per-screen: 1;
  }

  #slider > div {
    aspect-ratio: 3/3;
  }
}
</style>
