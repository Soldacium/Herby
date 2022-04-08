<script lang="ts" setup>
import exampleResults from "../home-search/home/example-result";
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
    </div>
  </div>
</template>
<style scoped lang="scss">
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
</style>
