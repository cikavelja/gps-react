import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import TrackingMap from './components/TrackingMap';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import SignalR from './components/SignalR';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="signalr" element={<SignalR />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />
        {/* we want to protect these routes */}


        <Route element={<RequireAuth  />}>
          <Route path="map" element={<TrackingMap />} />
        </Route>

        <Route element={<RequireAuth  />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth  />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth  />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;