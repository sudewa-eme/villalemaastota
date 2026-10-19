"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { booking } from "@/content/home";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Arrow } from "@/components/ui/Arrow";
import styles from "./BookDirect.module.css";

const MAX_GUESTS = 10;

type Errors = Partial<Record<"checkin" | "checkout" | "guests", string>>;
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; via: "engine" | "email"; summary: string };

function isoDate(d: Date) {
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60_000).toISOString().slice(0, 10);
}

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  return isoDate(d);
}

function nights(a: string, b: string) {
  return Math.round((new Date(`${b}T12:00:00`).getTime() - new Date(`${a}T12:00:00`).getTime()) / 86_400_000);
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const noopSubscribe = () => () => {};

export function BookDirect() {
  const id = useId();
  // Dates depend on the visitor's clock: empty on the server, local date in the browser.
  const today = useSyncExternalStore(noopSubscribe, () => isoDate(new Date()), () => "");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const guestsRef = useRef<HTMLDivElement>(null);
  const guestsBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!guestsOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!guestsRef.current?.contains(e.target as Node)) setGuestsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setGuestsOpen(false);
        guestsBtnRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [guestsOpen]);

  const totalGuests = adults + children;
  const guestLabel = `${adults} adult${adults === 1 ? "" : "s"}${children ? `, ${children} child${children === 1 ? "" : "ren"}` : ""}`;

  function validate(): Errors {
    const e: Errors = {};
    if (!checkin) e.checkin = "Choose an arrival date.";
    else if (today && checkin < today) e.checkin = "Arrival can't be in the past.";
    if (!checkout) e.checkout = "Choose a departure date.";
    else if (checkin && checkout <= checkin) e.checkout = "Departure must be after arrival.";
    if (adults < 1) e.guests = "At least one adult is required.";
    else if (totalGuests > MAX_GUESTS)
      e.guests = `For groups over ${MAX_GUESTS}, please contact our team directly.`;
    return e;
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = ev.currentTarget.querySelector<HTMLElement>("[aria-invalid='true'], [data-invalid]");
      first?.focus();
      return;
    }

    const n = nights(checkin, checkout);
    const summary = `${formatDate(checkin)} – ${formatDate(checkout)} · ${n} night${n === 1 ? "" : "s"} · ${guestLabel}`;
    setStatus({ kind: "sending" });

    if (site.bookingUrlTemplate) {
      const url = site.bookingUrlTemplate
        .replaceAll("{checkin}", checkin)
        .replaceAll("{checkout}", checkout)
        .replaceAll("{adults}", String(adults))
        .replaceAll("{children}", String(children));
      setStatus({ kind: "sent", via: "engine", summary });
      window.location.assign(url);
      return;
    }

    const subject = `Reservation request: ${formatDate(checkin)} – ${formatDate(checkout)}`;
    const body = [
      "Hello,",
      "",
      "I'd like to check availability at Villa Lé Maas Tota for:",
      "",
      `Arrival: ${formatDate(checkin)}`,
      `Departure: ${formatDate(checkout)} (${n} night${n === 1 ? "" : "s"})`,
      `Guests: ${guestLabel}`,
      "",
      "Room preference / whole villa:",
      "Special requests:",
      "",
      "Name:",
      "Phone:",
    ].join("\n");
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ kind: "sent", via: "email", summary });
  }

  const minCheckout = checkin ? addDays(checkin, 1) : today ? addDays(today, 1) : undefined;

  return (
    <section id="book" className={styles.section} data-field="mist" aria-labelledby={`${id}-title`}>
      <div className={`container ${styles.layout}`}>
        <header className={styles.head}>
          <SectionLabel>{booking.label}</SectionLabel>
          <h2 id={`${id}-title`} className={`h3 ${styles.title}`} data-reveal>
            {booking.title}
          </h2>
          <p className={styles.intro} data-reveal>
            {booking.body}
          </p>
        </header>

        <form className={styles.form} onSubmit={onSubmit} noValidate data-reveal>
          <div className={styles.field}>
            <label htmlFor={`${id}-in`}>Arrival</label>
            <input
              id={`${id}-in`}
              type="date"
              value={checkin}
              min={today || undefined}
              onChange={(e) => {
                const v = e.target.value;
                setCheckin(v);
                if (v && (!checkout || checkout <= v)) setCheckout(addDays(v, 2));
                setErrors((x) => ({ ...x, checkin: undefined, checkout: undefined }));
              }}
              aria-invalid={!!errors.checkin}
              aria-describedby={errors.checkin ? `${id}-in-err` : undefined}
              required
            />
            {errors.checkin && (
              <p id={`${id}-in-err`} className={styles.error}>
                {errors.checkin}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor={`${id}-out`}>Departure</label>
            <input
              id={`${id}-out`}
              type="date"
              value={checkout}
              min={minCheckout}
              onChange={(e) => {
                setCheckout(e.target.value);
                setErrors((x) => ({ ...x, checkout: undefined }));
              }}
              aria-invalid={!!errors.checkout}
              aria-describedby={errors.checkout ? `${id}-out-err` : undefined}
              required
            />
            {errors.checkout && (
              <p id={`${id}-out-err`} className={styles.error}>
                {errors.checkout}
              </p>
            )}
          </div>

          <div className={`${styles.field} ${styles.guests}`} ref={guestsRef}>
            <span className={styles.fieldLabel} id={`${id}-guests-label`}>
              Guests
            </span>
            <button
              ref={guestsBtnRef}
              type="button"
              className={styles.guestsBtn}
              aria-haspopup="true"
              aria-expanded={guestsOpen}
              aria-controls={`${id}-guests`}
              aria-labelledby={`${id}-guests-label ${id}-guests-value`}
              data-invalid={!!errors.guests || undefined}
              aria-describedby={errors.guests ? `${id}-guests-err` : undefined}
              onClick={() => setGuestsOpen((o) => !o)}
            >
              <span id={`${id}-guests-value`}>{guestLabel}</span>
              <Arrow direction="down" className={guestsOpen ? styles.chevOpen : undefined} />
            </button>
            {errors.guests && (
              <p id={`${id}-guests-err`} className={styles.error}>
                {errors.guests}
              </p>
            )}
            <div id={`${id}-guests`} className={styles.popover} hidden={!guestsOpen}>
              <Stepper
                label="Adults"
                hint="Age 12+"
                value={adults}
                min={1}
                max={MAX_GUESTS - children}
                onChange={(v) => {
                  setAdults(v);
                  setErrors((x) => ({ ...x, guests: undefined }));
                }}
              />
              <Stepper
                label="Children"
                hint="Age 0–11"
                value={children}
                min={0}
                max={MAX_GUESTS - adults}
                onChange={(v) => {
                  setChildren(v);
                  setErrors((x) => ({ ...x, guests: undefined }));
                }}
              />
              <p className={styles.popoverNote}>The villa sleeps up to {MAX_GUESTS} guests.</p>
              <button type="button" className={styles.done} onClick={() => { setGuestsOpen(false); guestsBtnRef.current?.focus(); }}>
                Done
              </button>
            </div>
          </div>

          <button type="submit" className={`btn btn--solid ${styles.submit}`} disabled={status.kind === "sending"}>
            {status.kind === "sending" ? "Preparing…" : site.bookingUrlTemplate ? "Check availability" : "Request availability"}
          </button>
        </form>

        <div className={styles.meta} aria-live="polite">
          {status.kind === "sent" ? (
            <p className={styles.status}>
              <strong>{status.via === "engine" ? "Opening our booking engine…" : "Your email is ready to send."}</strong>{" "}
              {status.summary}.{" "}
              {status.via === "email" &&
                "Nothing is reserved yet — our reservations team will reply to confirm availability and rates. If your email app didn't open, write to us at "}
              {status.via === "email" && <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>}
              {status.via === "email" && "."}
            </p>
          ) : (
            <p className={styles.note}>
              Prefer to talk? Call <a href={site.contact.phoneHref}>{site.contact.phoneDisplay}</a> or write to{" "}
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. Check-in from {site.policies.checkIn}, check-out by{" "}
              {site.policies.checkOut}.
            </p>
          )}
          <a href={site.links.reservations} className="text-link" target="_blank" rel="noopener noreferrer">
            Reservations page <Arrow direction="up-right" />
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

type StepperProps = {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
};

function Stepper({ label, hint, value, min, max, onChange }: StepperProps) {
  return (
    <div className={styles.stepper} role="group" aria-label={label}>
      <div>
        <span className={styles.stepperLabel}>{label}</span>
        <span className={styles.stepperHint}>{hint}</span>
      </div>
      <div className={styles.stepperControls}>
        <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`}>
          <span aria-hidden="true">−</span>
        </button>
        <output aria-live="polite">{value}</output>
        <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`}>
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </div>
  );
}
