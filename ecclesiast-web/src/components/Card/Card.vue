<template>
  <li
    v-for="item of preparedData"
    :key="item._id"
    class="li card"
  >
    <span class="card__list-item card__list-item_id">
      <span class="card__list-item-prop-name card__list-item-prop-name_id">id:</span> {{ item._id }}
    </span>
    <ul class="card__props">
      <li class="li" v-for="propName of item.propsNames" :key="propName">
        <span class="card__list-item">
          <span class="card__list-item-prop-name">{{ propName }}:</span> {{ item[propName] }}
        </span>
      </li>
    </ul>
    <div class="card__buttons">
      <button class="card__button">Edit</button>
      <button class="card__button">X</button>
    </div>
  </li>
</template>

<script lang="ts">
// Core
import { computed, defineComponent, PropType } from "vue";

export type Props = {
  data: Array<{ _id: string; [key: string]: string | number }>;
}

export default defineComponent({
  name: "Card",

  props: {
    data: {
      type: Array as PropType<Props["data"]>,
      required: true,
    },
  },

  setup(props) {
    const preparedData = computed(() => [...props.data].map((item) => {
      const newItem: { [key: string]: string | number | string[] } = { ...item };
      newItem.propsNames = Object.keys(item).filter(key => key !== "_id");
      return newItem;
    }))

    return {
      preparedData
    }
  }
});
</script>

<style scoped lang="scss">
@import "src/styles/style-guide/variables";

.li {
  display: block;
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
