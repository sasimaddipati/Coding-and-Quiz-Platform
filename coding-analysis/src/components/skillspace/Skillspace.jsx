import React, { useState } from 'react';
import { Link,Outlet } from 'react-router-dom';
import './Skillspace.css';

const Skillspace = () => {
   const [flag, setFlag] = useState(0);

   function onClickEvent(x) {
       setFlag(x);
   }

   return (
     <div>
       <div className='skillspace-body'>
         <div className='skillspace-header'>
         <ul className="nav-list">
  <Link to='skillspacequiz' className='nav-link'>Quiz</Link>
  <Link to='skillspacecode' className='nav-link'>Coding Contest</Link>
  <Link to='codeeditor' className='nav-link'>Code Editor</Link>
</ul>
         </div>
         <Outlet/>
       </div>
     </div>
   );
};
export default Skillspace;
