import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

async function getUser() {
    return fetch('http://192.168.0.90:3000/api/auth/me', {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'ngrok-skip-browser-warning': 'true'
        },
    })
   .then(data => data.json())

}


export default class ExpenseInfoPage extends Component{
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
    render(){
        const { username, avatarUrl, balance, totalIncome, totalSpend } = this.state.user;

        return(
            <>
                <NavLink to={`/dashboard/${username}`} className="nav-back-button">         
                        ← Back
                </NavLink>
            </>
        )
    }
}