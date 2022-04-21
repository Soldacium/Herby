<script lang="ts" setup>
import Search from "./search/Search.vue";
</script>
<template>
  <div class="home-search-wrap">
    <div class="home-search-background"></div>
    <div class="background" id="home-search-background"></div>
    <router-view v-slot="{ Component, route }">
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
  div {
    z-index: 5;
    position: relative;
  }

  .home-search-background {
    position: absolute;
    width: 10%;
    height: 100%;
    background-repeat: repeat;
    top: 0;
    left: 0;

    background-size: 10rem 15rem;
    z-index: 1;
  }
  .background {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    z-index: 1;
    filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.589));

    img {
      height: 100%;
      position: relative;
    }
    svg {
      height: auto;
      width: 100%;
      position: absolute;
      top: -28%;
      display: block;
      object-fit: cover;
    }
  }
}
</style>
