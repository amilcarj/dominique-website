"use client";

import Image from "next/image";
import { useState } from "react";

import { YouTubeEmbed } from "@/components/sections/reels/youtube-embed";
import type { Reel } from "@/constants/media";

interface ReelPlayerProps {
  reels: Reel[];
}

export function ReelPlayer({ reels }: ReelPlayerProps) {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const reel = reels[index];

  return (
    <>
      <YouTubeEmbed
        key={`${reel.label}-${started}`}
        videoId={reel.videoId}
        playlistId={reel.playlistId}
        title={`${reel.label} reel`}
        autoplay={started}
      />
      <ul className="mt-5 flex justify-center gap-2.5">
        {reels.map((item, itemIndex) => (
          <li key={item.label}>
            <button
              type="button"
              aria-pressed={itemIndex === index}
              onClick={() => {
                setIndex(itemIndex);
                setStarted(true);
              }}
              className="block w-34.5 transition-opacity hover:opacity-80"
            >
              <Image
                src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
                alt=""
                width={138}
                height={78}
                unoptimized
                className="aspect-video w-full object-cover"
              />
              <span className="mt-2 block">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
