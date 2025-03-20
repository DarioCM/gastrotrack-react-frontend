import "../styles/Dashboard.css"; // Add this file for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>


      <h2 className="dashboard-subtitle">
        To activate this section, please register a daily diet or food symptom log. 
        Based on your input, the AI will recommend the best diet for you and provide helpful suggestions.
      </h2>
    </div>
  );
};

export default Dashboard;