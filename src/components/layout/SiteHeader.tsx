"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { navigation, site } from "@/content/site";
import { useBodyLock } from "@/components/ui/useBodyLock";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useBodyLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Focus management, Escape to close and a focus trap while the menu is open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;
      const items = [toggleRef.current!, ...focusables()];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const solid = scrolled && !open;

  return (
    <header
      className={[styles.header, solid ? styles.solid : styles.clear, open && styles.isOpen]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.bar}>
        <div className={styles.start}>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span className={styles.toggleLines} aria-hidden="true">
              <span />
              <span />
            </span>
            <span className={styles.toggleLabel}>{open ? "Close" : "Menu"}</span>
          </button>
          <nav className={styles.quick} aria-label="Quick links">
            <a href="#stay">Stay</a>
            <a href="#experiences">Experiences</a>
          </nav>
        </div>

        <a href="#top" className={styles.brand} aria-label={`${site.name} — back to top`}>
          <Logo variant="emblem" className={styles.emblem} title="" />
          <span className={styles.wordmark}>{site.name}</span>
        </a>

        <div className={styles.end}>
          <a href={site.contact.phoneHref} className={styles.phone}>
            {site.contact.phoneDisplay}
          </a>
          <a href="#book" className={styles.book} onClick={() => open && close(false)}>
            Book now
          </a>
        </div>
      </div>

      <div
        id="site-menu"
        ref={panelRef}
        className={styles.panel}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className={styles.panelInner}>
          <nav aria-label="Primary">
            <ul className={styles.panelNav}>
              {navigation.map((item, i) => (
                <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
                  <a href={item.href} onClick={() => close(false)}>
                    <span className={styles.panelIndex}>{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.panelAside}>
            <p className="label">Reservations</p>
            <p>
              <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a>
              <br />
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </p>
            <p className="label">Find us</p>
            <address>
              {site.location.address.map((l) => (
                <span key={l} className="line">
                  {l}
                </span>
              ))}
            </address>
            <a href="#book" className="btn btn--solid" onClick={() => close(false)}>
              Check availability
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
