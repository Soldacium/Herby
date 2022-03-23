<script lang="ts" setup>
import { watch } from "vue";
import Search from "./search/Search.vue";
import { useRoute } from "vue-router";
</script>
<template>
  <Search></Search>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <suspense>
        <template #default>
          <component :is="Component"></component>
        </template>
        <template #fallback> Loading... </template>
      </suspense>
    </transition>
  </router-view>
</template>
<style lang="scss" scoped></style>
