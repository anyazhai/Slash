import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
        navigate('/login', { replace: true });
    };

    return (
        <div className="form-container">
        <h1>Welcome Back!</h1>
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