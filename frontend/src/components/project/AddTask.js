import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const CREATE_TASK_URL = '/task/'
export default function AddTask({id}){
    const [taskdata, setTaskdata] = useState({
        name: '',
        type: '',
        priority: ''
    });

    const api = useAxios();
    const { user } = useAuth();


    function handleChange(event) {
        setTaskdata((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const apiResponse = await api.post(
                CREATE_TASK_URL,
                JSON.stringify({
                name: taskdata.name,
                type: taskdata.type,
                priority: taskdata.priority,
                column_id: id
                }),
                {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${user.access}`,
                },
                },
            );
        
            console.log(apiResponse)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
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

                    <div className='flex'>
                        
                        <button className='btn btn-secondary' type='reset' onClick={(() => {
                            window.location.reload()
                        })}>Cancel</button>
                        <button className='btn' type='submit'>Submit</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}