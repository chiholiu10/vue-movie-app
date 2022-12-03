import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SearchInput from "../components/SearchInput.vue";

describe("S", async () => {
  it("Test SearchInput props", () => {
    let wrapper = mount(SearchInput, {
      props: {
        searchTitle: "SearchInput",
      },
    });
    console.log("chiho" + wrapper);
    expect(wrapper.text()).toBe("SearchInput");
  });
});
