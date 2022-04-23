<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";
import DownloadOptions from "../../shared/models/download-options.model";
import ExampleResults from "../home-search/home/example-result";
import ButtonBasic from "../../shared/components/ButtonBasic.vue";
import { NotificationsService } from "../../shared/services/notifications.service";
import FileDropper from "../../shared/components/FileDropper.vue";
import CrestUploadData from "../../shared/models/crest-upload-data.model";
import Loading from "../../shared/components/Loading.vue";
import SuccessCheck from "../../shared/components/SuccessCheck.vue";
import InputBasic from "../../shared/components/InputBasic.vue";
import TextareaBasic from "../../shared/components/TextareaBasic.vue";
import { ApiService } from "../../shared/services/api.service";
import { translation } from "../../shared/services/localization.service";

const tags: Ref<string[]> = ref([]);
const crestData: Ref<CrestUploadData> = ref({
  fileVector: undefined,
  fileOther: undefined,
  email: "",
  name: "",
  country_id: 2, // 2
  place: "",
  description: "",
  width: 0,
  height: 0,
});
const uploadStarted: Ref<boolean> = ref(false);
const uploadFinished: Ref<boolean> = ref(false);
const fileUploadProgress: Ref<{ vector: number; other: number }> = ref({
  vector: 0,
  other: 0,
});

onMounted(() => {
  // getDetails();
});

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

const setFileVector = (file: File) => {
  crestData.value.fileVector = file;
};

const removeFileVector = (file: File) => {
  crestData.value.fileVector = undefined;
};

const setFileOther = (file: File) => {
  crestData.value.fileOther = file;
};

const removeFileOther = (file: File) => {
  crestData.value.fileOther = undefined;
};

const uploadCrest = () => {
  if (!crestData.value.fileVector && !crestData.value.fileOther) {
    NotificationsService.sendNotification({
      title: "No crest provided",
      type: "error",
      message: "Please provide at least one crest image in correct format",
    });
    return;
  }
  if (
    crestData.value.email == "" ||
    crestData.value.country_id == 0 ||
    crestData.value.name == "" ||
    crestData.value.place == ""
  ) {
    NotificationsService.sendNotification({
      title: "Form lacks some information",
      type: "error",
      message:
        "Please provide email, country, name and place in the crest form",
    });
    return;
  }
  ApiService.uploadMainCrest(
    crestData.value,
    fileUploadProgress,
    uploadFinished
  );
  uploadStarted.value = true;
};
</script>
<template>
  <div class="wrapper">
    <div class="images-upload">
      <div class="file-upload-wrap">
        <FileDropper
          class="dropper"
          :removable-input="true"
          @add-file="setFileVector($event)"
          @remove-file="removeFileVector($event)"
        ></FileDropper>
        <div
          class="file-upload-state"
          :class="uploadStarted ? 'uploading' : 'naah'"
        >
          <Loading
            v-if="uploadStarted && fileUploadProgress.vector != 100"
          ></Loading>
          <SuccessCheck
            v-else-if="fileUploadProgress.vector === 100"
          ></SuccessCheck>
        </div>
      </div>
      <div class="file-upload-wrap">
        <FileDropper
          class="dropper"
          :removable-input="true"
          @add-file="setFileVector($event)"
          @remove-file="removeFileVector($event)"
        ></FileDropper>
        <div
          class="file-upload-state"
          :class="uploadStarted ? 'uploading' : 'naah'"
        >
          <Loading
            v-if="uploadStarted && fileUploadProgress.other != 100"
          ></Loading>
          <SuccessCheck
            v-else-if="fileUploadProgress.other === 100"
          ></SuccessCheck>
        </div>
      </div>
    </div>
    <form class="crest-form">
      <section :disabled="uploadStarted">
        <div class="section-name">
          {{ translation.contribute.basics.title }}
        </div>
        <InputBasic
          @input-change="crestData.name = $event"
          :placeholder="translation.contribute.basics.namePlaceholder"
        ></InputBasic>
        <InputBasic
          @input-change="crestData.place = $event"
          :placeholder="translation.contribute.basics.placePlaceholder"
        ></InputBasic>
        <InputBasic
          @input-change="crestData.country_id = $event"
          :placeholder="translation.contribute.basics.countryPlaceholder"
          type="number"
        ></InputBasic>
      </section>
      <section :disabled="uploadStarted">
        <div class="section-name">
          {{ translation.contribute.optional.title }}
        </div>
        <TextareaBasic
          :placeholder="translation.contribute.optional.descriptionPlaceholder"
        ></TextareaBasic>
      </section>
      <section :disabled="uploadStarted">
        <div class="section-name">
          {{ translation.contribute.submitInfo.title }}
        </div>
        <InputBasic
          :placeholder="translation.contribute.submitInfo.emailPlaceholder"
          type="email"
          @input-change="crestData.email = $event"
        ></InputBasic>
      </section>
      <ButtonBasic
        v-if="!uploadFinished"
        :disabled="uploadStarted"
        type="button"
        @click="uploadCrest()"
        class="submit-button"
        >{{ translation.contribute.buttonText }}</ButtonBasic
      >
      <div class="finalize success" v-else>
        <div class="success-text">All done!</div>
        <SuccessCheck></SuccessCheck>
      </div>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  padding: 6em 10%;
  display: flex;
  flex-wrap: wrap;

  > * {
    margin: 0 1em;
  }
}

.images-upload {
  display: flex;
  flex-direction: column;
  flex: 1 1 25em;
  .file-upload-wrap {
    flex: 1 1 20em;
    margin-bottom: 1em;
    position: relative;
    &:first-of-type {
      // margin-right: 1em;
    }
    .file-upload-state {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;

      &.uploading {
        pointer-events: all;
      }
    }
  }
}

.crest-form {
  flex: 1 1 25em;

  section {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 2em 1em;
    background-color: white;
    margin-bottom: 2em;
    border-radius: 10px;
    border: 1px solid var(--gray-light-medium);
    box-shadow: 0 0 6px transparent;
    transition: 0.1s;
    > input {
      margin-bottom: 0.5em;
    }

    &:hover {
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.151);
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

  .submit-button {
    width: 100%;
  }
}

.finalize {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
  transition: 0.3s;
  input {
    width: 100%;
    background-color: var(--color-background);
    border-radius: 10px;
    border: 1px solid var(--gray-medium);
    padding: 0.6em 1.3em;
    transition: 0.1s ease;
    font-size: 1.3em;
    margin-right: 1em;
    height: 100%;

    &:hover,
    &:not([value=""]) {
      background-color: white;
    }

    &[value=""] {
      border-color: red;
    }
  }

  &.success {
    $green: rgb(12, 161, 12);
    border: 2px solid $green;
    padding: 1em;
    border-radius: 10px;
    .success-text {
      font-size: 3em;
      // font-weight: 600;
      color: $green;
      margin-right: 20px;
    }
  }
}
</style>
