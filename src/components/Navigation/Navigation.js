
import React from 'react'
import 'tachyons'

const Navigation = ({route, onSignToggle}) => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p style={{margin:'0'}}
                onClick={() => {onSignToggle(route)}}
                className="f3 link dim black underline pa3 pointer white">
                    {route === 'signin' ? 'Sign in' : 'Sign Out'}
            </p>
        </nav>
    )}

export default Navigation