import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //navigate to register page
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8085/authenticate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (<div className="login-container">
        <div className="login-box">
          <h2>Gastrotrack Login</h2>
          {error && <p style={{color: "red"}}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
          </form>
          
          <p className="register-text">
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")} className="register-button">
              Register
            </button>
          </p>

        </div>
      </div>);
};

export default Login;
