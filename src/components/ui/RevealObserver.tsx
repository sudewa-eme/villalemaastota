"use client";

import { useEffect } from "react";

/**
 * Enables the scroll-reveal system once hydrated. Elements marked with
 * `data-reveal` fade/slide in as they enter the viewport. Without JavaScript,
 * or with reduced motion, everything is simply visible.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    // Mark elements already in view as revealed before hiding the rest,
    // so nothing above the fold flickers.
    const vh = window.innerHeight;
    nodes.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add("is-in");
      else io.observe(el);
    });
    root.classList.add("reveal-ready");

    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
