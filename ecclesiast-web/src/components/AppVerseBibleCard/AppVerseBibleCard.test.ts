// Core
import { mount } from "@vue/test-utils";
// Components
import AppDraftCardBible from "./AppVerseBibleCard.vue";

describe("AppVerseBibleCard", () => {
  it("init AppVerseBibleCard layout", async () => {
    const wrapper: any = mount(AppDraftCardBible);

    expect(await wrapper.exists()).toBeTruthy();
  });
});
