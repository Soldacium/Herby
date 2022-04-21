<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import FileDropper from "../../shared/components/FileDropper.vue";
import { NotificationsService } from "../../shared/services/notifications.service";
import ButtonBasic from "../../shared/components/ButtonBasic.vue";
import ApiCrestData from "../../shared/models/api-crest-data.model";
import { ApiService } from "../../shared/services/api.service";

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

  /* 
    ||
    !variant.fileNormal ||
    !variant.fileVector
    */
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
      {{ variantsUploadState[i].vector }}
      <FileDropper
        class="dropper"
        :removable-input="true"
        @add-file="setVariantVector($event, variant)"
        @remove-file="removeVariantVector($event, variant)"
      ></FileDropper>
      {{ variantsUploadState[i].other }}
      <FileDropper
        class="dropper"
        :removable-input="true"
        @add-file="setVariantOther($event, variant)"
        @remove-file="removeVariantOther($event, variant)"
      ></FileDropper>
      <div class="variant-info">
        <input
          onkeyup="this.setAttribute('value', this.value)"
          type="text"
          v-model="variant.variantName"
          placeholder="Name"
        />
        <input
          onkeyup="this.setAttribute('value', this.value)"
          type="text"
          v-model="variant.variantDescription"
          placeholder="Description (optional)"
        />
      </div>
      <button v-if="i != 0" class="variant-remove" @click="removeVariant(i)">
        <img src="/src/shared/assets/icons/cancel.svg" alt="" />
      </button>
    </div>
    <button class="next-variant" @click="addNextVariant()">Next Variant</button>
    <div class="finalize">
      <input type="email" placeholder="Contact email" />
      <ButtonBasic @click="submitVariants()">Submit</ButtonBasic>
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

  .dropper {
    flex: 1 1 16em;
    margin-bottom: 1em;
  }
  .variant-info {
    flex: 1 1 16em;

    input {
      width: 100%;
      background-color: var(--color-background);
      border-radius: 10px;
      border: 1px solid var(--gray-medium);
      padding: 0.6em 1.3em;
      transition: 0.1s ease;
      margin-bottom: 1em;
      font-size: 1.3em;

      &:hover,
      &:not([value=""]) {
        background-color: white;
      }
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
  margin-top: 2em;
  input {
    width: 100%;
    background-color: var(--color-background);
    border-radius: 10px;
    border: 1px solid var(--gray-medium);
    padding: 0.6em 1.3em;
    transition: 0.1s ease;
    font-size: 1.3em;
    margin-right: 1em;

    &:hover,
    &:not([value=""]) {
      background-color: white;
    }
  }
}
</style>
