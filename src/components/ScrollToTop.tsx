"use client";

import { useEffect } from "react";
import { scrollToTop, scrollToElement } from "@/lib/smoothScroll";

export default function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);
      // Retry until the section is in the DOM (Next.js may render it async)
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          scrollToElement(el, true);
        } else if (attempts++ < 20) {
          setTimeout(tryScroll, 80);
        }
      };
      tryScroll();
    } else {
      scrollToTop(true);
    }
  }, []);

  return null;
}
