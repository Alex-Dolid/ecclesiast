<template>
  <div class="app-verse-bible-card">
    <h4 class="app-verse-bible-card__title">
      <a
        v-if="link"
        :href="link"
        class="app-verse-bible-card__title-link"
        v-text="title"
      />
      <span
        v-else
        v-text="title"
      />
    </h4>
    <p
      class="app-verse-bible-card__text"
      v-text="text"
    />
  </div>
</template>

<script lang="ts">
  // Core
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "AppVerseBibleCard",

    props: {
      link: { type: String },
      title: { type: String, required: true },
      text: { type: String, required: true }
    }

  });
</script>

<style scoped lang="scss">
  .app-verse-bible-card {
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
