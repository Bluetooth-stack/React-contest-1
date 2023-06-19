import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// to validate mail
function validateEmail(input) {
  var validRegex = /^[a-zA-Z0-9.#$'*+?_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;

  } else {
    return false;
  }
}

// to validate password
function validatePass(input) {
  var validRegex = /^[a-zA-Z0-9.#$'*+?_-]+@[a-zA-Z0-9-]+(?:\+)*$/;

  if (input.match(validRegex)) {
    return true;

  } else {
    return false;
  }

}

function App() {
  // states to handle values
  let [name, setName] = useState('');
  let [mail, setMail] = useState('');
  let [passwordType, setPasswordType] = useState("password");
  let [password, setPass] = useState('');
  let [confirm, setConfirm] = useState('');
  let [error, setError] = useState('');
  let [success, setSuccess] = useState('');


  // function to handle error and success on form submit
  function signupValidate(e) {
    e.preventDefault();
    if (!name || !mail || !password || !confirm) {
      setError('All fields are mandatory!');

      // to handle, if submitted again with some changes and there is some error
      success && setSuccess('');
      return;
    }
    if (!validateEmail(mail)) {
      setError('Error: Enter Valid mail please!');
      success && setSuccess('');
      return;
    }
    if (password.length < 8) {
      setError('Password should contain 8 or more characters.');
      success && setSuccess('');
      return;
    }
    if (!validatePass(password)) {
      setError('A password should be a combination of (! @ # % $... etc.), (0-9) and (a-z / A-Z)');
      success && setSuccess('');
      return;
    }
    if (password !== confirm) {
      setError('Password did not match.');
      success && setSuccess('');
      return;
    }
    // setting error to empty as there is no error and display success message
    setError('');
    setSuccess('Successfully Signed Up!');
    
    // setting every state back to default
    setName('');
    setMail('');
    setPass('');
    setConfirm('');
    setPasswordType('password')

    // hiding success message by setting it back to default after 4seconds
    setTimeout(()=>{
      setSuccess('');
    }, 2600)
  }


  // function to show / hide password
  function togglePassword() {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  return (
    <div className="form-container">
      <h1>Signup</h1>
      {/* signup form */}
      <form id="signupForm" onSubmit={signupValidate}>
        <div className="box">
          <input type="text" name="username" id="fname" value={name} onChange={(e) => { setName(e.target.value) }} required />
          <span>Full Name</span>
        </div>

        <div className="box">
          <input type="email" name="mail" id="mail" value={mail} onChange={(e) => { setMail(e.target.value) }} required />
          <span>Email</span>
        </div>

        <div className="box">
          <input type={passwordType} id="pass" value={password} onChange={(e) => { setPass(e.target.value) }} required />
          <span>Password</span>
          <div className="toogle" onClick={togglePassword}>
            {passwordType === "password" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
        </div>

        <div className="box">
          <input type="password" id="confirmpass" value={confirm} onChange={(e) => { setConfirm(e.target.value) }} required />
          <span>Confirm Password</span>
        </div>

        <div className="msgBox">
          {/*  if there is error show message else don't */}
          {
            error ? <p className="error">{error}</p> : <span></span>
          }
          {
            success ? <p className="success">{success}</p> : <span></span>
          }
        </div>

        <button type="submit" id="signup" >Signup</button>
      </form>
    </div>

  );
}

export default App;
