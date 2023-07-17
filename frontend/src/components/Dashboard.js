import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Headerbar from './Headerbar';
import LoadingSpinner from './LoadingSpinner';
import AddProject from './project/AddProject';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const PROJECTLIST_URL = 'board/list';

export default function Dashboard() {
  const api = useAxios();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.get(
      PROJECTLIST_URL,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.access}`,
        },
      },
    )
      .then((response) => {
        setProjectData(response.data.response);
        setIsLoading(false);
      }).catch((err) => {
      });
  }, [user.access]);

  return (
    <div>
      <Headerbar />
      {isLoading ? <LoadingSpinner /> : (
        <div className="project-section">
          <div className="flex">
            <h2>Your Projects</h2>
            <button className="btn" onClick={(() => setCreate(true))}>Create</button>
          </div>

          <section className="project-list">
            {
                        projectData && projectData.map((project) => (
                          <Link to="/project" state={{ project: { project } }} key={project.id}>
                            <div className="project-cover-card">
                              <h3>{project.name}</h3>
                            </div>
                          </Link>
                        ))
                    }
            {create ? <AddProject /> : null }
          </section>
        </div>
      )}

    </div>
  );
}
