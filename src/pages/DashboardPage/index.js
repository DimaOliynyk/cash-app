import {React, Component} from 'react';
import { NavLink } from "react-router-dom";

import './index.css'

import arrowDown from '../../images/arrow-down.png';
import arrowUp from '../../images/arrow-up.png';
import blackImage from '../../images/black-image.png';
import LoginPage from '../LoginPage/index';

import ExpensesLineChart from '../../components/ExpensesLineChart';

import { fetchExpenses } from '../../api';



export default class DashboardPage extends Component {
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
    const expenses = (await fetchExpenses()).reverse();
    this.setState({ expenses });
  };

  handlePrevPage  = () => {
    this.setState((prevState) => ({
            currentPage: Math.max(prevState.currentPage - 1, 1)
        }));
  };

  handleNextPage  = () => {
  console.log("Next clicked", this.state.expenses?.length, this.state.pageSize);
  this.setState((prevState) => {
    const maxPage = Math.ceil(prevState.expenses.length / prevState.pageSize);
    return {
      currentPage: Math.min(prevState.currentPage + 1, maxPage)
    };
  });
};
   getChartData = () => {
    const grouped = {};

    this.state.expenses.forEach(tx => {
      const date = new Date(tx.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short'
      });
      if (!grouped[date]) grouped[date] = { date, income: 0, expenses: 0 };

      if (tx.type === '+') {
        grouped[date].income += tx.amount;
      } else {
        grouped[date].expenses += tx.amount;
      }
    });

    // Sort by real date
    return Object.values(grouped).sort(
      (a, b) =>
        new Date(a.date.split('.').reverse().join('-')) -
        new Date(b.date.split('.').reverse().join('-'))
    );
  };

  render() {
    if (!this.props.user) {
      return <p>Loading...</p>; // user not fetched yet
    }
    
    const { user } = this.props.user;

    const { username, avatarUrl, balance, totalIncome, totalSpend } = user;
      const { expenses, currentPage, pageSize } = this.state;
      
      // Calculate which expenses to show on current page
      const startIndex = (currentPage - 1) * pageSize;
      const currentExpenses = expenses.slice(startIndex, startIndex + pageSize)
      
      const chartData = this.getChartData();
      let totalPages = Math.ceil(expenses.length / pageSize);
      if(totalPages === 0){
        totalPages = 1
      }


      return (
        <>
          <header className="DashboardPage-header">
            <h2 className="DashboardPage-header-greetings">Hi, {username}!</h2>

            <NavLink to={`/profile/${username}`}>
              <img src={avatarUrl} alt="user-profile-picture" />
            </NavLink>
          </header>
          <main className="dashboardPage-main">
            <div className="dashboardPage-container">
              <div className="dashboardPage-money-total">
                <p>Your total balance</p>
                <h3 className="dashboardPage-money-total-balance">${balance}</h3>

                <div className="dashboardPage-money-total-incomes">
                  <div className="dashboardPage-money-total-income">
                    <img src={arrowUp} alt="Income arrow" />
                    <div>
                      <p>Income</p>
                      <p>${totalIncome}</p>
                    </div>
                  </div>
                  <div className="dashboardPage-money-total-spend">
                    <img src={arrowDown} alt="Spend arrow" />
                    <div>
                      <p>Spend</p>
                      <p>${totalSpend}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {chartData && chartData.length > 0 && chartData.some(item => item.value !== 0) && (
              <div className="dashboardPage-chart-container">
                <ExpensesLineChart data={chartData} />
              </div>
            )}

            <div className="dashboardPage-spends">
              <p className="spend-recent">Recent</p>
              <div className="dashboardPage-spends-list">
                {currentExpenses.map((expense) => (
                  <NavLink
                    to={`/transactions/${expense.id}`}
                    key={expense.id}
                    state={{ expense }}
                    className="spend"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {/* Show the category icon if exists, else fallback to blackImage */}
                    <img
                      src={expense.category?.iconUrl || blackImage}
                      alt={expense.category?.name || "expense icon"}
                      style={{ width: 24, height: 24 }}
                    />
                    <div>
                      <p className="spend-name">{expense.name || 'Unnamed'}</p>
                      <p className="spend-date">
                        {new Date(expense.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <p className="spend-amount">
                      {expense.type} {expense.amount}$
                    </p>
                  </NavLink>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="pagination-controls">
                <button onClick={this.handlePrevPage} disabled={currentPage === 1}>
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button onClick={this.handleNextPage} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>

              <div className="dashboardPage-spends-buttons">
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
      );
  }
}