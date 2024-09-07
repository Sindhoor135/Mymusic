import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { auth } from "../config/firebase.config";
import { LoginBg } from "../assets/video";
import './loginstyles.css';

const Login = ({ setAuth }) => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  
  const [{ user } = {}, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userCred = result.user;
  
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        const token = await userCred.getIdToken();
  
        const userData = {
          userId: userCred.uid,
          name: userCred.displayName || '',
          email: userCred.email || '',
        };
  
        await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        
        validateUser(token).then((data) => {
          dispatch({
            type: actionType.SET_USER,
            user: data,
          });
          navigate("/home", { replace: true });
        });
      }
    } catch (error) {
      setAuth(false);
      window.localStorage.setItem("auth", "false");
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <video
        src={LoginBg}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
          <div
            onClick={loginWithGoogle}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md transition-all"
          >
            <FcGoogle className="text-xl" />
            <p>Sign in with Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
