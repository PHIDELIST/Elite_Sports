import { useState, useEffect } from "react";
import {resendSignUpCode,confirmSignUp} from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import "./Confirm.css"; 

export default function Confirm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState("");
  const [codeSent, setCodeSent] = useState(false);

const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // Handle the error as needed, e.g., redirect or show an error message
      //console.error("Error: No email parameter received in the URL");
    }
  }, []);

  const code_onchange = (event) => {
    setCode(event.target.value);
  };

  const resend_code = async () => {
    setErrors("");
    try {
      await resendSignUpCode(email);
      console.log("Code resent successfully");
      setCodeSent(true);
    } catch (err) {

      if (err.message === "Username cannot be empty") {
        setErrors("You need to provide an email in order to send the Resend Activation Code");
      } else if (err.message === "Username/client id combination not found.") {
        setErrors("Email is invalid or cannot be found.");
      }
    }
  };

  const onsubmit = async (event) => {
    event.preventDefault();
    setErrors("");
    try {
      await confirmSignUp(email, code);
      navigate("/signin");
    } catch (error) {
      setErrors(error.message);
    }
  };

  let el_errors;
  if (errors) {
    el_errors = <div className="errors">{errors}</div>;
  }

  let code_button;
  if (codeSent) {
    code_button = <div className="sent-message">A new activation code has been sent to your email</div>;
  } else {
    code_button = <button className="resend" onClick={resend_code}>Resend Activation Code</button>;
  }

  return (
    <article className="confirm-article">
      
      <div className="recover-wrapper">
      <div className="recover-info">

      </div>
        <form className="confirm_form" onSubmit={onsubmit}>
          <h2>Confirm your Email</h2>
          <div className="fields">
            <div className="field text_field code">
              <label>Confirmation Code</label>
              <input type="text" value={code} onChange={code_onchange} />
            </div>
          </div>
          {el_errors}
          <div className="submit">
            <button type="submit">Confirm Email</button>
          </div>
        </form>
      </div>
      {code_button}
    </article>
  );
}