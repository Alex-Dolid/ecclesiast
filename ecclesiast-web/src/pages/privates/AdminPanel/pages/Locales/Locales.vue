<template>
  <section class="admin-panel-locales">
    <h3>Locales</h3>
    <ul class="admin-panel-locales-list">
      <li
        v-for="locale of locales"
        :key="locale._id"
        class="li admin-panel-locales-list__item card"
      >
        <span class="card__list-item card__list-item_id">
          <span class="card__list-item-prop-name card__list-item-prop-name_id">id:</span> {{ locale._id }}
        </span>
        <ul class="card__props">
          <li class="li">
            <span class="card__list-item">
              <span class="card__list-item-prop-name">name:</span> {{ locale.name }}
            </span>
          </li>
          <li class="li">code2: {{ locale.code2 }}</li>
          <li class="li">code3: {{ locale.code3 }}</li>
        </ul>
        <div class="card__buttons">
          <button class="card__button">Edit</button>
          <button class="card__button">X</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
// Core
import { defineComponent, onMounted, computed } from "vue";
// Store
import { useStore } from "@/store";

export default defineComponent({
  name: "Locales",

  setup() {
    const store = useStore();

    const fetchLocales = async () => {
      await store.dispatch("locales/getAllAsync");
    }

    onMounted(fetchLocales)

    const locales = computed(() => store.state.locales.locales)

    return {
      locales
    }
  }
});
</script>

<style scoped lang="scss">
@import "src/styles/style-guide/variables";

.admin-panel-locales {
  height: 100%;
}

.li {
  display: block;
}

.admin-panel-locales-list {
  text-align: initial;
}

.card {
  position: relative;
  padding: 15px;
  border: 1px solid $black;
  border-radius: 10px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  &__props {
    margin-top: 3px;
  }

  &__list-item {
    &_id {
      font-size: 14px;
    }
  }

  &__list-item-prop-name {
    color: $green;

    &_id {
      color: $black;
      opacity: 0.5;
    }
  }

  &__buttons {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  &__button {
    color: $extra-white;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    margin-right: 5px;

    &:hover {
      opacity: 0.8;
    }

    &:first-child {
      background: $orange;
    }

    &:last-child {
      margin-right: 0;
      background: $red;
    }
  }
}
</style>
