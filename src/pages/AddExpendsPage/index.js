import { Component } from 'react';
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { fetchUser } from "../../redux/userSlice";
import { addExpenseToUser } from "../../redux/userSlice";

import { addExpenseRequest } from '../../api';

import Footer from '../../components/Footer';

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

    componentDidMount() {
        if (!this.props.user) {
        this.props.fetchUser(); // Loading user
        }
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
        console.log(description)
        if(expense.createdAt) {
            this.props.addExpenseToUser(expense);

            // Navigate to user dashboard if expense is successfully created
            this.props.navigate(`/dashboard/${this.props.user.username}`); 
        }
    } 


    handleInputChange = e => {
        const { name, value } = e.target;
        console.log(e.target.value)
        this.setState({ 
            [name]: name === 'amount' ? Number(value) : value 
        });
    }   


    render(){   
        const { user, loading, error } = this.props;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (!user) return <p>No user</p>;

        return(
            <>
                {/* Page header */}
                <header className='AddExpendsPage-header'>
                    <h2>New Expense</h2>
                </header>

                {/* Main form to add an expense */}
                <main className='AddExpendsPage-main'>
                        <form onSubmit={this.handleExpense} className="expense-form">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={e => this.handleInputChange(e)}
                                className="expense-input"
                            />
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                onChange={e => this.handleInputChange(e)}
                                className="expense-input"
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                onChange={e => this.handleInputChange(e)}
                                className="expense-input"
                            />

                            <button type="submit" className="expense-button">
                                Add an Expense
                            </button>
                        </form>
                </main>

                <Footer user={user} />
                {/* Footer could be added here */}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = {
    fetchUser,
    addExpenseToUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExpendsPage));