import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome styles

function Register() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(null); // null = no input, true = match, false = mismatch.
  const [showPassword, setShowPassword] = useState(false); // Toggle for Password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for Confirm Password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Check for password match only while editing confirmPassword
    if (name === "confirmPassword") {
      setPasswordMatch(value === formValues.password);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formValues);

    // Validate passwords match before proceeding
    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
        const res = await axios.post("http://localhost:3000/api/v1/register", {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert(res.data.message);
    } catch (error) {
      console.log("some problem while registering", error);      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-white text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formValues.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-900 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-900 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Create a password"
                value={formValues.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-900 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} field-icon absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formValues.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-900 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <i
                className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} field-icon absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></i>
            </div>
            {passwordMatch === false && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
            {passwordMatch === true && (
              <p className="text-green-500 text-sm mt-1">Passwords match</p>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <div class="flex items-center justify-center">
          <p className="text-sm text-gray-600 mt-2">
          Already registered? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
