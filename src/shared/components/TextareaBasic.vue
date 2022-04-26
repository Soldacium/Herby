<script lang="ts" setup>
const emits = defineEmits<{
  (e: "input-change", value: string): string;
}>();
</script>
<template>
  <textarea
    class="textarea-basic"
    onkeyup="this.setAttribute('value', this.value)"
    @input="emits('input-change', ($event.target as HTMLInputElement).value)"
  ></textarea>
</template>
<style lang="scss" scoped>
.textarea-basic {
  width: 100%;
  background-color: var(--color-background);
  border-radius: 10px;
  border: 1px solid var(--gray-medium);
  padding: 0.6em 1.3em;
  transition: 0.1s ease;
  font-size: 1.3em;
  resize: vertical;
  height: 300px;

  &:hover,
  &:not([value=""]) {
    background-color: var(--color-white);
  }

  &[value=""] {
    border-color: red;
  }
}
</style>
