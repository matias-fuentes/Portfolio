import { useRef } from 'react';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import { darkTheme, lightTheme } from './globals';
import useUpdateFavIcon from './hooks/useUpdateFavicon';
import wolfLogoDarkImage from './assets/wolf_logo_dark.svg';
import wolfLogoLightImage from './assets/wolf_logo_light.svg';
import useFadeOutImageOnScroll from './hooks/useFadeOutImageOnScroll';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';

function App() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  useFadeOutImageOnScroll({ heroRef, imageWrapperRef }); // Fade out the hero image as the user scrolls down.
  useUpdateFavIcon(); // Update favicon based on the user's OS theme preference in real-time. Works across all browsers.

  const theme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Hero
        heroRef={heroRef}
        imageWrapperRef={imageWrapperRef}
        logoImage={prefersDarkMode ? wolfLogoDarkImage : wolfLogoLightImage}
      />
      <Projects />
    </ThemeProvider>
  );
}

export default App;
