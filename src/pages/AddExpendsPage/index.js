import { Component } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import { addExpenseRequest } from '../../api';

import './index.css' // css styling


function withRouter(Component) {
  return function(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class AddExpendsPage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            user: "",       // User info object
            amount: 0,      // Expense amount
            name: "",       // Expense name
            description: "" // Expense description
        };
    }

    // Handle form submission to add a new expense
    handleExpense = async e => {
        e.preventDefault();
        console.log(this.state)
        const { amount, name, description } = this.state

        // Call API to add a new expense
        const expense = await addExpenseRequest({
            amount: amount,
            name: name,
            description: description
        });

        if(expense.createdAt) {
            // Navigate to user dashboard if expense is successfully created
            this.props.navigate(`/dashboard/${this.state.user.username}`); 
        }
    } 


    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: name === 'amount' ? Number(value) : value 
        });
    }   


    render(){   
        if (!this.props.user) {
            return <p>Loading...</p>; // user not fetched yet
        }
    
        const { user } = this.props.user;
        const { username } = user

        return(
            <>
                {/* Navigation link back to dashboard */}
                <NavLink to={`/dashboard/${username}`} className="nav-back-button">         
                    ← Back
                </NavLink>

                {/* Page header */}
                <header className='AddExpendsPage-header'>
                    <h2>New Expense</h2>
                </header>

                {/* Main form to add an expense */}
                <main className='AddExpendsPage-main'>
                        <form onSubmit={this.handleExpense} className="expense-form">
                            <input
                                type="text"
                                placeholder="Name"
                                onChange={e => this.handleInputChange(e)}
                                className="expense-input"
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                onChange={e => this.handleInputChange(e)}
                                className="expense-input"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                onChange={e => this.handleInputChange(e)}
                                className="expense-input"
                            />

                            <button type="submit" className="expense-button">
                                Add an Expense
                            </button>
                        </form>
                </main>

                {/* Footer could be added here */}
            </>
        )
    }
}

export default withRouter(AddExpendsPage);