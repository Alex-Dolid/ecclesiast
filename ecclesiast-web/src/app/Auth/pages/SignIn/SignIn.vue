<template>
  <main class="page-width sign-in">
    <h1>SignIn</h1>
    <div class="sign-in-form">
      <input type="email" class="sign-in-form__input" placeholder="Email" v-model.trim="email">
      <input type="password" class="sign-in-form__input" placeholder="Password" v-model.trim="password">
      <button class="sign-in-form__button" @click="onSubmit" :disabled="loading">Sign In</button>
    </div>
  </main>
</template>

<script lang="ts">
// Core
import { defineComponent, reactive, toRefs } from "vue";
// Libs
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// Store
import { key } from "@/store";
// Types
import { UserAuth } from "../../types";

export default defineComponent({
  name: "SignIn",

  setup() {
    const store = useStore(key);
    const router = useRouter();

    // state
    const form = reactive({
      email: "",
      password: "",
      loading: false,
    });
    const { email, password, loading } = toRefs(form);

    // callbacks
    const onSubmit = async () => {
      const payload = {
        email: email.value,
        password: password.value
      };

      if (payload.email && payload.password) {
        try {
          loading.value = true;
          await store.dispatch("auth/authAsync", payload as UserAuth);
          await router.push("/admin");
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false;
        }
      }
    }

    return {
      email,
      password,
      loading,
      onSubmit
    }
  }
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
