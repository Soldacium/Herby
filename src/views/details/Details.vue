<script lang="ts" setup>
import { onMounted, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ButtonBasic from "../../shared/components/ButtonBasic.vue";
import SectionSpacer from "../../shared/components/SectionSpacer.vue";
import AddVariants from "./AddVariants.vue";
import Loading from "../../shared/components/Loading.vue";
import { ApiService } from "../../shared/services/api.service";
import { AsyncComponentState } from "../../shared/models/async-state.model";
import NotFound from "../../shared/components/NotFound.vue";

let placeholder = ref("placeholder");
let fullscreen = ref(false);

// because import does not work??? what the fuck

interface ApiCrestData {
  cloudinary_public_id: string;
  country_id: number;
  created_by: number;
  created_on: string;
  description: string;
  height: number;
  id: number;
  image_link: string;
  image_link2?: string;
  image_link3?: string;
  image_transparent: boolean;
  image_vector: boolean;
  last_updated_by: number;
  last_updated_on: string;
  name: string;
  place: string;
  revision: any | null;
  user_id: number;
  width: number;
}

const route = useRoute();
const details: Ref<ApiCrestData | null> = ref(null);
const detailsExpanded = ref(false);
const state: Ref<AsyncComponentState> = ref("loading");

onMounted(() => {
  console.log(route.params);
  getDetails();
});

const getDetails = () => {
  if (Object.keys(route.params).length === 0) return;
  //console.log(route.params);
  const detailsName = route.params.name;
  const crestId = route.params.id as string;
  state.value = "loading";
  ApiService.getSingleCrest(crestId).then((res) => {
    details.value = res;
    state.value = res == null ? "error" : "success";
    console.log(res, state.value);
  });
  if (detailsName) {
    placeholder.value = detailsName as string;
  }
};

watch(route, (newRoute, oldRoute) => {
  console.log(newRoute);
  getDetails();
});

const downloadOptions = ref({
  imageType: "png",
  imageSize: "1920x1200",
  imageVariant: "",
});
const availableSizes: string[] = ["1920x1200", "1200x800", "900x600"];
const availableVariants: string[] = ["Ab", "Be", "CD", "WH"];
const availableTypes: ("svg" | "jpg" | "png" | "zip")[] = [
  "svg",
  "jpg",
  "png",
  "zip",
];
/*


const image = "/src/shared/assets/backgrounds/fc-barcelona.svg";

const tags = ["sport", "football", "junior league"];
const licence = "Basic licence";
*/
</script>
<template>
  <div class="wrapper">
    <!-- should be canvas with "magnifier" -->
    <div
      v-show="state == 'success'"
      class="image-fullscreen-overlay"
      :class="fullscreen ? 'active' : 'inactive'"
    >
      <img :src="details?.image_link" alt="" class="image-fullscreen" />
      <button class="close" @click="fullscreen = false">
        <img src="/src/shared/assets/icons/cancel.svg" alt="" />
      </button>
    </div>
    <div class="image-info" v-if="state == 'success'">
      <div class="image">
        <img :src="details?.image_link" alt="" class="image-normal" />
        <img :src="details?.image_link" alt="" class="image-bg" />
        <button class="activate-fullscreen" @click="fullscreen = true">
          <img src="/src/shared/assets/icons/expand-2.svg" alt="" />
        </button>
      </div>
      <div class="more">
        <div class="info">
          <div class="name">{{ details?.name }}</div>
          <div class="associated">{{ details?.place }}</div>
          <!--
          <div class="tags">
            <div class="tag" v-for="tag in tags">
              {{ tag }}
            </div>
          </div>            
          -->

          <div
            class="info-details-wrap"
            :class="detailsExpanded ? 'active' : 'inactive'"
          >
            <button
              class="info-details-expand"
              @click="detailsExpanded = !detailsExpanded"
            >
              <img src="/src/shared/assets/icons/left.svg" alt="" />
            </button>
            <div class="info-details">
              <div class="licence">
                <b>Description: </b>
                {{ details?.description }}
              </div>
              <div class="licence">
                <b>Uploader: </b>
                {{ details?.created_by }}
              </div>
              <div class="licence">
                <b>Upload date: </b>
                {{ details?.created_on }}
              </div>
            </div>
          </div>
        </div>
        <div class="download">
          <div class="download-options">
            <div class="download-option image-variants">
              <button
                class="image-variant button-option"
                v-for="aType in availableVariants"
                @click="downloadOptions.imageVariant = aType"
                :class="
                  downloadOptions.imageVariant == aType
                    ? 'chosen ' + aType
                    : 'available ' + aType
                "
              >
                <img :src="details?.image_link" alt="" />
              </button>
            </div>
            <SectionSpacer></SectionSpacer>
            <div class="download-option image-types">
              <!--
              <button
                class="image-type button-option"
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
                /></button>                
              -->

              <button
                class="button-option image-type"
                @click="downloadOptions.imageType = 'vector'"
                v-if="details?.image_vector"
                :class="
                  downloadOptions.imageType == 'vector'
                    ? 'chosen '
                    : 'available '
                "
              >
                Vector
              </button>
              <button
                class="button-option image-type"
                @click="downloadOptions.imageType = 'transparent'"
                v-if="details?.image_transparent"
                :class="
                  downloadOptions.imageType == 'transparent'
                    ? 'chosen '
                    : 'available '
                "
              >
                Transparent
              </button>

              <button
                class="button-option image-type"
                @click="downloadOptions.imageType = 'zip'"
                v-if="details?.image_transparent"
                :class="
                  downloadOptions.imageType == 'zip' ? 'chosen ' : 'available '
                "
              >
                Package
              </button>
            </div>

            <div
              class="download-option image-sizes"
              v-if="
                downloadOptions.imageType != 'vector' &&
                downloadOptions.imageType != 'zip'
              "
            >
              <button
                class="image-size button-option"
                v-for="size in availableSizes"
                @click="downloadOptions.imageSize = size"
                :class="
                  downloadOptions.imageSize == size ? 'chosen' : 'available'
                "
              >
                <span>{{ size }}</span>
              </button>
            </div>
          </div>
          <SectionSpacer></SectionSpacer>
          <div class="buttons">
            <ButtonBasic class="xd">Get this logo</ButtonBasic>
            <ButtonBasic class="button-like"
              ><img src="/src/shared/assets/icons/download.svg" alt=""
            /></ButtonBasic>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="state === 'loading'">
      <Loading></Loading>
    </div>
    <div v-else-if="state === 'error'">
      <NotFound></NotFound>
    </div>

    <SectionSpacer>Add variant</SectionSpacer>
    <!--
      
    -->
    <AddVariants
      v-if="state === 'success'"
      :crest="details ? details : (details as ApiCrestData)"
    ></AddVariants>
    <!--
    <SectionSpacer>Linked</SectionSpacer>
    <div class="links linked-logos">
      <div class="logo newest-result" v-for="result in linkedLogos">
        <SearchResult :result="result"></SearchResult>
      </div>
    </div>
    <SectionSpacer>Same genre</SectionSpacer>
    <div class="links similar-logos">
      <div class="logo newest-result" v-for="result in similarLogos">
        <SearchResult :result="result"></SearchResult>
      </div>
    </div>      
    -->
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  padding: 6em 13%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > * {
    width: 100%;
  }

  .section-title {
    margin-top: 1em;
    // font-weight: 600;
    color: var(--gray-medium);
    font-size: 0.9em;
    width: 50%;
    //color: rgb(58, 58, 58);
    // border-bottom: 1px solid var(--gray-medium);
    //background-color: rgb(247, 247, 247);
    // border-radius: 0 10px 10px 0;
    padding: 6px 0;
    position: relative;
    display: inline-block;
  }
}

