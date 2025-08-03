import {React, Component} from 'react';
import { redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import './index.css'

import arrowDown from '../../images/arrow-down.png';
import arrowUp from '../../images/arrow-up.png';
import blackImage from '../../images/black-image.png';


function withRouter(Component) {
  return function(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

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

const fetchExpenses = async (credentials) => {
    return fetch('http://192.168.0.90:3000/api/transactions/income', {
    method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(credentials)
    })
   .then(data => data.json())
};

class AddIncomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            amount: 0,
            name: "",
            description: "",
            selectedCategory: "",
        };
    }

    componentDidMount = async e => {
        const response = await getUser({});
        this.setState({user: response.user}) 
    }

    handleExpense = async e => {
        e.preventDefault();
        if (this.state.selectedCategory === null) {
            return alert('Choose a category!');
        }
        const { amount, name, selectedCategory, user } = this.state;

        // Call your API function to create the expense
        const expense = await fetchExpenses({
            amount,
            name,
            category: selectedCategory,
        });

        if (expense && expense.createdAt) {
            // Navigate programmatically after creation
            this.props.navigate(`/dashboard/${user.username}`);
        } else {
            alert('Failed to create expense.');
        }
    } 

    setAmount = async e => {
        this.setState({amount: e.target.value})
    }

    setName = async e => {
        this.setState({name: e.target.value})
    }

    setCat = async e => {
        this.setState({name: e.target.value})

    }

    // setDesctiption = async e => {
    //     this.setState({amount: e.target.value})
    // }
    render(){
        const { username, avatarUrl, balance, totalIncome, totalSpend, categories } = this.state.user

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
                              <select
                                value={this.state.selectedCategory}
                                onChange={e => this.setState({ selectedCategory: e.target.value })}
                                className="expense-input"
                            >
                                <option value="" disabled>Select Category</option>
                                {categories && categories.map(el => (
                                <option key={el._id} value={el._id}>
                                    {el.name}
                                </option>
                                ))}
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