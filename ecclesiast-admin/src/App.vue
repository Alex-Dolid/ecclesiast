<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
// Layouts
import { LayoutBlank, LayoutDefault } from '@/layouts';

export default {
  name: 'App',

  components: {
    LayoutBlank,
    LayoutDefault,
  },

  data: () => ({
    //
  }),

  computed: {
    resolveLayout() {
      // Handles initial route
      if (this.$route.name === null) return null;

      if (this.$route.meta.layout === 'blank') return 'LayoutBlank';

      return 'LayoutDefault';
    },
  },
};
</script>
