<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import FileDropper from "../../shared/components/FileDropper.vue";
import { NotificationsService } from "../../shared/services/notifications.service";
import ButtonBasic from "../../shared/components/ButtonBasic.vue";
import ApiCrestData from "../../shared/models/api-crest-data.model";
import { ApiService } from "../../shared/services/api.service";
import SuccessCheck from "../../shared/components/SuccessCheck.vue";
import Loading from "../../shared/components/Loading.vue";
import InputBasic from "../../shared/components/InputBasic.vue";

const props = defineProps<{ crest: ApiCrestData }>();

interface Variant {
  fileVector: File | null;
  fileNormal: File | null;
  variantName: string;
  variantDescription: string;
}

let emptyVariant: Variant = {
  fileVector: null,
  fileNormal: null,
  variantName: "",
  variantDescription: "",
};
const files = [];
const variants: Ref<Variant[]> = ref([{ ...emptyVariant }]);
// const variantsUploadProgress: Ref<Number[]> = ref([]);
const minVariantNameLength = 5;
const variantsUploadState: Ref<{ vector: number; other: number }[]> = ref([
  { vector: 0, other: 0 },
]);
const uploadFinished: Ref<boolean> = ref(false);
const uploadStarted: Ref<boolean> = ref(false);
const contactEmail: Ref<string> = ref("string");

onMounted(() => {
  console.log(props.crest);
});

const addNextVariant = () => {
  if (!isVariantCorrect(variants.value[variants.value.length - 1])) {
    NotificationsService.sendNotification({
      message: "Fill all information needed before proceeding to next one",
      title: "Incorrect previous variant",
      type: "warning",
    });
    return;
  }
  variants.value.push({ ...emptyVariant });
  variantsUploadState.value.push({ vector: 0, other: 0 });
};

const removeVariant = (varaintNum: number) => {
  variants.value.splice(varaintNum, 1);
  variantsUploadState.value.slice(varaintNum, 1);
};
const submitVariants = () => {
  if (uploadStarted.value) return;
  const submittable = variants.value.some((variant) => {
    if (!isVariantCorrect(variant)) {
      NotificationsService.sendNotification({
        title: "Incorrect variants",
        message:
          "Some of the variants you are trying to upload are not made correctly",

        type: "error",
      });
      return false;
    }
    return true;
  });

  if (!submittable) return;
  uploadStarted.value = true;
  ApiService.uploadCrestVariants(
    variants.value,
    props.crest,
    contactEmail.value,
    variantsUploadState,
    uploadFinished
  );
};

const uploadVariant = (variant: Variant) => {
  // variantsUploadProgress.value.push(0);
};

const uploadVarinatImages = (variant: Variant) => {
  // ApiService.uploadCrestVariants()
};

const isVariantCorrect = (variant: Variant): boolean => {
  console.log(variant, variant.variantName.trim().length);
  return variant.variantName.trim().length < 5 ||
    (!variant.fileNormal && !variant.fileVector)
    ? false
    : true;
};

const setVariantVector = (file: File, variant: Variant) => {
  variant.fileVector = file;
};

const removeVariantVector = (file: File, variant: Variant) => {
  variant.fileVector = null;
};

const setVariantOther = (file: File, variant: Variant) => {
  variant.fileNormal = file;
};

const removeVariantOther = (file: File, variant: Variant) => {
  variant.fileNormal = null;
};
</script>
<template>
  <div class="wrapper">
    <div class="variant" v-for="(variant, i) in variants">
      <div class="file-upload-wrap">
        <FileDropper
          class="dropper"
          :removable-input="true"
          @add-file="setVariantVector($event, variant)"
          @remove-file="removeVariantVector($event, variant)"
        ></FileDropper>
        <div
          class="file-upload-state"
          :class="uploadStarted ? 'uploading' : 'naah'"
        >
          <Loading
            v-if="uploadStarted && variantsUploadState[i].vector != 100"
          ></Loading>
          <SuccessCheck
            v-else-if="variantsUploadState[i].vector === 100"
          ></SuccessCheck>
        </div>
      </div>
      <div class="file-upload-wrap">
        <FileDropper
          class="dropper"
          :removable-input="true"
          @add-file="setVariantOther($event, variant)"
          @remove-file="removeVariantOther($event, variant)"
        ></FileDropper>
        <div
          class="file-upload-state"
          :class="uploadStarted ? 'uploading' : 'naah'"
        >
          <Loading
            v-if="uploadStarted && variantsUploadState[i].other != 100"
          ></Loading>
          <SuccessCheck
            v-else-if="variantsUploadState[i].other === 100"
          ></SuccessCheck>
        </div>
      </div>

      <div class="variant-info">
        <InputBasic
          type="text"
          @input-change="variant.variantName = $event"
          placeholder="Name"
          :disabled="uploadStarted"
          required
        />
        <InputBasic
          type="text"
          @input-change="variant.variantDescription = $event"
          placeholder="Description (optional)"
          :disabled="uploadStarted"
        />
      </div>
      <button
        :disabled="uploadStarted"
        v-if="i != 0"
        class="variant-remove"
        @click="removeVariant(i)"
      >
        <img src="/src/shared/assets/icons/cancel.svg" alt="" />
      </button>
    </div>
    <button
      class="next-variant"
      @click="addNextVariant()"
      v-if="!uploadStarted"
    >
      Next Variant
    </button>
    <div class="finalize" v-if="!uploadFinished">
      {{ contactEmail }}
      <InputBasic
        type="email"
        placeholder="Contact email"
        required
        :disabled="uploadStarted"
        @input-change="contactEmail = $event"
      >
      </InputBasic>
      <ButtonBasic :disabled="uploadStarted" @click="submitVariants()"
        >Submit
      </ButtonBasic>
    </div>
    <div class="finalize success" v-else>
      <div class="success-text">All done!</div>
      <SuccessCheck></SuccessCheck>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  padding: 2em 6%;
}

.variant {
  display: flex;
  position: relative;
  margin: 1em 0;
  padding: 2em 2em;
  border-radius: 10px;
  border: var(--gray-medium) 1px solid;
  background-color: white;
  flex-wrap: wrap-reverse;
  box-shadow: 0 0 6px transparent;
  transition: 0.1s;
  &:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.171);
  }
  > * {
    padding-right: 1em;
  }

  .file-upload-wrap {
    flex: 1 1 16em;
    margin-bottom: 1em;
    position: relative;

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
  .variant-info {
    flex: 1 1 16em;

    > * {
      margin-bottom: 1em;
      font-size: 1em;
    }
  }

  .variant-remove {
    position: absolute;
    right: -40px;
    top: 0;
    background-color: transparent;
    border: var(--gray-medium) 1px solid;
    height: 100%;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 20px;
      width: 20px;
    }
  }
}

.next-variant {
  $color: var(--gray-medium);
  width: 100%;
  height: 200px;
  border-radius: 10px;
  background-color: transparent;
  border: 2px dashed $color;
  color: $color;
  position: relative;
  font-size: 1.3em;
  cursor: pointer;
  transition: 0.1s ease;

  &:hover {
    background-color: white;
    color: var(--color-secondary);
    border-color: var(--color-secondary);
    border-style: solid;
    border-width: 1px;
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
