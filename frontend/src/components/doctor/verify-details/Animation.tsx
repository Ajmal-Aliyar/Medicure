import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const Animation = () => {
    useGSAP(() => {

        const tl = gsap.timeline();

        tl.from('.anime-text', {
          y: 80,
          opacity: 0,
          stagger: 0.1,
        });

        tl.from('.anime-button', {
          opacity: 0,
        });
        
      });
  return null
}

export default Animation
