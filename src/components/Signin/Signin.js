import React, { useState } from 'react'
import './Signin.css'
import 'tachyons'

const Signin = ({ onSignin, onRegistration }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(); // { message: 'Some error' }

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSignin = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('https://safe-coast-47748.herokuapp.com/sign-in', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }
            })
            const result = await response.json()
            if (response.status === 200) {
                onSignin(result)
            } else {
                setError(result.error)
            }
        }
        catch (error) {
            setError(error);
        }
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{ background: 'rgba(255, 255, 255, 70%)' }}>
            <main className="pa4 black-80">
                <form onSubmit={handleSignin} className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                onChange={onEmailChange}
                                value={email}
                                className="pa2 input-reset ba bg-transparent w-100"
                                type="email" n
                                ame="email-address"
                                id="email-address"
                                required />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange={onPasswordChange}
                                value={password}
                                className="b pa2 input-reset ba bg-transparent w-100"
                                type="password"
                                name="password"
                                id="password"
                                required />
                        </div>
                        {error ? <div className="error">{error.message}</div> : ''}
                    </fieldset>
                    <div className="">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <a onClick={onRegistration} href="#0" className="f6 link dim black db">Register</a>
                    </div>
                </form>
            </main>
        </article>
    )
}

export default Signin