"use client";
import { useEffect, useRef, useState } from "react";

// GSAP-driven water-droplet intro. The full sequence plays on a dark brand
// panel FIRST; the homepage sits ready behind it (no load-speed cost). When the
// sequence ends, the panel slides UP like a window opening to reveal the site.
//
// Plays once per session · skippable · reduced-motion aware · SR-safe ·
// graceful fallback (if GSAP fails to load, the panel still reveals — never blank).
//
// Brand: dark #1a1a18 · water teal #2E7D71 · logo coral #C9573F · sand #c9b89a
const SESSION_KEY = "aidble_intro_seen";
// Total sequence length before the reveal begins (kept in the 6–10s range).
const SEQUENCE_S = 6.2;

export default function IntroOverlay() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<any>(null);
  const revealing = useRef(false);

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
    let cancelled = false;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      const root = rootRef.current;
      if (!root) return;
      try {
        const gsap = (await import("gsap")).default;
        if (cancelled || !root) return;
        const q = (sel: string) => root.querySelector(sel);
        const qa = (sel: string) => root.querySelectorAll(sel);

        if (prefersReduced) {
          // Reduced motion: no splash — quick logo fade, then reveal.
          const tl = gsap.timeline({ onComplete: cleanup });
          tl.set([".intro-droplet", ".intro-splash", ".intro-ripple"], { autoAlpha: 0 })
            .fromTo(".intro-logo", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
            .to(".intro-panel", { yPercent: -100, duration: 0.6, ease: "power2.inOut" }, "+=0.8");
          tlRef.current = tl;
          return;
        }

        // Full timeline (~6.2s) → then the window-open reveal.
        const tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: cleanup });

        // 1) Droplet falls and stretches into impact.
        tl.fromTo(".intro-droplet", { y: -140, scaleY: 1.4, autoAlpha: 1 },
          { y: 90, scaleY: 1.1, duration: 0.8, ease: "power2.in" })
          .to(".intro-droplet", { scaleY: 0.3, autoAlpha: 0, duration: 0.15 });

        // 2) Splash particles burst up, then fall back (soak).
        tl.fromTo(qa(".intro-splash .p"),
          { y: 18, scale: 0.4, autoAlpha: 0 },
          { y: -28, scale: 1, autoAlpha: 1, duration: 0.28, stagger: 0.03 }, "-=0.1")
          .to(qa(".intro-splash .p"), { y: 8, scale: 0.3, autoAlpha: 0, duration: 0.4, stagger: 0.03 });

        // 3) Ripples expand and fade — surface goes dry.
        tl.fromTo(qa(".intro-ripple .r"),
          { scale: 0.3, autoAlpha: 0, transformOrigin: "100px 175px" },
          { scale: 1.25, autoAlpha: 0.7, duration: 0.9, stagger: 0.1 }, "-=0.5")
          .to(qa(".intro-ripple .r"), { autoAlpha: 0, duration: 0.4 }, "-=0.4");

        // 4) Logo appears clean & dry, holds on screen.
        tl.fromTo(".intro-logo", { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 }, "-=0.2")
          .fromTo(".intro-underline", { scaleX: 0 }, { scaleX: 1, duration: 0.6, transformOrigin: "left" }, "-=0.2");

        // Hold so the whole sequence lands in the 6–10s window.
        tl.to({}, { duration: Math.max(0, SEQUENCE_S - tl.duration()) });

        // 5) Reveal: the panel slides UP like a window opening.
        tl.to(".intro-panel", { yPercent: -100, duration: 0.9, ease: "power3.inOut" });

        tlRef.current = tl;
      } catch {
        // GSAP unavailable → don't leave a blank panel. Reveal after a beat.
        setTimeout(cleanup, 1200);
      }
    })();

    function cleanup() {
      if (cancelled) return;
      document.body.style.overflow = prevOverflow;
      setShow(false);
    }

    return () => {
      cancelled = true;
      document.body.style.overflow = prevOverflow;
      try {
        tlRef.current?.kill?.();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const skip = async () => {
    if (revealing.current) return;
    revealing.current = true;
    try {
      const gsap = (await import("gsap")).default;
      tlRef.current?.kill?.();
      gsap.to(".intro-panel", {
        yPercent: -100,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          document.body.style.overflow = "";
          setShow(false);
        },
      });
    } catch {
      document.body.style.overflow = "";
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div ref={rootRef} aria-hidden="true">
      <style>{introStyles}</style>
      <div className="intro-panel" onClick={skip}>
        <svg className="intro-stage" viewBox="0 0 200 260" width="200" height="260">
          <g className="intro-droplet">
            <ellipse cx="100" cy="70" rx="9" ry="15" fill="#2E7D71" />
          </g>
          <g className="intro-splash" stroke="#2E7D71" strokeWidth="4" fill="#2E7D71">
            <circle className="p" cx="100" cy="150" r="6" />
            <circle className="p" cx="70" cy="152" r="5" />
            <circle className="p" cx="130" cy="152" r="5" />
            <circle className="p" cx="85" cy="142" r="4" />
            <circle className="p" cx="118" cy="142" r="4" />
          </g>
          <g className="intro-ripple" fill="none" stroke="#2E7D71" strokeWidth="3">
            <ellipse className="r" cx="100" cy="175" rx="30" ry="9" />
            <ellipse className="r" cx="100" cy="175" rx="52" ry="15" />
          </g>
        </svg>

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
            skip();
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
  background:#1a1a18;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  cursor:pointer; will-change:transform;
}
.intro-stage{ overflow:visible; }
.intro-droplet{ opacity:0; }
.intro-splash .p{ opacity:0; }
.intro-ripple .r{ opacity:0; }

.intro-logo{
  position:absolute; display:flex; flex-direction:column; align-items:center; gap:8px;
  opacity:0;
}
.intro-word-row{ display:flex; align-items:flex-start; gap:6px; }
.intro-wordmark{
  font-family:var(--font-serif,Georgia),serif;
  font-size:64px; font-weight:700; color:#C9573F; letter-spacing:-1px; line-height:1;
}
.intro-dot{ width:11px; height:11px; border-radius:50%; background:#2E7D71; margin-top:8px; }
.intro-underline{ display:block; width:120px; height:3px; background:#c9b89a; border-radius:2px; transform:scaleX(0); }
.intro-tagline{ color:#c9b89a; font-size:14px; letter-spacing:.5px; }

.intro-skip{
  position:absolute; bottom:28px; right:28px;
  background:rgba(255,255,255,.08); color:#e5e5e5;
  border:1px solid rgba(255,255,255,.2); border-radius:999px;
  padding:8px 18px; font-size:13px; font-weight:600; cursor:pointer;
}
.intro-skip:hover{ background:rgba(255,255,255,.16); }
.intro-skip:focus-visible{ outline:3px solid #2E7D71; outline-offset:2px; }

@media (max-width:640px){
  .intro-wordmark{ font-size:48px; }
  .intro-stage{ width:160px; height:210px; }
}
`;