<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import DownloadOptions from "../../shared/models/download-options.model";
let placeholder = ref("placeholder");
onMounted(() => {
  getDetails();
});

const getDetails = () => {
  const detailsName = useRoute().params.name;
  if (detailsName) {
    placeholder.value = detailsName as string;
    console.log(placeholder);
  }
};

const downloadOptions: DownloadOptions = {
  imageType: "png",
  imageSize: "900",
};

const availableTypes: ("svg" | "jpg" | "png")[] = ["svg", "jpg", "png"];
const availableSizes: string[] = ["1920x1200", "1200x800", "900x600"];
</script>
<template>
  <div class="wrapper">
    <div class="image-info">
      <div class="image">
        <img src="/src/shared/assets/icons/abstract.svg" alt="" />
      </div>
      <div class="more">
        <div class="info">
          <div class="name">{{ placeholder }}</div>
          <div class="associated">Temporary club</div>
        </div>
        <div class="download">
          <div class="download-options">
            <div class="image-types">
              <button
                class="image-type"
                v-for="typea in availableTypes"
                @click="downloadOptions.imageType = typea"
              >
                {{ typea }}
              </button>
            </div>
            <div class="image-sizes" v-if="downloadOptions.imageType != 'svg'">
              <button
                class="image-size"
                v-for="size in availableSizes"
                @click="downloadOptions.imageSize = size"
              >
                {{ size }}px
              </button>
            </div>
          </div>
          <button class="download-button">download</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  padding: 5% 10%;
}

.image-info {
  display: flex;
  flex-wrap: wrap;

  .image {
    flex: 2 1 20em;
    padding: 50px 100px;

    img {
      width: 100%;
      max-height: 100%;
    }
  }

  .more {
    flex: 3 1 25em;
  }
}
</style>
