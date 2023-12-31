import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Container, Draggable } from 'react-smooth-dnd';

import Headerbar from '../Headerbar';
import Topbar from './Topbar';
import Column from './Column';
import AddColumn from './AddColumn';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const COLUMN_URL = '/column';

export default function Project() {
  const location = useLocation();
  const data = location.state.project.project;

  const api = useAxios();
  const { user } = useAuth();

  const [columndata, setColumndata] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [addColumn, setAddColumn] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.get(
      `${COLUMN_URL}?board_id=${data.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.access}`,
        },
      },
    )
      .then((response) => {
        setColumndata(response.data.response);
        setIsLoading(false);
      }).catch((err) => {
      });
  }, [user.access]);

  const onColumnDrop = (dropResult) => {
  };

  return (
    <div>

      <Headerbar />

      <div className="container">
        <div className="background">
          <h2 className="project-name">{data.name}</h2>
          <hr />
          <Topbar />
        </div>

        <section className="column-section">
          <Container
            orientation="horizontal"
            onDrop={onColumnDrop}
            getChildPayload={(index) => columndata[index]}
            dragHandleSelector=".column-drag-handle"
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'column-drop-preview',
            }}
          >

            {
                    columndata && columndata.map((column, index) => (
                      <Draggable key={column.id}>
                        <Column col={column} />
                      </Draggable>
                    ))
                }

          </Container>
          {
                    addColumn
                      ? <AddColumn id={data.id} />
                      : (
                        <div>
                          <button onClick={(() => setAddColumn(true))} className="btn">Add Column</button>
                        </div>
                      )

                }
        </section>
      </div>
    </div>

  );
}
