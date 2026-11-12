import { useEffect } from 'react';

// Update favicon based on the user's OS theme preference in real-time. Works across all browsers
const useUpdateFavIcon = () => {
  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');

    const updateFavicon = (e: MediaQueryList | MediaQueryListEvent) => {
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");

      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }

      link.href = e.matches ? '/wolf_logo_dark.svg' : '/wolf_logo_light.svg';
    };

    // Set initial icon on page load
    updateFavicon(matcher);

    // Listen for OS theme changes in real-time
    matcher.addEventListener('change', updateFavicon);
    return () => matcher.removeEventListener('change', updateFavicon);
  }, []);
};

export default useUpdateFavIcon;
