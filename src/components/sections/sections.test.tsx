import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { aboutPhoto } from "@/constants/media";

import { About } from "./about";

describe("About", () => {
  test("has the photo, four bio paragraphs and bold name and credits", () => {
    const { container } = render(<About />);
    expect(screen.getByRole("region", { name: "About" }).id).toBe("about");
    expect(screen.getByRole("img", { name: aboutPhoto.alt })).toBeDefined();
    expect(container.querySelectorAll("p")).toHaveLength(4);
    for (const text of [
      "Dominique Nieves",
      "ABC The Rookie: Feds",
      "CBS FBI: Most Wanted",
    ]) {
      expect(screen.getByText(text).tagName).toBe("STRONG");
    }
  });
});
