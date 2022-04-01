<script lang="ts" setup>
import { onMounted, ref } from "vue";
import HomeNewest from "./Home-newest.vue";
import HomeExplore from "./Home-explore.vue";
import HomeAbout from "./Home-about.vue";
import HomeSuggestion from "./Home-suggestion.vue";
import HomeFeatures from "./Home-features.vue";
const post = ref({
  id: -1,
  title: "",
  body: "",
});
onMounted(async () => {
  await fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((data) => {
      post.value.id = data.id;
      post.value.title = data.title;
      post.value.body = data.body;
    });

  return { post };
});
</script>
<template>
  <HomeFeatures></HomeFeatures>
  <HomeNewest></HomeNewest>
  <HomeAbout></HomeAbout>
  <HomeExplore></HomeExplore>
  <HomeSuggestion></HomeSuggestion>
</template>
<style lang="scss" scoped></style>
