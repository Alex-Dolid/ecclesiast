// Core
import { mount } from "@vue/test-utils";
// Components
import AppDraftCardBible from "./AppVerseBibleCard.vue";

describe("AppVerseBibleCard", () => {
  it("init AppVerseBibleCard layout", async () => {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    const wrapper: any = mount(AppDraftCardBible);

    expect(await wrapper.exists()).toBeTruthy();
  });
});
