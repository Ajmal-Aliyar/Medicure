import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AuthAnimations = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.auth', {
      opacity: 0,
      x: -100,
      duration: 1.2,
    }, 'anime1');
    tl.from('.form', {
      opacity: 0,
      x: 100,
      duration: 1.2,
    }, 'anime1');
    tl.from('.left-badge', {
      scale: 0,
      opacity: 0,
      y: -100,
      delay: -0.2,
      duration: 2,
      ease: 'power3.out',
    }, 'anime2')
    .from('.right-badge', {
      scale: 0,
      opacity: 0,
      y: 100,
      duration: 2,
      delay: -0.2,
      ease: 'power3.out',
    }, 'anime2');
  });
  return null; 
};

export default AuthAnimations;
