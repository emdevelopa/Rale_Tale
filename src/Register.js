import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "./api/axios";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGSITER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [MatchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await Axios.post(REGSITER_URL, { user, pwd });
      console.log(response);
      let userInfo = JSON.parse(response.config.data);
      console.log(userInfo.user);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server Response");
        errTimeOut();
      } else if (err.response?.status === 409) {
        setErrMsg("Username  Taken");
        errTimeOut();
      } else {
        // setErrMsg("Registration fail");
        setSuccess(true);
      }

      errRef.current.focus();
    }
  };

  const errTimeOut = () => {
    setTimeout(() => {
      setErrMsg("");
    }, 4000);
  };
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/Login");
  };
  console.log(success);

  return (
    <>
      {success ? (
        navigateToLogin()
      ) : (
        <section id="registration">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "ffscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="names">
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <br />
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => {
                  setUserFocus(true);
                }}
                onBlur={() => {
                  setUserFocus(false);
                }}
                placeholder="Username"
              />
            </div>
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              &nbsp; 4 to 24 character.
              <br />
              Must begin with letter.
              <br />
              Letters, numbers, underscores, hyphens allowed
            </p>
            <div className="names">
              <span className={validPwd ? "valid ptp" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>

              <br />
              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => {
                  setPwdFocus(true);
                }}
                onBlur={() => {
                  setPwdFocus(false);
                }}
                placeholder="Password"
              />
            </div>
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              &nbsp;8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:(!,@,#,$,%)
            </p>
            <div className="names">
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
              <br />
              <input
                type="password"
                id="confirm_pwd"
                ref={userRef}
                onChange={(e) => {
                  setMatchPwd(e.target.value);
                }}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => {
                  setMatchFocus(true);
                }}
                onBlur={() => {
                  setMatchFocus(false);
                }}
                placeholder="Confirm Password"
              />
            </div>
            <p
              id="confirmnote"
              className={
                MatchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              &nbsp; Must match the first password input field.
            </p>
            <button
              // onClick={rem/}
              className="signUpBtn"
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign up
            </button>
          
            <span className="line">
              <p>Already have an account?</p>
              <button className="signInBtn" onClick={navigateToLogin}>
                Sign In
              </button>
            </span>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
