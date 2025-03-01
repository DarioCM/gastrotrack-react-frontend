import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "male", //default value to prevent empty string
        height: "",
        weight: "",
        gastritisDuration: "",
    });

    // message state
    const [message, setMessage] = useState("");

    // error message state
    const [errors, setErrors] = useState<{ [key: string]: string}>({});

    // handle input changes
    const handleChange = (e: React.ChangeEvent< HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    // validate form data
    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
    
        if (!formData.name.trim()) newErrors.name = "Name is required.";
        if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
          newErrors.email = "Invalid email format.";
        }
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 18) newErrors.age = "Invalid age.";
        if (!formData.height || isNaN(Number(formData.height)) || Number(formData.height) <= 0) newErrors.height = "Invalid height.";
        if (!formData.weight || isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) newErrors.weight = "Invalid weight.";
        if (!formData.gastritisDuration.trim()) newErrors.gastritisDuration = "Gastritis duration is required.";
        if (!formData.gender) newErrors.gender = "Gender is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    

    // handle form submission   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        if (!validateForm()) return; // Stop submission if there are validation errors

        try {
            const response = await fetch("http://localhost:8085/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    age: Number(formData.age),
                    gender: formData.gender,
                    height: parseFloat(formData.height),
                    weight: parseFloat(formData.weight),
                    gastritisDuration: formData.gastritisDuration,
                  }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => navigate("/"), 2000); // Redirect to login page
            } else {
                setMessage(data.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            setMessage("Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-container">
        <div className="register-box">
          <h2>Register for GastroTrack</h2>
          {message && <p className="message">{message}</p>}
  
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            {errors.name && <p className="error">{errors.name}</p>}
  
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            {errors.email && <p className="error">{errors.email}</p>}
  
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            {errors.password && <p className="error">{errors.password}</p>}
  
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
  
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
            {errors.age && <p className="error">{errors.age}</p>}
  
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
  
            <input type="number" name="height" step="0.01" placeholder="Height (m)" value={formData.height} onChange={handleChange} required />
            {errors.height && <p className="error">{errors.height}</p>}
  
            <input type="number" name="weight" step="0.1" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} required />
            {errors.weight && <p className="error">{errors.weight}</p>}
  
            <input type="text" name="gastritisDuration" placeholder="Gastritis Duration (e.g., 2 years)" value={formData.gastritisDuration} onChange={handleChange} required />
            {errors.gastritisDuration && <p className="error">{errors.gastritisDuration}</p>}
  
            <button type="submit" disabled={!validateForm}>Register</button>
          </form>
        
            {/* <p className="login-redirect">
                Already have an account? <button onClick={() => navigate("/")} className="login-button">Login</button>
            </p> */}
          
        </div>
      </div>
    );

};

export default Register;