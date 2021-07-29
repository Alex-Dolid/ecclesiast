<template>
  <template v-if="isLoading">...Loading</template>
  <template v-else><slot></slot></template>
</template>

<script lang="ts">
// Core
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading",
  props: {
    isLoading: Boolean,
  }
})
</script>

<style scoped>

</style>
