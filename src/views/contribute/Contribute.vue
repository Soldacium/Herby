<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";
import DownloadOptions from "../../shared/models/download-options.model";
import ExampleResults from "../home-search/home/example-result";
import ButtonBasic from "../../shared/components/ButtonBasic.vue";
import { NotificationsService } from "../../shared/services/notifications.service";

let placeholder = ref("placeholder");

let isDraggedOver = ref(false);
const file: Ref<File | null> = ref(null);
const images: Ref<File[]> = ref([]);
const imagesUrls: Ref<string[]> = ref([]);
let filePath = ref("");
let fileUrl = ref("");

const tags: Ref<string[]> = ref([]);

onMounted(() => {
  // getDetails();
});

const dropHandler = (event: DragEvent): void => {
  event.preventDefault();
  pickFile(event.dataTransfer?.files as FileList);
};

const dragOverHandler = (event: Event): void => {
  event.preventDefault();
  event.stopPropagation();
  isDraggedOver.value = true;
};

const dragLeaveHandler = (event: Event): void => {
  event.preventDefault();
  event.stopPropagation();
  isDraggedOver.value = false;
};

const pickFileHandler = (): void => {
  const fileInputElement = document.getElementById(
    "file-input"
  ) as HTMLInputElement;
  fileInputElement.click();
};

const pickFile = (files: FileList | null): void => {
  if (!files) {
    return;
  }

  const mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }
  const reader = new FileReader();
  file.value = files[0];
  // filePath = files;
  // console.log(file);
  // filePath.value = URL.createObjectURL(file)
  const blob = reader.readAsDataURL(files[0]);
  reader.onload = (event) => {
    fileUrl.value = reader.result as string;

    if (
      images.value.filter((image) => image.name === files[0].name).length != 0
    )
      return;

    imagesUrls.value.push(fileUrl.value);
    images.value.push(files[0]);
  };
  isDraggedOver.value = false;
  // fileChange.emit(file);
};

const unpickFile = (file: File): void => {
  const imageNum = images.value.indexOf(file);
  images.value.splice(imageNum, 1);
  imagesUrls.value.splice(imageNum, 1);
};

const addTag = (event: Event) => {
  const inputEl = event.target as HTMLInputElement;
  let tagName = inputEl.value;
  if (tagName.length < 1) return;
  inputEl.value = "";
  tagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);

  tags.value.push(tagName);
};

const deleteTag = (index: number) => {
  tags.value.splice(index, 1);
};

const submit = () => {
  type mesType = "error" | "warning" | "success" | "information";
  const type: mesType = ["error", "warning", "success", "information"][
    Math.floor(Math.random() * 4)
  ] as mesType;
  NotificationsService.sendNotification({
    title: "Test notification",
    message: "You actually thought it did something",
    type: type,
  });
};
</script>
<template>
  <div class="wrapper">
    <div class="image-upload">
      <div
        @drop="dropHandler($event)"
        @dragover="dragOverHandler($event)"
        @dragleave="dragLeaveHandler($event)"
        @click="pickFileHandler()"
        :class="[isDraggedOver === true ? 'dragged' : 'nope', 'dropzone']"
      >
        <input
          type="file"
          id="file-input"
          accept="image/*"
          @change="pickFile(($event.target as HTMLInputElement).files)"
          hidden
        />
        <div class="placeholder">
          <p>Upload</p>
          <img
            src="/src/shared/assets/icons/download.svg"
            alt=""
            class="placeholder"
          />
        </div>
      </div>
      <div class="images-list">
        <div class="image" v-for="(image, index) in images">
          <!--
          <img :src="(reader.readAsDataURL(image) as string)" alt="" />          
        -->
          <img :src="imagesUrls[index]" alt="" />
          <div class="name">{{ image.name }}</div>
          <button class="delete" @click="unpickFile(image)">
            <img src="/src/shared/assets/icons/cancel.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
    <div class="image-form">
      <section>
        <div class="section-name">Basic</div>
        <input type="text" placeholder="Icon name" />
        <input type="text" placeholder="Associated team" />
      </section>
      <section>
        <div class="section-name">Tags</div>
        <div class="tags">
          <div class="tag" v-for="(tag, index) in tags">
            <div class="tag-name">
              {{ tag }}
            </div>
            <button class="tag-remove delete" @click="deleteTag(index)">
              <img src="/src/shared/assets/icons/cancel.svg" alt="" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Tag"
            v-on:keyup.enter="addTag($event)"
            class="tag"
          />
        </div>
      </section>
      <section>
        <div class="section-name">Links</div>
        <div class="tags">
          <div class="tag" v-for="(tag, index) in tags">
            <div class="tag-name">
              {{ tag }}
            </div>
            <button class="tag-remove delete" @click="deleteTag(index)">
              <img src="/src/shared/assets/icons/cancel.svg" alt="" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Tag"
            v-on:keyup.enter="addTag($event)"
            class="tag"
          />
        </div>
      </section>

      <ButtonBasic @click="submit()">Submit </ButtonBasic>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$black: rgb(221, 221, 221);
$red: rgb(0, 0, 0);
.wrapper {
  padding: 6em 13%;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  button.delete {
    margin-left: auto;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: 0.05s ease;

    img {
      filter: invert(0);

      &:hover {
        // background-color: black;
        filter: invert(100%);
      }
    }
  }

  .image-upload {
    flex: 2 1 20rem;
    padding: 1em;

    .dropzone {
      // @include flex-center();
      // @include set-colors($gray-dark, $red, $white);
      // @include set-hover-colors($black,$red,$white);
      // width: 300px;
      height: 300px;
      border: 2px dashed $red;
      border-radius: 10px;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      transition: 0.1s ease;

      &.dragged {
        background-color: $black;
      }

      &.dropped {
        background-color: $black;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.295);
      }

      &:hover {
        background-color: $black;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.295);
      }

      .placeholder {
        pointer-events: none;
        // @include flex-center();
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin-left: 1rem;
          height: 1.5rem;
        }

        p {
          font-size: 1.5rem;
        }
      }
    }

    .images-list {
      display: flex;
      flex-direction: column;
      padding: 1em 0;

      .image {
        display: flex;
        background-color: white;
        padding: 1em;
        margin: 0.5em 0;
        border-radius: 5px;
        transition: 0.1s ease;
        justify-content: center;
        align-items: center;

        &:hover {
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.199);
        }

        img {
          height: 3em;
          margin-right: 1em;
        }
      }
    }
  }
  .image-form {
    $font-size: 1em;
    flex: 2 1 20rem;
    padding: 1em;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    // background-color: white;

    section {
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 2em 1em;
      background-color: white;
      margin-bottom: 2em;
      border-radius: 5px;
      // box-shadow: 0 0 6px rgb(219, 219, 219);
      > input {
        margin-bottom: 0.5em;
      }
      .section-name {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, -50%);
        padding: 0.2em 0.6em;
        border-radius: 5px;
        color: gray;
        background-color: var(--color-background);
        border: 1px solid var(--gray-light-medium);
      }
    }

    input {
      padding: 0.5em 1em;
      font-size: $font-size;
      border-radius: 5px;
      border: 1px solid var(--gray-light-medium);
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      .tag {
        display: flex;
        background-color: white;
        padding: 1em;
        margin: 0.5em;
        margin-left: 0;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        font-size: $font-size;
        border: 1px var(--gray-light-medium) solid;
        img {
          height: 1.3em;
          margin-left: 0.5em;
        }
      }
    }

    .submit {
    }
  }
}
</style>
