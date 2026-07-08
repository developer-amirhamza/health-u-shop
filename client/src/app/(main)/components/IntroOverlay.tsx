"use client";
import { useEffect, useRef, useState } from "react";

// Falling water-drop intro. A gentle rain of drops falls and fades away on a
// dark brand panel; the logo settles in, then the panel slides up like a window
// opening to reveal the homepage (already rendered behind it — no load cost).
//
// Reliability first: drops + reveal run on pure CSS so it ALWAYS shows, even if
// GSAP isn't installed. When GSAP is present it enhances the logo entrance.
// Holds until the page has fully loaded (window "load") AND a minimum time.
//
// Brand: dark #1a1a18 · water teal #2E7D71 / #4FA99B · sand #c9b89a · coral #C9573F
const SESSION_KEY = "aidble_intro_seen";
const SEQUENCE_MS = 6000;   // minimum time the intro stays up
const REVEAL_MS = 900;      // window-open slide-up duration
const MAX_MS = 15000;       // safety cap — reveal even if load never fires

// Hand-tuned drop configs (no randomness → no hydration mismatch).
// left %, size px, delay s, duration s, colour, drift px
const DROPS = [
  { l: 8,  s: 14, d: 0.0, t: 2.4, c: "#2E7D71", x: -10 },
  { l: 18, s: 10, d: 0.9, t: 2.9, c: "#4FA99B", x: 8 },
  { l: 27, s: 18, d: 0.3, t: 2.2, c: "#2E7D71", x: -6 },
  { l: 36, s: 8,  d: 1.4, t: 3.1, c: "#c9b89a", x: 12 },
  { l: 44, s: 22, d: 0.6, t: 2.0, c: "#2E7D71", x: 0 },
  { l: 52, s: 12, d: 1.8, t: 2.7, c: "#4FA99B", x: -14 },
  { l: 60, s: 9,  d: 0.2, t: 3.3, c: "#c9b89a", x: 6 },
  { l: 68, s: 16, d: 1.1, t: 2.3, c: "#2E7D71", x: -8 },
  { l: 76, s: 11, d: 0.5, t: 2.8, c: "#4FA99B", x: 10 },
  { l: 84, s: 19, d: 1.6, t: 2.1, c: "#2E7D71", x: -4 },
  { l: 92, s: 10, d: 0.8, t: 3.0, c: "#c9b89a", x: 14 },
  { l: 13, s: 12, d: 2.2, t: 2.6, c: "#4FA99B", x: -12 },
  { l: 40, s: 9,  d: 2.5, t: 2.9, c: "#c9b89a", x: 4 },
  { l: 58, s: 15, d: 2.0, t: 2.4, c: "#2E7D71", x: -6 },
  { l: 72, s: 8,  d: 2.8, t: 3.2, c: "#4FA99B", x: 8 },
  { l: 30, s: 13, d: 3.0, t: 2.7, c: "#2E7D71", x: -10 },
];

