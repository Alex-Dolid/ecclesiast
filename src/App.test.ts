// Core
import { mount } from "@vue/test-utils";
// Components
import App from "./App.vue";

describe("App", () => {
  it("init App layout", () => {
    const wrapper = mount(App);

    expect(wrapper.find<HTMLDivElement>(".app__heading").element.innerHTML).toBe("Еклезіаст");
  });
});
