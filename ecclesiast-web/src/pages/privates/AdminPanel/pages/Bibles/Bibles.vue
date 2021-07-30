<template>
  <section class="admin-panel-bibles">
    <h3>Bibles</h3>
    <Loading :is-loading="isLoading">
      <ul class="admin-panel-bibles-list">
        <Card :data="bibles" @save="handleSave" />
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
import { BiblesState } from "@/app/Bibles/types/state"
import { BibleType } from "@/types";

export default defineComponent({
  name: "Bibles",
  components: { Card, Loading },
  setup() {
    const store = useStore();
    const isLoading = ref(true);

    store.dispatch("bibles/getAllAsync").finally(() => isLoading.value = false);

    const storeBibles = computed<BiblesState>(() => store.state.bibles.bibles)
    const bibles = computed<CardProps["data"]>(() => storeBibles.value ?? []);

    const handleSave = (item: BibleType): void => {
      isLoading.value = true;
      store.dispatch("bibles/updateAsync", { id: item._id, payload: item })
        .finally(() => isLoading.value = false);
    }

    return {
      bibles,
      handleSave,
      isLoading
    }
  }
});
</script>

<style scoped lang="scss">
.admin-panel-bibles-list {
  text-align: initial;
}
</style>
