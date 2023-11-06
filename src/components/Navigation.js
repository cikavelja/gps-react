import { useNavigate, Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { useContext,useEffect } from 'react'; // Import useEffect
import AuthContext from "../context/AuthProvider";


const Navigation = () => {
    const { setAuth, isAuthenticated } = useAuth();
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate('/');
    }



    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div className="container">
                <a className="navbar-brand" href="#page-top"><img src="assets/img/navbar-logo.svg" alt="..." /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars ms-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                        <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
                        <li className="nav-item"><a className="nav-link" href="#portfolio">Portfolio</a></li>
                        <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="#team">Team</a></li>
                        <li className="nav-item"><Link to="/admin" className="nav-link">Admin</Link></li>

                        {auth?.user ? (
                            <>
                                <li className="nav-item"><Link to="/linkpage" className="nav-link">linkpage</Link></li>
                                <li className="nav-item"><Link to="/map" className="nav-link">Map</Link></li>
                                <li className="nav-item"><Link to="/lounge" className="nav-link">Lounge</Link></li>
                                <li className="nav-item"><a onClick={logout} className="nav-link">Sign Out</a></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link to="/login" className="nav-link">Log In</Link></li>
                                <li className="nav-item"><Link to="/register" className="nav-link">Sign In</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;
