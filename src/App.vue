<template>
  <main class="page-width app">
    <h1>Еклезіаст</h1>
    <form class="main-form" @submit.prevent="submit">
      <div class="main-form__search-field">
        <label for="search-field" class="main-form__search-field-label" />
        <input
          id="search-field"
          class="main-form__search-field-input"
          type="search"
          placeholder="Ведіть значення..."
          v-model="searchValue"
        />
      </div>
      <button class="main-form__search-btn" type="submit">Пошук</button>
    </form>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",

  setup () {
    const searchValue = ref("");
    const submit = () => console.log(searchValue.value);

    return {
      searchValue,
      submit
    }
  }
});
</script>

<style scoped lang="scss">
  .app {
    text-align: center;
    height: 100%;
  }

  .main-form {
    display: flex;
    justify-content: center;

    &__search-field {
      width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__search-field-input {
      padding: 5px 7px;
    }

    &__search-btn {
      margin-left: 10px;
      width: 100px;
      padding: 5px 0;
    }
  }
</style>
