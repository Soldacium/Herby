<script setup lang="ts"></script>
<template>
  <div class="spinner">
    <div class="spinner-item"></div>
    <div class="spinner-item"></div>
    <div class="spinner-item"></div>
  </div>
</template>
<style lang="scss" scoped>
.spinner {
  --size: 75px;
  --clr1: var(--color-primary);
  --clr3: var(--color-secondary);
  --clr5: var(--color-primary);
  --animation-duration: 500ms;
  position: relative;

  .spinner-item {
    --item-size: calc(var(--size) / 4);
    width: var(--item-size);
    height: var(--item-size);
    display: inline-block;
    margin: 0 3px;
    border-radius: 50%;
    border: 4px solid var(--clr-spinner);
    animation: spinner4 var(--animation-duration) ease-in-out infinite;

    @keyframes spinner4 {
      0%,
      100% {
        transform: translateY(75%);
      }

      50% {
        transform: translateY(-75%);
      }
    }
  }

  .spinner-item:nth-child(1) {
    --clr-spinner: var(--clr5);
    animation-delay: calc(var(--animation-duration) / 6 * -1);
  }

  .spinner-item:nth-child(2) {
    --clr-spinner: var(--clr3);
    animation-delay: calc(var(--animation-duration) / 6 * -2);
  }

  .spinner-item:nth-child(3) {
    --clr-spinner: var(--clr1);
    animation-delay: calc(var(--animation-duration) / 6 * -3);
  }
}
</style>
