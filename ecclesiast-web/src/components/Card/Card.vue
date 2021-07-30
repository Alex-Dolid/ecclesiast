<template>
  <li
    v-for="item of state.preparedData"
    :key="item._id"
    class="li card"
  >
    <span class="card__list-item card__list-item_id">
      <span class="card__list-item-prop-name card__list-item-prop-name_id">id:</span> {{ item._id }}
    </span>
    <ul class="card__props">
      <li class="li" v-for="propName of item.propsNames" :key="propName">
        <span class="card__list-item">
          <template v-if="!item.isEdit">
            <span class="card__list-item-prop-name">{{ propName }}:</span> {{ item[propName] }}
          </template>
          <template v-else>
            <span class="card__list-item-prop-name">{{ propName }}:</span> <input type="text" v-model="item[propName]">
          </template>
        </span>
      </li>
    </ul>
    <div class="card__buttons">
      <template v-if="!item.isEdit">
        <button class="card__button" @click="onEdit(item._id)">Edit</button>
        <button class="card__button" @click="handleDelete(item._id)">X</button>
      </template>
      <template v-else>
        <button class="card__button card__button_cancel" @click="onCancel(item._id)">Cancel</button>
        <button class="card__button card__button_save" @click="handleSave(item._id)">Save</button>
      </template>
    </div>
  </li>
</template>

<script lang="ts">
// Core
import { defineComponent, PropType, reactive, watchEffect } from "vue";
// Types
import { MongooseDoc } from "@/types";

type DataItem = MongooseDoc & {
  _id: string;
  [key: string]: string | number | string[] | object | undefined | boolean;
}
export type Props = {
  data: DataItem[];
}
type NewItem = DataItem & {
  propsNames?: string[];
  isEdit?: boolean;
};
type State = {
  preparedData: NewItem[];
}

export default defineComponent({
  name: "Card",

  props: {
    data: {
      type: Array as PropType<Props["data"]>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const prepareData = (data: DataItem[]): NewItem[] => [...data].map((item) => {
      const newItem: NewItem = { ...item };
      const excludePropsNames = ["_id", "created", "modified", "__v"];
      newItem.propsNames = Object.keys(item).filter(key => key !== "_id" && !excludePropsNames.includes(key));
      newItem.isEdit = false;
      return newItem;
    })
    const state = reactive<State>({
      preparedData: []
    });

    watchEffect(() => state.preparedData = prepareData(props.data))

    const findItemById = (id: string): NewItem | void => state.preparedData.find(_item => _item._id === id);
    const onEdit = (id: string): void => {
      const item = findItemById(id);
      if (item) {
        item.isEdit = !item.isEdit;
      }
    };
    const handleDelete = (id: string): void => emit("delete", id);
    const onCancel = (id: string): void => {
      onEdit(id);
      state.preparedData = prepareData(props.data);
    };
    const handleSave = (id: string): void => {
      const item = findItemById(id);
      if (item) {
        const newItem = { ...item };
        delete newItem.isEdit;
        delete newItem.propsNames;
        emit("save", newItem);
      }
      onCancel(id);
    };

    return {
      state,
      onEdit,
      handleDelete,
      handleSave,
      onCancel,
    }
  },
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

    &_cancel {
      background: $black !important;
    }

    &_save {
      background: $green !important;
    }
  }
}
</style>
