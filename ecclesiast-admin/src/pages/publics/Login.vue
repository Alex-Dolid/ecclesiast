<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              Ecclesiast
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2 text-center">
            Welcome
          </p>
          <p class="text-2xl font-weight-semibold text--primary mb-2 text-center">
            Ecclesiast Admin Panel! 👋🏻
          </p>
          <p class="mb-2">
            Please sign-in to your account and start the adventure
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form
            ref="loginForm"
            @submit.prevent="handleLogin"
          >
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              placeholder="john@example.com"
              :error-messages="errorMessages.email"
              :rules="[validators.required, validators.emailValidator]"
              hide-details="auto"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              :error-messages="errorMessages.password"
              placeholder="············"
              :rules="[validators.required]"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details="auto"
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div
              v-if="isShowRegister"
              class="d-flex align-center justify-space-between flex-wrap mt-3"
            >
              <v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox>

              <!-- forgot link -->
              <a
                href="javascript:void(0)"
                class="mt-1"
              >
                Forgot Password?
              </a>
            </div>

            <v-btn
              block
              color="primary"
              type="submit"
              class="mt-6"
              :loading="isLoading"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text
          v-if="isShowRegister"
          class="d-flex align-center justify-center flex-wrap mt-2"
        >
          <span class="me-2">
            New on our platform?
          </span>
          <router-link :to="{name:'pages-register'}">
            Create an account
          </router-link>
        </v-card-text>

        <!-- divider -->
        <v-card-text v-if="isSocialLogin" class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text>

        <!-- social links -->
        <v-card-actions v-if="isSocialLogin" class="d-flex justify-center">
          <v-btn
            v-for="link in socialLinks"
            :key="link.icon"
            icon
            class="ms-1"
          >
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// Core
import { mapActions } from 'vuex';
import { ref, reactive } from '@vue/composition-api';
// Icons
import {
  mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline,
} from '@mdi/js';
// @Core Utils
import { useRouter } from '@core/utils';
import { required, emailValidator } from '@core/utils/validation';
// Theme Config
// import themeConfig from '@themeConfig';
// Constants
import { PAGES } from '@/router/constants';

export default {
  name: 'Login',

  setup() {
    const { router } = useRouter();

    // const vm = getCurrentInstance().proxy;
    // Template Ref
    const loginForm = ref(null);

    // Flags
    const isSocialLogin = ref(false);
    const isShowRegister = ref(false);
    const isPasswordVisible = ref(false);
    const isLoading = ref(false);

    // Properties
    const email = ref('');
    const password = ref('');
    const errorMessages = reactive({
      email: null,
      password: null,
    });
    const socialLinks = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ];
    const icons = {
      mdiEyeOutline,
      mdiEyeOffOutline,
    };

    async function handleLogin() {
      const isFormValid = loginForm.value.validate();

      if (!isFormValid) return;

      try {
        isLoading.value = true;
        await this.signInAsync({ email: email.value, password: password.value });
        await router.push({ name: PAGES.HOME.name });
      } catch (error) {
        Object.entries(error.response.data.errors).forEach(([key, valueObj]) => {
          errorMessages[key] = Object.values(valueObj).join(',');
        });
      } finally {
        isLoading.value = false;
      }
    }

    return {
      isSocialLogin,
      isPasswordVisible,
      isShowRegister,
      isLoading,

      email,
      password,
      errorMessages,
      socialLinks,
      icons,

      loginForm,

      validators: {
        required,
        emailValidator,
      },

      handleLogin,
    };
  },

  methods: {
    ...mapActions(['signInAsync', 'signOutAsync']),
  },

  created() {
    this.signOutAsync();
  },
};
</script>

<style lang="scss" scoped>
@import 'src/@core/preset/preset/pages/auth';
</style>
