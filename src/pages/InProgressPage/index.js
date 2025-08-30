import React, { Component } from 'react';

import './index.css';
import Footer from '../../components/Footer';

export default class InProgressPage extends Component{
    render(){
        if (!this.props.user) {
            return <p>Loading...</p>; // user not fetched yet
        }
        return(
            <>
                <p className='inprogress-text'>this page is in progress</p>

                <Footer user={this.props.user}/>
            </>
        )
    }
}