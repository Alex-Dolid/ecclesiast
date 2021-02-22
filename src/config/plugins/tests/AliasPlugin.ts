// Core
import { config, VueWrapper } from "@vue/test-utils";
import { VueElement } from "@vue/test-utils/dist/types";

export type AliasPluginReturnObjectType = {
  $el: VueElement
}

const AliasPlugin = (wrapper: VueWrapper<any>): AliasPluginReturnObjectType => {
  return {
    $el: wrapper.element
  };
};

config.plugins.VueWrapper.install(AliasPlugin);