export default function IntroOverlay() {
  const [show, setShow] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<any>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const done = useRef(false);

  useEffect(() => {
    // Dev: show on every load. Production: once per browser session.
    const isDev = process.env.NODE_ENV !== "production";
    if (!isDev) {
      let seen = false;
      try {
        seen = sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        seen = true;
      }
      if (seen) return;
    }

    setShow(true);
    if (!isDev) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const holdMs = prefersReduced ? 1200 : SEQUENCE_MS;

    // Reveal when BOTH the minimum time has elapsed AND the page is fully loaded.
    let minElapsed = false;
    let loaded = document.readyState === "complete";
    const maybeReveal = () => {
      if (minElapsed && loaded) triggerReveal();
    };
    timers.current.push(
      setTimeout(() => {
        minElapsed = true;
        maybeReveal();
      }, holdMs)
    );
    const onLoad = () => {
      loaded = true;
      maybeReveal();
    };
    if (!loaded) window.addEventListener("load", onLoad);
    timers.current.push(setTimeout(() => triggerReveal(), MAX_MS));

    // Optional GSAP enhancement of the logo entrance (drops stay on CSS).
    if (!prefersReduced) {
      (async () => {
        try {
          const root = rootRef.current;
          if (!root) return;
          const gsap = (await import("gsap")).default;
          if (done.current || !root) return;
          root.classList.add("gsap-on");
          gsap.timeline({ defaults: { ease: "power3.out" }, delay: 1.6 })
            .fromTo(root.querySelector(".intro-logo"),
              { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 })
            .fromTo(root.querySelector(".intro-underline"),
              { scaleX: 0 }, { scaleX: 1, duration: 0.7, transformOrigin: "left" }, "-=0.4")
            .fromTo(root.querySelector(".intro-tagline"),
              { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, "-=0.3");
          tlRef.current = gsap.globalTimeline;
        } catch {
          // GSAP missing → CSS logo animation already handles it.
        }
      })();
    }

    return () => {
      done.current = true;
      document.body.style.overflow = prevOverflow;
      timers.current.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
      try {
        tlRef.current?.kill?.();
      } catch {
        /* ignore */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerReveal = () => {
    if (done.current) return;
    setRevealing(true);
    timers.current.push(
      setTimeout(() => {
        done.current = true;
        document.body.style.overflow = "";
        setShow(false);
      }, REVEAL_MS)
    );
  };

  if (!show) return null;

  return (
    <div ref={rootRef} aria-hidden="true">
      <style>{introStyles}</style>
      <div className={`intro-panel ${revealing ? "intro-reveal" : ""}`} onClick={triggerReveal}>
        {/* Falling drop rain */}
        <div className="intro-rain">
          {DROPS.map((d, i) => (
            <span
              key={i}
              className="drop"
              style={{
                left: `${d.l}%`,
                width: `${d.s}px`,
                height: `${d.s * 1.35}px`,
                background: d.c,
                // @ts-expect-error CSS custom props
                "--delay": `${d.d}s`,
                "--dur": `${d.t}s`,
                "--drift": `${d.x}px`,
              }}
            />
          ))}
        </div>

        {/* Logo settles in, clean and dry */}
        <div className="intro-logo">
          <div className="intro-word-row">
            <span className="intro-wordmark">bestiee</span>
            <span className="intro-dot" />
          </div>
          <span className="intro-underline" />
          <span className="intro-tagline">soft · dry · confident</span>
        </div>

        <button
          type="button"
          className="intro-skip"
          aria-label="Skip intro animation"
          onClick={(e) => {
            e.stopPropagation();
            triggerReveal();
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

const introStyles = `
.intro-panel{
  position:fixed; inset:0; z-index:9999; overflow:hidden;
  background:radial-gradient(120% 90% at 50% 10%, #24322e 0%, #1a1a18 55%, #141412 100%);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  cursor:pointer; will-change:transform; transform:translateY(0);
}
.intro-panel.intro-reveal{
  transform:translateY(-100%);
  transition:transform ${REVEAL_MS}ms cubic-bezier(.4,0,.2,1);
}

/* ── Falling drops (teardrop shape, fall + fade) ── */
.intro-rain{ position:absolute; inset:0; }
.drop{
  position:absolute; top:-6%;
  border-radius:50% 50% 50% 50% / 62% 62% 38% 38%;
  filter:drop-shadow(0 0 6px rgba(79,169,155,.35));
  opacity:0;
  animation:dropfall var(--dur,2.6s) linear var(--delay,0s) infinite;
}
@keyframes dropfall{
  0%{ transform:translate3d(0,-12vh,0) scaleY(1.35); opacity:0 }
  8%{ opacity:.95 }
  70%{ opacity:.85 }
  100%{ transform:translate3d(var(--drift,0),112vh,0) scaleY(1); opacity:0 }
}
/* As the logo arrives, the rain gently fades back so the logo leads. */
.intro-rain{ animation:rain-dim 1s ease 4s forwards; }
@keyframes rain-dim{ to{ opacity:.28 } }

/* ── Logo ── */
.intro-logo{
  position:absolute; display:flex; flex-direction:column; align-items:center; gap:8px;
  opacity:0;
}
.intro-underline{ display:block; width:120px; height:3px; background:#c9b89a; border-radius:2px; transform:scaleX(0); transform-origin:left; }
.intro-tagline{ color:#c9b89a; font-size:14px; letter-spacing:.5px; opacity:0; }

/* CSS logo animation (default; disabled when GSAP takes over via .gsap-on) */
:not(.gsap-on) .intro-logo{ animation:logo-in .8s ease 1.8s forwards; }
:not(.gsap-on) .intro-underline{ animation:underline .7s ease 2.4s forwards; }
:not(.gsap-on) .intro-tagline{ animation:fade-in .6s ease 2.7s forwards; }
@keyframes logo-in{ from{opacity:0; transform:translateY(16px)} to{opacity:1; transform:translateY(0)} }
@keyframes underline{ from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes fade-in{ from{opacity:0} to{opacity:1} }

.intro-word-row{ display:flex; align-items:flex-start; gap:6px; }
.intro-wordmark{
  font-family:var(--font-serif,Georgia),serif;
  font-size:64px; font-weight:700; color:#C9573F; letter-spacing:-1px; line-height:1;
}
.intro-dot{ width:11px; height:11px; border-radius:50%; background:#2E7D71; margin-top:8px; }

.intro-skip{
  position:absolute; bottom:28px; right:28px; z-index:2;
  background:rgba(255,255,255,.08); color:#e5e5e5;
  border:1px solid rgba(255,255,255,.2); border-radius:999px;
  padding:8px 18px; font-size:13px; font-weight:600; cursor:pointer;
}
.intro-skip:hover{ background:rgba(255,255,255,.16); }
.intro-skip:focus-visible{ outline:3px solid #2E7D71; outline-offset:2px; }

@media (max-width:640px){ .intro-wordmark{ font-size:48px; } }

/* Reduced motion: no rain — just the logo, quickly. */
@media (prefers-reduced-motion: reduce){
  .drop{ animation:none !important; opacity:0 !important; }
  .intro-rain{ animation:none !important; }
  :not(.gsap-on) .intro-logo{ animation:logo-in .3s ease 0s forwards; }
  :not(.gsap-on) .intro-underline{ animation:underline .3s ease .2s forwards; }
  :not(.gsap-on) .intro-tagline{ animation:fade-in .3s ease .3s forwards; }
}
`;
