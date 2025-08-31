import { Component } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

import { fetchUser } from "../../redux/userSlice"; // путь к userSlice.js
import { fetchExpenses, getUser } from '../../api';

import Footer from '../../components/Footer';

import './index.css'

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      expenses: [],
      currentPage: 1,
      pageSize: 3,
      loading: true, // new
    };
  }

  componentDidMount = async () => {
    const expenses = (await fetchExpenses()).reverse();
    const user = await getUser();
    this.props.fetchUser();
    this.setState({ expenses, user, loading: false });
  };

  handlePrevPage  = () => {
    this.setState((prevState) => ({
      currentPage: Math.max(prevState.currentPage - 1, 1)
    }));
  };

  handleNextPage  = () => {
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
    const { user, loading, error } = this.props;

    if (error) return <div>Ошибка: {error}</div>;
    if (!user) return null;

    const { username, avatarUrl, balance, totalIncome, totalSpend } = user;
    const { expenses, currentPage, pageSize } = this.state;
      
    // Calculate which expenses to show on current page
    const startIndex = (currentPage - 1) * pageSize;
    const currentExpenses = expenses.slice(startIndex, startIndex + pageSize)

    // const chartData = this.getChartData();
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
                <div className="dashboardPage-money-total-balance-wrapper">
                  <p>Total Balance</p>
                  <h3 className="dashboardPage-money-total-balance">${balance}</h3>
                </div>

                <div className="dashboardPage-money-total-incomes">
                  <div className="dashboardPage-money-total-income">
                    <div>
                      <ArrowDownCircle size={18} />
                      <span className="text-sm">Income</span>
                    </div>
                    <p className="text-lg font-medium">${totalIncome}</p>
                  </div>
                  <div className="dashboardPage-money-total-spend">
                    <div>
                      <ArrowUpCircle size={18} />
                      <span className="text-sm">Expenses</span>
                    </div>
                    <p className="text-lg font-medium">${totalSpend}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboardPage-spends">
              <div className="row">
                <p className="spend-recent">Transactions</p>
              </div>

              <div className="dashboardPage-spends-list">
                {this.state.loading
                ? (
                    <>
                      <div className="skeleton-spend">
                        <div className="column">
                          <div className="skeleton-name"></div>
                          <div className="skeleton-date"></div>
                        </div>
                        <div className="skeleton-amount"></div>
                      </div>
                    </>
                  )
                :currentExpenses.map((expense) => (
                  <NavLink
                    to={`/transactions/${expense.id}`}
                    key={expense.id}
                    state={{ expense }}
                    className="spend"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
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
            </div>
          </main>

          <Footer user={this.state.user}/>
        </>
    );
  }
}

// Мапим стейт Redux в пропсы
const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
  error: state.user.error,
});

// Мапим экшены в пропсы
const mapDispatchToProps = {
  fetchUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);