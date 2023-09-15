import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        if (username.length > 4 && password.length > 4) {
            successLogin();
            navigate('/employee');

        } else failedLogin();

    };

    function successLogin() {
        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Welcome ' + username,
            timer: 3000
        });
    };

    function failedLogin() {
        Swal.fire({
            title: 'Failed',
            icon: 'error',
            text: 'Incorrect Username or Password ',
            timer: 3000
        });
    };


    return (
        <>
            <div className="App">
                <form className="form-login" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <br />
                    <label htmlFor="username">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)}
                        type="text" id="username" required placeholder="Username"></input>

                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}
                        type="password" id="password" required placeholder="Password"></input>
                    <br />
                    <button type="submit">Login</button>
                </form>

            </div>
        </>
    );

};

export default LoginPage;