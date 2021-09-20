import React from 'react'
import 'tachyons'
import Tilt from'react-parallax-tilt'
import brain from './brain.png'
import './Logo.css'


const Logo = () => {
    return (
        <div style={{display:'flex', justifyContent:'flex-start'}}>
            <Tilt>
                <div style={{ height: '150px', weight: '150px' }}>
                    <h1><img src={brain}/></h1>
                </div>
            </Tilt>
        </div>  
    )
}

export default Logo