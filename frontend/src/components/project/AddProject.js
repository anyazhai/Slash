import { useState } from "react"

export default function AddProject(){
    const [columndata, setColumndata] = useState({
        name: ''
    })

    function handleChange(event) {
        setColumndata((prevFormData) => ({
        ...prevFormData,
        [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return(
        <div className="project-cover-card">
            <form onSubmit={handleSubmit}>
            <input
                    type="text"
                    placeholder="Project Name"
                    onChange={handleChange}
                    name="name"
                    value={columndata.name}
                    required
                    />

            <button>Submit</button>
            </form>
        </div>
    )
}