<template>
  <select
    :id="`custom-select${id ? '-' + id : ''}`"
    :name="`custom-select${id ? '-' + id : ''}`"
    :multiple="multiple"
  >
    <option value="" :disabled="value">--Please choose an option--</option>
    <option
      v-for="item of items"
      :key="item.value"
      :value="item.value"
      :selected="value === item.value"
    >
      {{ item.name }}
    </option>
  </select>
</template>

<script lang="ts">
// Core
import { defineComponent, PropType, toRefs } from "vue";

export type Props = {
  data: {
    id?: string;
    items: { value: string; name: string }[];
    value?: string;
    multiple?: boolean;
  };
}

export default defineComponent({
  name: "CustomSelect",

  props: {
    data: {
      type: Object as PropType<Props["data"]>,
      required: true,
    }
  },

  setup(props) {
    const { id, items, value, multiple } = toRefs<Props["data"]>(props.data);
    return {
      id,
      items,
      value,
      multiple,
    }
  }
});
</script>

<style scoped lang="scss">

</style>
