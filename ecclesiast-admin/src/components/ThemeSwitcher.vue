<template>
  <v-fade-transition mode="out-in">
    <v-icon
      :key="$vuetify.theme.dark"
      @click="$vuetify.theme.dark = !$vuetify.theme.dark"
    >
      {{ $vuetify.theme.dark ? icons.mdiWeatherSunny : icons.mdiWeatherNight }}
    </v-icon>
  </v-fade-transition>
</template>

<script>
// Icons
import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';

export default {
  data: () => ({
    icons: {
      mdiWeatherNight,
      mdiWeatherSunny,
    },
  }),
};
</script>

<style>
</style>
