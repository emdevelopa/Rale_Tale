import { useRef, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Axios from "./api/axios";
const LOGIN_URL = "/login";

// const PROPERTY_URL = "/uploadprop"


const PROPERTY_URL = "/uploadprop"
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
//   const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  // const [loginStatus,setLoginStatus] = useState("");
  // const [propType,setPropType] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
//   useEffect(()=>{
//     console.log(propType);
// },[propType])
// const handleSubmitt = async(e)=>{
//     e.preventDefault()
//     try {
//         const response = await Axios.post(PROPERTY_URL,{propType})
//         console.log(response);
//     } catch (error) {
        
//     }
// }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user, pwd);
   
    try {
      const response = await Axios.post(LOGIN_URL,
        JSON.stringify({user,pwd}),
        {
          headers:{'Content-Type':'application/json',
          withCredentials:true
        }
        }
        )
        console.log(response.status);
        if (response.data.name) {
          setSuccess(true);
          // setLoginStatus(response.data.name)
        } 
    //   setUser("");
    // setPwd("");
    // setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response")
        errTimeOut()
      }else if(err.response?.status === 400){
        setErrMsg('Email not found')
        errTimeOut()
      }else if(err.response?.status === 401){
        setErrMsg('Unauthoorized')
        errTimeOut()
      }else if(err.response?.status === 500){
        setErrMsg('Internal server error')
      }
      
     
      errRef.current.focus();
    }
  };

  const errTimeOut = ()=>{
    setTimeout(() => {
      setErrMsg("")
    }, 4000);
  }
//   const navigate= useNavigate();

  const navigateToSginUp = ()=>{
    navigate('/')
  }
  const navigateToProp = ()=>{
    navigate('/PropertyUpload')
  }
const logOut = () =>{
  setSuccess(false)
  setUser("");
  setPwd("")
}

// const navi = useNavigate();
// const navigateToProp=()=>{
//   navi('/propertyUpload')
// }
const [propType,setPropType] = useState("Select the property type");
const [errMsg,setErrMsg] = useState("");

useEffect(()=>{
    console.log(propType);
},[propType])
// const handleSubmit = async(e)=>{
//     e.preventDefault()
//     try {
//         const response = await Axios.post(PROPERTY_URL,{propType})
//         console.log(response);
//         console.log(response.data.message);
//         setErrMsg(response.data.message)
//     } catch (error) {
//         if (error.response?.status === 411) {
//             setErrMsg("Please Fill")
//             setTimeout(() => {
//                 setErrMsg("")
//             }, 2000);
//         }
//     }
// }
    const navigate = useNavigate();

    const navigateToLogin = () => {
      navigate("/Login");
    };
  return (
    <>
      {success ? (
          navigateToProp()
      ) : (
        <section id="login" className="li">
         
          
          <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            arial-live="assertive"
          >
            {errMsg}
          </p>
            <div className="names">
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
              placeholder="Username/Email"
            />
            </div><br/>
          <div className="names">
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
              placeholder="Password"
            />
            </div>
            <button className="signInBtn">Sign In</button>
            <p>
            Need an Account?
            <br />
            <span className="line">
              {}
              <button className="signUpBtn" onClick={navigateToSginUp}>Sign Up</button>
            </span>
          </p>
          </form>
         <div className="lin"></div>
         
          <section className="uploadprop">
            <p>{errMsg}</p>
            <h2>For rent</h2>
            <div>
            <h1>Upload a Property</h1>
                <form onSubmit={handleSubmit}>
                    <select onClick={(e)=>{
                        setPropType(e.target.value)
                    }}>
                        <option>Property Pupose</option>
                       <option>Commercial</option>
                        <option>Residential</option>
                        
                    </select><br />
                    <div className={propType === "Commercial"?"purpose-section":"purpose-section-hide"}>
                        {/* <select className={propType === "Commercial"?"purpose-section":"purpose-section-hide"}>
                            <option className={propType === "Commercial"?"purpose-section":"purpose-section-hide"}>Office flat</option>
                            <option className={propType === "Commercial"?"purpose-section":"purpose-section-hide"}>shop / suite(in a mall)</option>
                        </select> */}
                    </div><br />
                    <select onClick={(e)=>{
                        setPropType(e.target.value)
                    }}>
                        <option>Property Type</option>
                       <option>Commercial</option>
                        <option>Residential</option>
                        
                    </select><br />
                    <div className={propType === "Commercial"?"purpose-section":"purpose-section-hide"}>

                    </div><br />
                    <select onClick={(e)=>{
                        setPropType(e.target.value)
                    }}>
                        <option>Available For</option>
                       <option>Commercial</option>
                        <option>Residential</option>
                        
                    </select><br />
                    <div className={propType === "Commercial"?"purpose-section":"purpose-section-hide"}>

                    </div><br />

                    <select onClick={(e)=>{
                        setPropType(e.target.value)
                    }}>
                        <option>Facilities</option>
                       <option>Commercial</option>
                        <option>Residential</option>
                        
                    </select><br />
                    <div className={propType === "Commercial"?"purpose-section":"purpose-section-hide"}>

                    </div><br />

                   
                    <select onClick={(e)=>{
                        setPropType(e.target.value)
                    }}>
                        <option>Location</option>
                       <option>Commercial</option>
                        <option>Residential</option>
                        
                    </select><br />
                    <div className={propType === "Commercial"?"purpose-section":"purpose-section-hide"}>

                    </div><br />

                    <select onClick={(e)=>{
                        setPropType(e.target.value)
                    }}>
                        <option>Price or budjet</option>
                       <option>Commercial</option>
                        <option>Residential</option>
                        
                    </select><br />
                    <div className={propType === "Commercial"?"purpose-section":"purpose-section-hide"}>

                    </div><br />

                   
            
                    <button>submit</button>
                    <button onClick={navigateToLogin}>log out</button>
                </form>
            </div>
        </section>
         
        </section>
      )}
    </>
  );
};
export default Login;

