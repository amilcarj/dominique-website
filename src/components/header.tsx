"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { navItems } from "@/constants/navigation";
import { site } from "@/constants/site";

const linkFocus = "focus-visible:outline-offset-4 focus-visible:outline-white";
const navText = "font-display font-bold uppercase leading-none";

interface NavLinkProps {
  href: string;
  label: string;
  className: string;
  onClick?: () => void;
}

function NavLink({ href, label, className, onClick }: NavLinkProps) {
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {label}
    </Link>
  );
}

export function Header() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const openMenu = () => menuRef.current?.showModal();
  const closeMenu = () => menuRef.current?.close();
  const pathname = usePathname();
  const scrollHomeToTop = (href: string) => {
    if (href === "/" && pathname === "/") {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-header-mobile text-white sm:bg-header">
      <div className="flex h-(--header-height) items-center gap-2 px-5 sm:justify-between sm:gap-8">
        <button
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          onClick={openMenu}
          className={`-ml-2 p-2 sm:hidden ${linkFocus}`}
        >
          <Menu aria-hidden="true" size={28} strokeWidth={2} />
        </button>

        <Link
          href="/"
          onClick={() => scrollHomeToTop("/")}
          className={`font-display text-xl font-medium tracking-[0.17em] uppercase sm:w-min sm:text-4xl sm:font-bold xl:w-auto ${linkFocus}`}
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden sm:block">
          <ul className="flex flex-wrap justify-end gap-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  onClick={() => scrollHomeToTop(item.href)}
                  className={`block py-3 text-lg tracking-[0.2em] ${navText} ${linkFocus}`}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <dialog
        ref={menuRef}
        aria-label="Menu"
        onClick={(event) => event.target === menuRef.current && closeMenu()}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent text-white backdrop:bg-backdrop motion-safe:backdrop:animate-fade-in"
      >
        <div className="flex h-full pointer-events-none">
          <nav
            aria-label="Mobile"
            className="pointer-events-auto h-full flex-1 bg-black p-9 motion-safe:animate-slide-in"
          >
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    onClick={() => {
                      closeMenu();
                      scrollHomeToTop(item.href);
                    }}
                    className={`block py-1 text-base tracking-[0.25em] ${navText} ${linkFocus}`}
                  />
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className={`pointer-events-auto flex size-15 items-center justify-center bg-neutral-950/55 ${linkFocus}`}
          >
            <X aria-hidden="true" size={24} strokeWidth={1.5} />
          </button>
        </div>
      </dialog>
    </header>
  );
}
