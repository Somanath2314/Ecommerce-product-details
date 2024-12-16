import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.post(apiUrl + "api/users/login", {
        email: email,
        password: password
      });
      console.log("response", response);
      dispatch(authenticate(response.data));
    } catch (ex) {
      console.log(`some error while logging in ${ex}`);
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-white text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-900 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-900 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} field-icon absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-2">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;