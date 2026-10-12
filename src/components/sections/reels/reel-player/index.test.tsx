import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { reels } from "@/constants/media";

import { ReelPlayer } from ".";

test("starts on the first reel without loading the player", () => {
  render(<ReelPlayer reels={reels} />);
  expect(
    screen.getByRole("button", { name: "Acting" }).getAttribute("aria-pressed"),
  ).toBe("true");
  expect(
    screen.getByRole("button", { name: "Play Acting reel" }),
  ).toBeDefined();
  expect(document.querySelector("iframe")).toBeNull();
});

test("choosing a reel switches to it and starts playing", () => {
  render(<ReelPlayer reels={reels} />);
  fireEvent.click(screen.getByRole("button", { name: "Dance" }));
  expect(
    screen.getByRole("button", { name: "Dance" }).getAttribute("aria-pressed"),
  ).toBe("true");
  expect(
    screen.getByRole("button", { name: "Acting" }).getAttribute("aria-pressed"),
  ).toBe("false");
  expect(screen.getByTitle("Dance reel").getAttribute("src")).toContain(
    "videoseries?list=PLdaTXRKrtJPu-0BNJNrHts3BH1r19dDhB",
  );

  fireEvent.click(screen.getByRole("button", { name: "Acting" }));
  expect(screen.getByTitle("Acting reel").getAttribute("src")).toContain(
    "embed/eSQdKDh3AVM",
  );
});
