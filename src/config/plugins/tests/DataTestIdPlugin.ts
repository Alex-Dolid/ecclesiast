// Core
import { config, DOMWrapper, VueWrapper } from "@vue/test-utils";

export type DataTestIdPluginReturnObjectType = {
  findByTestId: (selector: string) => DOMWrapper<any> | Error
}

const DataTestIdPlugin = (wrapper: VueWrapper<any>): DataTestIdPluginReturnObjectType => {
  function findByTestId(selector: string) {
    const dataSelector = `[data-test-id='${selector}']`;
    const element = wrapper.element.querySelector(dataSelector);
    if (element) {
      return new DOMWrapper(element)
    }

    return new Error("Не знайдений елемент з таким селектором")
  }

  return {
    findByTestId
  }
};

config.plugins.VueWrapper.install(DataTestIdPlugin);
