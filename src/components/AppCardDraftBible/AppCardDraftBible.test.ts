// Core
import { mount } from "@vue/test-utils";
// Components
import AppDraftCardBible from "./AppCardDraftBible.vue";

describe("AppDraftCardBible", () => {
  it("init AppDraftCardBible layout", async () => {
    const wrapper: any = mount(AppDraftCardBible);

    expect(await wrapper.findByTestId("divider").exists()).toBeTruthy();
  });
});
