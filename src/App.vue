<script setup lang="ts">
import Footer from "./shared/components/Footer.vue";
import NavMain from "./shared/components/NavMain.vue";
import Notification from "./shared/components/Notification.vue";
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
  <div class="color-mode-wrap" id="color-mode-wrap">
    <NavMain></NavMain>

    <router-view v-slot="{ Component, route }">
      <KeepAlive> <component :is="Component"></component></KeepAlive>
    </router-view>

    <Footer></Footer>
    <Notification></Notification>
  </div>
</template>

<style lang="scss">
@import "./styles.scss";
</style>
