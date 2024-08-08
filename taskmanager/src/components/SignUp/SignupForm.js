import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  signupRequest,
  signupSuccess,
  signupFailure
} from '../../redux/authSlice.js';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrors('Please enter a valid email address.');
      return;
    }

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
    dispatch(signupRequest());
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });


      if (response.ok) {
        const user = await response.json();
        dispatch(signupSuccess(user));
        navigate('/');
      } else {
        const error = await response.json();
        dispatch(signupFailure(error));
      }
    } catch (error) {
      dispatch(signupFailure(error.toString()));
    }
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
      {errors && <p style={{ color: 'red' }}>{errors}</p>}
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
