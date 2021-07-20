<template>
  <header class="header">
    <h1 class="header__head">Еклезіаст</h1>
    <button class="header__button">Вхід</button>
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
    }
  }
</style>
