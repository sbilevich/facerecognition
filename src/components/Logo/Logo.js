import React from 'react'
import 'tachyons'
import Tilt from 'react-parallax-tilt'
import brain from './brain.png'
import './Logo.css'


const Logo = () => {
    return (
        <Tilt>
            <img src={brain} />
        </Tilt>
    )
}

export default Logo