<script lang="ts" setup>
import exampleResults from "./example-result";
import SearchResult from "../../../shared/components/SearchResult.vue";

const results = exampleResults.slice(0, 4);
</script>
<template>
  <div class="wrapper">
    <div class="title">Newest images</div>
    <div class="newest">
      <div class="newest-result" v-for="result in results">
        <SearchResult :result="result"></SearchResult>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 0 10%;

  .newest {
    display: flex;
    flex-wrap: wrap;

    .newest-result {
      flex: 1 1 30em;
      margin: 1em;
    }
  }
}
</style>
