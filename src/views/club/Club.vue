<script lang="ts" setup>
import exampleResults from "../home-search/home/example-result";
import SearchResult from "../../shared/components/SearchResult.vue";
const tags = ["Major league", "Football", "Basketball"];
</script>
<template>
  <div class="wrapper">
    <div class="info">
      <div class="name">Example Name</div>
      <div class="tags">
        <div class="tag" v-for="tag in tags">{{ tag }}</div>
      </div>
    </div>
    <div class="icons">
      <div class="sort-options">
        <select name="pet" class="">
          <option value="">Relevant</option>
          <option value="dog">jpg</option>
          <option value="cat">svg</option>
          <option value="hamster">png</option>
        </select>
        <select name="pts" class="">
          <option value="">Upload time</option>
          <option value="dog">jpg</option>
          <option value="cat">svg</option>
          <option value="hamster">png</option>
        </select>
        <select name="pts" class="">
          <option value="">Score</option>
          <option value="dog">jpg</option>
          <option value="cat">svg</option>
          <option value="hamster">png</option>
        </select>
      </div>
      <div class="popular">
        <div class="result" v-for="result in exampleResults">
          <SearchResult :result="result"></SearchResult>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrapper {
  padding: 6em 15%;
}

.info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .name {
    font-size: 6em;
  }

  .tags {
    display: flex;

    .tag {
      padding: 0.4em 0.8em;
      margin: 0.5em;
      border: 1px solid rgb(230, 230, 230);
      border-radius: 10px;
      background-color: white;
    }
  }
}
.icons {
  .sort-options {
    display: flex;
    transition: 0.3s ease;
    width: 100%;
    margin-top: 2em;

    &.hidden {
      height: 0;
      overflow: hidden;
    }

    &.visible {
      height: 50px;
    }

    select {
      flex-shrink: 0;
      flex: 1 1;
      padding: 5px;
      border: 1px solid var(--gray-medium);
      margin: 0.5em;
      border-radius: 10px;
    }
  }

  .popular {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .result {
      flex: 1 1 10rem;
      max-width: 12rem;
      margin: 0.3em;
    }
  }
}
</style>
