import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { aboutPhoto, reels, voDemos } from "@/constants/media";

import { About } from "./about";
import { Reels } from "./reels";

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

describe("Reels", () => {
  test("has the first reel, a choice of every reel, and every voice demo", () => {
    render(<Reels />);
    expect(screen.getByRole("region", { name: "Reels" }).id).toBe("reels");
    expect(
      screen.getByRole("button", { name: `Play ${reels[0].label} reel` }),
    ).toBeDefined();
    for (const reel of reels) {
      expect(screen.getByRole("button", { name: reel.label })).toBeDefined();
    }
    for (const voDemo of voDemos) {
      expect(
        screen.getByRole("button", { name: `Play ${voDemo.title}` }),
      ).toBeDefined();
    }
  });
});
