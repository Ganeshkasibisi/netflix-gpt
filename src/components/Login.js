import React from 'react';
import Header from './Header';
import{useState, useRef} from 'react';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { BG_IMG } from '../utils/constants';


const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () =>{

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(message) return;

    if(!isSignIn){
      
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 

          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            // Profile updated!
            navigate("/browse");
          }).catch((error) => {
            // An error occurred
           setErrorMessage(error.message)
          });
          
          
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage)
        });
    }
    else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
       
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage)
      });
    }

  }
  const toggleSignIn = ()=>{
    setIsSignIn(!isSignIn);
  }
  return (
    <div>
      <Header/>
      <div className="absolute">
        <img src={BG_IMG}
      alt="bg-img"
      />
      </div>
       <form onSubmit={(e) => e.preventDefault()}className="w-3/12 my-36 mx-auto right-0 left-0 absolute p-12 bg-black text-white rounded-lg bg-opacity-70">
       <h1 className="text-3xl font-bold py-4">
        {isSignIn?"Sign In":"Sign Up"}</h1>
       {!isSignIn && (
        <input
        ref={name}
         type="text" placeholder="Name"
         className="p-4 my-4 w-full bg-zinc-700"/>)}
        <input
        ref={email}
         type="text" placeholder="Email or Phone number" 
        className="p-4 my-4 w-full bg-zinc-700"/>
        <input 
        ref={password}
        type="password" placeholder="Password" 
        className="p-4 my-4 w-full bg-zinc-700"/>
       <p className="text-red-600 font-semibold">{errorMessage}</p>
        <button className="p-4 my-6 bg-[#E50914] w-full"
        onClick={handleButtonClick}>
          {isSignIn?"Sign In":"Sign Up"}</button>
        <p className="cursor-pointer" onClick={toggleSignIn}>
          {isSignIn?"New to Netflix? Sign Up Now":"Already Registered! Sign In"}
        </p>
       </form>
    </div>
  )
}

export default Login;