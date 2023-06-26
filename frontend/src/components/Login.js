import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import axios from '../api/axios';


const LOGIN_URL = 'login/';

function Login() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const from = '/dashboard';

    const [apimsg, setApimsg] = useState('');

    const [logindata, setLogindata] = useState({
        email: '',
        password: '',
    });


    function handleChange(event) {
        setLogindata((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value,
        }));
    }

    // useEffect(()=>{
    //     user?.access?
    //     navigate(from, { replace : true })
    //     : navigate("/login", { replace : true })
    // }, [])

    const handleSubmit = async (e) => {
        setApimsg('Please wait while we process the details.');
        e.preventDefault();
        navigate('/dashboard', { replace: true });
        try{
            const apiResponse = await axios.post(
                LOGIN_URL,
                JSON.stringify({
                email: logindata.email,
                password: logindata.password,
                }),
                {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                },
            );
        
            console.log(apiResponse);
        
            window.localStorage.setItem('access', JSON.stringify(apiResponse.data.tokens.access));
            window.localStorage.setItem('refresh', JSON.stringify(apiResponse.data.tokens.refresh));
            window.localStorage.setItem('username', JSON.stringify(apiResponse.data.name));
        
            setUser({
                access: apiResponse.data.access,
                role: apiResponse.data.role,
                colour: apiResponse.data.colour,
                username: apiResponse.data.name,
            });
        
            console.log(user);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response || err.response?.status === 500) {
                setApimsg('Login unsuccessful. There is some problem with the server. Please try again later.');
            } else if (err.response?.status === 401) {
                setApimsg('Login unsuccessful. Please recheck your credentials.');
            } else {
                setApimsg('Login unsuccessful.');
            }
        }
    };

    return (
        <div className="form-container">
        <h1>Welcome Back!</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="E-mail"
            onChange={handleChange}
            name="email"
            value={logindata.email}
            required
            />

            <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={logindata.password}
            required
            />

            <br />

            <p className="apimsg">{apimsg}</p>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    );
}

export default Login;
