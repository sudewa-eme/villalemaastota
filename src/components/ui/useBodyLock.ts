"use client";

import { useEffect } from "react";

/** Prevents background scrolling while an overlay is open. */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    body.style.paddingRight = scrollbar ? `${scrollbar}px` : "";
    body.classList.add("is-locked");
    return () => {
      body.classList.remove("is-locked");
      body.style.paddingRight = "";
    };
  }, [locked]);
}
