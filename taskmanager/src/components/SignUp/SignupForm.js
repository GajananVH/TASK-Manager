import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/authSlice.js';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [name, setName] = useState(''); 
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
    
    if (password.length < 6) {
      setErrors('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrors('Passwords do not match.');
      return;
    }

    setErrors('');
    dispatch(signup({ email, password, name }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
      {errors && <p style={{ color: 'red' }}>{errors}</p>}
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
