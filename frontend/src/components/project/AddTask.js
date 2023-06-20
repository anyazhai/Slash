import React, { useState } from 'react';

export default function AddTask(){
    const [taskdata, setTaskdata] = useState({
        name: '',
        type: '',
        priority: ''
    });


    function handleChange(event) {
        setTaskdata((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return(
        <div className="addtask">
            <div className='add-container'>
                {/* <FontAwesomeIcon icon="fa-regular fa-xmark" /> */}
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    placeholder="Project Name"
                    onChange={handleChange}
                    name="name"
                    value={taskdata.name}
                    required
                    />

                    <select
                    onChange={handleChange}
                    name="type"
                    value={taskdata.type}
                    required
                    >
                        <option selected>Select Type</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Deployment">Deployment</option>
                    </select>

                    <select
                    onChange={handleChange}
                    name="priority"
                    value={taskdata.priority}
                    required
                    >
                        <option selected>Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}