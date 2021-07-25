<template>
  <main class="page-width sign-in">
    <h1>SignIn</h1>
    <div class="sign-in-form">
      <input type="email" class="sign-in-form__input" placeholder="Email">
      <input type="password" class="sign-in-form__input" placeholder="Password">
      <button class="sign-in-form__button">Sign In</button>
    </div>
  </main>
</template>

<script lang="ts">
// Core
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignIn"
})
</script>

<style scoped lang="scss">
.sign-in {
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  align-content: center;
  justify-content: center;
}
.sign-in-form {
  width: 50%;
  padding: 25px;
  display: flex;
  flex-direction: column;

  &__input {
    margin-bottom: 25px;
    padding: 5px 15px;
  }

  &__button {
    padding: 5px;
    cursor: pointer;
  }
}
</style>
