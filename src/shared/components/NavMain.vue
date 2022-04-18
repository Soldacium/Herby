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
  // addScrollListener();
});

/*
const addScrollListener = () => {
  checkScroll();
  window.addEventListener("scroll", (e) => {
    checkScroll();
  });
};

const checkScroll = () => {
  const scroll = window.scrollY;
  scroll > 50 ? (mode.value = "reversed") : "home-search";
};
*/

const checkPath = (path: string) => {
  if (path.includes("home") || path.includes("search")) {
    mode.value = "home-search";
  } else {
    mode.value = "other";
  }
};
</script>
<template>
  <nav :class="mode == 'home-search' ? 'normal' : 'reverse'">
    <img src="/src/shared/assets/icons/sport-2.svg" alt="" class="logo" />
    <div class="links">
      <router-link to="/x/home">Home</router-link>
      <router-link to="/x/search">Search</router-link>
      <router-link to="/clubs">Clubs</router-link>
      <router-link to="/x/te">Login</router-link>
      <router-link to="/saved">Saved</router-link>
      <router-link class="link-button" to="/contribute">
        <button>Add crest +</button>
      </router-link>
      <!--
      <router-link class="link-button" to="/x/saved">
        <button>
          <img src="/src/shared/assets/icons/star.svg" />
        </button>
      </router-link>
      -->
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
  padding: 2em calc(12%);
  width: 100%;
  height: 3em;
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  // background-color: white;
  // border-bottom: 1px solid var(--gray-light-medium);

  &.reversed {
    position: fixed;
    background-color: var(--color-secondary);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.397);
    // background: linear-gradient(var(--color-primary));
    .links {
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
  .logo {
    height: 2em;
    // align-self: flex-start;
    // filter: invert(100%);
  }

  .links {
    margin-left: auto;
    flex-wrap: nowrap;
    flex-shrink: 0;
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
      color: var(--color-text);
      margin: calc(1.3vw - 0.2em);
      font-size: var(--text-size);

      &.link-button {
        margin-left: 0;
      }

      button {
        border: 2px solid var(--color-secondary);
        border-radius: 5px;
        display: flex;
        flex-shrink: 0;
        font-size: var(--text-size);
        padding: 0.4em 0.8em;
        background-color: var(--color-secondary);
        color: white;
        justify-content: center;
        align-items: center;
        height: 2em;
        transition: 0.1s ease;

        &:hover {
          background-color: var(--color-background);
          color: var(--color-secondary);
        }
        img {
          flex-shrink: 0;
          height: 1em;
          filter: invert(100%);
        }
      }
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
    // border: 1px solid var(--color-text);
    width: 100%;
    background: var(--color-text);
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
      }
    }
  }

  button {
    border: none;
    background-color: white;
    cursor: pointer;
    font-size: 0.5em;
    padding: 0.4em 0.8em;
    border-radius: 10px;
    margin-top: 4em;
  }
}

@media screen and (max-width: 800px) {
  nav {
    display: none;
  }

  .hamburger {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
