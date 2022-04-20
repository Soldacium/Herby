<script lang="ts" setup>
import FileDropper from "../../shared/components/FileDropper.vue";

interface Variant {
  fileVector: File | null;
  fileNormal: File | null;
  variantName: string;
}
const files = [];
const variants: Variant[] = [];
</script>
<template>
  <div class="wrapper">
    <div class="variant">
      <FileDropper
        class="dropper"
        :removable-input="true"
        @add-file=""
      ></FileDropper>
      <FileDropper class="dropper" :removable-input="false"></FileDropper>
      <div class="variant-info">
        <input type="text" />
      </div>
    </div>
    <button></button>
    <div class="finalize">
      <input type="email" />
      <button class="submit">Submit</button>
    </div>
  </div>
</template>
<style lang="scss">
.wrapper {
}

.variant {
  display: flex;

  .dropper {
    flex: 1 1 20em;
  }
}
</style>
