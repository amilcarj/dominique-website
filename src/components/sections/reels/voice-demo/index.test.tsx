import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { VoiceDemo } from ".";

const demo = {
  src: "/audio/dominique-nieves-english-vo-demo.mp3",
  title: "English Voice Over Demo",
};

test("plays, pauses, and resets when the audio ends", () => {
  const play = vi.spyOn(HTMLMediaElement.prototype, "play");
  const pause = vi.spyOn(HTMLMediaElement.prototype, "pause");
  const { container } = render(<VoiceDemo demo={demo} />);
  const audio = container.querySelector("audio") as HTMLAudioElement;

  fireEvent.click(
    screen.getByRole("button", { name: "Play English Voice Over Demo" }),
  );
  expect(play).toHaveBeenCalled();
  fireEvent.play(audio);

  fireEvent.click(
    screen.getByRole("button", { name: "Pause English Voice Over Demo" }),
  );
  expect(pause).toHaveBeenCalled();
  fireEvent.ended(audio);
  expect(
    screen.getByRole("button", { name: "Play English Voice Over Demo" }),
  ).toBeDefined();
});

test("offers a download, and swaps it for an unavailable notice when the audio fails", () => {
  const { container } = render(<VoiceDemo demo={demo} />);
  const download = screen.getByRole("link", {
    name: "Download English Voice Over Demo",
  });
  expect(download.getAttribute("href")).toBe(demo.src);
  expect(download.hasAttribute("download")).toBe(true);

  fireEvent.error(container.querySelector("audio") as HTMLAudioElement);
  expect(
    screen
      .getByRole("button", { name: "Play English Voice Over Demo" })
      .matches(":disabled"),
  ).toBe(true);
  expect(screen.getByText("Unavailable")).toBeDefined();
  expect(
    screen.queryByRole("link", { name: "Download English Voice Over Demo" }),
  ).toBeNull();
});
