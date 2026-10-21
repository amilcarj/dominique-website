import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import {
  aboutPhoto,
  portfolio,
  reels,
  stills,
  voDemos,
} from "@/constants/media";
import { site } from "@/constants/site";

import { About } from "./about";
import { Gallery } from "./gallery";
import { Reels } from "./reels";
import { Resume } from "./resume";

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

describe("Gallery", () => {
  test("has portfolio and stills under their own headings", () => {
    render(<Gallery />);
    expect(screen.getByRole("region", { name: "Gallery" }).id).toBe("gallery");
    expect(
      within(screen.getByRole("list", { name: "Portfolio" })).getAllByRole(
        "button",
      ),
    ).toHaveLength(portfolio.length);
    expect(
      within(screen.getByRole("list", { name: "Stills" })).getAllByRole(
        "button",
      ),
    ).toHaveLength(stills.length);
  });

  test("opens the lightbox on the chosen photo and returns focus on close", async () => {
    render(<Gallery />);
    expect(screen.queryByRole("dialog")).toBeNull();

    const opener = within(
      screen.getByRole("list", { name: "Stills" }),
    ).getAllByRole("button")[2];
    fireEvent.click(opener);
    const dialog = await screen.findByRole("dialog");
    const slide = within(dialog).getByRole("group", {
      name: `3 of ${stills.length}`,
    });
    expect(slide.querySelector("img")?.getAttribute("alt")).toBe(stills[2].alt);

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await expect.poll(() => screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
  });
});

describe("Resume", () => {
  test("has a PDF download and the résumé image, which opens full size", async () => {
    render(<Resume />);
    expect(screen.getByRole("region", { name: "Resume" }).id).toBe("resume");
    const pdf = screen.getByRole("link", { name: "Download Resume (PDF)" });
    expect(pdf.getAttribute("href")).toBe(site.resume.pdf);
    expect(pdf.hasAttribute("download")).toBe(true);

    const opener = screen.getByRole("button", {
      name: `View full size: ${site.resume.image.alt}`,
    });
    fireEvent.click(opener);
    const dialog = await screen.findByRole("dialog");
    const slide = within(dialog).getByRole("group", { name: "1 of 1" });
    expect(slide.querySelector("img")?.getAttribute("alt")).toBe(
      site.resume.image.alt,
    );

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await expect.poll(() => screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(opener);
  });
});
