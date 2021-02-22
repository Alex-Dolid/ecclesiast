// Core
import { mount, VueWrapper } from "@vue/test-utils";
// Components
import App from "./App.vue";

describe("App", () => {
  it("init App layout", async () => {
    const wrapper: any = mount(App);

    expect(await wrapper.findByTestId("app-heading").element.innerHTML).toBe("Еклезіаст");
  });
});
