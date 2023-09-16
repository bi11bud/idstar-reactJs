import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import UserAccount from "../Entity/UserAccount"
import { ArrowLeft } from 'react-bootstrap-icons';
import moment from 'moment'
import { v4 as uuid } from "uuid"

export const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistration, setIsRegistration] = useState(false);
    const [isResetPass, setIsResetPass] = useState(false);

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        if (isRegistration) {
            if (validateRegistration()) {
                addUserAccount();
                alertSuccess("Created New User Succeed");
                handleRegistrationClick();
                navigate('/');
            }
        }
        else if (isResetPass) {
            if (validateResetPassword()) {
                editUserAccount()
                alertSuccess("Your New Password is: " + randomSixDigitNumber);
                handleResetPassClick();
                navigate('/');
            }
        }
        else {
            if (validateLogin()) {
                alertSuccess('Welcome ' + username);
                navigate('/employee');
            }
        }

    };

    let date = new Date();
    const currentDate = moment(date).format('DD-MM-YYYY HH:mm:ss')

    const min = 100000;
    const max = 999999;
    const randomSixDigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    function editUserAccount() {

        UserAccount.forEach((user) => {
            if (user.username === username) {
                user.password = randomSixDigitNumber.toString()
                user.mdate = currentDate
            }
        })
    }

    function addUserAccount() {

        UserAccount.push({
            id: uuid(),
            username: username,
            password: password,
            cdate: currentDate,
            mdate: currentDate,
            ddate: '',
        })
    }

    function validateLogin() {

        const user = UserAccount.find((d) => d.username === username);

        if (!user) {
            failedLogin('Username Not Found')
            return false;
        }

        if (user.password !== password) {
            failedLogin('Incorrect Password')
            return false;
        }

        return true;

    }

    function validateRegistration() {

        const user = UserAccount.find((d) => d.username === username);

        if (user) {
            failedLogin('Username Already exist')
            return false;
        }

        if (confirmPassword !== password) {
            failedLogin("Password Didn't Match")
            return false;
        }

        return true;

    }

    function validateResetPassword() {
        const user = UserAccount.find((d) => d.username === username);

        if (!user) {
            failedLogin('Username Not Found')
            return false;
        }

        return true;
    }

    function alertSuccess(text) {
        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: text,
            timer: 3000
        });
    }

    function failedLogin(text) {
        Swal.fire({
            title: 'Failed',
            icon: 'error',
            text: text,
            timer: 3000
        });
    };


    function handleResetPassClick() {
        setUsername('');
        setIsResetPass(!isResetPass);
    }


    function handleRegistrationClick() {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setIsRegistration(!isRegistration);
    }

    return (
        <>
            <div className="App">
                {isRegistration ? (
                    <form className="form-login">
                        <ArrowLeft onClick={handleRegistrationClick}
                            style={{
                                cursor: 'pointer',
                                marginLeft: -50
                            }}
                        ></ArrowLeft>
                        <h2>Sign Up</h2>
                        <br />
                        <label htmlFor="new-username">New Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            id="new-username"
                            required
                            placeholder="New Username"
                        ></input>

                        <label htmlFor="new-password">New Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="new-password"
                            required
                            placeholder="New Password"
                        ></input>

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            id="confirm-password"
                            required
                            placeholder="Confirm Password"
                        ></input>

                        <br />
                        <button onClick={handleSubmit}>Sign Up</button>
                        <br />
                    </form>
                ) : (
                    isResetPass ? (
                        <form className="form-login">
                            <ArrowLeft onClick={handleResetPassClick}
                                style={{
                                    cursor: 'pointer',
                                    marginLeft: -50
                                }}
                            ></ArrowLeft>
                            <h2>Reset Password</h2>
                            <br />
                            <label htmlFor="username">Username</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                id="username"
                                required
                                placeholder="Username"
                            ></input>
                            <br />
                            <button onClick={handleSubmit}>Reset Password</button>
                        </form>
                    ) : (
                        <form className="form-login">
                            <h2>Login</h2>
                            <br />
                            <label htmlFor="username">Username</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                id="username"
                                required
                                placeholder="Username"
                            ></input>

                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                required
                                placeholder="Password"
                            ></input>
                            <br /><br />
                            <button onClick={handleSubmit}>Login</button><br />
                            <div >
                                <button className="btn-link"
                                    onClick={handleResetPassClick}>Forgot Password?</button>

                                <button className="btn-link"
                                    onClick={handleRegistrationClick}>Don't have an account</button>
                            </div>
                        </form>
                    )
                )}



            </div>
        </>
    );

};

export default LoginPage;