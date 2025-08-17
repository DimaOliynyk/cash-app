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
            activeTab: "personal", // default active tab
        };
    }
    logout = () => {
        localStorage.clear();
        this.props.setToken(null);  // update App state to logged out
        this.props.navigate('/login'); // redirect to login
    }
    
    setActiveTab = (tab) => {
        this.setState({ activeTab: tab });
    };

    render(){
        if (!this.props.user) {
            return <p>Loading...</p>; // user not fetched yet
        }
    
        const { user } = this.props.user;
        const { username, avatarUrl, balance, totalIncome, totalSpend, firstName, lastName, email } = user;

        const { activeTab } = this.state;

        return(
            <div className="profile-page-wrapper">
                <div className="head-info-profile-page">
                    <div className="head-wrapper">
                        <h2>Settings</h2>
                        <NavLink to={`/dashboard/${username}`}>         
                            <img src={avatarUrl} className="user-image"/>
                       </NavLink> 
                    </div>

                    <div className="settings-variants">
                        <div
                            className={`personal-profile ${activeTab === "personal" ? "active" : ""}`}
                            onClick={() => this.setActiveTab("personal")}
                            >
                        <p>Personal Info</p>
                        </div>
                        <div
                            className={`login-security ${activeTab === "balance" ? "active" : ""}`}
                            onClick={() => this.setActiveTab("balance")}
                        >
                        <p>Balance & Transactions</p>
                        </div>
                    </div>
                    <hr/>
                </div>

                {activeTab === "personal" && (
                    <div className="personal-profile-info">
                        <div className="personal-info-container">
                            <div>
                                <h4>Username</h4>
                                <p>{username}</p>
                            </div>
                            <NavLink>Edit</NavLink>
                        </div>
                        <hr/>
                        <div className="personal-info-container">
                                <div>
                                    <h4>Password</h4>
                                    <p>****</p>
                                </div>
                                <NavLink>Edit</NavLink>
                            </div>
                            <hr/>
                        <div className="personal-info-container">
                                <div>
                                    <h4>Firstname</h4>
                                    <p>{firstName}</p>
                                </div>
                                <NavLink>Edit</NavLink>
                            </div>
                            <hr/>
                        <div className="personal-info-container">
                                <div>
                                    <h4>LastName</h4>
                                    <p>{lastName}</p>
                                </div>
                                <NavLink>Edit</NavLink>
                            </div>
                            <hr/>
                        <div className="personal-info-container">
                                <div>
                                    <h4>Email</h4>
                                    {email ? <p>{email}</p> : <p>none</p>}
                                </div>
                                <NavLink>Edit</NavLink>
                        </div>

                        <button type="button" onClick={this.logout} className="logout-button">logout</button>
                    </div>
                )}

                {activeTab === "balance" && (
                    <div className="personal-profile-info">
                        <div className="personal-info-container">
                            <div>
                                <h4>Total Balance</h4>
                                <p>{balance}$</p>
                            </div>
                        </div>
                        <hr/>
                        <div className="personal-info-container">
                                <div>
                                    <h4>Total Income</h4>
                                    <p>{totalIncome}$</p>
                                </div>
                            </div>
                            <hr/>
                        <div className="personal-info-container">
                                <div>
                                    <h4>Total Spend</h4>
                                    <p>{totalSpend}$</p>
                                </div>
                            </div>
                    </div>

                )}
            </div>
            // <div className="profile-wrapper">    
            //     <NavLink to={`/dashboard/${username}`} className="nav-back-button-profilepage">         
            //             ← Back
            //     </NavLink>
            //     <div className='user-profile-wrapper'>
            //         <div>
            //             <img src={avatarUrl} className='avatar-profile-page'/>
            //             <p className='username-profile-page'>{username}</p>
            //         </div>
            //         <p className='balance-profile-page'>balance: {balance}</p>
            //         <p className='total-spending-profile-page'>total spending: {totalSpend} </p>
            //         <p className='total-income-profile-page'>total income: {totalIncome} </p>

            //         <button type="button" onClick={this.logout}>logout</button>
            //     </div>
            // </div>
        )
    }
}

export default withNavigation(ProfilePage);