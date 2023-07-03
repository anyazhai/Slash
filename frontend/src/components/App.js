import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import Project from "./project/Project";

import RequireAuth from './RequireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path="project" element={<Project />} />
            <Route path="Dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
