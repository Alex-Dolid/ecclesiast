<template>
  <section class="admin-panel-locales">
    <h3>Locales</h3>
    <Loading :is-loading="isLoading">
      <ul class="admin-panel-locales-list">
        <Card :data="locales" @save="handleSave" />
      </ul>
    </Loading>
  </section>
</template>

<script lang="ts">
// Core
import { defineComponent, computed, ref } from "vue";
// Store
import { useStore } from "@/store";
// Components
import { Card, CardProps, Loading } from "@/components";
// Types
import { LocalesState } from "@/app/Locales/types/state"
import { LocaleType } from "@/types";

export default defineComponent({
  name: "Locales",
  components: { Card, Loading },
  setup() {
    const store = useStore();
    const isLoading = ref(true);

    store.dispatch("locales/getAllAsync").finally(() => isLoading.value = false);

    const storeLocales = computed<LocalesState>(() => store.state.locales.locales)
    const locales = computed<CardProps["data"]>(() => storeLocales.value ?? []);

    const handleSave = (item: LocaleType): void => {
      isLoading.value = true;
      store.dispatch("locales/updateAsync", { id: item._id, payload: item })
        .finally(() => isLoading.value = false);
    }

    return {
      locales,
      handleSave,
      isLoading
    }
  }
});
</script>

<style scoped lang="scss">

.admin-panel-locales-list {
  text-align: initial;
}

</style>
