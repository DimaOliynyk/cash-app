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
        },
    })
   .then(data => data.json())

}

const fetchExpenses = async (credentials) => {
    return fetch('http://192.168.0.90:3000/api/transactions/', {
    method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })
   .then(data => data.json())
};

class AddExpendsPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            amount: 0,
            name: "",
            description: ""
        };
    }

    componentDidMount = async e => {
        const user = await getUser({});
        this.setState({user: user.user}) 
    }

    handleExpense = async e => {
        e.preventDefault();
        console.log(this.state)
        const { amount, name, description } = this.state
        const expense = await fetchExpenses({
            amount: amount,
            name: name,
        });

        if(expense.createdAt) {
        // Programmatically navigate after successful expense creation
        this.props.navigate(`/dashboard/${this.state.user.username}`); // or any route you want
    }
    } 

    setAmount = async e => {
        this.setState({amount: e.target.value})
    }

    setName = async e => {
        this.setState({name: e.target.value})
    }

    // setDesctiption = async e => {
    //     this.setState({amount: e.target.value})
    // }
    render(){
        const { username, avatarUrl, balance, totalIncome, totalSpend } = this.state.user
        console.log(this.state.amount)
        return(
            <>
                <header className='AddExpendsPage-header'>
                    <h2>New Expense</h2>
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
                            {/* <input type="text" placeholder="Description" onChange={e => this.setDesctiption(e)} className="expense-input" /> */}

                            <button type="submit" className="expense-button">
                                Add an Expense
                            </button>
                        </form>
                </main>
                {/* footer to add!! */}
            </>
        )
    }
}

export default withRouter(AddExpendsPage);