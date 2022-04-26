<script lang="ts" setup>
import SearchResult from "../../../shared/components/SearchResult.vue";
import SectionSpacer from "../../../shared/components/SectionSpacer.vue";
import { onMounted, Ref, ref } from "vue";
import { ApiService } from "../../../shared/services/api.service";
import ApiCrestData from "../../../shared/models/api-crest-data.model";
import { AsyncComponentState } from "../../../shared/models/async-state.model";
import Loading from "../../../shared/components/Loading.vue";
import { translation } from "../../../shared/services/localization.service";

const results: Ref<ApiCrestData[]> = ref([]);
const state: Ref<AsyncComponentState> = ref("loading");

onMounted(() => {
  getNewest();
});

const getNewest = () => {
  ApiService.getLatestCrests().then((res) => {
    results.value = res;
    state.value = "success";
  });
};
</script>
<template>
  <div class="wrapper">
    <SectionSpacer>{{
      translation.homeSearch.home.newest.title
    }}</SectionSpacer>
    <div class="newest" v-if="state == 'success'">
      <div class="newest-result" v-for="result in results">
        <SearchResult :result="result"></SearchResult>
      </div>
    </div>
    <Loading class="loading" v-else></Loading>
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
  color: var(--color-gray);
}
.wrapper {
  display: flex;
  flex-direction: column;
  //border-bottom: 1px solid rgba(128, 128, 128, 0.116);
  // padding-bottom: 2em;
  position: relative;
  justify-content: center;
  align-items: center;

  .newest {
    display: flex;
    flex-wrap: wrap;
    position: relative;

    .newest-result {
      flex: 1 1 15em;
      margin: 0.3em;
    }
  }
}

.loading {
  margin-top: 2em;
}
</style>
