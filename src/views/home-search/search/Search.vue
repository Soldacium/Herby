<script lang="ts" setup>
import { onMounted, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import router from "../../../router";
// const props = defineProps<{ routerState: Ref<string> }>();

const route = useRoute();
const mode = ref("home");
let currentRoute = "";

onMounted(() => {
  // mode.value = route.path.substring(route.path.length - 4);
});

const search = () => {
  let queryPath = "/x/search";
  if (currentRoute !== queryPath) {
    router.push(queryPath);
  }
};

watch(mode, (modeNew) => {
  console.log(modeNew);
});

watch(route, (newRoute, oldRoute) => {
  newRoute.path.substring(route.path.length - 4) == "home"
    ? (mode.value = "home")
    : (mode.value = "search");
});
</script>
<template>
  <div class="wrap">
    <div class="input-wrap" :class="mode == 'home' ? 'large' : 'small'">
      <div class="text" :class="mode == 'home' ? 'visible' : 'hidden'">
        <div class="big">
          Get one of the <b>1000+</b> available logos & crests
        </div>
        <div class="small">
          Download in svg/png/jpg formats for your convinience and use for free
        </div>
      </div>
      <select name="pets" class="">
        <option value="">All</option>
        <option value="dog">jpg</option>
        <option value="cat">svg</option>
        <option value="hamster">png</option>
      </select>
      <input type="text" v-on:keyup.enter="search()" />
      <button @click="search()">
        <img src="/src/shared/assets/icons/search.svg" alt="" />
      </button>
    </div>
    <div class="sort-options" :class="mode == 'home' ? 'hidden' : 'visible'">
      <select name="pet" class="">
        <option value="">Relevant</option>
        <option value="dog">jpg</option>
        <option value="cat">svg</option>
        <option value="hamster">png</option>
      </select>
      <select name="pts" class="">
        <option value="">Upload time</option>
        <option value="dog">jpg</option>
        <option value="cat">svg</option>
        <option value="hamster">png</option>
      </select>
      <select name="pts" class="">
        <option value="">Score</option>
        <option value="dog">jpg</option>
        <option value="cat">svg</option>
        <option value="hamster">png</option>
      </select>
    </div>
    <!--
    <router-link :to="'home'">
      <button>Home</button>
    </router-link>
    <router-link :to="'search'">
      <button>Res</button>
    </router-link>  
-->
  </div>
</template>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px calc(30% - 50px);
  margin-bottom: 2em;
}
// to component?

.text {
  transition: 0.2s ease;
  opacity: 1;
  .big {
    font-size: 2.4em;
    font-weight: 600;
    margin-bottom: 0.5em;
    position: absolute;
    left: 130px;
    width: 100%;
    white-space: nowrap;
    top: -20px;

    b {
      color: rgb(0, 216, 54);
    }
  }
  .small {
    position: absolute;
    top: 30px;
    white-space: nowrap;
    left: 60px;
    color: rgb(112, 112, 112);
  }

  &.hidden {
    opacity: 0;
  }
}
.input-wrap {
  width: 100%;
  display: flex;
  padding: 5em 3em;
  // border: 2px solid black;
  background-color: rgb(248, 248, 248);
  border-radius: 10px;
  position: relative;
  box-shadow: 0 3px 5px 0 rgb(221, 221, 221);
  transition: 0.3s ease;

  &.small {
    padding: 2em 2em;
  }
  select {
    flex-shrink: 0;
    width: 60px;
    padding: 5px;
    border: 1px solid var(--gray-medium);
    border-right: 0px;
  }

  input {
    width: 100%;
    display: flex;
    border: 1px solid var(--gray-medium);
    background-color: var(--color-background);
    transition: 0.2s ease;
    box-shadow: 0 0 8px transparent;
    padding: 0.6em 1.2em;
    font-size: 1.3em;
    outline: 1px solid transparent;

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

  button {
    width: 50px;
    flex-shrink: 0;
    border: 1px solid var(--gray-medium);
    background-color: white;
    border-left: 0;
    img {
      width: 20px;
    }
  }
}

.sort-options {
  display: flex;
  transition: 0.3s ease;
  width: 100%;
  margin-top: 2em;

  &.hidden {
    height: 0;
    overflow: hidden;
  }

  &.visible {
    height: 50px;
  }

  select {
    flex-shrink: 0;
    flex: 1 1;
    padding: 5px;
    border: 1px solid var(--gray-medium);
    margin: 0.5em;
    border-radius: 10px;
  }
}
</style>
