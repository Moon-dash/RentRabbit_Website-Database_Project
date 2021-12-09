import React, { useState } from 'react';
import './Login.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import { Register, LoginUser } from '../Axios/Axios';


function Login() {
    axios.defaults.withCredentials = true;

    // login refs
    let username = React.createRef();
    let password = React.createRef();

    // register refs
    let usernameReg = React.createRef();
    let passwordReg = React.createRef();
    let cardNoReg = React.createRef();
    let addressReg = React.createRef();

    let navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');
    const [errMsgReg, setErrMsgReg] = useState('');

    const SubmitForm = (e) => {
        e.preventDefault();

      // Record the data entered by the user
      const data = {
        username: username.value,
        password: password.value
      }

        // Use axios to check the login data compared to the database
        LoginUser(data, setErrMsgReg, navigate);
    }

    // Register user function
    const registerUser = () => {
        // Record the data entered by the user
        const data = {
            username: usernameReg.value,
            password: passwordReg.value,
            cardNo: cardNoReg.value,
            address: addressReg.value
        }

        console.log(data);

        // Use axios to post it to the database using express server
        Register(data, setErrMsg, navigate);
    }

    // UI for the inputs needed to run the functions
    return (
      <div className="App">

        <div className="container">
            <div className="title">
                <label style={{ fontSize: 30, }}>
                    RENTRABBIT
                </label>
            </div>
        </div>

        <div className="login-container">
          <form className="login" action="auth" onSubmit={SubmitForm}>
            <label style={{ fontSize: 40, fontWeight: 700, }}>Login As Current User</label>

            <div className="input-box">
              <div className="inputs">
                <label style={{ fontSize: 14, }}>
                  Enter Your Username:
                </label>
                <input type="text" name="username" ref={usr => (username = usr)} placeholder="Username" style={{ marginLeft: 20}}></input>
              </div>

              <div className="inputs">
                <label style={{ fontSize: 14, }}>
                    Enter Your Password:
                </label>
                <input type="password"  name="password" ref={passwrd => (password = passwrd)} placeholder="Password" style={{ marginLeft: 24}}></input>
              </div>

            </div>
          <button style={{marginTop:136}}>Submit</button>
          { errMsg ? <div className="err-msg">{errMsg}</div> : undefined }
          </form>


          <div className="login">

            <label style={{ fontSize: 40, fontWeight: 700, }}>Register As New User</label>

            <div className="input-box">
              <div className="inputs">
                <label style={{ fontSize: 14, }}>
                  Enter Your Username:
                </label>
        <input type="text" placeholder="Username" ref={usr => (usernameReg = usr)} style={{ marginLeft: 20}}></input>
              </div>

              <div className="inputs">
                <label style={{ fontSize: 14}}>
                    Enter Your Password:
                </label>
        <input type="text" placeholder="Password" ref={pwd => (passwordReg = pwd)} style={{ marginLeft: 25}}></input>
              </div>

              <div className="inputs">
                <label style={{ fontSize: 14, marginLeft: 35}}>
                    CreditCardNo:
                </label>
        <input type="text" placeholder="xxxxxxxxxxxxxxxx" ref={no => cardNoReg = no} style={{ marginLeft: 27}}></input>
              </div>

              <div className="inputs">
                <label style={{ fontSize: 14, marginLeft: 10 }}>
                    Enter Your Address:
                </label>
        <input type="text" placeholder="address" ref={addr => addressReg = addr} style={{ marginLeft: 24}}></input>
              </div>
            </div>

          <button style={{marginTop:50}} onClick={registerUser}>Submit</button>
          { errMsgReg ? <div className="err-msg">{errMsgReg}</div> : undefined }
          </div>
        </div>
      </div>
    );
}

export default Login;
