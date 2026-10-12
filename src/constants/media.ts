import type { StaticImageData } from "next/image";

import aboutImage from "@/assets/about.jpg";
import portfolio1 from "@/assets/portfolio/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio/portfolio-6.jpg";
import still1 from "@/assets/stills/still-1.jpg";
import still2 from "@/assets/stills/still-2.jpg";
import still3 from "@/assets/stills/still-3.jpg";
import still4 from "@/assets/stills/still-4.jpg";
import still5 from "@/assets/stills/still-5.jpg";
import still6 from "@/assets/stills/still-6.jpg";
import still7 from "@/assets/stills/still-7.jpg";
import still8 from "@/assets/stills/still-8.jpg";

export interface Photo {
  src: StaticImageData;
  alt: string;
}

export interface Media {
  title: string;
  src: string;
}

export interface Reel {
  label: string;
  videoId: string;
  playlistId?: string;
}

// TODO: need alt txt
const altTodo = "TODO: need alt txt";

export const aboutPhoto: Photo = { alt: altTodo, src: aboutImage };

export const portfolio: Photo[] = [
  portfolio1,
  portfolio2,
  portfolio3,
  portfolio4,
  portfolio5,
  portfolio6,
].map((src) => ({ alt: altTodo, src }));

export const stills: Photo[] = [
  still1,
  still2,
  still3,
  still4,
  still5,
  still6,
  still7,
  still8,
].map((src) => ({ alt: altTodo, src }));

export const voDemos: Media[] = [
  {
    src: "/audio/dominique-nieves-english-vo-demo.mp3",
    title: "English Voice Over Demo",
  },
  {
    src: "/audio/dominique-nieves-spanish-vo-demo.mp3",
    title: "Spanish Voice Over Demo",
  },
];

export const reels: Reel[] = [
  { label: "Acting", videoId: "eSQdKDh3AVM" },
  {
    label: "Dance",
    playlistId: "PLdaTXRKrtJPu-0BNJNrHts3BH1r19dDhB",
    videoId: "lwAZrr6RU4E",
  },
];
