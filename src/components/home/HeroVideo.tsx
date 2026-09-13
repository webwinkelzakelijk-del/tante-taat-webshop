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
    video.addEventListener("pause", play);
    video.addEventListener("ended", play);
    document.addEventListener("visibilitychange", play);
    window.addEventListener("pointerdown", play, { once: true });
    window.addEventListener("touchstart", play, { once: true });

    return () => {
      video.removeEventListener("pause", play);
      video.removeEventListener("ended", play);
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pointerdown", play);
      window.removeEventListener("touchstart", play);
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
