<script lang="ts" setup></script>
<template>
  <div class="wrapper">
    <div class="images">
      <img src="/src/shared/assets/icons/png.svg" alt="" class="front" />
      <img src="/src/shared/assets/icons/svg.svg" alt="" class="back" />
    </div>
    <div class="text">
      <div class="title">A database for all</div>
      <div class="description">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
        repellendus voluptates hic sapiente unde at harum ex rem neque impedit
        labore facere quasi ad, laborum iusto aspernatur ipsam, iste praesentium
        itaque non laudantium eaque. Magnam aut quisquam fugiat sit, dicta rem
        soluta accusantium voluptatibus molestiae exercitationem tempore
        voluptas, alias ratione error quo animi, repudiandae quis autem! Nostrum
        fugiat quam minus.
      </div>
      <button>Submit your own</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  padding: 0 10%;
  margin-top: 15em;
  display: flex;
  min-height: 60vh;
  flex-wrap: wrap;

  .images {
    position: relative;
    width: 500px;
    margin-right: 3em;
    margin-bottom: 3em;
    flex-shrink: 0;
    flex: 1 1 20em;
    min-height: 60vh;
    img {
      width: 80%;
      position: absolute;
    }

    .front {
      left: 0;
      top: 30px;
      z-index: 10;
    }

    .back {
      left: -30px;
      top: -40px;
      width: 60%;
    }
  }

  .text {
    flex: 1 1 30em;
    .title {
      font-size: 6em;
      font-weight: 600;
      margin-bottom: 0.4em;
      padding-bottom: 0.2em;
      border-bottom: 1px solid rgb(231, 231, 231);
    }

    .description {
      font-size: 1.3em;
    }

    button {
      border: 3px solid black;
      background: transparent;
      padding: 0.8em 1em;
      font-size: 2em;
      margin-top: 2em;
    }
  }
}
</style>
