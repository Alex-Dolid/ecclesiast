<template>
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
</template>

<script lang="ts">
  // Core
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "AppCardDraftBible",

    props: {
      bibleDrafts: {
        type: Array as () => object[],
      }
    }

  });
</script>

<style scoped lang="scss">
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
