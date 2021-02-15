<template>
  <form class="main-form" @submit.prevent="handleSubmit">
    <div class="main-form__search-field">
      <label for="search-field" class="main-form__search-field-label"/>
      <input
        id="search-field"
        class="main-form__search-field-input"
        type="search"
        placeholder="Ведіть значення..."
        v-model="searchValue"
      />
    </div>
    <button class="main-form__search-btn">Пошук</button>
  </form>
</template>

<script lang="ts">
  // Core
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "AppMainSearchForm",

    setup(props, { emit }) {
      const searchValue = ref<string>("");
      const handleSubmit = (): void => emit("submitHandler", searchValue.value);

      return {
        searchValue,
        handleSubmit
      }
    }
  });
</script>

<style scoped lang="scss">
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
