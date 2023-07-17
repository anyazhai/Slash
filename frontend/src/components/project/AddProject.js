import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const CREATE_PROJECT_URL = '/board/';
export default function AddProject() {
  const api = useAxios();
  const { user } = useAuth();

  const [data, setdata] = useState({
    name: '',
  });

  function handleChange(event) {
    setdata((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiResponse = await api.post(
        CREATE_PROJECT_URL,
        JSON.stringify({
          name: data.name,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${user.access}`,
          },
        },
      );
      window.location.reload();
    } catch (err) {
    }
  };

  return (
    <div className="project-cover-card">
      <form className="create" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          onChange={handleChange}
          name="name"
          value={data.name}
          required
        />

        <button className="btn btn-primary" type="submit">Submit</button>
        <button onClick={() => { window.location.reload(); }} className="btn-tertiary" type="reset">Cancel</button>
      </form>
    </div>
  );
}
