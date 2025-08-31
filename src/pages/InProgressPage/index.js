import { Component } from 'react';

import Footer from '../../components/Footer';

import './index.css';

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