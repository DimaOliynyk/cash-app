import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import './index.css';

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

async function getTransaction() {
    const urlParts = window.location.pathname.split('/');
    const transactionId = urlParts[urlParts.length - 1];
    return fetch(`http://192.168.0.90:3000/api/transactions/${transactionId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "ngrok-skip-browser-warning": "true",
        },
    })
   .then(data => data.json())
}

export default class ExpenseInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      transaction: {},
      transactionId: null,
    };
  }

  componentDidMount = async () => {
    const urlParts = window.location.pathname.split('/');
    const transactionId = urlParts[urlParts.length - 1]; // last part of path
    this.setState({ transactionId });

    const response = await getUser();
    this.setState({ user: response.user });

    const transaction = await getTransaction();
    this.setState({ transaction: transaction });
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
    const { username } = this.state.user
    const { name, amount, category, description  } = this.state.transaction;
    console.log(this.state.transaction)
    if (!this.state.transaction) {
        return null; // or a loading indicator/spinner if needed
    }

    return (
      <>
      <div className='expense-info-wrapper'>
        <NavLink to={`/dashboard/${username}`} className="nav-back-button">
          ← Back
        </NavLink>
        <div className='expense-info'>
            <p>name: {name}</p>
            <p>amount: {amount}$</p>
            <p>{description}</p>
            <div className='expense-info-category'>
                <p>
                    {category?.iconUrl && (
                    <img src={category.iconUrl} alt={category.name} />
                    )}
                </p>
                <p>{category?.name}</p>
            </div>
            <button onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
      </>
    );
  }
}