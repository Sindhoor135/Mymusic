import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import { motion, AnimatePresence } from "framer-motion";
import { getAllSongs, validateUser } from "./api";
import Home from './components/Home';

import "./App.css";
const App = () => {
  const firebaseAuth = getAuth(app);
  
  // Destructure context and add fallback
  const [{ user, allSongs, song, isSongPlaying, miniPlayer } = {}, dispatch] = useStateValue();

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          window.localStorage.setItem("auth", "true");
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
        setIsLoading(false);
      } else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, [dispatch, firebaseAuth, navigate]);

  return (
    <AnimatePresence>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login setAuth={setAuth} />} />
        <Route path="/login" element={<Login  setAuth={setAuth}/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