.image-fullscreen-overlay {
  opacity: 0;
  pointer-events: none;
  transition: 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 50000;
  background-color: rgba(0, 0, 0, 0.267);
  &.active {
    opacity: 1;
    pointer-events: all;
  }

  .image-fullscreen {
    height: 90%;
  }

  button {
    border: none;
    background-color: transparent;
    display: flex;
    position: absolute;
    right: 2em;
    top: 2em;
    cursor: pointer;

    img {
      width: 4em;
      flex-shrink: 0;
    }
  }
}

.image-info {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  justify-content: center;
  align-items: flex-start;
  // background-color: white;

  .image {
    flex: 4 1 20em;
    padding: 50px 100px;
    position: relative;
    .image-bg {
      z-index: 1;
      width: 200%;
      opacity: 0;
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

    .activate-fullscreen {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1001;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      transition: 0.1s ease;
      background-color: rgba(0, 0, 0, 0.11);
      opacity: 0;

      &:hover {
        opacity: 1;
      }
      img {
        height: 25%;
      }
    }
  }

  .more {
    flex: 2 1 25em;
    z-index: 200;
    background-color: white;
    padding: 2em 3em;
    // box-shadow: 0 0 6px rgba(0, 0, 0, 0.068);
    border-radius: 6px;
    border: 1px solid var(--gray-light-medium);

    .info {
      margin-bottom: 2em;
      .name {
        font-size: 6em;
        font-weight: 600;
      }

      .associated {
        font-weight: 500;
        font-size: 2em;
      }

      .info-details-wrap {
        position: relative;
        width: 100%;
        &.active {
          .info-details-expand {
            border-color: var(--gray-light-medium);
            img {
              transform: rotate(90deg);
            }
          }

          .info-details {
            max-height: 140px;
            border: 1px solid var(--gray-light-medium);
            padding: 0em 2em;
            background-color: var(--color-background);
            border-radius: 5px;
          }
        }
        .info-details-expand {
          position: absolute;
          transform: translate(-50%, -50%);
          left: 50%;
          // padding: 0.2em 1em;
          background-color: var(--color-white);
          // border: 1px solid var(--color-secondary);
          border: 1px solid transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;

          img {
            height: 2em;
            flex-shrink: 0;
            transform: rotate(270deg);
            transition: 0.1s ease;
          }
        }

        .info-details {
          margin-top: 2em;
          margin-left: 0.5em;

          border: 1px solid var(--gray-light-medium);
          border-top: 1px solid transparent;
          overflow: hidden;
          max-height: 0;
          transition: 0.1s ease;

          > *:first-child {
            padding-top: 2em;
          }

          > *:last-child {
            padding-bottom: 2em;
          }

          > div {
            margin-top: 0.5em;
          }
          .licence {
          }
        }
      }

      .tags {
        display: flex;
        padding-bottom: 2em;
        margin-top: 1em;
        // border-bottom: 1px solid rgb(233, 233, 233);

        .tag {
          padding: 0.4em 0.8em;
          margin: 0.5em;
          border: 1px solid var(--gray-light-medium);
          border-radius: 10px;
          background: var(--color-background);
          // box-shadow: 0 0 6px rgba(0, 0, 0, 0.055);
          transition: 0.1s ease;

          &:hover {
            background: var(--color-secondary);
            color: var(--color-text);
            cursor: pointer;
          }
        }
      }
    }

    .download {
      .download-options {
        // border-top: 1px solid rgb(236, 236, 236);
        // padding-top: 2em;

        .download-option {
          display: flex;
        }

        .button-option {
          margin: 10px;
          border: 1px solid var(--gray-light-medium);
          border-radius: 6px;
          background-color: var(--color-background);
          cursor: pointer;
          transition: 0.1s ease;
          padding: 15px;

          // box-shadow: 0 0 6px rgba(0, 0, 0, 0.219);

          img,
          span {
            opacity: 0.3;
          }

          &.chosen {
            img,
            span {
              opacity: 1;
            }
            background-color: var(--color-white);
            pointer-events: none;
            // border: 1px solid black;
          }
        }
        .image-types {
          button {
            img {
              height: 50px;
            }
          }
        }

        .image-sizes {
          button {
            font-size: 1em;

            &.chosen {
            }
          }
        }

        .image-variants {
          button {
            img {
              height: 85px;
            }
          }
        }
      }
      .buttons {
        display: flex;
        button {
          width: 100%;
        }

        .button-like {
          width: 3em;
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
</style>
