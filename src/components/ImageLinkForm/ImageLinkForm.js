import React from 'react'
import 'tachyons'
import './ImageLinkForm.css'


const ImageLinkForm = ({ onModifyInput, onSubmit }) => {
    return (
        <div className='f3'>
            <p>
                {'This magic brain will detect faces on your image. Give it a try'}
            </p>
            <div className='pa4 br3 shadow-5 center form'>
                <input className='p4 pa2 w-70 center input'type='text' onChange={onModifyInput}/>
                <button className='w-30 grow btn-grad'onClick={onSubmit}>Detect</button>
         
            </div>
        </div>  
    )
}

export default ImageLinkForm