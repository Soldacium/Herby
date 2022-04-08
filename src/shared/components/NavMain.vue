<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { changeColorScheme } from "../services/color-mode.service";
const menuState = ref<"open" | "closed">("closed");
const changeMenuState = () => {
  menuState.value === "open"
    ? (menuState.value = "closed")
    : (menuState.value = "open");
  console.log(menuState.value);
};
const route = useRoute();

let mode = ref("home-search");

watch(route, (newRoute, oldRoute) => {
  checkPath(newRoute.path);
});

onMounted(() => {
  checkPath(route.path);
});

const checkPath = (path: string) => {
  if (path.includes("home") || path.includes("search")) {
    mode.value = "home-search";
  } else {
    mode.value = "other";
  }
};
</script>
<template>
  <nav :class="mode == 'home-search' ? 'normal' : 'reversed'">
    <img src="/src/shared/assets/icons/sport-2.svg" alt="" class="logo" />
    <div class="links">
      <a href="">Search</a>
      <a href="">Clubs</a>
      <a href="">Login</a>
    </div>
    <!--

    <button @click="changeColorScheme('dark')">Dark Mode</button>      
    -->
  </nav>
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
        <li><a href="">Home</a></li>
        <li><a href="">Search</a></li>
        <li><a href="">Clubs</a></li>
        <li><a href="">Add</a></li>
        <li><a href="">About</a></li>
        <button @click="changeColorScheme('dark')">Dark Mode</button>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
nav {
  display: flex;
  padding: 0.5em calc(15% - 7em);
  width: 100%;
  height: 3em;
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 10000;

  &.reversed {
    position: fixed;
    background-color: var(--color-secondary);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.397);
    // background: linear-gradient(var(--color-primary));
    .links {
    }
  }
  .logo {
    height: 2em;
    // align-self: flex-start;
    filter: invert(100%);
  }

  .links {
    margin-left: auto;
    flex-wrap: nowrap;
    flex-shrink: 0;
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
      color: var(--color-text-reverse);
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
  opacity: 0;
  pointer-events: none;

  span {
    position: absolute;
    height: 6px;
    border-radius: 3px;
    border: 1px solid var(--color-text-reverse);
    width: 100%;
    background: var(--color-text-reverse);
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
