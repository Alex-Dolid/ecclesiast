<template>
  <v-snackbar
    v-model="isShow"
    :top="position.top"
    :centered="position.centered"
    :bottom="position.bottom"
    :right="position.right"
    :left="position.left"
    :outlined="variants.outlined"
    :rounded="variants.rounded"
    :shaped="variants.shaped"
    :tile="variants.tile"
    :text="variants.text"
    :light="$vuetify.theme.dark"
    :transition="transition"
    :color="color"
  >
    {{ message }}

    <template #action="{ attrs }">
      <v-btn
        :color="action.color || type"
        :icon="action.type === 'icon'"
        :text="action.text"
        v-bind="attrs"
        @click="isShow = false"
      >
        <v-icon v-if="action.type === 'icon'" size="30"> {{ icons.mdiClose }}</v-icon>
        <template v-else> {{ action.title }}</template>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
// Core
import { ref } from '@vue/composition-api';
// Icons
import { mdiClose } from '@mdi/js';
// Plugins
import { LISTENER_NAME } from '@/plugins';

export default {
  name: 'AppSnackbar',

  setup() {
    const isShow = ref(false);

    const timeout = ref(null);

    const message = ref('');
    const color = ref('');
    const position = ref({
      top: true,
      centered: true,
      bottom: false,
      right: false,
      left: false,
    });
    const action = ref({
      color: 'error',
      text: true,
      title: 'Close',
      type: 'icon',
    });
    const variants = ref({
      outlined: true,
      shaped: false,
      rounded: 'pill',
      text: false,
      tile: false,
    });
    const transition = ref('scale-transition');

    return {
      isShow,

      timeout,
      message,
      position,
      color,
      action,
      variants,
      transition,

      icons: {
        mdiClose,
      },
    };
  },

  created() {
    this.$vueSnackbar.$on(LISTENER_NAME, ({ type, message }) => {
      this.isShow = false;
      this.color = type;
      this.message = message;
      this.isShow = true;

      // if (this.timeout) {
      //   clearTimeout(this.timeout);
      //   this.timeout = null;
      // }

      // this.timeout = setTimeout(() => {
      //   this.isShow = false;
      //   clearTimeout(this.timeout);
      //   this.timeout = null;
      // }, 60000);
    });
  },
};
</script>

<style scoped>

</style>
