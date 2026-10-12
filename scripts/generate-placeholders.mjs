/**
 * Generates art-directed, clearly illustrative placeholder images for any
 * photograph that is not yet in /public/images/property.
 *
 * These are procedural landscape "mood plates" (layered highland ridges, mist,
 * light) tuned to the tone of the real photograph each one stands in for, so
 * layouts can be judged before final photography is committed.
 *
 * Usage: npm run placeholders
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "images", "placeholders");

/** Deterministic PRNG so placeholders are stable between runs. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Midpoint-displacement ridge line across the full width. */
function ridge(rand, w, baseY, amp, rough = 0.55, peakAt = null) {
  const n = 129;
  const pts = new Array(n).fill(0);
  pts[0] = (rand() - 0.5) * amp;
  pts[n - 1] = (rand() - 0.5) * amp;
  let step = n - 1;
  let scale = amp;
  while (step > 1) {
    const half = step / 2;
    for (let i = half; i < n; i += step) {
      pts[i] = (pts[i - half] + pts[i + half]) / 2 + (rand() - 0.5) * scale;
    }
    scale *= rough;
    step = half;
  }
  return pts.map((v, i) => {
    const x = (i / (n - 1)) * w;
    let y = baseY + v;
    if (peakAt) {
      const d = (x - peakAt.x) / peakAt.spread;
      y -= peakAt.h * Math.exp(-d * d);
    }
    return [x, y];
  });
}

function ridgePath(points, w, h) {
  const d = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return `${d} L${w} ${h} L0 ${h} Z`;
}

