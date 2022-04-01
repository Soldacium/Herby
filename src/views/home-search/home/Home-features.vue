<script lang="ts" setup>
const features = [0, 1, 2, 3];
</script>
<template>
  <div class="wrapper">
    <div class="title">Explore features</div>
    <div class="features">
      <div class="feature" v-for="feature in features">
        <img src="" alt="" />
        <div class="feature-name">Feature</div>
        <div class="feature-description">This is description</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  padding: 0 10%;
  margin-top: 6em;
  margin-bottom: 6em;
}

.title {
  margin-bottom: 2em;
  font-size: 1.3em;
  font-weight: 600;
  border-bottom: 1px solid rgba(128, 128, 128, 0.116);
  padding-bottom: 0.5em;
}

.features {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .feature {
    position: relative;
    flex: 1 1 20em;
    padding: 2em;
    border: 1px solid rgb(206, 206, 206);
    margin: 0 10px;
    border-radius: 10px;
    min-height: 20vh;
    display: flex;
    flex-direction: column;

    .feature-name {
      margin-top: auto;
      font-weight: 600;
    }
  }
}
</style>
