<script lang="ts" setup>
const emits = defineEmits<{
  (e: "input-change", value: string): string;
}>();
</script>
<template>
  <input
    type="text"
    class="input-basic"
    onkeyup="this.setAttribute('value', this.value)"
    @input="emits('input-change', ($event.target as HTMLInputElement).value)"
  />
</template>
<style scoped lang="scss">
.input-basic {
  width: 100%;
  background-color: var(--color-background);
  border-radius: 10px;
  border: 1px solid var(--gray-medium);
  padding: 0.6em 1.3em;
  transition: 0.1s ease;
  font-size: 1.3em;

  &:hover,
  &:not([value=""]) {
    background-color: var(--color-white);
  }

  &[value=""] {
    // border-color: red;
  }
}
</style>
