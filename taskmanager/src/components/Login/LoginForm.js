import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../redux/authSlice.js';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [errors, setErrors] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   
    if (!emailRegex.test(email)) {
      setErrors('Please enter a valid email address.');
      return;
    }

    if (isSignup) {
      if (password.length < 6) {
        setErrors('Password must be at least 6 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        setErrors('Passwords do not match.');
        return;
      }

      if (name.trim() === '') {
        setErrors('Name is required.');
        return;
      }

      setErrors('');
      dispatch(signup({ email, password, name }));
    } else {
      setErrors('');
      dispatch(login({ email, password }));
    }
    
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {isSignup && (
        <>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </>
      )}
      {errors && <p style={{ color: 'red' }}>{errors}</p>}
      <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      <button type="button" onClick={() => setIsSignup(!isSignup)}>
        Switch to {isSignup ? 'Login' : 'Signup'}
      </button>
    </form>
  );
};

export default LoginForm;
