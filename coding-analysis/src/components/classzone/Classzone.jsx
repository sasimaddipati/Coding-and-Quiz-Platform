import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import './Classzone.css'; 

function Classzone() {
  return (
    <div className="container1">
      <ul className="ul">
        <Link 
          to='createzone' 
        >
          Create Zone
        </Link>
        <Link 
          to='joinedzone' 
        >
          Join Zone
        </Link>
      </ul>
      <div className="outlet-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Classzone;
