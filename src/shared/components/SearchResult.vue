<script lang="ts" setup>
import { ResultImage } from "../models/result-image.model";

const props = defineProps<{ result: ResultImage }>();
</script>
<template>
  <router-link :to="props.result.link">
    <div class="search-result">
      <img :src="props.result.image" alt="" />
      <h1 class="name">{{ props.result.name }}</h1>
      <div class="formats">
        <div class="format" v-for="format in props.result.formats">
          {{ format }}
        </div>
      </div>
    </div>
  </router-link>
</template>
<style lang="scss" scoped>
.search-result {
  width: 100%;
  height: 100%;
  padding: 2em;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgb(224, 224, 224);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: 0.2s ease;

  &:hover {
    box-shadow: 0 0 6px 2px rgb(231, 231, 231);
  }

  img {
    height: 250px;
    position: relative;
  }

  .name {
    margin-top: auto;
    font-size: var(--text-size-bigger);
    text-decoration: none;
    font-size: 2em;
    margin-top: 1.5em;
  }

  .formats {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;

    .format {
      margin-top: 5px;
      border-radius: 5px 0 0 5px;
      padding: 3px;
      @for $i from 1 through 4 {
        &:nth-child(#{$i}) {
          background-color: var(--color-accent-#{$i});
        }
      }
    }
  }
}
</style>
