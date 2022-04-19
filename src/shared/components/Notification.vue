<script lang="ts" setup>
import anime, { AnimeTimelineInstance } from "animejs";
import { onMounted, watch } from "vue";
import { NotificationsService } from "../services/notifications.service";

const message = NotificationsService.message;
let notificationEl: HTMLDivElement;
let animation: AnimeTimelineInstance;

onMounted(() => {
  notificationEl = document.getElementById("notification") as HTMLDivElement;
});

watch(message, (newVal, oldVal) => {
  showNotification();
});
const showNotification = (): void => {
  animation = anime.timeline({
    duration: 2000,
    easing: "easeInOutQuad",
  });
  animation
    .add({
      targets: notificationEl,
      bottom: "-80px",
      duration: 1,
    })
    .add({
      targets: notificationEl,
      bottom: "0px",
      duration: 200,
    })
    .add({
      targets: notificationEl,
      // duration: 1500,
      bottom: "0px",
    })
    .add({
      targets: notificationEl,
      bottom: "-80px",
      duration: 200,
    });
};

const keepNotification = () => {
  if (animation) {
    animation.pause();
  }
};

const resumeNotification = () => {
  if (animation) {
    animation.play();
  }
};
</script>
<template>
  <div
    id="notification"
    :class="['notification', message.type]"
    @mouseenter="keepNotification()"
    @mouseleave="resumeNotification()"
  >
    <div class="icon"></div>
    <div class="message">
      <div class="message-title">{{ message.title }}</div>
      <div class="message-content">{{ message.message }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.notification {
  display: flex;
  padding: 0em 10%;
  height: 80px;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  bottom: 0%;
  width: 100%;
  background-color: black;
  z-index: 9999999;
  bottom: -80px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.411);
  // transition: 0.1s ease;
  * {
    color: white;
  }

  .icon {
    height: 2.5em;
    width: 2.5em;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 1em;

    background-image: url("/src/shared/assets/icons/star.svg");
    filter: invert(100%);
  }
  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.521);
    //filter: hue-rotate(10deg);
    cursor: pointer;
  }
  &.error {
    background-color: rgb(255, 0, 64);

    .icon {
      background-image: url("/src/shared/assets/icons/cancel.svg");
    }
  }
  &.success {
    background-color: rgb(0, 231, 96);

    .icon {
      background-image: url("/src/shared/assets/icons/sports-trophy.svg");
    }
  }

  &.warning {
    background-color: orange;

    .icon {
      background-image: url("/src/shared/assets/icons/search.svg");
    }
  }

  &.information {
    background-color: rgb(0, 153, 255);

    .icon {
      background-image: url("/src/shared/assets/icons/download.svg");
    }
  }
  .message {
    .message-title {
      font-weight: 600;
      font-size: 1.5em;
    }
  }
}

@keyframes notificationAnimation {
  0% {
  }
}
</style>
