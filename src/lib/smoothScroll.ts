import type Lenis from "lenis";

// Holds the live Lenis instance (when smooth scrolling is active) so programmatic
// scrolls go through Lenis instead of fighting it. Falls back to native scrolling
// when Lenis is off (e.g. prefers-reduced-motion, or before it mounts).

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null): void {
  lenis = instance;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/** Jump/scroll to the top of the page. `immediate` skips the smooth animation. */
export function scrollToTop(immediate = true): void {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
  } else if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" } as ScrollToOptions);
  }
}

/** Scroll an element into view. `immediate` jumps without the smooth animation. */
export function scrollToElement(el: Element, immediate = false): void {
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { immediate });
  } else {
    el.scrollIntoView({ behavior: immediate ? "instant" : "smooth" } as ScrollIntoViewOptions);
  }
}
