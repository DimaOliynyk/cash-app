import { Component} from 'react';

import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { addIncomeRequest } from '../../api';

import './index.css'


function withRouter(Component) {
  return function(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class AddIncomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            name: "",
            selectedCategory: "",
            user: {},
            description: ""
        };
    }

    handleExpense = async e => {
        e.preventDefault();
        const { amount, name, selectedCategory, user, description } = this.state;
        
        const validations = [
            { valid: !!selectedCategory, message: "You need to choose a category!" },
            { valid: !!name.trim(), message: "Enter an income name!" },
            { valid: amount > 0, message: "Enter a valid amount greater than 0!" },
            { valid: !!description.trim(), message: "Enter a description!" },
        ];

        // Find the first failed validation
        const failed = validations.find(v => !v.valid);
        if (failed) {
            alert(failed.message);
            return;
        }


        try {
            const expense = await addIncomeRequest({
                amount,
                name,
                selectedCategory,
                description
            });

            if (expense.createdAt) {
            this.props.navigate(`/dashboard/${user.username}`);
            }
        } catch (error) {
            console.error("Error adding expense:", error);
            alert("An error occurred while adding the expense.");
        }
    }; 

    setAmount = async e => {
        this.setState({amount: e.target.value})
    }

    setName = async e => {
        this.setState({name: e.target.value})
    }

    setDescription = async e => {
        this.setState({description: e.target.value})

    }

    render(){
        if (!this.props.user) {
            return <p>Loading...</p>; // user not fetched yet
        }
    
        const { user } = this.props.user;

        const { username, categories } = user

        return(
            <>
                <NavLink to={`/dashboard/${username}`} className="nav-back-button">         
                    ← Back
                </NavLink>
                <header className='AddExpendsPage-header'>
                    <h2>New Income</h2>
                </header>
                <main className='AddExpendsPage-main'>
                        <form onSubmit={this.handleExpense} className="expense-form">
                            <input
                                type="text"
                                placeholder="Name"
                                onChange={e => this.setName(e)}
                                className="expense-input"
                            />
                            <input
                                type="number"
                                placeholder="Amount"
                                onChange={e => this.setAmount(e)}
                                className="expense-input"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                onChange={e => this.setDescription(e)}
                                className="expense-input"
                            />
                              <select
                                value={this.state.selectedCategory}
                                onChange={e => this.setState({ selectedCategory: e.target.value })}
                                className="expense-input"
                            >
                                <option value="" disabled>Select Category</option>
                                {categories && categories
                                .filter(el => el.name === 'Work')
                                .map(el => (
                                    <option key={el._id} value={el._id}>
                                    {el.name}
                                    </option>
                                ))
                                }
                            </select>
                            {/* <input type="text" placeholder="Description" onChange={e => this.setDesctiption(e)} className="expense-input" /> */}

                            <button type="submit" className="expense-button">
                                Add an Income
                            </button>
                        </form>
                </main>
                {/* footer to add!! */}
            </>
        )
    }
}

export default withRouter(AddIncomePage);