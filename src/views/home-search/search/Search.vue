<script lang="ts" setup>
import { onMounted, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
// const props = defineProps<{ routerState: Ref<string> }>();

const route = useRoute();
watch(route, () => {
  console.log(route.path);
  if (route.path.substring(route.path.length - 4) == "home") {
    console.log("xd");
  }
});
</script>
<template>
  <div class="wrap">
    <div class="input-wrap">
      <input type="text" />
    </div>

    <router-link :to="'home'">
      <button>Home</button>
    </router-link>
    <router-link :to="'search'">
      <button>Res</button>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px calc(30% - 50px);
}
// to component?
.input-wrap {
  width: 70%;
  input {
    width: 100%;
    display: flex;
    border-radius: 10px;
    border: 1px solid var(--gray-medium);
    background-color: var(--color-background);
    transition: 0.2s ease;
    box-shadow: 0 0 8px transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    outline: 1px solid transparent;

    &.small {
    }

    &.medium {
      padding: 0.5em 1em;
      font-size: 1.3em;
    }

    &.big {
      font-size: 1.6em;
      padding: 0.5em 1em;
    }

    &:hover {
      // border-color: var(--color-primary);
      box-shadow: var(--box-shadow-medium);
    }

    &:active:hover {
      // border-color: var(--color-secondary);
      box-shadow: var(--box-shadow-medium);
    }

    &:focus {
      outline: 1px solid gray;
      box-shadow: var(--box-shadow-medium);
    }
  }
}
</style>
