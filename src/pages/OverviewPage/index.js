import React, { Component } from 'react';
import Footer from '../../components/Footer';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

import { loadCashflow, getUser } from '../../api';

import './index.css'; // import your CSS file


const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15", "#a78bfa"];

export default class OverviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cashflowData: null,
            user: null
        };
    }

    componentDidMount = async () => {
        const cashFlow = await loadCashflow();
        const user = await getUser();

        this.setState({ cashFlow, user });
    };

  render() {
    if (!this.state.user) return <p>Loading...</p>;
    
    const { incomeThisMonth, spendThisMonth, balance } = this.state.user.user

    const incomeExpenseData = [
        { name: "Income", value: incomeThisMonth },
        { name: "Expenses", value: Math.abs(spendThisMonth) },
    ];
    
    const progress = Math.min((balance / 500) * 100, 100); // процент, максимум 100%
    return (
      <div className="overview-container">
        {/* Header Summary */}
        <div className="card">
          <div className="card-header">
            <h2 className="month-title">August Overview</h2>
          </div>
          <div className="card-content summary">
            <div>Income: <span className="income">${incomeThisMonth}</span></div>
            <div>Expenses: <span className="expenses">${spendThisMonth}</span></div>
            <div>Net: <span className="net">${balance}</span></div>
          </div>
        </div>

        {/* Income vs Expenses */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Income vs Expenses</h2>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={incomeExpenseData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  label
                >
                {incomeExpenseData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip /> 
              </PieChart>
            </ResponsiveContainer>
          </div>

        {/* Spending by Category */}
        {/* <div className="card">
          <div className="card-header">
            <h2 className="card-title">Spending by Category</h2>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div> */}

        {/* Cash Flow */}
          <div className="card-header">
            <h2 className="card-title">Cash Flow This Month</h2>
          </div>
          <div className="card-content">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={this.state.cashFlow}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Goal */}
        <div className="card savings">
          <div className="card-header">
            <h2 className="card-title">Savings Goal</h2>
          </div>
          <div className="card-content">
            <p>Saved ${balance} / $500</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <Footer user={this.state.user} />
      </div>
    );
  }
}
