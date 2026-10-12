"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

import type { Media } from "@/constants/media";

interface VoiceDemoProps {
  demo: Media;
}

export function VoiceDemo({ demo }: VoiceDemoProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const toggle = () => {
    if (!audioRef.current) {
      return;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="flex h-16 items-center bg-neutral-900 text-white">
      <audio
        ref={audioRef}
        src={demo.src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      <button
        type="button"
        aria-label={`${playing ? "Pause" : "Play"} ${demo.title}`}
        disabled={failed}
        onClick={toggle}
        className="flex h-full w-15 shrink-0 items-center justify-center border-r border-neutral-700 transition-opacity hover:opacity-75 focus-visible:-outline-offset-2 focus-visible:outline-white disabled:opacity-40"
      >
        {playing ? (
          <Pause aria-hidden="true" className="size-5 fill-white" />
        ) : (
          <Play aria-hidden="true" className="size-5 fill-white" />
        )}
      </button>
      <span className="flex-1 px-4 text-base">{demo.title}</span>
      {failed ? (
        <span className="px-4 text-sm text-white/60">Unavailable</span>
      ) : (
        <a
          href={demo.src}
          download
          aria-label={`Download ${demo.title}`}
          className="px-4 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-white"
        >
          Download
        </a>
      )}
    </div>
  );
}
