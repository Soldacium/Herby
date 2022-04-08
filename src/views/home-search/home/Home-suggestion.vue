<script lang="ts" setup></script>
<template>
  <div class="wrapper">
    <div class="text">
      <div class="title">This site is community-driven</div>
      <div class="description">
        Bugs, issues, UX suggestions? Feel free to submit them here!
      </div>
      <form action="" method="post">
        <input type="text" placeholder="Your mail" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Message"
        ></textarea>
        <button>Send</button>
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 70vw;
  margin-top: 10em;
  margin-bottom: 8em;
}

.text {
  .title {
    font-size: 2em;
    font-weight: 600;
  }

  .description {
    margin-bottom: 1em;
  }
}

form {
  display: flex;
  flex-direction: column;

  input {
    padding: 0.5em 1em;
    border: 1px solid rgb(214, 214, 214);
    border-radius: 10px;
    font-size: 1.3em;
  }

  textarea {
    resize: vertical;
    margin-top: 1em;
    padding: 0.5em 1em;
    font-size: 1.3em;
    border: 1px solid rgb(214, 214, 214);
    border-radius: 10px;
    min-width: 40vw;
  }

  button {
    margin-top: 1em;
    padding: 0.5em 1em;
    border: 2px solid rgb(0, 0, 0);
    background-color: transparent;
    font-size: 1.3em;
    font-weight: 600;
    border-radius: 10px;
  }
}
</style>
