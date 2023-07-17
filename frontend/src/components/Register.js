import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';

const REGISTER_URL = 'register/';

function Register() {
  const navigate = useNavigate();

  const [registerdata, setRegisterdata] = useState({
    email: '',
    password: '',
    username: '',
    rpassword: '',
  });

  function handleChange(event) {
    setRegisterdata((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiResponse = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email: registerdata.email,
          password: registerdata.password,
          username: registerdata.username,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      navigate('/login', { replace: true });
    } catch (err) {
    }
  };

  return (
    <div className="form-container">
      <h1>Welcome</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={handleChange}
          name="username"
          value={registerdata.username}
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          name="email"
          value={registerdata.email}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={registerdata.password}
          required
        />

        <input
          type="password"
          placeholder="Repeat Password"
          onChange={handleChange}
          name="rpassword"
          value={registerdata.rpassword}
          required
        />

        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Register;
