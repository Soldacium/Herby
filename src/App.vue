<script setup lang="ts">
import Home from "./views/home/Home.vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
/*
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <keep-alive>
          <suspense>
            <template #default>
              <component
                :is="Component"
                :key="route.meta.usePathKey ? route.path : undefined"
              />
            </template>
            <template #fallback> Loading... </template>
          </suspense>
        </keep-alive>
      </transition>
*/
</script>

<template>
  <div class="color-mode-wrap">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "./styles.scss";
</style>
