<template>
  <main class="page-width app">
    <h1 class="app__heading" data-test-id="app-heading">Еклезіаст</h1>
    <AppMainSearchForm @onSubmitHandler="onSubmitHandler" />
    <div class="cards-draft-bible">
      <AppCardDraftBible :bible-drafts="bibleDrafts" />
    </div>
  </main>
</template>

<script lang="ts">
  // Core
  import { defineComponent, ref } from "vue";
  // Api
  import api from "./api";
  // Components
  import { AppMainSearchForm, AppCardDraftBible } from "./components";
  // Types
  // eslint-disable-next-line no-unused-vars
  import { AxiosResponse } from "axios";

  type BibleDraftsType = {
    results: object[]
  }

  type AxiosBibleDraftsResponseType = AxiosResponse<BibleDraftsType>

  export default defineComponent({
    name: "App",

    components: {
      AppMainSearchForm,
      AppCardDraftBible
    },

    setup() {
      let bibleDrafts = ref<object[]>([]);
      const getBibleDrafts = async (searchValue: string): Promise<AxiosBibleDraftsResponseType> => {
        return await api.get<BibleDraftsType>("/search/results/U/bible", {
          params: {
            sort: "rel",
            q: searchValue
          }
        });
      };
      const onSubmitHandler = async (searchValue: string): Promise<void> => {
        const { data: { results } } = await getBibleDrafts(searchValue);
        bibleDrafts.value = results;
      };

      return {
        bibleDrafts,
        onSubmitHandler
      }
    }
  });
</script>

<style scoped lang="scss">
  .app {
    text-align: center;
    height: 100%;
  }

  .cards-draft-bible {
    padding: 0 10%;
  }
</style>
