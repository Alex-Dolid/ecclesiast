// Core
import { mount } from "@vue/test-utils";
// Components
import AppMainSearchForm from "./AppMainSearchForm.vue";

describe("AppMainSearchForm", () => {
  it("init AppMainSearchForm layout", async () => {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    const wrapper: any = mount(AppMainSearchForm);

    expect(await wrapper.findByTestId("main-form-search-field").exists()).toBeTruthy();
    expect(await wrapper.findByTestId("main-form-search-btn").element.innerHTML).toContain("Пошук");
  });

  it("check for correctness of the entered data in input and emits an events", async () => {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    const wrapper: any = mount(AppMainSearchForm);
    const searchField = await wrapper.findByTestId("main-form-search-field");
    const value = "слово";

    expect(searchField.element.value).toBe("");

    await searchField.setValue(value);

    expect(searchField.element.value).toBe(value);

    await wrapper.findByTestId("main-form-search-btn").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("onSubmitHandler");
    expect(wrapper.emitted("onSubmitHandler")).toHaveLength(1);
    expect(wrapper.emitted("onSubmitHandler")[0]).toEqual([value]);
  });
});
