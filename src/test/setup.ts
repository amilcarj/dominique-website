import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(cleanup);

vi.stubGlobal("matchMedia", (query: string) => ({
  addEventListener: () => {},
  matches: false,
  media: query,
  removeEventListener: () => {},
}));

HTMLDialogElement.prototype.showModal = function showModal(
  this: HTMLDialogElement,
) {
  this.open = true;
};
HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
  this.open = false;
};

HTMLMediaElement.prototype.play = function play() {
  return Promise.resolve();
};
HTMLMediaElement.prototype.pause = function pause() {};
