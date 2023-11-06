import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./Navigation";

const REGISTER_URL = '';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(user); // Assuming validName is now a simple boolean
    }, [user]);

    useEffect(() => {
        setValidPwd(pwd); // Assuming validPwd is now a simple boolean
        setValidMatch(pwd === matchPwd); // Assuming validMatch is now a simple boolean
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !pwd) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ query: `mutation Register {  register(request: { email: "${user}", userName: "${user}", password: "${pwd}" }) {    successful  }}` }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                toast.error("No Server Response !", "Error");
            } else if (err.response?.status === 409) {
                toast.error("Registration Failed", "Error");
            } else {
                toast.error(err.response.data.errors[0].message);
            }
            errRef.current.focus();
        }
    }

    return (
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
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-5">

                {success ? (
                    <div className="text-center col-6">
                        <h1>Success!</h1>
                        <p>
                            <Link to="/login" className="btn btn-primary">Sign In</Link>
                        </p>
                    </div>
                ) : (

                    <div className="text-left">
                        <p ref={errRef} className={errMsg ? "alert alert-danger" : "offscreen"} role="alert">{errMsg}</p>
                        <div className="card border-primary mb-3" >
                            <div className="card-header">                    <h1>Register</h1>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title"></h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username:</label>
                                        <input
                                            type="text"
                                            id="username"
                                            ref={userRef}
                                            className={`form-control ${validName ? "is-valid" : user && !validName ? "is-invalid" : ""}`}
                                            autoComplete="off"
                                            onChange={(e) => setUser(e.target.value)}
                                            value={user}
                                            required
                                            onFocus={() => setUserFocus(true)}
                                            onBlur={() => setUserFocus(false)}
                                        />
                                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                            4 to 24 characters.<br />
                                            Must begin with a letter.<br />
                                            Letters, numbers, underscores, hyphens allowed.
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className={`form-control ${validPwd ? "is-valid" : pwd && !validPwd ? "is-invalid" : ""}`}
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={pwd}
                                            required
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                        />
                                        <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                                            8 to 24 characters.<br />
                                            Must include uppercase and lowercase letters, a number, and a special character.<br />
                                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="confirm_pwd">Confirm Password:</label>
                                        <input
                                            type="password"
                                            id="confirm_pwd"
                                            className={`form-control ${validMatch ? "is-valid" : matchPwd && !validMatch ? "is-invalid" : ""}`}
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            value={matchPwd}
                                            required
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
                                        <p id="confirmnote" className={matchFocus && matchPwd && !validMatch ? "instructions" : "offscreen"}>
                                            Must match the first password input field.
                                        </p>
                                    </div>

                                    <button className="btn btn-primary" disabled={!validName || !validPwd || !validMatch}>Sign Up</button>
                                </form>
                            </div>
                        </div>
                        <p>
                            Already registered?<br />
                            <Link to="/login">Sign In</Link>
                        </p>
                    </div>
                )}
                <ToastContainer />
            </div>
        </div>
    )
}

export default Register;
