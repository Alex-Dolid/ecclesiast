<template>
  <section class="admin-panel-locales">
    <h3>Locales</h3>
    <ul class="admin-panel-locales-list">
      <Card :data="locales" />
    </ul>
  </section>
</template>

<script lang="ts">
// Core
import { defineComponent, computed } from "vue";
// Store
import { useStore } from "@/store";
// Components
import { Card, CardProps } from "@/components";
// Types
import { LocalesState } from "@/app/Locales/types/state"

export default defineComponent({
  name: "Locales",
  components: { Card },
  setup() {
    const store = useStore();

    store.dispatch("locales/getAllAsync");

    const storeLocales = computed<LocalesState>(() => store.state.locales.locales)
    const locales = computed<CardProps["data"]>(() => storeLocales.value ?? []);

    return {
      locales
    }
  }
});
</script>

<style scoped lang="scss">

.admin-panel-locales-list {
  text-align: initial;
}

</style>
