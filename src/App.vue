<template>
  <main class="page-width app">
    <h1 class="app__heading" data-test-id="app-heading">Еклезіаст</h1>
    <AppMainSearchForm @onSubmitHandler="onSubmitHandler" />
    <div class="cards-draft-bible">
      <div data-test-id="divider" class="divider"/>
      <AppVerseBibleCard
        v-for="verse of bibleVerses"
        :key="verse._id"
        :title="`${verse.book.name} ${verse.chapter.name}:${verse.name}`"
        :text="verse.text"
      />
    </div>
  </main>
</template>

<script lang="ts">
  // Core
  import { defineComponent, ref } from "vue";
  // Api
  import api from "./api";
  // Components
  import { AppMainSearchForm, AppVerseBibleCard } from "./components";
  // Types
  import { AxiosResponse } from "axios";
  import { BibleVersesType } from "./types";

  type AxiosBibleDraftsResponseType = AxiosResponse<BibleVersesType>

  export default defineComponent({
    name: "App",

    components: {
      AppMainSearchForm,
      AppVerseBibleCard
    },

    setup() {
      let bibleVerses = ref<BibleVersesType>([]);
      const getBibleDrafts = async (searchValue: string): Promise<AxiosBibleDraftsResponseType> => {
        return await api.get<BibleVersesType>("/bibles-verses", {
          params: {
            bibleId: "603bc7b5af76ed5056ef2072",
            locale: "603b8eb78a66503fa663f124",
            isTranslate: false,
            text: searchValue
          }
        });
      };
      const onSubmitHandler = async (searchValue: string): Promise<void> => {
        const { data } = await getBibleDrafts(searchValue);
        bibleVerses.value = data;
      };

      return {
        bibleVerses,
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
