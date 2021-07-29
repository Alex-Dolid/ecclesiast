// Core
import { mount } from "@vue/test-utils";
// Components
import App from "./App.vue";

describe.skip("App", () => {
  it("init App layout", async () => {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    const wrapper: any = mount(App);

    expect(await wrapper.findByTestId("app-heading").element.innerHTML).toBe("Еклезіаст");
  });
});
