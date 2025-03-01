import "../styles/Dashboard.css"; // Add this file for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="card">
          <h3>Today's Money</h3>
          <p className="value">$53k</p>
          <p className="trend positive">+55% than last week</p>
        </div>
        <div className="card">
          <h3>Today's Users</h3>
          <p className="value">2,300</p>
          <p className="trend positive">+3% than last month</p>
        </div>
        <div className="card">
          <h3>New Clients</h3>
          <p className="value">3,462</p>
          <p className="trend negative">-2% than yesterday</p>
        </div>
        <div className="card">
          <h3>Sales</h3>
          <p className="value">$103,430</p>
          <p className="trend positive">+5% than yesterday</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart">
          <h3>Website View</h3>
          <p>Last Campaign Performance</p>
          {/* Replace with real chart component */}
          <div className="chart-placeholder">📈 Chart Here</div>
        </div>
        <div className="chart">
          <h3>Daily Sales</h3>
          <p>15% increase in today's sales</p>
          {/* Replace with real chart component */}
          <div className="chart-placeholder">📉 Chart Here</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;