import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Animation() {

        useGSAP(() => {
            gsap.from('.card', {
                x: 300,
                opacity: 0,
                scale:0.8,
            })
        })
  return null
}

export default Animation
