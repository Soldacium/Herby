<script lang="ts" setup>
import { onMounted, ref } from "vue";
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
<template>aaa</template>
<style lang="scss" scoped></style>
