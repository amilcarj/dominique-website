import { ReelPlayer } from "@/components/sections/reels/reel-player";
import { VoiceDemo } from "@/components/sections/reels/voice-demo";
import { reels, voDemos } from "@/constants/media";

export function Reels() {
  return (
    <section id="reels" aria-labelledby="reels-heading" className="section">
      <h2 id="reels-heading" className="section-heading">
        Reels
      </h2>
      <div className="mx-auto mt-9 md:w-2/3">
        <ReelPlayer reels={reels} />
        <ul className="mt-9 grid gap-9 md:grid-cols-2">
          {voDemos.map((voDemo) => (
            <li key={voDemo.src}>
              <VoiceDemo demo={voDemo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
