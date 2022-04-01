<script lang="ts" setup>
import InputBasic from "../../shared/components/InputBasic.vue";
</script>
<template>
  <div class="wrapper">
    <section class="section-one">
      <div class="info">
        <img src="/src/shared/assets/icons/phone.svg" alt="" class="icon" />
        <div class="text">
          <div class="top">Numer telefonu</div>
          <div class="bottom">8 800 123 456</div>
        </div>
      </div>
      <div class="info">
        <img src="/src/shared/assets/icons/mail1.svg" alt="" class="icon" />
        <div class="text">
          <div class="top">Numer telefonu</div>
          <div class="bottom">randomemail@skrzynka.pl</div>
        </div>
      </div>
      <div class="send-mail">
        <InputBasic :label="'Adres e-mail'"></InputBasic>
      </div>
    </section>
    <section class="section-two">
      <div class="about">
        <img
          src="/src/shared/assets/icons/logo-biale.svg"
          alt=""
          class="logo"
        />
        <div class="text">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old
        </div>
      </div>
      <div class="menu">
        <h3>Menu</h3>
        <ul>
          <li><a href="#start">Start</a></li>
          <li><a href="#oferta">Oferta</a></li>
          <li><a href="#onas">O nas</a></li>
          <li><a href="#cennik">Cennik</a></li>
          <li><a href="#kontakt">Kontakt</a></li>
        </ul>
      </div>
      <div class="short">
        <h3>Na skróty</h3>
        <ul>
          <li><a href="#start">Polityka prywatności</a></li>
          <li><a href="#oferta">Regulamin</a></li>
          <li><a href="#onas">Do pobrania</a></li>
          <li><a href="#cennik">FAQ</a></li>
        </ul>
      </div>
    </section>
    <section class="section-three">&#x24D2; 2022 All Rights Reserved</section>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  // background-color: rgb(4, 0, 255);
  min-height: 50vh;
  min-width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--padding-welcome-page);
  padding-top: 0;
  padding-bottom: 0;
  // background: var(--color-gradient-1);
  background-color: rgb(31, 31, 31);
  border-radius: 2em 2em 0 0;
}

* {
  color: white;
}

section {
  display: flex;
  padding: 3em 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.116);
  width: 100%;

  ul {
    list-style: none;
    padding: 0;
    li {
      a {
        color: var(--color-white);
        text-decoration: none;
      }
    }
  }

  h3 {
    color: var(--color-white);
    white-space: nowrap;
  }
}

.section-one {
  .info {
    display: flex;
    margin-right: 2em;
    img {
      height: 50px;
      margin-right: 1em;
    }
    .text {
      text-align: left;
      > * {
        color: var(--color-white);
      }
      .top {
        font-size: var(--text-size-smaller);
      }
    }
  }

  .send-mail {
    margin-left: auto;
  }
}

.section-two {
  > div:not(:first-of-type) {
    margin-left: 4em;
  }

  .about {
    flex: 3 1;
    > *:not(:last-of-type) {
      margin-bottom: 1em;
    }
    .text {
      color: var(--color-white);
    }

    .links {
      > .link {
        margin-right: 1em;
      }
    }
  }

  .menu {
    flex: 1 1;
  }

  .short {
    flex: 1 1;
  }

  .access {
    flex: 2 1;
    .platforms {
      display: flex;
      flex-wrap: wrap;
      justify-items: baseline;
      .platform-link {
        width: 8.5em;
      }
    }
  }
}

.section-three {
  border: none;
  text-align: center;
  color: var(--color-white);
  display: flex;
  justify-content: center;
}
</style>
