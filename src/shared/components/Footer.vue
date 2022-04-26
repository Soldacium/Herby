<script lang="ts" setup>
import InputBasic from "../../shared/components/InputBasic.vue";
</script>
<template>
  <div class="wrapper">
    <!--
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
    -->
    <!--
    <div class="footer-background">
      <svg
        id="visual"
        viewBox="0 0 900 600"
        width="900"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <g transform="translate(876.5063519794596 601.6967255495692)">
          <path
            d="M267.2 -204.9C337.4 -125.1 379.3 -14.5 350.4 67C321.5 148.6 221.7 201 119 252.5C16.3 304.1 -89.5 354.8 -163.4 324.8C-237.4 294.8 -279.6 184.1 -300.2 74.1C-320.8 -35.8 -319.9 -145.1 -266.3 -221.2C-212.7 -297.3 -106.3 -340.1 -3.9 -337C98.5 -333.9 197 -284.8 267.2 -204.9"
            fill="none"
            stroke="#00aaff"
            stroke-width="29"
          ></path>
        </g>
      </svg>
    </div>      
    -->

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
    <button class="feedback-button">Something not right? Report issue!</button>
    <section class="section-three">&#x24D2; 2022 All Rights Reserved</section>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  // background-color: rgb(4, 0, 255);
  // min-height: 40vh;
  min-width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--padding-welcome-page);
  padding-top: 2em;
  padding-bottom: 0;
  // background: var(--color-gradient-1);
  // background-color: rgb(131, 131, 131);
  // border-radius: 2em 2em 0 0;
  background: var(--color-gradient-1);
  border-top: 1px solid var(--gray-light-medium);
  margin-top: 2em;
}

.footer-background {
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
* {
  color: var(--gray-light);
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
        // color: var(--color-white);
        text-decoration: none;
      }
    }
  }

  h3 {
    // color: var(--color-white);
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
        // color: var(--color-white);
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
      // color: var(--color-white);
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
  // color: var(--color-white);
  display: flex;
  justify-content: center;
}

.feedback-button {
  $button-color: var(--color-white);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.3em;
  margin-top: 2em;
  font-size: 1.5em;
  line-height: 0;
  border: 4px solid $button-color;
  border-radius: 10px;
  background-color: $button-color;
  cursor: pointer;
  color: black;
  transition: 0.1s ease;

  &:hover {
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.24);
    background-color: transparent;

    color: $button-color;
  }

  img {
    height: 0.8em;
    margin-left: 0.5em;
  }
}
</style>
