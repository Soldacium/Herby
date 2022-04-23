<script lang="ts" setup>
import { ref, Ref } from "vue";
import { translation } from "../../../shared/services/localization.service";

interface Feature {
  image: string;
  name: string;
  description: string;
}
const features: Ref<Feature[]> = ref([
  {
    image: "/src/shared/assets/icons/add.svg",
    name: translation.value.homeSearch.home.features.feature1.title,
    description:
      translation.value.homeSearch.home.features.feature1.description,
  },
  {
    image: "/src/shared/assets/icons/team.svg",
    name: translation.value.homeSearch.home.features.feature2.title,
    description:
      translation.value.homeSearch.home.features.feature2.description,
  },
  {
    image: "/src/shared/assets/icons/sports-trophy.svg",
    name: translation.value.homeSearch.home.features.feature3.title,
    description:
      translation.value.homeSearch.home.features.feature3.description,
  },
  {
    image: "/src/shared/assets/icons/star.svg",
    name: translation.value.homeSearch.home.features.feature4.title,
    description:
      translation.value.homeSearch.home.features.feature4.description,
  },
]);
</script>
<template>
  <div class="wrapper">
    <!--
    <div class="title">Explore features</div>
    -->

    <div class="features">
      <div class="feature" v-for="feature in features">
        <img :src="feature.image" alt="" />
        <div class="feature-name">{{ feature.name }}</div>
        <div class="feature-description">{{ feature.description }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  margin-top: 2em;
}

.title {
  margin-bottom: 2em;
  font-size: 1.3em;
  font-weight: 600;
  border-bottom: 1px solid rgba(128, 128, 128, 0.116);
  padding-bottom: 0.5em;
}

.features {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .feature {
    position: relative;
    flex: 1 1 12em;
    padding: 3em;
    // border: 1px solid rgb(206, 206, 206);
    margin: 0 0.3em;
    border-radius: 10px;
    min-height: 15vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    background-color: white;
    // box-shadow: 0 3px 6px rgba(0, 0, 0, 0.377);

    img {
      padding-bottom: 1em;
      flex-shrink: 0;
    }
    .feature-name {
      font-weight: 600;
    }
  }
}
</style>
