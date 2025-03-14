import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ProfileAnimation = () => {
    useGSAP(() => {
            const tl = gsap.timeline()
            tl.from('.firstCard', {
                x:100,
                opacity:0,
                duration:1
            })
            tl.from('.secondCard', {
                x:100,
                opacity:0,
                duration:1
            },'-=0.8')
            tl.from('.thirdCard', {
                x:100,
                opacity:0,
                duration:1
            },'-=0.9')
        })
  return null
}

export default ProfileAnimation
