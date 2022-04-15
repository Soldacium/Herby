<script lang="ts" setup>
import ButtonBasic from "../../../shared/components/ButtonBasic.vue";
</script>
<template>
  <div class="wrapper">
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
      <ButtonBasic>Submit your own</ButtonBasic>
    </div>
    <div class="images">
      <img
        src="/src/shared/assets/backgrounds/fc-barcelona.svg"
        alt=""
        class="front"
      />
      <img
        src="/src/shared/assets/backgrounds/madrid-cf.svg"
        alt=""
        class="back"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
$min-height: 50vh;
.wrapper {
  margin-top: 10em;
  display: flex;
  min-height: $min-height;
  flex-wrap: wrap;

  .images {
    position: relative;
    width: 400px;
    margin-left: 2em;
    margin-bottom: 3em;
    flex-shrink: 0;
    flex: 1 1 20em;
    min-height: $min-height;
    img {
      width: 100%;
      position: absolute;
    }

    .front {
      left: 0;
      top: 0;
      z-index: 10;
    }

    .back {
      right: -80px;
      top: -80px;
      width: 60%;
      opacity: 0.5;
    }
  }

  .text {
    flex: 1 1 30em;
    padding: 2em;
    .title {
      font-size: 4em;
      font-weight: 600;
      margin-bottom: 0.4em;
      padding-bottom: 0.2em;
      border-bottom: 1px solid rgb(231, 231, 231);
    }

    .description {
      font-size: 1.3em;
    }
  }
}
</style>
