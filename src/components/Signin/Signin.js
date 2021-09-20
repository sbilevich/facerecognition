import React from 'react'
import 'tachyons'

const Signin = ({onSignin}) => {
    
    return (
        <article class="center mw5 ba b--black-10 mv4" style={{background: 'rgba(256, 256, 256, 25%)'}}>
            <main class="pa4 black-80">
                <form class="measure">
                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                        <legend class="f4 fw6 ph0 mh0 left">Sign In</legend>
                        <div class="mt3">
                            <label class="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div class="mv3">
                            <label class="db fw6 lh-copy f6" for="password">Password</label>
                            <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                    </fieldset>
                    <div class="">
                    <input onClick={onSignin} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                    </div>
                    <div class="lh-copy mt3">
                    <a href="#0" class="f6 link dim black db">Register</a>
                    </div>
                </form>
            </main>
        </article>
    )
}

export default Signin