import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ExpensesLineChart = ({ data }) => (
  <div className="minimal-chart-container">
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="2 4" stroke="#eee" />
        <XAxis
          dataKey="date"
          tick={{ fill: '#888', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#888', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: 12
          }}
          cursor={{ stroke: '#ccc', strokeWidth: 1 }}
        />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#4caf50"
          strokeWidth={2}
          dot={{ r: 3, stroke: '#4caf50', strokeWidth: 1, fill: '#fff' }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#f44336"
          strokeWidth={2}
          dot={{ r: 3, stroke: '#f44336', strokeWidth: 1, fill: '#fff' }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ExpensesLineChart;