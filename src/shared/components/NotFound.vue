<script setup lang="ts">
import SectionSpacer from "./SectionSpacer.vue";
</script>
<template>
  <div class="not-found">
    <div class="imagery">
      <img src="/src/shared/assets/icons/question.svg" alt="" />
    </div>
    <div class="text">
      <div class="title">It's a miss!</div>
      <SectionSpacer></SectionSpacer>
      <div class="description">Nothing to be found here</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.not-found {
  width: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    .title {
      font-size: 6em;
    }

    .description {
      font-size: 2em;
    }
  }

  .imagery {
    img {
      height: 20em;
    }
  }
}
</style>
