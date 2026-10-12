import Image from "next/image";

import { site } from "@/constants/site";

interface SocialIconsProps {
  className?: string;
}

export function SocialIcons({ className = "" }: SocialIconsProps) {
  return (
    <ul className={`flex gap-2.5 ${className}`}>
      {site.socialLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-10 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80 focus-visible:outline-white"
          >
            <Image
              src={link.icon.src}
              alt={link.icon.alt}
              sizes={`${link.iconWidth}px`}
              style={{ height: "auto", width: link.iconWidth }}
              className="brightness-0"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
