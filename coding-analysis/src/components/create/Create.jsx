import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Create.css';
import { MyContext } from '../mycontext/Mycontext';

const Create = ({props}) => {
  const [activeLink,setActiveLink]=useState('upcoming')
  const {currentzone}=useContext(MyContext)
  function handleClick(link) {
    setActiveLink(link); 
  }
  return (
    <div className="container">
      <div>
        <div className="header">
          <h1 className='zoneName'>Zone : {currentzone}</h1> 
          <div className="navButtons">
            <Link
              onClick={() => handleClick('upcoming')}
              className={activeLink === 'upcoming' ? 'link-createquiz-bg' : 'link-createquiz'}
              to=''
            >
              Upcoming
            </Link>
            <Link
              onClick={() => handleClick('completed')}
              className={activeLink === 'completed' ? 'link-createquiz-bg' : 'link-createquiz'}
              to='completed'
            >
              Completed
            </Link>
            <Link
              onClick={() => handleClick('createquiz')}
              className={activeLink === 'createquiz' ? 'link-createquiz-bg' : 'link-createquiz'}
              to='createquiz'
            >
              Create quiz
            </Link>
            <Link
              onClick={() => handleClick('createcontest')}
              className={activeLink === 'createcontest' ? 'link-createquiz-bg' : 'link-createquiz'}
              to='createcontest'
            >
              Create contest
            </Link>
            <Link
              onClick={() => handleClick('unassigned')}
              className={activeLink === 'unassigned' ? 'link-createquiz-bg' : 'link-createquiz'}
              to='unassigned'
            >
              Unassigned
            </Link>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};
export default Create;
