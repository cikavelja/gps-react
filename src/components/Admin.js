import { Link } from "react-router-dom";
//import Accordion from './Accordion';
import Groups from "./Groups";

const Admin = () => {
    return (
        <section>
            <div>
                <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/map" className="nav-link">Map</Link>
                                </li>


                            </ul>

                        </div>
                    </div>
                </nav>
                <div className="container mt-5">
                </div>
            </div>
            <h1>Admins Page</h1>
            <br />
            <Groups />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin
