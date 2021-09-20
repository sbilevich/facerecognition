
import React from 'react'
import 'tachyons'
import './FaceRecognition.css'

const FaceRecognition = ({ box, imageUrl} ) => {

    return (
        <div style={{width: '700px', height: 'auto', position:'relative'}} className='center'>
            <img id='inputImage' src={imageUrl} alt=''/>
            <div className='boundingBox' style={{top: box.topRow+'%', bottom: box.bottomRow+'%', left: box.leftCol+'%', right: box.rightCol+'%'}}></div>
        </div>
    )
}

export default FaceRecognition