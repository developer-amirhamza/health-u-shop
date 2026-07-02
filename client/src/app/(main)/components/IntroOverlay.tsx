"use client";
import { useEffect, useRef, useState } from "react";

// Water-droplet intro on a dark brand panel. Plays the full sequence FIRST,
// then the panel slides UP like a window opening to reveal the homepage
// (which is already rendered behind it — no load-speed cost).
//
// Reliability: the visuals + reveal run on pure CSS by default, so it ALWAYS
// shows even if GSAP isn't installed. When GSAP is available it takes over the
// timeline for smoother control (the `.gsap-on` class disables the CSS version).
//
// Once per session · skippable · reduced-motion aware · SR-safe.
// Brand: dark #1a1a18 · water teal #e9dcc8 · logo coral #C9573F · sand #c9b89a
const SESSION_KEY = "aidble_intro_seen";
const SEQUENCE_MS = 6200;   // sequence length before the reveal (6–10s range)
const REVEAL_MS = 900;      // window-open slide-up duration

export default function IntroOverlay() {
  const [show, setShow] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<any>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const done = useRef(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = true;
    }
    if (seen) return;

    setShow(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const holdMs = prefersReduced ? 1200 : SEQUENCE_MS;

    // Baseline (works without GSAP): reveal after the hold, unmount after slide.
    timers.current.push(setTimeout(() => triggerReveal(), holdMs));

    // Optional GSAP enhancement of the intro visuals (not the reveal).
    if (!prefersReduced) {
      (async () => {
        try {
          const root = rootRef.current;
          if (!root) return;
          const gsap = (await import("gsap")).default;
          if (done.current || !root) return;
          root.classList.add("gsap-on"); // disables the CSS keyframe version
          const qa = (s: string) => root.querySelectorAll(s);
          const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
          tl.fromTo(".intro-droplet", { y: -140, scaleY: 1.4, autoAlpha: 1 },
              { y: 90, scaleY: 1.1, duration: 0.8, ease: "power2.in" })
            .to(".intro-droplet", { scaleY: 0.3, autoAlpha: 0, duration: 0.15 })
            .fromTo(qa(".intro-splash .p"), { y: 18, scale: 0.4, autoAlpha: 0 },
              { y: -28, scale: 1, autoAlpha: 1, duration: 0.28, stagger: 0.03 }, "-=0.1")
            .to(qa(".intro-splash .p"), { y: 8, scale: 0.3, autoAlpha: 0, duration: 0.4, stagger: 0.03 })
            .fromTo(qa(".intro-ripple .r"),
              { scale: 0.3, autoAlpha: 0, transformOrigin: "100px 175px" },
              { scale: 1.25, autoAlpha: 0.7, duration: 0.9, stagger: 0.1 }, "-=0.5")
            .to(qa(".intro-ripple .r"), { autoAlpha: 0, duration: 0.4 }, "-=0.4")
            .fromTo(".intro-logo", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, "-=0.2")
            .fromTo(".intro-underline", { scaleX: 0 }, { scaleX: 1, duration: 0.6, transformOrigin: "left" }, "-=0.2");
          tlRef.current = tl;
        } catch {
          // GSAP missing → the CSS keyframe version already handles everything.
        }
      })();
    }

    return () => {
      done.current = true;
      document.body.style.overflow = prevOverflow;
      timers.current.forEach(clearTimeout);
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
        <svg className="intro-stage" viewBox="0 0 200 260" width="200" height="260">
          <g className="intro-droplet">
            <ellipse cx="100" cy="70" rx="9" ry="15" fill="#e9dcc8" />
          </g>
          <g className="intro-splash" stroke="#e9dcc8" strokeWidth="4" fill="#e9dcc8">
            <circle className="p p1" cx="100" cy="150" r="6" />
            <circle className="p p2" cx="70" cy="152" r="5" />
            <circle className="p p3" cx="130" cy="152" r="5" />
            <circle className="p p4" cx="85" cy="142" r="4" />
            <circle className="p p5" cx="118" cy="142" r="4" />
          </g>
          <g className="intro-ripple" fill="none" stroke="#e9dcc8" strokeWidth="3">
            <ellipse className="r r1" cx="100" cy="175" rx="30" ry="9" />
            <ellipse className="r r2" cx="100" cy="175" rx="52" ry="15" />
          </g>
        </svg>

        <div className="intro-logo">
          <div className="intro-word-row">
            <span className="intro-wordmark">Aidble</span>
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
  position:fixed; inset:0; z-index:9999;
  background:#AB8B77;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  cursor:pointer; will-change:transform;
  transform:translateY(0);
}
/* Window-open reveal: the dark panel slides up to uncover the site. */
.intro-panel.intro-reveal{
  transform:translateY(-100%);
  transition:transform ${REVEAL_MS}ms cubic-bezier(.4,0,.2,1);
}
.intro-stage{ overflow:visible; }

/* ── CSS keyframe animation (default; disabled when .gsap-on is present) ── */
.intro-droplet{ opacity:0; transform-origin:100px 0; }
.intro-splash .p{ opacity:0; }
.intro-ripple .r{ opacity:0; transform-origin:100px 175px; }
.intro-logo{
  position:absolute; display:flex; flex-direction:column; align-items:center; gap:8px;
  opacity:0;
}
.intro-underline{ display:block; width:120px; height:3px; background:#c9b89a; border-radius:2px; transform:scaleX(0); transform-origin:left; }

:not(.gsap-on) .intro-droplet{ animation:drop .8s cubic-bezier(.55,0,.85,.3) forwards; }
@keyframes drop{
  0%{ transform:translateY(-140px) scaleY(1.4); opacity:1 }
  85%{ transform:translateY(80px) scaleY(1.1); opacity:1 }
  100%{ transform:translateY(90px) scaleY(.3); opacity:0 }
}
:not(.gsap-on) .intro-splash .p{ animation:splash .6s ease-out .7s forwards; }
:not(.gsap-on) .intro-splash .p2{ animation-delay:.73s }
:not(.gsap-on) .intro-splash .p3{ animation-delay:.73s }
:not(.gsap-on) .intro-splash .p4{ animation-delay:.76s }
:not(.gsap-on) .intro-splash .p5{ animation-delay:.76s }
@keyframes splash{
  0%{ opacity:0; transform:translateY(18px) scale(.4) }
  45%{ opacity:1; transform:translateY(-28px) scale(1) }
  100%{ opacity:0; transform:translateY(8px) scale(.3) }
}
:not(.gsap-on) .intro-ripple .r1{ animation:ripple 1s ease-out .8s forwards; }
:not(.gsap-on) .intro-ripple .r2{ animation:ripple 1.1s ease-out .9s forwards; }
@keyframes ripple{
  0%{ opacity:0; transform:scale(.3) }
  35%{ opacity:.7 }
  100%{ opacity:0; transform:scale(1.25) }
}
:not(.gsap-on) .intro-logo{ animation:logo-in .6s ease 1.7s forwards; }
@keyframes logo-in{ from{opacity:0; transform:translateY(12px)} to{opacity:1; transform:translateY(0)} }
:not(.gsap-on) .intro-underline{ animation:underline .6s ease 2.1s forwards; }
@keyframes underline{ from{transform:scaleX(0)} to{transform:scaleX(1)} }

.intro-word-row{ display:flex; align-items:flex-start; gap:6px; }
.intro-wordmark{
  font-family:var(--font-serif,Georgia),serif;
  font-size:64px; font-weight:700; color:#C9573F; letter-spacing:-1px; line-height:1;
}
.intro-dot{ width:11px; height:11px; border-radius:50%; background:#e9dcc8; margin-top:8px; }


.intro-tagline{ color:#c9b89a; font-size:14px; letter-spacing:.5px; }

.intro-skip{
  position:absolute; bottom:28px; right:28px;
  background:rgba(255,255,255,.08); color:#ff2100;
  border:1px solid rgba(255,255,255,.2); border-radius:999px;
  padding:8px 18px; font-size:13px; font-weight:600; cursor:pointer; z-index:2;
}
.intro-skip:hover{ background:rgba(255,255,255,.16); }
.intro-skip:focus-visible{ outline:3px solid #e9dcc8; outline-offset:2px; }

@media (max-width:640px){
  .intro-wordmark{ font-size:48px; }
  .intro-stage{ width:160px; height:210px; }
}

/* Reduced motion: no splash — logo shows immediately. */
@media (prefers-reduced-motion: reduce){
  :not(.gsap-on) .intro-droplet,
  :not(.gsap-on) .intro-splash .p,
  :not(.gsap-on) .intro-ripple .r{ animation:none !important; opacity:0 !important; }
  :not(.gsap-on) .intro-logo{ animation:logo-in .3s ease 0s forwards; }
  :not(.gsap-on) .intro-underline{ animation:underline .3s ease .2s forwards; }
}
`;