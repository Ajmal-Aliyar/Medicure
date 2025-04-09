import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ProfileAnimation = () => {
    useGSAP(() => {
            const tl = gsap.timeline()
            tl.from('.firstCard', {
                x:50,
                opacity:0,
                duration:'0.5'
            })
            tl.from('.secondCard', {
                x:50,
                opacity:0,
                duration:'0.5'
            },'-=0.4')
            tl.from('.thirdCard', {
                x:50,
                opacity:0,
                duration:'0.5'
            },'-=0.45')
        })
  return null
}

export default ProfileAnimation
