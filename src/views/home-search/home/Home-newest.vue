<script lang="ts" setup>
import exampleResults from "./example-result";
import SearchResult from "../../../shared/components/SearchResult.vue";

const results = exampleResults.slice(0, 4);
</script>
<template>
  <div class="wrapper">
    <div class="title">Newly added</div>
    <div class="newest">
      <div class="newest-result" v-for="result in results">
        <SearchResult :result="result"></SearchResult>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.title {
  margin-bottom: 2em;
  font-size: 1.3em;
  font-weight: 600;
  border-bottom: 1px solid rgba(128, 128, 128, 0.116);
  padding-bottom: 0.5em;
}
.wrapper {
  display: flex;
  flex-direction: column;

  .newest {
    display: flex;
    flex-wrap: wrap;

    .newest-result {
      flex: 1 1 15em;
      margin: 1em;
    }
  }
}
</style>
