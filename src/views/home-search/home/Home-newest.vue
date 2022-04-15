<script lang="ts" setup>
import exampleResults from "./example-result";
import SearchResult from "../../../shared/components/SearchResult.vue";
import SectionSpacer from "../../../shared/components/SectionSpacer.vue";

const results = exampleResults.slice(0, 8);
</script>
<template>
  <div class="wrapper">
    <SectionSpacer>New crests</SectionSpacer>
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
  font-weight: 500;
  border-bottom: 1px solid rgba(128, 128, 128, 0.116);
  padding-bottom: 0.5em;
  text-align: center;
  color: rgb(182, 182, 182);
}
.wrapper {
  display: flex;
  flex-direction: column;
  //border-bottom: 1px solid rgba(128, 128, 128, 0.116);
  // padding-bottom: 2em;

  .newest {
    display: flex;
    flex-wrap: wrap;

    .newest-result {
      flex: 1 1 15em;
      margin: 0.3em;
    }
  }
}
</style>
