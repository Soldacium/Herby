<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";
import DownloadOptions from "../../shared/models/download-options.model";
import ExampleResults from "../home-search/home/example-result";
import SearchResult from "../../shared/components/SearchResult.vue";

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

const downloadOptions = ref({
  imageType: "png",
  imageSize: "1920x1200",
});

const availableTypes: ("svg" | "jpg" | "png")[] = ["svg", "jpg", "png"];
const availableSizes: string[] = ["1920x1200", "1200x800", "900x600"];

const linkedLogos = ExampleResults.slice(0, 3);
const similarLogos = ExampleResults.slice(0, 6);
const image = "/src/shared/assets/icons/png.svg";
</script>
<template>
  <div class="wrapper">
    <div class="image-info">
      <div class="image">
        <img :src="image" alt="" class="image-normal" />
        <img :src="image" alt="" class="image-bg" />
      </div>
      <div class="more">
        <div class="info">
          <div class="name">{{ placeholder }}</div>
          <div class="associated">Temporary club</div>
        </div>
        <div class="download">
          <div class="download-options">
            <div class="section-title">Format</div>
            <div class="image-types">
              <button
                class="image-type option-button"
                v-for="aType in availableTypes"
                @click="downloadOptions.imageType = aType"
                :class="
                  downloadOptions.imageType == aType
                    ? 'chosen ' + aType
                    : 'available ' + aType
                "
              >
                <img
                  :src="'/src/shared/assets/icons/' + aType + '.svg'"
                  alt=""
                />
              </button>
            </div>
            <div class="section-title">Size</div>
            <div class="image-sizes" v-if="downloadOptions.imageType != 'svg'">
              <button
                class="image-size option-button"
                v-for="size in availableSizes"
                @click="downloadOptions.imageSize = size"
                :class="
                  downloadOptions.imageSize == size ? 'chosen' : 'available'
                "
              >
                {{ size }}
              </button>
            </div>
          </div>
          <button class="download-button">Get this logo</button>
        </div>
      </div>
    </div>

    <!-- same club -->
    <div class="section-title">Logos linked to this one</div>
    <div class="links linked-logos">
      <div class="logo newest-result" v-for="result in linkedLogos">
        <SearchResult :result="result"></SearchResult>
      </div>
    </div>
    <!-- same sport -->
    <div class="section-title">Logos in the same genre</div>
    <div class="links similar-logos">
      <div class="logo newest-result" v-for="result in similarLogos">
        <SearchResult :result="result"></SearchResult>
      </div>
    </div>
    <button class="feedback-button">Something not right? Report issue!</button>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  padding: 5% 10%;

  .section-title {
    margin-top: 1em;
    font-weight: 600;
    font-size: 0.9em;
    //width: 50%;
    color: rgb(58, 58, 58);
    border-left: 4px solid rgb(58, 58, 58);
    background-color: rgb(247, 247, 247);
    border-radius: 0 10px 10px 0;
    padding: 10px 20px;
    position: relative;
    display: inline-block;
  }
}

.image-info {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;

  .image {
    flex: 2 1 20em;
    padding: 50px 100px;
    position: relative;
    .image-bg {
      z-index: 1;
      width: 200%;
      opacity: 0.05;
      pointer-events: none;
      position: absolute;
      top: -5%;
      left: -5%;
      transform: translate(-50%, -50%);
    }
    .image-normal {
      width: 100%;
      max-height: 100%;
      z-index: 1000;
      position: relative;
    }
  }

  .more {
    flex: 2 1 25em;
    z-index: 200;

    .info {
      margin-bottom: 3em;
      .name {
        font-size: 6em;
        font-weight: 600;
      }

      .associated {
        font-weight: 500;
        font-size: 2em;
      }
    }

    .download {
      .download-options {
        .option-button {
          margin: 10px;
          border: 1px solid rgb(255, 255, 255);
          border-radius: 10px;
          background-color: transparent;
          cursor: pointer;
          transition: 0.1s ease;
          padding: 15px;
          opacity: 0.5;
        }
        .image-types {
          button {
            &:hover {
              box-shadow: 0 0 5px 0 rgb(212, 212, 212);
            }

            &.chosen {
              opacity: 1;
              pointer-events: none;
              border: 1px solid rgb(223, 223, 223);

              &.jpg {
                border-color: rgb(0, 183, 255);
              }

              &.svg {
                border-color: rgb(255, 174, 0);
              }

              &.png {
                border-color: rgb(167, 61, 194);
              }
            }
            img {
              height: 60px;
            }
          }
        }

        .image-sizes {
          button {
            font-size: 1.2em;
            &:hover {
              box-shadow: 0 0 5px 0 rgb(212, 212, 212);
            }

            &.chosen {
              opacity: 1;
              pointer-events: none;
              border: 1px solid rgb(223, 223, 223);
            }
          }
        }
      }

      .download-button {
        $button-color: rgb(41, 41, 41);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.5em;
        margin-top: 4em;
        font-size: 2em;
        line-height: 0;
        border: 4px solid $button-color;
        border-radius: 10px;
        background-color: white;
        cursor: pointer;
        color: black;
        transition: 0.1s ease;

        &:hover {
          box-shadow: 0 0 6px 0 rgb(201, 201, 201);
          background-color: $button-color;

          color: white;
        }

        img {
          height: 0.8em;
          margin-left: 0.5em;
        }
      }
    }
  }
}

.links {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 3em;
  .logo {
    flex: 1 1 5rem;
    max-width: 11em;
    margin: 1em;
  }
}

.feedback-button {
  $button-color: rgb(224, 82, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.3em;
  margin-top: 5em;
  font-size: 1.5em;
  line-height: 0;
  border: 4px solid $button-color;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  color: $button-color;
  transition: 0.1s ease;

  &:hover {
    box-shadow: 0 0 6px 0 rgb(201, 201, 201);
    background-color: $button-color;

    color: white;
  }

  img {
    height: 0.8em;
    margin-left: 0.5em;
  }
}
</style>
