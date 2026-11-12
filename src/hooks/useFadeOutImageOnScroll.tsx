import { useEffect } from 'react';

interface UseFadeOutImageOnScrollProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  imageWrapperRef: React.RefObject<HTMLDivElement | null>;
}

// Intersection Observer hook to fade out the hero image as the user scrolls down.
const useFadeOutImageOnScroll = ({
  heroRef,
  imageWrapperRef,
}: UseFadeOutImageOnScrollProps) => {
  useEffect(() => {
    const heroEl = heroRef.current;
    const imgWrapEl = imageWrapperRef.current;

    const aspectRatio = window.innerWidth / window.innerHeight;
    const isWindowASmallSquare =
      window.innerWidth <= 768 &&
      window.innerHeight <= 768 &&
      aspectRatio >= 0.75 && // Check if the window is approximately
      aspectRatio <= 1.33; // a square (between 3:4 and 4:3 aspect ratio).
    const exceptionallySmallWindow =
      window.innerWidth <= 576 && window.innerHeight <= 576;
    const isWindowWideAndHasAnUnusuallySmallHeight =
      window.innerWidth <= 896 && window.innerHeight <= 448;

    const noFadeOut =
      isWindowASmallSquare ||
      exceptionallySmallWindow ||
      isWindowWideAndHasAnUnusuallySmallHeight;

    if (!heroEl || !imgWrapEl || noFadeOut) return;

    // Create 100 threshold steps between 0.0 and 1.0 (0.01 increments)
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.intersectionRatio goes from 1.0 (fully in view) to 0.0 (fully scrolled out)
        if (imgWrapEl) {
          imgWrapEl.style.opacity = entry.intersectionRatio.toString();
        }
      },
      {
        threshold: thresholds,
      },
    );

    observer.observe(heroEl);

    return () => {
      observer.disconnect();
    };
  }, [heroRef, imageWrapperRef]);
};

export default useFadeOutImageOnScroll;
