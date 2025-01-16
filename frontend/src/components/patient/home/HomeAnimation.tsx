import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HomeAnimation = () => {
    useGSAP(() => {
        const tl = gsap.timeline()
        tl.from('.hero-text',{
            x: -200,
            opacity: 0,
            duration: 0.7
        },'anime1')
        tl.from('.hero-sub-text',{
            x: -200,
            opacity: 0,
            delay:0.2,
            duration: 0.7
        },'anime1')
        tl.from('.doct-1', {
            y: 80,
            duration: 2
        },'anime1'); 
        tl.from('.doct-2', {
            y: 100,
            duration: 2
        },'anime1');
        tl.from('.top-badge',{
            opacity: 0,
            x:-100,
            scale:0.4,
            duration: 0.7,
        },'anime2')
        
        
        tl.to('.book-bar',{
            y:-50,
            duration:2,
            ease:'bounce'
        },'-=0.4')
        
        tl.to('.mid-img ',{
            scale:1.3,
            duration:1.8,
            ease:"back.out"
        },)
    });
  return null; 
};

export default HomeAnimation;
