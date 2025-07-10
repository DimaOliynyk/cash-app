import {React, Component} from 'react';
import { NavLink } from "react-router-dom";

import './index.css'

import arrowDown from '../../images/arrow-down.png';
import arrowUp from '../../images/arrow-up.png';
import blackImage from '../../images/black-image.png';

async function getUser() {
    return fetch('http://192.168.0.90:3000/api/auth/me', {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
    })
   .then(data => data.json())
}

const fetchExpenses = async () => {
    return fetch('http://192.168.0.90:3000/api/transactions/', {
    method: 'GET',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
    })
   .then(data => data.json())
};

export default class DashboardPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            expenses: [],
            currentPage: 1,
            pageSize: 7,
        };
    }

    componentDidMount = async () => {
        const user = await getUser();
        this.setState({ user: user.user });

        const expenses = await fetchExpenses();
        this.setState({ expenses });
    }

    handlePrevPage = () => {
        this.setState((prevState) => ({
            currentPage: Math.max(prevState.currentPage - 1, 1)
        }));
    }

    handleNextPage = () => {
        this.setState((prevState) => {
            const maxPage = Math.ceil(prevState.expenses.length / prevState.pageSize);
            return {
                currentPage: Math.min(prevState.currentPage + 1, maxPage)
            };
        });
    }

    render(){
        const { username, avatarUrl, balance, totalIncome, totalSpend } = this.state.user;
        const { expenses, currentPage, pageSize } = this.state;

        // Calculate which expenses to show on current page
        const startIndex = (currentPage - 1) * pageSize;
        const currentExpenses = expenses.slice(startIndex, startIndex + pageSize);

        const totalPages = Math.ceil(expenses.length / pageSize);

        return(
            <>
                <header className='DashboardPage-header'>
                    <h2 className='DashboardPage-header-greetings'>Hi, {username}!</h2>
                    <img src={avatarUrl} alt='user-profile-picture'/>
                </header>
                <main className='dashboardPage-main'>
                    <div className='dashboardPage-money-total'>
                        <p>Your total balance</p>
                        <h3 className='dashboardPage-money-total-balance'>${balance}</h3>
                        
                        <div className='dashboardPage-money-total-incomes'>
                            <div className='dashboardPage-money-total-income'>
                                <img src={arrowUp} />
                                <div>
                                    <p>Income</p>
                                    <p>${totalIncome}</p>
                                </div>
                            </div>
                            <div className='dashboardPage-money-total-spend'>
                                <img src={arrowDown} />
                                <div>
                                    <p>Spend</p>
                                    <p>${totalSpend}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='dashboardPage-spends'>
                        <p className='spend-recent'>Recent</p>
                        <div className='dashboardPage-spends-list'>
                            {currentExpenses.map((expense) => (
                                <div key={expense.id} className='spend'>
                                    <img src={blackImage} alt="expense icon" />
                                    <div>
                                        <p className='spend-name'>{expense.name}</p>
                                        <p className='spend-date'>{new Date(expense.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className='spend-amount'>{expense.type} {expense.amount}$</p>
                                </div>
                            ))}

                        </div>

                        {/* Pagination Controls */}
                        <div className="pagination-controls" style={{ marginTop: '10px' }}>
                            <button 
                                onClick={this.handlePrevPage} 
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <span style={{ margin: '0 10px' }}> Page {currentPage} of {totalPages} </span>
                            <button 
                                onClick={this.handleNextPage} 
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>

                        <div className='dashboardPage-spends-buttons'>
                            <NavLink to={`/dashboard/addExpense/${username}`} className="circle-button">
                                -
                            </NavLink>

                            <NavLink to={`/dashboard/addIncome/${username}`} className="circle-button">
                                +
                            </NavLink>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}