<template>
  <section class="admin-panel-bibles">
    <h3>Bibles</h3>
    <Loading :is-loading="isLoading">
      <ul class="admin-panel-bibles-list">
        <Card :data="bibles" @save="handleSave" @delete="handleDelete" />
      </ul>
    </Loading>
  </section>
</template>

<script lang="ts">
// Core
import { defineComponent, computed, watchEffect, reactive, toRefs } from "vue";
// Store
import { useStore } from "@/store";
// Components
import { Card, CardProps, Loading } from "@/components";
// Types
import { BiblesState } from "@/app/Bibles"
import { LocalesState } from "@/app/Locales"
import { BibleType } from "@/types";

type State = {
  bibles: CardProps["data"];
  isLoading: boolean;
}

export default defineComponent({
  name: "Bibles",
  components: { Card, Loading },

  setup() {
    const store = useStore();
    const { bibles, isLoading } = toRefs<State>(
      reactive<State>({
        bibles: [],
        isLoading: true,
      })
    );

    store.dispatch("bibles/getAllAsync")
      .then(() => store.dispatch("locales/getAllAsync"))
      .finally(() => isLoading.value = false);

    const storeBibles = computed<BiblesState>(() => store.state.bibles.bibles);
    const storeLocales = computed<LocalesState>(() => store.state.locales.locales);

    watchEffect(() => {
      const locales = storeLocales.value?.map(item => ({ value: item._id, name: item.name }));
      if (locales && storeBibles.value) {
        bibles.value = [...storeBibles.value].map(item => {
          return {
            ...item,
            config: {
              locale: {
                component: "Select",
                data: {
                  id: `locales-${item._id}`,
                  items: [...locales],
                  value: item.locale._id,
                  multiple: false,
                }
              },
            },
          };
        });
      }
    });


    const handleSave = (item: BibleType): void => {
      isLoading.value = true;
      store.dispatch("bibles/updateAsync", { id: item._id, payload: item })
        .finally(() => isLoading.value = false);
    };
    const handleDelete = (id: string): Promise<void> => store.dispatch("bibles/deleteAsync", { id });

    return {
      bibles,
      isLoading,
      handleSave,
      handleDelete
    }
  }
});
</script>

<style scoped lang="scss">
.admin-panel-bibles-list {
  text-align: initial;
}
</style>
