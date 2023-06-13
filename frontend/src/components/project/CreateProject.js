import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CreateProject() {
    const navigate = useNavigate();

    const [namedata, setNamedata] = useState({
        name: '',
    });


    function handleChange(event) {
        setNamedata((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/project', { replace: true });
    };

    return (
        <div className="form-container">
        <h1>Project deets</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Project Name"
            onChange={handleChange}
            name="name"
            value={namedata.name}
            required
            />

            <br />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    );
}

export default CreateProject;
