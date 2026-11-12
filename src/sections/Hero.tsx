import './Hero.scss';
import SlideUp from '../SlideUp';
import { RefObject } from 'react';
import { indigo } from '@mui/material/colors';
import heroImage from '../assets/hero_image.webp';
import HeroBgImage from '../assets/hero_bg.svg?react';
import { styled, Button, ButtonProps, useTheme } from '@mui/material';

interface HeroProps {
  logoImage: string;
  heroRef: RefObject<HTMLDivElement | null>;
  imageWrapperRef: RefObject<HTMLDivElement | null>;
}

const PrimaryButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 32,
  padding: '0.75rem 1.5rem',
  backgroundColor: indigo[900],
  color: theme.palette.getContrastText(indigo[900]),
  '&:hover': {
    backgroundColor: indigo[800],
  },
}));

const SecondaryButton = styled(Button)<ButtonProps>(() => ({
  padding: '0.75rem 1.75rem',
}));

const Hero = ({ logoImage, heroRef, imageWrapperRef }: HeroProps) => {
  const theme = useTheme();

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <section className="heroWrapper" ref={heroRef}>
      <header className="header">
        <SlideUp>
          <img
            src={logoImage}
            alt="Wolf logo"
            onClick={handleLogoClick}
            className="header__logo"
          />
        </SlideUp>
        <div className="headerContent">
          <SlideUp>
            <h2 className="header__title">MATÍAS FUENTES</h2>
          </SlideUp>
          <SlideUp delay={1}>
            <p className="header__subtitle text-muted">SOFTWARE ENGINEER</p>
          </SlideUp>
        </div>
      </header>
      <div className="hero">
        <div className="heroContent">
          <SlideUp>
            <h1>Where thoughtful software systems meets clean, modern code</h1>
          </SlideUp>
          <SlideUp delay={1}>
            <h3 className="text-muted">
              Over the past 8 years, I’ve operated at the intersection of robust
              system architecture and thoughtful product engineering, partnering
              with ambitious teams to turn complex technical challenges into
              scalable, reliable digital solutions.
            </h3>
          </SlideUp>
          <div className="heroBtnContainer">
            <SlideUp delay={2}>
              <PrimaryButton href="#projects">View my work</PrimaryButton>
            </SlideUp>
            <SlideUp delay={3}>
              <SecondaryButton href="#about-me">More about me</SecondaryButton>
            </SlideUp>
          </div>
        </div>
      </div>
      <div className="heroBgImageWrapper">
        <SlideUp>
          <HeroBgImage
            className={`heroBgImageWrapper__image ${theme.palette.mode === 'dark' ? 'heroBgImageWrapper__image--dark' : ''}`}
          />
        </SlideUp>
      </div>
      <div ref={imageWrapperRef} className="heroImageWrapper">
        <SlideUp>
          <img
            alt="Matías"
            src={heroImage}
            className="heroImageWrapper__image"
          />
        </SlideUp>
      </div>
    </section>
  );
};

export default Hero;
