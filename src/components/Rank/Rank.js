import React from 'react'
import 'tachyons'



const Rank = ({ user }) => {

    const { name, entries } = user;
    return (
        <div>
            <div className='f3'>
                {`${name}, your rank is ...`}
            </div>
            <div className='f1'>
                {`#${entries}`}
            </div>
        </div>
    )
}

export default Rank