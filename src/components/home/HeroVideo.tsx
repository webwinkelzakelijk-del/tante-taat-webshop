"use client";

import { useEffect, useRef } from "react";

/**
 * Hero-film: speelt altijd, geluidloos en in een loop. Browsers staan autoplay
 * alleen toe zonder geluid, dus muted is verplicht. Mocht de browser of het OS
 * de video toch pauzeren (tab-wissel, energiebesparing), dan starten we hem opnieuw.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const play = () => {
      video.muted = true;
      video.play().catch(() => {
        /* wordt opnieuw geprobeerd bij de eerstvolgende interactie */
      });
    };

    play();
    // Retry whenever the browser signals new data, and poll as a last resort:
    // a cached video can be "ready" before hydration, which sometimes loses the autoplay.
    const events = ["loadeddata", "canplay", "canplaythrough", "pause", "ended", "stalled"] as const;
    events.forEach((e) => video.addEventListener(e, play));
    document.addEventListener("visibilitychange", play);
    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("touchstart", play, { once: true });
    const timer = window.setInterval(() => {
      if (video.paused && document.visibilityState === "visible") play();
    }, 1500);

    return () => {
      events.forEach((e) => video.removeEventListener(e, play));
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("touchstart", play);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      controls={false}
      aria-label="Film uit het atelier van Tante Taat"
    />
  );
}
