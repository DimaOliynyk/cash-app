import React, { Component } from 'react';

import './index.css'
import logo from '../../images/brand-logo.png';

export default class RegisterPage extends Component{
    render(){
        return(
            <>
                <main className='RegisterPage-main'>
                    <img src={logo} className='GetStartedPage-logo' />

                    <div className='RegisterPage-inputs'>
                        <form>
                            <p>Name*</p>
                            <input type='text' placeholder='Enter your name..'/>

                            <p>Email*</p>
                            <input type='text' placeholder='email@domain.com'/>

                            <p>Password*</p>
                            <input type='text' placeholder='*******'/>
                        </form>

                        <button>Register</button>
                    </div>
                </main>
            </>
        )
    }
}