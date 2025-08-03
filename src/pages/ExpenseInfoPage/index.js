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

export default class ExpenseInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      transactionId: null,
    };
  }

  componentDidMount = async () => {
    const urlParts = window.location.pathname.split('/');
    const transactionId = urlParts[urlParts.length - 1]; // last part of path
    this.setState({ transactionId });

    const response = await getUser();
    this.setState({ user: response.user });
  };

  handleDelete = async () => {
    const { transactionId } = this.state;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://192.168.0.90:3000/api/transactions/${transactionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete transaction");
      }

      await response.json();
      console.log("transaction deleted");

      // Go back to the previous page using browser history
      window.history.back();
    } catch (error) {
      console.error("Error deleting transaction:", error.message);
    }
  };

  render() {
    const { username, avatarUrl, balance, totalIncome, totalSpend, _id } = this.state.user;

    return (
      <>
        <NavLink to={`/dashboard/${username}`} className="nav-back-button">
          ← Back
        </NavLink>

        <button onClick={this.handleDelete}>Delete</button>
      </>
    );
  }
}