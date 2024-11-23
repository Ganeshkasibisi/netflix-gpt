import React, { useEffect } from 'react'
import {  onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { LOGO, USER_ICON } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';

const Header = () => {
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
    });
    
  }
  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid,email,displayName} = user;
          dispatch(addUser({uid:uid, email:email,displayName:displayName})
        
        ); 
        navigate("/browse")
        } else {
          // User is signed out
         dispatch(removeUser());
         navigate("/")
        }
      });
      //unsubscribe when component unmounts
      return () => unsubscribe();
  },[])
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }
  return (
    <div className="absolute w-screen bg-gradient-to-b from-black px-8 py-2 z-10 flex justify-between">
      <img className="w-48" src={LOGO}
        alt="netflix_logo"/>
        {user && (
          <div className="flex p-2">
            <button className="bg-[#E50914] px-4 my-2 align-baseline mx-4 text-white rounded-lg"
            onClick={handleGptSearchClick}
            >
              GPT Search
              </button>
          <img className="w-12 h-12"
           src={USER_ICON} 
          alt="user-icon"
          />
           <button className="text-white font-semibold" onClick={handleSignOut}>(Sign Out)</button>
        </div>)}
       
    </div>
  )
}

export default Header