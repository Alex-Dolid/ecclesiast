<template>
  <select
    :id="`custom-select${id ? '-' + id : ''}`"
    :name="`custom-select${id ? '-' + id : ''}`"
    :multiple="multiple"
    @change="handleChange"
  >
    <option value="" :disabled="value">--Please choose an option--</option>
    <option
      v-for="item of items"
      :key="item.value"
      :value="item.value"
      :selected="Array.isArray(value) ? value.includes(item.value) : value === item.value"
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
    value?: string | string[];
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

  setup(props, { emit }) {
    const { id, items, value, multiple } = toRefs<Props["data"]>(props.data);

    const handleChange = (e: any): void => {
      // TODO доробити
      let _value: undefined | string | string[] = multiple ? [] : undefined;
      if (value && Array.isArray(value)) {
        _value = [...value, e.target.value]
      } else if (multiple) {
        _value?.push(e.target.value);
      } else {
        _value = e.target.value;
      }
      emit("selectChange", _value );
    };

    return {
      id,
      items,
      value,
      multiple,
      handleChange,
    }
  }
});
</script>

<style scoped lang="scss">

</style>
