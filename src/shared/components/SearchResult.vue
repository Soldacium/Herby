<script lang="ts" setup>
import { ResultImage } from "../models/result-image.model";

const props = defineProps<{ result: ResultImage }>();
</script>
<template>
  <div class="search-result">
    <router-link :to="props.result.link">
      <img :src="props.result.image" alt="" />
      <h1 class="name">{{ props.result.name }}</h1>
      <div class="formats">
        <div class="format" v-for="format in props.result.formats">
          .{{ format }}
          <!--
          <img :src="'/src/shared/assets/icons/' + format + '.svg'" alt="" />
        --></div>
      </div>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.search-result {
  width: 100%;
  height: 100%;

  display: flex;
  position: relative;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;

  position: relative;

  img {
    width: 100%;
    position: relative;
  }

  a {
    padding: 2em;
    border-radius: 10px;
    transition: 0.2s ease;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    //top: 0;

    &:hover {
      box-shadow: 0 5px 8px 0px rgba(32, 32, 32, 0.185);
    }
  }

  .name {
    margin-top: auto;
    // font-size: var(--text-size-bigger);
    text-decoration: none;
    font-size: 1em;
    margin-top: 1.5em;
    font-weight: 500;
    // color: rgba(128, 128, 128, 0.308);
  }

  .formats {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    overflow: hidden;
    border-radius: 0 0 10px 10px;

    .format {
      flex: 1 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      border: 1px solid rgb(231, 231, 231);
      border-bottom: 0;
      padding: 4px 0;
      border-left: 0;
      //background-color: var(--gray-light);
      font-size: 0.9em;

      &:last-of-type {
        border-right: 0;
      }

      img {
        height: 20px;
      }

      @for $i from 1 through 4 {
        &:nth-child(#{$i}) {
          // color: var(--color-accent-#{$i});
        }
      }
    }
  }
}
</style>
