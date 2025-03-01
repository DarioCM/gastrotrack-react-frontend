import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import "./App.css"; // Import styles for layout

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default App;