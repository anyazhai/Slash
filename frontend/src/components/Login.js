import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();

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
        e.preventDefault();
        navigate('/dashboard', { replace: true });
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    );
}

export default Login;
