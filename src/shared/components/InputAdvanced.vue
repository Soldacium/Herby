<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type: "text" | "number" | "password" | "email";
    color: "normal" | "reversed";
    label: string;
    input: string | number;
  }>(),
  {
    type: "text",
    color: "normal",
    input: "",
    label: "",
  }
);
let localInput = props.input;
</script>
<template>
  <div
    class="input-box-component field"
    :class="color === 'normal' ? 'dark' : 'light'"
  >
    <input
      :type="type"
      class="input-field"
      :placeholder="label"
      :name="label"
      :id="label"
      required
      v-model="localInput"
    />
    <label :for="label" class="input-label">{{ label }}</label>
  </div>
</template>
<style scoped lang="scss">
.input-box-component {
  position: relative;
  padding: 1.2rem 1rem 0rem 1rem;
  margin-top: 1rem;
  width: 100%;
  // background-color: rgb(250, 250, 250);
  overflow: hidden;
  border-bottom: 2px rgba(0, 0, 0, 0.055) solid;

  .input-field {
    font-family: inherit;
    width: 100%;
    border: 0;
    outline: 0;
    font-size: 1rem;
    padding: 7px 0;
    height: 100%;
    background: transparent;
    transition: border-color 0.2s;
    text-align: start;
  }
  .input-field::placeholder {
    color: transparent;
  }
  .input-field:placeholder-shown ~ .input-label {
    font-size: 1rem;
    cursor: text;
    top: 20px;
  }

  .input-label {
    position: absolute;
    top: 0.5rem;
    display: block;
    transition: 0.2s;
    font-size: 0.8rem;
    color: #9b9b9b;
  }

  .input-field:focus {
    font-weight: 500;
    border-width: 3px;
    border-image: linear-gradient(
      to right,
      var(--color-primary),
      var(--color-secondary)
    );
    border-image-slice: 1;
  }
  .input-field:focus ~ .input-label {
    position: absolute;
    top: 0.5rem;
    display: block;
    transition: 0.2s;
    font-size: 0.8rem;
    color: var(--color-primary);
    font-weight: 600;
  }

  /* reset input */
  .input-field:required,
  .input-field:invalid {
    box-shadow: none;
  }

  .input-box button {
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    width: 3rem;
    height: 100%;
    background-color: rgb(195, 251, 255);
    background-size: 2rem 2rem;
    background-position: center;
    background-repeat: no-repeat;
  }
}

.input-box.dark {
  // filter: invert(90%);
}
</style>
