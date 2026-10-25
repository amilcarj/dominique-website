import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Header } from "@/components/header";
import { SocialIcons } from "@/components/social-icons";
import { site } from "@/constants/site";

import nextConfig from "../../next.config";

import SectionPage, {
  generateMetadata,
  generateStaticParams,
} from "./[section]/page";
import manifest from "./manifest";
import Home, { personJsonLd } from "./page";
import robots from "./robots";
import sitemap from "./sitemap";

test("renders the site name as the page heading", () => {
  render(<Home />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Dominique Nieves" }),
  ).toBeDefined();
});

test("the site name and every in-page nav link lead to a section on the page, in order", () => {
  const { container } = render(
    <>
      <Header />
      <Home />
    </>,
  );
  const sectionId = (href: string | null) => href?.split("#")[1] ?? "about";

  expect(
    sectionId(
      screen
        .getByRole("link", { name: "Dominique Nieves" })
        .getAttribute("href"),
    ),
  ).toBe("about");
  const linkTargets = within(screen.getByRole("navigation", { name: "Main" }))
    .getAllByRole("link")
    .map((link) => link.getAttribute("href"))
    .filter((href) => href?.startsWith("/"))
    .map(sectionId);
  const sectionIds = [...container.querySelectorAll("section[id]")].map(
    (section) => section.id,
  );
  expect(linkTargets).toEqual(sectionIds);
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

describe("standalone section pages", () => {
  const props = (section: string) => ({
    params: Promise.resolve({ section }),
    searchParams: Promise.resolve({}),
  });
  const sections = ["about", "reels", "gallery", "resume", "contact"];

  test("each one renders only its section", async () => {
    expect(
      generateStaticParams()
        .map(({ section }) => section)
        .sort(),
    ).toEqual([...sections].sort());
    for (const section of sections) {
      const { container, unmount } = render(await SectionPage(props(section)));
      expect(
        [...container.querySelectorAll("section[id]")].map(({ id }) => id),
      ).toEqual([section]);
      unmount();
    }
  });

  test("responds with not found for paths that aren't a section", async () => {
    for (const section of ["nope", "constructor"]) {
      const notFound = { digest: "NEXT_HTTP_ERROR_FALLBACK;404" };
      await expect(SectionPage(props(section))).rejects.toMatchObject(notFound);
      await expect(generateMetadata(props(section))).rejects.toMatchObject(
        notFound,
      );
    }
  });

  test("gives each one its section's title and canonical URL", async () => {
    expect(await generateMetadata(props("reels"))).toEqual({
      alternates: { canonical: "/reels" },
      title: "Reels",
    });
  });
});

describe("SEO", () => {
  test("includes the Person structured data for search engines", () => {
    const { container } = render(<Home />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(JSON.parse(script?.textContent ?? "null")).toEqual(personJsonLd());
  });

  test("describes Dominique as a Person with an absolute image and her profiles", () => {
    const data = personJsonLd();
    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Person",
      jobTitle: ["Actress", "Writer", "Director"],
      name: site.name,
      url: site.url,
    });
    expect(data.image.startsWith(`${site.url}/`)).toBe(true);
    expect(data.sameAs).toEqual(site.socialLinks.map((link) => link.href));
  });

  test("allows crawlers but opts out of AI training, and points to the sitemap", () => {
    const result = robots();
    expect(result.rules).toEqual([
      { allow: "/", userAgent: "*" },
      {
        disallow: "/",
        userAgent: [
          "Applebot-Extended",
          "CCBot",
          "ClaudeBot",
          "GPTBot",
          "Google-Extended",
          "Meta-ExternalAgent",
        ],
      },
    ]);
    expect(result.sitemap).toBe("https://dominiquenieves.com/sitemap.xml");
  });

  test("lists the home page and every standalone section page", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      "https://dominiquenieves.com",
      "https://dominiquenieves.com/about",
      "https://dominiquenieves.com/reels",
      "https://dominiquenieves.com/gallery",
      "https://dominiquenieves.com/resume",
      "https://dominiquenieves.com/contact",
    ]);
  });

  test("names the installable app and points at its icons", () => {
    const result = manifest();
    expect(result.name).toBe(site.name);
    expect(result.icons?.map((icon) => icon.src)).toEqual([
      "/android-chrome-192x192.png",
      "/android-chrome-512x512.png",
    ]);
  });

  test("permanently redirects the old Squarespace URLs", async () => {
    expect(await nextConfig.redirects?.()).toEqual([
      { destination: "/", permanent: true, source: "/home" },
      {
        destination: "/Dominique%20Nieves%20Resume.pdf",
        permanent: true,
        source: "/s/DominiqueNievesActressResume.pdf",
      },
    ]);
  });
});
