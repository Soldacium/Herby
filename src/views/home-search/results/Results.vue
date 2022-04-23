<script lang="ts" setup>
import { onMounted, Ref, ref, watch } from "vue";
import exampleResults from "../home/example-result";
import SearchResult from "../../../shared/components/SearchResult.vue";
import { useRoute } from "vue-router";
import { ApiService } from "../../../shared/services/api.service";
import ApiCrestData from "../../../shared/models/api-crest-data.model";
import Loading from "../../../shared/components/Loading.vue";
import { AsyncComponentState } from "../../../shared/models/async-state.model";
import NotFound from "../../../shared/components/NotFound.vue";

interface Query {
  search: string;
}
const route = useRoute();
const post = ref({
  id: -1,
  title: "",
  body: "",
});
const results: Ref<ApiCrestData[]> = ref([]);
const state: Ref<AsyncComponentState> = ref("loading");

onMounted(() => {
  // console.log(useRoute().query);
  getResults((route.query as unknown as Query).search);
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

watch(route, (newRoute, oldRoute) => {
  getResults((newRoute.query as unknown as Query).search);
});

const getResults = (query: string) => {
  state.value = "loading";
  ApiService.getSearchedCrests(query).then((res) => {
    results.value = res;
    // console.log(res);
    state.value = res.length == 0 ? "error" : "success";
  });
};

// const results = exampleResults;
// const pages = [1, 2, 3];
</script>
<template>
  <div class="wrap">
    <div class="results" v-show="state == 'success'">
      <div class="result" v-for="result in results">
        <SearchResult :result="result"></SearchResult>
      </div>
    </div>
    <!--
    <div class="pager">
      <button class="pager-button left">
        <img src="/src/shared/assets/icons/left.svg" alt="" />
      </button>
      <div class="pages">
        <div class="page page-current">1</div>
        /
        <div class="page page-total">9</div>
      </div>
      <button class="pager-button right">
        <img src="/src/shared/assets/icons/right.svg" alt="" />
      </button>
    </div>  
    <div class="empty" v-show="state == 'error'">Nothing here :(</div>    
    -->
    <Loading v-show="state == 'loading'"></Loading>

    <NotFound v-show="state == 'error'"></NotFound>
  </div>
</template>
<style lang="scss" scoped>
.wrap {
  padding: 0 0%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
}

.results {
  display: flex;
  flex-wrap: wrap;
  position: relative;

  .result {
    flex: 1 1 10em;
    max-width: 11em;
    margin: 0.3em;
    position: relative;
    opacity: 0;
    left: -50px;

    animation: fadeInAnimation 0.1s ease forwards;

    @for $i from 1 through 25 {
      animation-delay: calc(0.01s * $i);
    }
  }
}

@keyframes fadeInAnimation {
  0% {
    left: -50px;
    opacity: 0;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}
</style>
