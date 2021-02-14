<template>
  <main class="page-width app">
    <h1>Еклезіаст</h1>
    <form class="main-form" @submit.prevent="submit">
      <div class="main-form__search-field">
        <label for="search-field" class="main-form__search-field-label"/>
        <input
          id="search-field"
          class="main-form__search-field-input"
          type="search"
          placeholder="Ведіть значення..."
          v-model="searchValue"
        />
      </div>
      <button class="main-form__search-btn" type="submit">Пошук</button>
    </form>
    <div class="cards-draft-bible">
      <div class="divider"/>
      <div class="card-draft-bible" v-for="draft of bibleDrafts" :key="draft.lank">
        <h4 class="card-draft-bible__title">
          <a
            :href="draft.links['jw.org']"
            class="card-draft-bible__title-link"
            v-html="draft.title"
          />
        </h4>
        <p
          class="card-draft-bible__text"
          v-html="draft.snippet"
        />
      </div>
    </div>

  </main>
</template>

<script lang="ts">
  // Core
  import { defineComponent, ref } from "vue";
  // Api
  import api from "@/api";

  export default defineComponent({
    name: "App",

    setup() {
      const searchValue = ref("");
      let bibleDrafts = ref([]);
      const getBibleDrafts = async () => await api.get<any>("/search/results/U/bible", {
        params: {
          sort: "rel",
          q: searchValue.value
        }
      });
      const submit = async () => {
        const { data: { results } } = await getBibleDrafts();
        bibleDrafts.value = results;
      };

      return {
        searchValue,
        bibleDrafts,
        submit
      }
    }
  });
</script>

<style scoped lang="scss">
  .app {
    text-align: center;
    height: 100%;
  }

  .main-form {
    display: flex;
    justify-content: center;

    &__search-field {
      width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__search-field-input {
      padding: 5px 7px;
    }

    &__search-btn {
      margin-left: 10px;
      width: 100px;
      padding: 5px 0;
    }
  }

  .cards-draft-bible {
    padding: 0 10%;
  }

  .card-draft-bible {
    text-align: start;

    &__title {
      margin-bottom: 0;
    }

    &__title-link {
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
