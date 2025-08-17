import React, { Component } from 'react';
import { NavLink, useLocation } from "react-router-dom";

import { deleteTransaction } from '../../api';

import './index.css';

export function withLocation(Component) {
  return function LocationAwareComponent(props) {
    const location = useLocation();
    return <Component {...props} location={location} />;
  };
}

class ExpenseInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: {},
      transactionId: null,
    };
  }

  componentDidMount = async () => {
  
  };
  
  handleDelete = async () => {
    const { expense } = this.props.location.state || {};
    const id = expense._id
    await deleteTransaction({ id });

    // Go back to the previous page using browser history
    window.history.back();
    
  };

  render() {
    if (!this.props.user) {
      return <p>Loading...</p>; // user not fetched yet
    }
    
    if (!this.props.location?.state?.expense) {
      return <p>No expense data found.</p>;
    }
    
    const { user } = this.props.user;
    const { expense } = this.props.location.state || {};
    // this.setState({transaction: expense})
    const { username } = user
    const { name, amount, category, description } = expense;
    console.log(expense)
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


export default withLocation(ExpenseInfoPage);