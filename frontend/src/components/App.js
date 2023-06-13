import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import Project from "./project/Project";
import CreateProject from "./project/CreateProject";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="project" element={<Project />} />
          <Route path="create/project" element={<CreateProject />} />
          <Route path="Dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
