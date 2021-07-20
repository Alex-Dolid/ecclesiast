<template>
  <main class="page-width home">
    <Header />
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
import api from "@/api";
// Components
import { AppMainSearchForm, AppVerseBibleCard, Header } from "@/components";
// Types
import { AxiosResponse } from "axios";
import { BibleVersesType } from "@/types";

type AxiosBibleDraftsResponseType = AxiosResponse<BibleVersesType>

export default defineComponent({
  name: "Home",

  components: {
    Header,
    AppMainSearchForm,
    AppVerseBibleCard
  },

  setup() {
    let bibleVerses = ref<BibleVersesType>([]);
    const getBibleDrafts = async (searchValue: string): Promise<AxiosBibleDraftsResponseType> => {
      return await api.get<BibleVersesType>("/bibles-verses", {
        params: {
          bibleId: "60f5b326013ae001c46c3623",
          locale: "60f59f58e5d1b0002957a2be",
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
.home {
  text-align: center;
  height: 100%;
}
</style>
