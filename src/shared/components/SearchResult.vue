<script lang="ts" setup>
import { ResultImage } from "../models/result-image.model";

const props = defineProps<{ result: ResultImage }>();
</script>
<template>
  <div class="search-result">
    <router-link :to="props.result.link">
      <img :src="props.result.image" alt="" />
      <h1 class="name">{{ props.result.name }}</h1>

      <div class="result-overlay">
        <h1 class="name">{{ props.result.name }}</h1>
        <div class="formats">
          <div class="format" v-for="format in props.result.formats">
            .{{ format }}
            <!--
          <img :src="'/src/shared/assets/icons/' + format + '.svg'" alt="" />
        -->
          </div>
        </div>
        <div class="buttons">
          <button class="download">
            <img src="/src/shared/assets/icons/download.svg" alt="" />
          </button>
        </div>
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
  border: 1px solid var(--gray-light-medium);
  // border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  // box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.048);

  position: relative;

  img {
    width: 100%;
    position: relative;
  }

  a {
    padding: 1em;
    // border-radius: 10px;
    transition: 0.1s ease;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    //top: 0;
    z-index: 100;
    overflow: hidden;
    border-radius: 5px;
    height: 100%;

    &:hover {
      //box-shadow: 0 5px 8px 0px rgba(32, 32, 32, 0.185);
      z-index: 1000;

      .formats {
        bottom: 0;
      }
      .result-overlay {
        left: 0;
        opacity: 1;
      }
    }

    .name {
      margin-top: auto;
      // font-size: var(--text-size-bigger);
      text-decoration: none;
      font-size: 1em;
      margin-top: 1em;

      font-weight: 500;
      // color: rgba(128, 128, 128, 0.308);
    }

    .result-overlay {
      height: 100%;
      position: absolute;
      //left: -100%;
      left: 0;
      width: 100%;
      // background: var(--color-gradient-1);
      background: white;
      transition: 0.1s ease;
      border-radius: 5px;
      padding: 1em;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      opacity: 0;

      .name {
        color: black;
        font-size: 2em;
      }
      .formats {
        right: 0;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        overflow: hidden;
        border-radius: 0 0 10px 10px;
        transition: 0.3s;
        // display: none;
        justify-content: center;
        align-items: center;

        .format {
          flex: 1 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 500;
          border: 1px solid var(--gray-medium);
          //border-bottom: 0;
          padding: 4px;
          //border-left: 0;
          //background-color: var(--gray-light);
          font-size: 0.9em;
          color: rgb(2, 2, 2);
          background-color: var(--color-background);
          border-radius: 6px;
          margin: 0.3em;
          // box-shadow: 0 0px 3px rgba(0, 0, 0, 0.295);

          &:last-of-type {
            //border-right: 0;
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

      .buttons {
        position: absolute;
        bottom: 0;
        width: 100%;
        // background-color: white;
        border: none;
        //padding: 8px;
        //
        font-weight: 600;
        font-size: 0.8em;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.397);

        button {
          padding: 0.6em 1em;
          // background-color: rgb(36, 36, 36);
          background: var(--color-secondary);
          position: relative;
          // margin: 0 0.6em;
          // border-radius: 10px;
          // box-shadow: 0 0 6px rgba(0, 0, 0, 0.397);
          border: none;
          // flex: 1 1;
          cursor: pointer;
          display: flex;

          &:nth-of-type(2) {
            border-left: 1px solid rgb(65, 65, 65);
          }

          img {
            height: 1.5em;
            flex-shrink: 0;
            filter: invert(100%);
          }
          &.download {
            flex: 4 1;
          }
          &.save {
            flex: 1 1;
          }
        }
      }
    }
  }
}
</style>
