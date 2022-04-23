<script lang="ts" setup>
const props = defineProps<{ optionList: { name: string; value: string }[] }>();
const emits = defineEmits<{ (e: "select-change", value: string): string }>();
</script>
<template>
  <select
    class="select-basic"
    name=""
    @change="emits('select-change', ($event.target as HTMLSelectElement).value)"
  >
    <option v-for="option in optionList" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
<style lang="scss" setup>
.select-basic {
  flex-shrink: 0;
  padding: 5px;
  border: 1px solid var(--gray-medium);
  // border-radius: 10px 0 0 10px;
}
</style>
