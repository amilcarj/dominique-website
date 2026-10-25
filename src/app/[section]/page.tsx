import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Reels } from "@/components/sections/reels";
import { Resume } from "@/components/sections/resume";

const sections = new Map<string, { Component: ComponentType; title: string }>([
  ["about", { Component: About, title: "About" }],
  ["contact", { Component: Contact, title: "Contact" }],
  ["gallery", { Component: Gallery, title: "Gallery" }],
  ["reels", { Component: Reels, title: "Reels" }],
  ["resume", { Component: Resume, title: "Resume" }],
]);

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return [...sections.keys()].map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[section]">): Promise<Metadata> {
  const { section } = await params;
  const { title } = sections.get(section) ?? notFound();
  return { alternates: { canonical: `/${section}` }, title };
}

export default async function SectionPage({ params }: PageProps<"/[section]">) {
  const { section } = await params;
  const { Component } = sections.get(section) ?? notFound();
  return <Component />;
}
