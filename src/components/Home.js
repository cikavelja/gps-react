import { useNavigate, Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Navigation from "./Navigation";
import Masterhead from "./Masterhead";
import PortfolioGrid from "./PortfolioGrid";
import Services from "./Services";
import About from "./About";
import Team from "./Team";
import Clients from "./Clients";
import Tracker from "./Tracker";
import Footer from "./Footer";

const Home = () => {
    //const { setAuth } = useContext(AuthContext);
    //const navigate = useNavigate();
    const { setAuth } = useAuth();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        //setAuth({});
        
        setAuth({});
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        //navigate('/linkpage');
    }

    return (
        
        <section>
            <Navigation />
            <Masterhead />
            <Services />
            <PortfolioGrid />
            <About />
            <Team />
            <Clients />
            <Tracker />
            <Footer />
            {/* <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/map">Go to the Map page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div> */}
        </section>
    )
}

export default Home
