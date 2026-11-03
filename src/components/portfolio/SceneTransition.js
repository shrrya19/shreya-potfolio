import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function useSceneTransition() {
  const ref = useRef(null);

  useEffect(() => {
    if (
      !ref.current ||
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const targets = ref.current.querySelectorAll("[data-scene-reveal]");
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: 34, rotateX: 2 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, ref);

    return () => context.revert();
  }, []);

  return ref;
}
