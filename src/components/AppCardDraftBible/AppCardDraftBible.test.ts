// Core
import { mount } from "@vue/test-utils";
// Components
import AppDraftCardBible from "./AppCardDraftBible.vue";

describe("AppDraftCardBible", () => {
  it("init AppDraftCardBible layout", () => {
    const wrapper = mount(AppDraftCardBible);

    expect(wrapper.find<HTMLDivElement>(".divider").element).toBeTruthy();
  });
});
