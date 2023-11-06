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
import { Routes, Route, Outlet } from 'react-router-dom';
import SignalR from './components/SignalR';

// Assuming you have a function to check if the user is authorized
const isAuthorized = () => {
  // Logic to determine if the user is authorized (e.g., check user roles or tokens)
  // Return true if authorized, otherwise return false
  return false;
};

function App() {
  return (
    <Routes>
      <Route path="editor" element={<RequireAuth isAuthorized={isAuthorized}><Editor /></RequireAuth>} />
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="signalr" element={<SignalR />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route index path="/" element={<Home />} />
        {/* we want to protect these routes */}
        <Route element={<RequireAuth isAuthorized={isAuthorized} />}>
          <Route path="map"  element={<TrackingMap />} />
          <Route path="editor" element={<Editor />} />
          <Route path="admin" element={<Admin />} />
          <Route path="lounge" element={<Lounge />} />
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
