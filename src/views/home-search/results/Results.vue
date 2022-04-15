<script lang="ts" setup>
import { onMounted, ref } from "vue";
import exampleResults from "../home/example-result";
import SearchResult from "../../../shared/components/SearchResult.vue";

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

const results = exampleResults;
const pages = [1, 2, 3];
</script>
<template>
  <div class="wrap">
    <div class="results">
      <div class="result" v-for="result in results">
        <SearchResult :result="result"></SearchResult>
      </div>
    </div>
    <div class="pager">
      <button class="pager-button left">
        <img src="/src/shared/assets/icons/left.svg" alt="" />
      </button>
      <div class="pages">
        <!--
        <div class="page" v-for="page in pages">{{ page }}</div>          
        -->
        <div class="page page-current">1</div>
        /
        <div class="page page-total">9</div>
      </div>
      <button class="pager-button right">
        <img src="/src/shared/assets/icons/right.svg" alt="" />
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrap {
  padding: 0 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.results {
  display: flex;
  flex-wrap: wrap;

  .result {
    flex: 1 1 10em;
    max-width: 11em;
    margin: 0.3em;
  }
}

.pager {
  display: flex;
  margin-top: 4em;
  padding-top: 1em;

  .pager-button {
    background-color: transparent;
    border: none;
    img {
      height: 3em;
    }
  }

  .left {
    margin-right: auto;
  }

  .pages {
    display: flex;
    font-size: 2em;

    .page {
      margin: 0 0.3em;
    }
    /*
    .page {
      border: 1px solid rgb(214, 214, 214);
      border-radius: 10px;
      padding: 0.5em;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px;
      font-size: 1.4em;
      background-color: white;
    }
    */
  }

  .right {
    margin-left: auto;
  }
}
</style>
