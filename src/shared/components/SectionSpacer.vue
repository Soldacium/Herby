<script lang="ts" setup>
const props = defineProps({
  backgroundColor: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
<template>
  <div class="SectionSpacer">
    <div
      class="section-title"
      :style="{
        backgroundColor: backgroundColor
          ? backgroundColor
          : 'var(--color-background)',
      }"
    >
      <slot> </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.SectionSpacer {
  width: 100%;
  border-bottom: 1px solid var(--gray-light-medium);
  position: relative;
  margin: 1em 0;
  margin-top: 2em;
  .section-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 0.5em;
    color: var(--gray-medium);
  }
}
</style>
