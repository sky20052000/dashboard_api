import React from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Home from "./Components/Home";
import About from "./Components/About";
import Register from "./Components/Register";
import Login from "./Components/Login"
import Navbar from "./Components/Navbar"
import {Routes, Route} from "react-router-dom";

const App = ()=>{
  return (
    <>
   <Navbar/>
    <Routes>
      <Route path="/" element = {<Home/>} />
      <Route path="/about" element = {<About/>} />
      <Route path="/register" element = {<Register/>} />
      <Route path="/login" element = {<Login/>} />
    </Routes>
    </>
  )
}

export default App;