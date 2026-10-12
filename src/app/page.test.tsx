import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";

import { Header } from "@/components/header";
import { SocialIcons } from "@/components/social-icons";
import { site } from "@/constants/site";

import Home from "./page";

test("renders the site name as the page heading", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Dominique Nieves" }),
  ).toBeDefined();
});

test("mobile menu opens and closes via the close button, a section link, and the backdrop", () => {
  render(<Header />);
  const menu = screen.getByRole("dialog", {
    hidden: true,
  }) as HTMLDialogElement;
  const open = () =>
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

  expect(menu.open).toBe(false);
  open();
  expect(menu.open).toBe(true);
  fireEvent.click(within(menu).getByRole("button", { name: "Close menu" }));
  expect(menu.open).toBe(false);

  open();
  fireEvent.click(within(menu).getByRole("link", { name: "Resume" }));
  expect(menu.open).toBe(false);

  open();
  fireEvent.click(menu);
  expect(menu.open).toBe(false);
});

test("opens Filmmaker in a new tab and keeps section links in place", () => {
  render(<Header />);
  const nav = screen.getByRole("navigation", { name: "Main" });
  const filmmaker = within(nav).getByRole("link", { name: "Filmmaker" });
  expect(filmmaker.getAttribute("target")).toBe("_blank");
  expect(filmmaker.getAttribute("rel")).toBe("noopener noreferrer");
  expect(
    within(nav).getByRole("link", { name: "Reels" }).hasAttribute("target"),
  ).toBe(false);
});

test("footer links every profile in a new tab", () => {
  render(<SocialIcons />);
  expect(screen.getAllByRole("link")).toHaveLength(site.socialLinks.length);
  for (const link of site.socialLinks) {
    const anchor = screen.getByRole("link", { name: link.icon.alt });
    expect(anchor.getAttribute("href")).toBe(link.href);
    expect(anchor.getAttribute("target")).toBe("_blank");
    expect(anchor.getAttribute("rel")).toBe("noopener noreferrer");
  }
});
