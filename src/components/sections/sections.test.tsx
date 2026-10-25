import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import {
  aboutPhoto,
  portfolio,
  reels,
  stills,
  voDemos,
} from "@/constants/media";
import { site } from "@/constants/site";

import { About } from "./about";
import { Contact } from "./contact";
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

describe("Contact", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  const fillForm = (overrides: Record<string, string> = {}) => {
    const values: Record<string, string> = {
      "Email Address": "casting@example.com",
      "First Name": "Jamie",
      "Last Name": "Rivera",
      Message: "We'd love to see you for a role.",
      Subject: "Audition",
      ...overrides,
    };
    const form = screen.getByRole("form", { name: "Contact form" });
    for (const [label, value] of Object.entries(values)) {
      fireEvent.change(within(form).getByLabelText(new RegExp(label)), {
        target: { value },
      });
    }
    return form;
  };

  const mockResend = (ok: boolean) => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", site.email);
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    vi.spyOn(console, "error").mockImplementation(() => {});
    return vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: ok ? 200 : 500 }));
  };

  test("has the intro and the contact form fields", () => {
    render(<Contact />);
    expect(screen.getByRole("region", { name: "Contact" }).id).toBe("contact");
    expect(
      screen.getByText(
        "Dominique can be reached directly through the form below:",
      ),
    ).toBeDefined();

    const form = screen.getByRole("form", { name: "Contact form" });
    for (const label of [
      "First Name",
      "Last Name",
      "Email Address",
      "Subject",
      "Message",
    ]) {
      expect(
        within(form).getByLabelText(new RegExp(label)).matches(":required"),
      ).toBe(true);
    }
    expect(within(form).getByRole("button", { name: "Submit" })).toBeDefined();
  });

  test("sends a valid message to Resend with the visitor as reply-to", async () => {
    const fetchMock = mockResend(true);
    render(<Contact />);
    fireEvent.submit(fillForm());

    expect(
      await screen.findByText("Thanks! Your message was sent."),
    ).toBeDefined();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(JSON.parse(String(init?.body))).toMatchObject({
      from: "Website Contact <onboarding@resend.dev>",
      reply_to: "casting@example.com",
      subject: "Website contact: Audition",
      to: site.email,
    });
  });

  test("shows field errors, keeps the input, and sends nothing when invalid", async () => {
    const fetchMock = mockResend(true);
    render(<Contact />);
    fireEvent.submit(
      fillForm({ "Email Address": "not-an-email", Message: "" }),
    );

    expect(
      await screen.findByText("Enter a valid email address."),
    ).toBeDefined();
    expect(screen.getByText("This field is required.")).toBeDefined();
    expect(
      (screen.getByLabelText(/Email Address/) as HTMLInputElement).value,
    ).toBe("not-an-email");
    expect(
      screen.getByLabelText(/First Name/).getAttribute("aria-invalid"),
    ).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("offers the direct email when sending fails", async () => {
    mockResend(false);
    render(<Contact />);
    fireEvent.submit(fillForm());

    expect(await screen.findByText(/couldn't be sent/)).toBeDefined();
    expect(
      screen.getByRole("link", { name: site.email }).getAttribute("href"),
    ).toBe(`mailto:${site.email}`);
  });

  test("silently drops submissions that fill in the honeypot", async () => {
    const fetchMock = mockResend(true);
    const { container } = render(<Contact />);
    const form = fillForm();
    fireEvent.change(
      container.querySelector('input[name="company"]') as HTMLInputElement,
      {
        target: { value: "spam" },
      },
    );
    fireEvent.submit(form);

    expect(
      await screen.findByText("Thanks! Your message was sent."),
    ).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
