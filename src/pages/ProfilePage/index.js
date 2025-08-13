import React, { Component } from 'react';
import { NavLink, useNavigate } from "react-router-dom";


import { getUser } from '../../api';

import './index.css';


function withNavigation(Component) {
  return function Wrapper(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class ProfilePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
    }

    componentDidMount = async () => {
        const response = await getUser();
        this.setState({ user: response.user });
    }

    logout = () => {
        localStorage.clear();
        this.props.setToken(null);  // update App state to logged out
        this.props.navigate('/login'); // redirect to login
    }
    render(){
        const { username, avatarUrl, balance, totalIncome, totalSpend } = this.state.user;
        return(
            <>    
                <NavLink to={`/dashboard/${username}`} className="nav-back-button">         
                        ← Back
                </NavLink>
                <div className='user-profile-wrapper'>
                    <div>
                        <img src={avatarUrl} className='avatar-profile-page'/>
                        <p className='username-profile-page'>{username}</p>
                    </div>
                    <p className='balance-profile-page'>balance: {balance}</p>
                    <p className='total-spending-profile-page'>total spending: {totalSpend} </p>
                    <p className='total-income-profile-page'>total income: {totalIncome} </p>

                    <button type="button" onClick={this.logout}>logout</button>
                </div>
            </>
        )
    }
}

export default withNavigation(ProfilePage);