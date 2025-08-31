import React, { Component } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import axios from 'axios';

import { getUser } from '../../api';
import Footer from '../../components/Footer';

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
            isModalOpen: false,
            editValue: "",
            currentValue: ""
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

    openModal = (currentValue, value) => {
        this.setState({ isModalOpen: true, currentValue: currentValue});
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleChange = (e) => {
        this.setState({ editValue: e.target.value });
    };

    handleSave = async (nowValue) => {
        const { editValue } = this.state;
        const { currentValue } = this.state.currentValue
        const updates = {
            [currentValue]: editValue
        }
        
        try {
            const res = await axios.patch(`https://cash-app-server-cydp.onrender.com/api/auth/${this.props.user.user._id}`, {
                updates
            }, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            this.setState({ currentUser: res.data, isModalOpen: false });
        } catch (error) {
            console.error(error);
        }

        window.location.reload()
    };


    render(){
        if (!this.props.user) {
            return <p>Loading...</p>; // user not fetched yet
        }

        const { user } = this.props.user;
        const { username, avatarUrl, balance, totalIncome, totalSpend, firstName, lastName, email } = user;
        const { currentUser, isModalOpen, editValue } = this.state;

        const { activeTab } = this.state;

        return(
            <>
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
                    {isModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                            <h2>Edit {this.state.currentValue.currentValue}</h2>
                            <input
                                type="text"
                                onChange={this.handleChange}
                                className="modal-input"
                            />
                            <div className="modal-buttons">
                                <button onClick={this.closeModal} className="modal-cancel">Cancel</button>
                                <button onClick={this.handleSave} className="modal-save">Save</button>
                            </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "personal" && (
                        <div className="personal-profile-info">
                            <div className="personal-info-container">
                                <div>
                                    <h4>Username</h4>
                                    <p>{username}</p>
                                </div>
                                <NavLink
                                    to="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.openModal({currentValue: 'username', value: username});
                                    }}
                                >
                                    Edit
                                </NavLink>
                            </div>
                            <hr/>
                            <div className="personal-info-container">
                                    <div>
                                        <h4>Password</h4>
                                        <p>****</p>
                                    </div>
                                </div>
                                <hr/>
                            <div className="personal-info-container">
                                    <div>
                                        <h4>Firstname</h4>
                                        <p>{firstName}</p>
                                    </div>
                                    <NavLink
                                        to="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.openModal({currentValue: "firstName", value: firstName});
                                        }}
                                    >
                                        Edit
                                    </NavLink>
                                </div>
                                <hr/>
                            <div className="personal-info-container">
                                    <div>
                                        <h4>LastName</h4>
                                        <p>{lastName}</p>
                                    </div>
                                    <NavLink
                                        to="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.openModal({currentValue: "lastName", value: lastName});
                                        }}
                                    >
                                        Edit
                                    </NavLink>
                                </div>
                                <hr/>
                            <div className="personal-info-container">
                                    <div>
                                        <h4>Email</h4>
                                        {email ? <p>{email}</p> : <p>none</p>}
                                    </div>
                                    <NavLink
                                        to="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.openModal({currentValue: "email", value: email});
                                        }}
                                    >
                                        Edit
                                    </NavLink>
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

                <Footer user={this.props.user} />
            </>
        )
    }
}

export default withNavigation(ProfilePage);