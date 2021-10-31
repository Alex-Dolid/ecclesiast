<template>
  <component
    :is="resolveLayoutVariant"
    :class="`skin-variant--${appSkinVariant}`"
  >
    <transition
      :name="appRouteTransition"
      mode="out-in"
      appear
    >
      <router-view></router-view>
    </transition>
    <app-snackbar />
  </component>
</template>

<script>
// Core
import { computed } from '@vue/composition-api';
// @Core @AppConfig
import useAppConfig from '@core/@app-config/useAppConfig';
// @Core Utils
import { useRouter } from '@core/utils';
import useDynamicVh from '@core/utils/useDynamicVh';
import { useLayout } from '@core/layouts/composable/useLayout';
// Layouts
import LayoutContentVerticalNav from '@/layouts/variants/content/vertical-nav/LayoutContentVerticalNav';
import LayoutContentHorizontalNav from '@/layouts/variants/content/horizontal-nav/LayoutContentHorizontalNav';
import LayoutBlank from '@/layouts/variants/blank/LayoutBlank';
// Components
import { AppSnackbar } from '@/components';

export default {
  name: 'App',

  components: {
    LayoutContentVerticalNav,
    LayoutContentHorizontalNav,
    LayoutBlank,
    AppSnackbar,
  },

  setup() {
    const { route } = useRouter();
    const { appContentLayoutNav, appSkinVariant, appRouteTransition } = useAppConfig();

    const { handleBreakpointLayoutSwitch } = useLayout();
    handleBreakpointLayoutSwitch();

    const resolveLayoutVariant = computed(() => {
      if (route.value.meta.layout === 'blank') return 'LayoutBlank';
      if (route.value.meta.layout === 'content') return `layout-content-${appContentLayoutNav.value}-nav`;

      return null;
    });

    useDynamicVh();

    return {
      resolveLayoutVariant,
      appSkinVariant,
      appRouteTransition,
    };
  },
};
</script>