function mix(a, b, t) {
  const pa = a.match(/\w\w/g).map((x) => parseInt(x, 16));
  const pb = b.match(/\w\w/g).map((x) => parseInt(x, 16));
  return (
    "#" +
    pa
      .map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Tree canopy silhouettes along a ridge line. */
function canopy(rand, points, color, density = 0.6, size = 26) {
  let out = "";
  for (const [x, y] of points) {
    if (rand() > density) continue;
    const r = size * (0.6 + rand() * 0.9);
    out += `<ellipse cx="${(x + (rand() - 0.5) * 20).toFixed(1)}" cy="${(y - r * 0.4).toFixed(1)}" rx="${(r * 1.1).toFixed(1)}" ry="${r.toFixed(1)}" fill="${color}"/>`;
  }
  return out;
}

function landscape({ w, h, seed, sky, layers, glow, mist = 0.5, water, canopyLayer = -1, stars = false, fire }) {
  const rand = rng(seed);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      ${sky.map((c, i) => `<stop offset="${(i / (sky.length - 1)).toFixed(2)}" stop-color="${c}"/>`).join("")}
    </linearGradient>
    <radialGradient id="glow" cx="${glow?.x ?? 0.5}" cy="${glow?.y ?? 0.4}" r="${glow?.r ?? 0.5}">
      <stop offset="0" stop-color="${glow?.color ?? "#ffffff"}" stop-opacity="${glow?.o ?? 0}"/>
      <stop offset="1" stop-color="${glow?.color ?? "#ffffff"}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${sky[sky.length - 1]}" stop-opacity="0"/>
      <stop offset="0.5" stop-color="${sky[sky.length - 1]}" stop-opacity="${mist * 0.8}"/>
      <stop offset="1" stop-color="${sky[sky.length - 1]}" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" x="-5%" y="-20%" width="110%" height="140%"><feGaussianBlur stdDeviation="10"/></filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="table" tableValues="0 0.07"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>`;

  if (stars) {
    for (let i = 0; i < 90; i++) {
      s += `<circle cx="${(rand() * w).toFixed(0)}" cy="${(rand() * h * 0.45).toFixed(0)}" r="${(rand() * 1.6 + 0.3).toFixed(1)}" fill="#fff" opacity="${(rand() * 0.5 + 0.2).toFixed(2)}"/>`;
    }
  }

  layers.forEach((L, i) => {
    const pts = ridge(rand, w, L.y * h, L.amp * h, L.rough ?? 0.55, L.peak ? { x: L.peak.x * w, h: L.peak.h * h, spread: L.peak.s * w } : null);
    const blur = i < layers.length - 2 ? ' filter="url(#soft)"' : "";
    s += `<path d="${ridgePath(pts, w, h)}" fill="${L.color}"${blur}/>`;
    if (i === canopyLayer) s += `<g>${canopy(rand, pts, L.color, 0.7, h * 0.02)}</g>`;
    if (i < layers.length - 1) {
      const top = L.y * h - h * 0.12;
      s += `<rect x="0" y="${top.toFixed(0)}" width="${w}" height="${(h * 0.36).toFixed(0)}" fill="url(#mist)" filter="url(#soft)"/>`;
    }
  });

  if (water) {
    const y0 = water.y * h;
    s += `<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${water.top}"/><stop offset="1" stop-color="${water.bottom}"/></linearGradient>`;
    s += `<polygon points="${w * water.x0},${y0} ${w},${y0} ${w},${h} ${w * water.x1},${h}" fill="url(#water)"/>`;
    s += `<polygon points="${w * water.x0 - 26},${y0} ${w * water.x0},${y0} ${w * water.x1},${h} ${w * water.x1 - 70},${h}" fill="${water.edge}"/>`;
  }

  if (fire) {
    const cx = fire.x * w;
    const cy = fire.y * h;
    s += `<radialGradient id="fire" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffcf7a" stop-opacity="0.95"/><stop offset="0.35" stop-color="#e3822e" stop-opacity="0.55"/><stop offset="1" stop-color="#e3822e" stop-opacity="0"/></radialGradient>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${w * fire.r}" ry="${w * fire.r * 0.7}" fill="url(#fire)"/>`;
  }

  s += `<rect width="${w}" height="${h}" filter="url(#grain)"/></svg>`;
  return s;
}

/** Interior plate: panelled wall, window onto green, warm floor light. */
function interior({ w, h, seed }) {
  const rand = rng(seed);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e9e6dd"/><stop offset="1" stop-color="#f7f5ef"/></linearGradient>
    <linearGradient id="win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe0b8"/><stop offset="1" stop-color="#6f8f4c"/></linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cdbfa6"/><stop offset="1" stop-color="#a99a80"/></linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 0.06"/></feComponentTransfer></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#wall)"/>
  <rect x="${w * 0.12}" y="${h * 0.04}" width="${w * 0.2}" height="${h * 0.32}" fill="url(#win)"/>
  <g filter="url(#soft)">${Array.from({ length: 18 }, () => `<circle cx="${(w * 0.12 + rand() * w * 0.2).toFixed(0)}" cy="${(h * 0.04 + rand() * h * 0.3).toFixed(0)}" r="${(20 + rand() * 40).toFixed(0)}" fill="${mix("4f6b35", "a8c47e", rand())}" opacity="0.8"/>`).join("")}</g>
  <rect x="${w * 0.42}" y="${h * 0.08}" width="${w * 0.52}" height="${h * 0.16}" fill="none" stroke="#d9d5ca" stroke-width="6"/>
  <rect x="${w * 0.42}" y="${h * 0.3}" width="${w * 0.52}" height="${h * 0.2}" fill="none" stroke="#d9d5ca" stroke-width="6"/>
  <rect y="${h * 0.62}" width="${w}" height="${h * 0.38}" fill="url(#floor)"/>
  <rect x="${w * 0.5}" y="${h * 0.34}" width="${w * 0.5}" height="${h * 0.3}" rx="30" fill="#cdbfa9"/>
  <rect x="${w * 0.02}" y="${h * 0.2}" width="${w * 0.3}" height="${h * 0.62}" rx="40" fill="#8c8781"/>
  <rect x="${w * 0.36}" y="${h * 0.72}" width="${w * 0.6}" height="${h * 0.14}" fill="#d8cfbf"/>
  <rect width="${w}" height="${h}" filter="url(#grain)"/></svg>`;
  return s;
}

const W = 2400;
const H = 1600;

const plates = {
  // Stand-ins for the property photographs (replace by adding the real files).
  "infinity-pool-sunset": landscape({
    w: W, h: H, seed: 11,
    sky: ["#b8a3b9", "#d9bfc3", "#f0d6c8"],
    glow: { x: 0.42, y: 0.48, r: 0.45, color: "#ffe6cf", o: 0.7 },
    layers: [
      { y: 0.5, amp: 0.05, color: "#8e8592" },
      { y: 0.55, amp: 0.1, color: "#4f5a46", peak: { x: 0.9, h: 0.45, s: 0.25 } },
      { y: 0.6, amp: 0.06, color: "#2f3a29" },
    ],
    canopyLayer: 2,
    water: { y: 0.66, x0: 0.42, x1: 0.18, top: "#9a9fa0", bottom: "#2f4a44", edge: "#b99f8a" },
    mist: 0.45,
  }),
  "villa-aerial": landscape({
    w: W, h: H, seed: 22,
    sky: ["#6f7d62", "#8a9a72", "#a8b58a"],
    glow: { x: 0.55, y: 0.55, r: 0.5, color: "#f3efe6", o: 0.25 },
    layers: [
      { y: 0.18, amp: 0.08, color: "#4b5c3a" },
      { y: 0.38, amp: 0.1, color: "#3b4d2c" },
      { y: 0.62, amp: 0.06, color: "#5c7a3c" },
      { y: 0.82, amp: 0.05, color: "#2c3b22" },
    ],
    canopyLayer: 3,
    mist: 0.3,
  }),
  "estate-overhead": landscape({
    w: W, h: H, seed: 33,
    sky: ["#1f2a1c", "#26331f", "#2c3a24"],
    layers: [
      { y: 0.3, amp: 0.2, color: "#2f4126", rough: 0.7 },
      { y: 0.55, amp: 0.25, color: "#25351d", rough: 0.7 },
      { y: 0.8, amp: 0.2, color: "#1c2a16", rough: 0.7 },
    ],
    canopyLayer: 1,
    mist: 0.1,
  }),
  "dinner-deck-dusk": landscape({
    w: W, h: H, seed: 44,
    sky: ["#0b1e4a", "#163a86", "#2453a8"],
    glow: { x: 0.5, y: 0.45, r: 0.3, color: "#ffcf8a", o: 0.25 },
    stars: true,
    layers: [
      { y: 0.5, amp: 0.1, color: "#0e1a22", peak: { x: 0.9, h: 0.4, s: 0.15 } },
      { y: 0.62, amp: 0.08, color: "#090f12", peak: { x: 0.1, h: 0.3, s: 0.15 } },
    ],
    canopyLayer: 1,
    fire: { x: 0.5, y: 0.66, r: 0.18 },
    mist: 0,
  }),
  "firepit-lounge": landscape({
    w: W, h: H, seed: 55,
    sky: ["#1a2414", "#26361c", "#3e5a2a"],
    layers: [
      { y: 0.25, amp: 0.15, color: "#2c4420", rough: 0.75 },
      { y: 0.5, amp: 0.05, color: "#5d6b4d" },
      { y: 0.72, amp: 0.02, color: "#4a4a48" },
    ],
    canopyLayer: 0,
    fire: { x: 0.45, y: 0.78, r: 0.16 },
    mist: 0,
  }),
  "pool-deck-reading": landscape({
    w: W, h: H, seed: 66,
    sky: ["#55702f", "#6e8a3a", "#8ea44a"],
    glow: { x: 0.3, y: 0.4, r: 0.5, color: "#e3d34a", o: 0.35 },
    layers: [
      { y: 0.2, amp: 0.2, color: "#4e6b2a", rough: 0.75 },
      { y: 0.5, amp: 0.15, color: "#6f8c34", rough: 0.75 },
    ],
    canopyLayer: 1,
    water: { y: 0.8, x0: 0.05, x1: 0, top: "#5aa79c", bottom: "#2f7c72", edge: "#c9cbbf" },
    mist: 0.1,
  }),
  "misty-lawn": landscape({
    w: W, h: H, seed: 77,
    sky: ["#e7ebe6", "#dde3da", "#c9d0c4"],
    layers: [
      { y: 0.3, amp: 0.08, color: "#5f6f55", peak: { x: 0.45, h: 0.12, s: 0.4 } },
      { y: 0.6, amp: 0.06, color: "#3e5532" },
      { y: 0.8, amp: 0.01, color: "#7fa140" },
    ],
    canopyLayer: 1,
    mist: 0.75,
  }),
  "living-room": interior({ w: W, h: H, seed: 88 }),

  // Illustrative plates for surrounding attractions (no property photography).
  "attraction-diyaluma": landscape({
    w: W, h: H, seed: 101,
    sky: ["#d7ddd2", "#c9d0c1", "#b9c1ad"],
    layers: [
      { y: 0.35, amp: 0.15, color: "#6d7a5c", peak: { x: 0.5, h: 0.2, s: 0.18 } },
      { y: 0.6, amp: 0.1, color: "#4b5a3d" },
      { y: 0.85, amp: 0.05, color: "#2f3b26" },
    ],
    canopyLayer: 2,
    mist: 0.6,
  }),
  "attraction-liptons-seat": landscape({
    w: W, h: H, seed: 202,
    sky: ["#f3efe6", "#e8e2d4", "#dde3da"],
    glow: { x: 0.7, y: 0.35, r: 0.4, color: "#fff4dc", o: 0.8 },
    layers: [
      { y: 0.45, amp: 0.06, color: "#b7bdae" },
      { y: 0.55, amp: 0.08, color: "#949c87" },
      { y: 0.68, amp: 0.07, color: "#6b7a59" },
      { y: 0.85, amp: 0.04, color: "#46573a" },
    ],
    mist: 0.7,
  }),
  "attraction-adisham": landscape({
    w: W, h: H, seed: 303,
    sky: ["#dfe2d6", "#c9cdb9", "#b3b99f"],
    layers: [
      { y: 0.42, amp: 0.1, color: "#7c8569" },
      { y: 0.66, amp: 0.08, color: "#55613f" },
      { y: 0.88, amp: 0.03, color: "#3a4628" },
    ],
    canopyLayer: 2,
    mist: 0.5,
  }),
  "attraction-bambarakanda": landscape({
    w: W, h: H, seed: 404,
    sky: ["#c8cfc4", "#b4bdae", "#9faa95"],
    layers: [
      { y: 0.25, amp: 0.2, color: "#5a684b", peak: { x: 0.35, h: 0.15, s: 0.12 } },
      { y: 0.55, amp: 0.14, color: "#3f4e33" },
      { y: 0.85, amp: 0.06, color: "#26331d" },
    ],
    canopyLayer: 1,
    mist: 0.55,
  }),
};

await mkdir(OUT, { recursive: true });
for (const [name, svg] of Object.entries(plates)) {
  const file = path.join(OUT, `${name}.webp`);
  await sharp(Buffer.from(svg)).webp({ quality: 74 }).toFile(file);
  console.log("wrote", path.relative(process.cwd(), file));
}
