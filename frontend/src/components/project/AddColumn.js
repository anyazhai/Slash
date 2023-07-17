import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const CREATE_COLUMN_URL = '/column/';
export default function AddColumn({ id }) {
  const [columndata, setColumndata] = useState({
    name: '',
  });

  const api = useAxios();
  const { user } = useAuth();

  function handleChange(event) {
    setColumndata((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  console.log(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiResponse = await api.post(
        CREATE_COLUMN_URL,
        JSON.stringify({
          name: columndata.name,
          board_id: id,
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
      console.log(err);
    }
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Column Name"
          onChange={handleChange}
          name="name"
          value={columndata.name}
          required
        />

        <button className="btn ">Submit</button>
      </form>
    </div>
  );
}
