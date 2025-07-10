import React, { Component } from 'react';
import { NavLink } from "react-router";

import './index.css'
import logo from '../../images/brand-logo.png';

export default class GetStartedPage extends Component{
    render(){
        return(
            <>
                <main className='GetStartedPage-main'>
                    <img src={logo} className='GetStartedPage-logo' />

                    <div className='GetStartedPage-buttons'>
                        <button>Continue with email</button>
                        <button>Continue with google</button>
                        <p>Already a member  
                                <NavLink to="/login">
                                    Login
                                </NavLink>
                        </p>
                    </div>
                </main>
            </>
        )
    }
}