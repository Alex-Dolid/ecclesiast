<template>
  <layout-blank-core>
    <slot></slot>
  </layout-blank-core>
</template>

<script>
// @Core
import LayoutBlankCore from '@/@core/layouts/variants/blank/LayoutBlank';

export default {
  name: 'LayoutBlank',

  components: {
    LayoutBlankCore,
  },
};
</script>

<style>
</style>
