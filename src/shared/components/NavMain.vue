<script lang="ts" setup>
import { ref } from "vue";
const menuState = ref<"open" | "closed">("closed");
const changeMenuState = () => {
  menuState.value === "open"
    ? (menuState.value = "closed")
    : (menuState.value = "open");
  console.log(menuState.value);
};
</script>
<template>
  <div
    class="hamburger"
    @click="changeMenuState()"
    :class="menuState === 'open' ? 'active' : 'naah'"
  >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>

  <div class="overlay" :class="menuState === 'open' ? 'active' : 'naah'">
    <div class="nav-overlay">
      <ul>
        <li><a href="#start">Start</a></li>
        <li><a href="#oferta">Oferta</a></li>
        <li><a href="#onas">O nas</a></li>
        <li><a href="#cennik">Cennik</a></li>
        <li><a href="#kontakt">Kontakt</a></li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav {
  display: flex;
  padding: 2em calc(15% - 7em);
  width: 100%;
  height: 6.5em;
  position: absolute;
  align-items: center;
  z-index: 1000;
  .logo {
    height: 4em;
    align-self: flex-start;
  }

  .links {
    margin-left: auto;
    flex-wrap: nowrap;
    flex-shrink: 0;

    a {
      text-decoration: none;
      color: var(--color-white);
      margin: calc(1.3vw - 0.2em);
      font-size: var(--text-size-medium);
    }
  }

  .login {
    margin-left: calc(5% - 1em);
  }
}

// to component?
.hamburger {
  position: fixed;
  right: 2rem;
  top: 2rem;
  width: 40px;
  height: 40px;
  z-index: 300;
  margin: 0 1rem;
  cursor: pointer;
  z-index: 33300;

  span {
    position: absolute;
    height: 6px;
    border-radius: 3px;
    border: 1px solid black;
    width: 100%;
    background: black;
    top: 0;
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
    &:nth-child(1) {
      top: 4px;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 17px;
    }

    &:nth-child(4) {
      top: 29px;
    }
  }

  &.active {
    span {
      z-index: 600;
      background: white;
      &:nth-child(1),
      &:nth-child(4) {
        opacity: 0;
      }

      &:nth-child(2) {
        transform: rotate(45deg);
      }

      &:nth-child(3) {
        transform: rotate(-45deg);
      }
    }
  }
}

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 3250;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
  pointer-events: none;
  background: var(--color-gradient-1);

  &.active {
    pointer-events: all;

    > * {
      opacity: 1;
    }
  }

  &.naah {
    pointer-events: none;
    opacity: 0;

    > * {
      opacity: 0;
    }
  }
}

.nav-overlay {
  font-size: 2rem;
  text-align: center;
  transition: 0.2s;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    margin-bottom: 2em;

    li {
      margin: 26px 0;

      a {
        color: rgb(255, 255, 255);
        padding: 10px;
        font-size: var(--text-size-medium);
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s;

        &:hover {
          text-shadow: white 0px 0px 6px;
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .nav {
    display: none;
  }

  .hamburger {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
