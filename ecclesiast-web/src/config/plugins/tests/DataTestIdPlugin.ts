// Core
import { config, DOMWrapper, VueWrapper } from "@vue/test-utils";

export type DataTestIdPluginReturnObjectType = {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  findByTestId: (selector: string) => DOMWrapper<any> | Error;
}

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
const DataTestIdPlugin = (wrapper: VueWrapper<any>): DataTestIdPluginReturnObjectType => {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  function findByTestId(selector: string): any {
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
