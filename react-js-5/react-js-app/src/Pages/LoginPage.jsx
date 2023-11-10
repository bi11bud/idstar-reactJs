import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

export const LoginPage = () => {

    localStorage.removeItem('authToken');

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [domicile, setDoomicile] = useState("");
    const [gender, setGender] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otpReset, setOtpReset] = useState("");
    const [isRegistration, setIsRegistration] = useState(false);
    const [isResetPass, setIsResetPass] = useState(false);
    const [isResetCheckEmail, setIsResetCheckEmail] = useState(false);

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        if (isRegistration) {
            validateRegistration();
        }
        else if (isResetCheckEmail) {
            validateCheckEmailReset();
        }
        else if (isResetPass) {
            validateResetPassword();
        }
        else {
            validateLogin();
        }

    };

    function validateLogin() {

        alertLoading();

        const requestData = {
            email: username,
            password: password,
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        };

        fetch("http://localhost:9090/api/login-user", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status !== '200') {
                    failedLogin(data.message);
                } else {
                    localStorage.setItem('authToken', data.data.access_token);
                    alertSuccess("Welcome " + data.data.user.fullname);
                    navigate('/employee');
                }
            })
            .catch((error) => {
                failedLogin(error);
            });

        return true;

    }

    function validateRegistration() {

        alertLoading();
        if (!email.trim()) {
            failedLogin("Email Cannot be empty")
            return false;
        }

        if (!name.trim()) {
            failedLogin("Name Cannot be empty")
            return false;
        }

        if (!phone.trim()) {
            failedLogin("Phone Number Cannot be empty")
            return false;
        }

        if (!domicile.trim()) {
            failedLogin("Domicile Cannot be empty")
            return false;
        }

        if (!gender.trim()) {
            failedLogin("Gender Cannot be empty")
            return false;
        }

        if (confirmPassword !== password) {
            failedLogin("Password Didn't Match")
            return false;
        }

        const requestData = {
            email: email,
            name: name,
            phone_number: phone,
            domicile: domicile,
            gender: gender,
            password: password,
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        };

        fetch("http://localhost:9090/api/register/langsung", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== '200') {
                    failedLogin(data.message);
                } else {
                    alertSuccess("New User Registered !");
                    handleRegistrationClick();
                    navigate('/');
                }
            })
            .catch((error) => {
                failedLogin(error);
            });

    }

    function validateCheckEmailReset() {

        alertLoading();

        const requestData = {
            email: email
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        };

        fetch("http://localhost:9090/api/forget-password/send-langsung", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== '200') {
                    failedLogin(data.message);
                } else {
                    alertSuccess(data.data);
                    handleResetPassClick();
                    navigate('/');
                }
            })
            .catch((error) => {
                failedLogin(error);
            });
    }

    function validateResetPassword() {

        alertLoading();

        const requestData = {
            email: email,
            newPassword: password,
            confirmNewPassword: confirmPassword,
            otp: otpReset
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        };

        fetch("http://localhost:9090/api/forget-password/change-password-langsung", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== '200') {
                    failedLogin(data.message);
                } else {
                    alertSuccess("Password Successfully Reset");
                    handleCheckEmailClick();
                    handleResetPassClick();
                    setEmail('');
                    navigate('/');
                }
            })
            .catch((error) => {
                failedLogin(error);
            });

    }

    function alertLoading(){
        Swal.fire({
            imageUrl: "loading.gif",
            title: 'Loading',
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
        });
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

    function handleCheckEmailClick() {
        // setEmail('');
        setIsResetCheckEmail(!isResetCheckEmail);
    }


    function handleResetPassClick() {
        setPassword('');
        setConfirmPassword('');
        setOtpReset('');
        setIsResetPass(!isResetPass);
        setIsResetCheckEmail(!isResetCheckEmail);
    }

    function handleRegistrationClick() {
        setName('');
        setEmail('');
        setGender('');
        setPhone('');
        setDoomicile('');
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
                        <label htmlFor="new-email">New Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            id="new-email"
                            required
                            placeholder="Email"
                        ></input>

                        <label htmlFor="new-name">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="new-name"
                            required
                            placeholder="Name"
                        ></input>

                        <label htmlFor="new-email">Phone Number</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            id="new-phone"
                            required
                            placeholder="Phone Number"
                        ></input>

                        <label htmlFor="new-domicile">Domicile</label>
                        <input
                            value={domicile}
                            onChange={(e) => setDoomicile(e.target.value)}
                            type="text"
                            id="new-domicile"
                            required
                            placeholder="Domicile"
                        ></input>

                        <label htmlFor="new-gender">Gender</label>
                        <input
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            type="text"
                            id="new-gender"
                            required
                            placeholder="Gender"
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
                    isResetCheckEmail ? (
                        <form className="form-login">
                            <ArrowLeft onClick={handleCheckEmailClick}
                                style={{
                                    cursor: 'pointer',
                                    marginLeft: -50
                                }}
                            ></ArrowLeft>
                            <h2>Reset Password</h2>
                            <br />
                            <label htmlFor="username">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                id="email"
                                required
                                placeholder="email"
                            ></input>
                            <br />
                            <button onClick={handleSubmit}>Reset Password</button>
                        </form>
                    ) : isResetPass ? (
                        <form className="form-login">
                            <ArrowLeft onClick={handleResetPassClick}
                                style={{
                                    cursor: 'pointer',
                                    marginLeft: -50
                                }}
                            ></ArrowLeft>
                            <h2>Reset Password</h2>
                            <br />
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

                            <label htmlFor="confirm-password">OTP</label>
                            <input
                                value={otpReset}
                                onChange={(e) => setOtpReset(e.target.value)}
                                type="text"
                                id="otp"
                                required
                                placeholder="OTP"
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
                                    onClick={handleCheckEmailClick}>Forgot Password?</button>

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