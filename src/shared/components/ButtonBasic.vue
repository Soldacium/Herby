<script setup lang="ts"></script>
<template>
  <button class="ButtonBasic">
    <slot></slot>
  </button>
</template>
<style lang="scss">
.ButtonBasic {
  border: 1px solid transparent;
  background: var(--color-secondary);
  color: white;
  padding: 0.8em 1.5em;
  font-size: 1.6em;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.322);

  img:not(:only-child) {
    margin-left: 0.5em;
  }

  img {
    height: 1em;
    flex-shrink: 0;
  }

  &:hover {
    background-color: var(--color-primary);
  }
}
</style>
