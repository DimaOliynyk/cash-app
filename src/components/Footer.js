import React, { Component } from "react"
import { NavLink } from "react-router-dom";

export default class Footer extends Component{
    constructor(props) {
        super(props);
        this.state = {
        open: false,
        };
    }

    toggleMenu = () => {
        this.setState((prev) => ({ open: !prev.open }));
    };

    render(){
        if (!this.props.user) {
            return <p>Loading...</p>; // user not fetched yet
        } else {
            const { user } = this.props.user;
    
            const { username, avatarUrl, balance, totalIncome, totalSpend } = user;
            return(
                <>
                    <div className="footer-dashboard">
                        <div className="icon active">
                            <NavLink to={`/dashboard/${username}`}>
                                🏠
                            </NavLink>
                        </div>
                        <div className="icon active">
                            <NavLink to={`/overview/${username}`}>
                                📊
                            </NavLink>
                        </div>
                        <button
                            onClick={this.toggleMenu}
                            className="fab"
                        >
                            +
                        </button>
                        <div className="icon">
                            <NavLink to={`/inprogress`}>
                                💳
                            </NavLink>
                        </div>
                        <div className="icon">
                            <NavLink to={`/profile/${username}`}>
                                👤
                            </NavLink>
                        </div>
                    </div>

                     {this.state.open && (
                        <div className="dashboardPage-spends-buttons">
                            <NavLink
                            to={`/dashboard/addExpense/${username}`}
                            className="circle-button"
                            >
                            -
                            </NavLink>

                            <NavLink
                            to={`/dashboard/addIncome/${username}`}
                            className="circle-button"
                            >
                            +
                            </NavLink>
                        </div>
                    )}
                </>
            )
        }
        
    }
}