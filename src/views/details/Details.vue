<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
let placeholder = ref("placeholder");
onMounted(() => {
  getDetails();
});

const getDetails = () => {
  const detailsName = useRoute().params.name;
  if (detailsName) {
    placeholder.value = detailsName as string;
    console.log(placeholder);
  }
};
</script>
<template>
  {{ placeholder }}
</template>
<style lang="scss" scoped></style>
