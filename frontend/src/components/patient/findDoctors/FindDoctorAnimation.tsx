import { useEffect } from 'react';
import gsap from 'gsap';

const FindDoctorAnimation = () => {
    useEffect(() => {
        const tl = gsap.timeline();
        tl.from('.translateLeft', {
            x: -100,
            duration: 1,
            stagger: 0.3,
            opacity: 0,
            ease: 'sine.out'
        }, 'translateX')
            .from('.translateRight', {
                x: 300,
                duration: 1,
                opacity: 0,
                ease: 'sine.out'
            }, 'translateX')
            .from('.translateUp', {
                x: 80,
                scale: 0.99,
                duration: 1,
                ease: 'sine.out'
            }, 'translateX');


    }, []);

    return null;
};

export default FindDoctorAnimation;
