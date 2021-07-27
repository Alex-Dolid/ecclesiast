<template>
  <section class="admin-panel-locales">
    <h3>Locales</h3>
  </section>
</template>

<script>
// Core
import { defineComponent } from "vue";
// Store
import { useStore } from "@/store";

export default defineComponent({
  name: "Locales",

  setup() {
    const store = useStore();
    store.dispatch("locales/getAllAsync");
  }
});
</script>

<style scoped lang="scss">
.admin-panel-locales {
  height: 100%;
}
</style>
