<script lang="ts" setup>
import { watch } from "vue";
import Search from "./search/Search.vue";
import { useRoute } from "vue-router";
</script>
<template>
  <div class="home-search-wrap">
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
      <component :is="Component"></component>
    </router-view>
  </div>
</template>
<style lang="scss" scoped>
.home-search-wrap {
  padding: 7em 0;
  background: url("/src/shared/assets/backgrounds/blob-green-vertical2.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
