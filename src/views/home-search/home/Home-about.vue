<script lang="ts" setup>
import ButtonBasic from "../../../shared/components/ButtonBasic.vue";
import { translation } from "../../../shared/services/localization.service";
</script>
<template>
  <div class="wrapper">
    <div class="images">
      <img
        src="/src/shared/assets/backgrounds/fc-barcelona.svg"
        alt=""
        class="front"
      />
      <img
        src="/src/shared/assets/backgrounds/madrid-cf.svg"
        alt=""
        class="back"
      />
    </div>
    <div class="text">
      <div class="title">{{ translation.homeSearch.home.about.title }}</div>
      <div class="description">
        {{ translation.homeSearch.home.about.description }}
      </div>
      <ButtonBasic>{{
        translation.homeSearch.home.about.buttonText
      }}</ButtonBasic>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$min-height: 50vh;
.wrapper {
  margin-top: 15em;
  display: flex;
  min-height: $min-height;
  flex-wrap: wrap;
  align-items: flex-start;

  .images {
    position: relative;
    width: 400px;
    margin-right: 1em;
    margin-bottom: 3em;
    flex-shrink: 0;
    flex: 1 1 20em;
    min-height: $min-height;
    img {
      width: 80%;
      position: absolute;
    }

    .front {
      left: 0;
      top: 30px;
      z-index: 10;
    }

    .back {
      left: -80px;
      top: -80px;
      width: 60%;
      opacity: 0.5;
    }
  }

  .text {
    flex: 1 1 30em;
    // background-color: white;
    padding: 2em 2em;
    border-radius: 10px;
    .title {
      font-size: 4em;
      font-weight: 600;
      margin-bottom: 0.4em;
      padding-bottom: 0.2em;
      border-bottom: 1px solid var(--gray-light-medium);
    }

    .description {
      font-size: 1.3em;
    }
  }
}
</style>
