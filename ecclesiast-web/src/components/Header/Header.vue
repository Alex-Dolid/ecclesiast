<template>
  <header class="header">
    <h1 class="header__head">Еклезіаст</h1>
    <router-link class="header__button" to="/sign-in">Вхід</router-link>
  </header>
</template>

<script lang="ts">
// Core
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header"
})
</script>

<style scoped lang="scss">
@import "src/styles/style-guide/variables";

  .header {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;

    &__head {
      width: 100%;
      text-align: center;
    }

    &__button {
      margin-left: auto;
      color: $green;
      font-size: 18px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
