<script setup lang="ts">
import { Ref, ref } from "vue";
import { UtilsService } from "../services/utils.service";

const props = defineProps<{ removableInput: boolean }>();
const emits = defineEmits<{
  (e: "addFile", file: File): void;
  (e: "removeFile", file: File): void;
}>();
let placeholder = ref("placeholder");

let isDraggedOver = ref(false);
const file: Ref<File | null> = ref(null);
const dropperId = UtilsService.getUniqueId();

let filePath = ref("");
let fileUrl = ref("");

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
    dropperId
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
    emits("addFile", files[0] as File);
  };
  isDraggedOver.value = false;
  // fileChange.emit(file);
};

const unpickFile = (unpickedFile: File): void => {
  emits("removeFile", unpickedFile);
  fileUrl.value = "";
  file.value = null;
};
</script>
<template>
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
        accept="image/*"
        :id="dropperId"
        @change="pickFile(($event.target as HTMLInputElement).files)"
        hidden
      />
      <div class="placeholder">
        <p>Upload</p>
        <img v-if="removableInput" :src="fileUrl" alt="" class="placeholder" />
      </div>
    </div>
    <button
      class="remove"
      v-if="removableInput && file"
      @click="unpickFile(file)"
    >
      <img src="/src/shared/assets/icons/cancel.svg" alt="" />
    </button>
  </div>
</template>
<style lang="scss" scoped>
$black: rgb(221, 221, 221);
$red: rgb(0, 0, 0);
.image-upload {
  position: relative;

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
    position: relative;

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
  button.remove {
    position: absolute;
    right: 30px;
    top: 15px;
    //transform: translate(-50%, -50%);
    background-color: transparent;
    border: none;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 30px;
    }
  }
}
</style>
