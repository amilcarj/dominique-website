import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { YouTubeEmbed } from ".";

test("shows the thumbnail first and loads the privacy-enhanced player on click", () => {
  render(<YouTubeEmbed videoId="eSQdKDh3AVM" title="Acting reel" />);
  expect(
    screen.getByRole("img", { name: "Acting reel" }).getAttribute("src"),
  ).toContain("eSQdKDh3AVM");
  expect(document.querySelector("iframe")).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: "Play Acting reel" }));
  expect(screen.getByTitle("Acting reel").getAttribute("src")).toBe(
    "https://www.youtube-nocookie.com/embed/eSQdKDh3AVM?rel=0&autoplay=1",
  );
  expect(screen.queryByRole("button", { name: "Play Acting reel" })).toBeNull();
});

test("falls back to the smaller thumbnail if the large one fails", () => {
  render(<YouTubeEmbed videoId="lwAZrr6RU4E" title="Dance reel" />);
  fireEvent.error(screen.getByRole("img", { name: "Dance reel" }));
  expect(
    screen.getByRole("img", { name: "Dance reel" }).getAttribute("src"),
  ).toContain("hqdefault");
});

test("embeds the whole playlist when given one", () => {
  render(
    <YouTubeEmbed
      videoId="lwAZrr6RU4E"
      playlistId="PLdaTXRKrtJPu-0BNJNrHts3BH1r19dDhB"
      title="Dance reel"
      autoplay
    />,
  );
  expect(screen.getByTitle("Dance reel").getAttribute("src")).toBe(
    "https://www.youtube-nocookie.com/embed/videoseries?list=PLdaTXRKrtJPu-0BNJNrHts3BH1r19dDhB&rel=0&autoplay=1",
  );
});
