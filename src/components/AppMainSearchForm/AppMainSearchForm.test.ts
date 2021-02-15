// Core
import { mount } from "@vue/test-utils";
// Components
import AppMainSearchForm from "./AppMainSearchForm.vue";
import { ref } from "vue";

describe("AppMainSearchForm", () => {
  it("init AppMainSearchForm layout", () => {
    const wrapper = mount(AppMainSearchForm);

    expect(wrapper.find<HTMLDivElement>("form.main-form").element).toBeTruthy();
    expect(wrapper.find<HTMLDivElement>(".main-form__search-btn").element.innerHTML).toBe("Пошук");
  });

  it("check for correctness of the entered data in input and change of reactive searchValue", (done) => {
    const wrapper = mount(AppMainSearchForm);
    const searchField = wrapper.find<HTMLInputElement>("#search-field");

    expect(searchField.element.value).toBe("");
    searchField.setValue("слово");
    expect(searchField.element.value).toBe("слово");

    setTimeout(() => {
      wrapper.find(".main-form__search-btn").trigger("click");
      done();
    }, 500);
  });
});
