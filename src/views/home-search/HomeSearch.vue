<script lang="ts" setup>
import { onMounted, watch } from "vue";
import Search from "./search/Search.vue";
import { useRoute } from "vue-router";

onMounted(() => {
  /*
  const mySVG = `<svg 
id="visual" 
viewBox="0 0 900 600"
        width="900"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <defs>
          <linearGradient id="gradient1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--color-primary)" />
            <stop offset="100%" stop-color="var(--color-secondary)" />
          </linearGradient>
        </defs>
        <path
          d="M0 129L21.5 134.3C43 139.7 86 150.3 128.8 155.7C171.7 161 214.3 161 257.2 153C300 145 343 129 385.8 130.8C428.7 132.7 471.3 152.3 514.2 169C557 185.7 600 199.3 642.8 200.3C685.7 201.3 728.3 189.7 771.2 177.5C814 165.3 857 152.7 878.5 146.3L900 140L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z"
          fill="url(%23gradient1)"
          fill-opacity="1"
          stroke-linecap="round"
          stroke-linejoin="miter"
        ></path>
      </svg>`;
  const mySVG64 = window.btoa(mySVG);
  const bg = document.getElementById(
    "home-search-background"
  ) as HTMLDivElement;
  bg.style.backgroundImage = "url('data:image/svg+xml;base64," + mySVG64 + "')";*/
});
</script>
<template>
  <div class="home-search-wrap">
    <div class="background" id="home-search-background">
      <svg
        id="visual"
        viewBox="0 0 900 600"
        width="900"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <defs>
          <linearGradient id="gradient1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--color-primary)" />
            <stop offset="100%" stop-color="var(--color-secondary)" />
          </linearGradient>
        </defs>
        <path
          d="M0 129L21.5 134.3C43 139.7 86 150.3 128.8 155.7C171.7 161 214.3 161 257.2 153C300 145 343 129 385.8 130.8C428.7 132.7 471.3 152.3 514.2 169C557 185.7 600 199.3 642.8 200.3C685.7 201.3 728.3 189.7 771.2 177.5C814 165.3 857 152.7 878.5 146.3L900 140L900 0L878.5 0C857 0 814 0 771.2 0C728.3 0 685.7 0 642.8 0C600 0 557 0 514.2 0C471.3 0 428.7 0 385.8 0C343 0 300 0 257.2 0C214.3 0 171.7 0 128.8 0C86 0 43 0 21.5 0L0 0Z"
          fill="url(#gradient1)"
          fill-opacity="1"
          stroke-linecap="round"
          stroke-linejoin="miter"
        ></path>
      </svg>
    </div>
    <router-view v-slot="{ Component, route }">
      <!--
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <Suspense>
          <KeepAlive>
            <div :key="route.fullPath">
              <Search></Search>
              <component :is="Component"></component>
            </div>
          </KeepAlive>

          <template #fallback> <div>Loading</div> </template>
        </Suspense>
      </transition>      
    -->
    <KeepAlive>
      <Search></Search>
    </KeepAlive>
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <Suspense>
        <KeepAlive>
<div><component :is="Component"></component></div>          
        </KeepAlive>

      
      <template #fallback> <div>Loading</div> </template>
      </Suspense>
    </transition>

    </router-view>
  </div>
</template>
<style lang="scss">
.home-search-wrap {
  padding: 7em 20%;
  position: relative;
  // background: url("/src/shared/assets/backgrounds/blob-green-vertical2.svg");
  div {
    z-index: 5;
    position: relative;
  }
  .background {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    background: url("#visual");
    background-size: cover;
    z-index: 1;
    filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.589));

    svg {
      height: auto;
      width: 200%;
      position: absolute;
      top: 0;
      display: block;
      object-fit: cover;
    }
    // transition: 0.2s ease background;
    /*
    &::after {
      content: "";
      position: absolute;
      height: 30%;
      width: 90vw;

      top: 0;
      background: url("/src/shared/assets/backgrounds/blob-outline-1.svg");
      background-size: contain;
      background-repeat: no-repeat;
      z-index: 2;
      filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.219));
    }
    */
  }
}
</style>
