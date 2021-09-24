<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
// Layouts
import { LayoutBlank, LayoutContent } from '@/layouts';

export default {
  name: 'App',

  components: {
    LayoutBlank,
    LayoutContent,
  },

  data: () => ({
    //
  }),

  computed: {
    resolveLayout() {
      // Handles initial route
      if (this.$route.name === null) return null;

      if (this.$route.meta.layout === 'blank') return 'layout-blank';

      return 'layout-content';
    },
  },
};
</script>
