import React, { useContext, useEffect } from 'react';
import { MyContext } from '../mycontext/Mycontext';
import Editquiz from '../editquiz/Editquiz';
import { useNavigate } from 'react-router-dom';
import './Upcoming.css';

const Unassigned = () => {
  const { upcoming, setupcoming, username, currentzone,edititem,setedititem } = useContext(MyContext);
  const navi = useNavigate();

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`http://localhost:3300/get-upcoming-item/${username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ zonename: currentzone }),
        });
        const result = await response.json();
        setupcoming(result.payload);
        console.log(result.payload);
      } catch (err) {
        console.log(err);
      }
    }
    if (username && currentzone) {
      fetchItems();
    }
  }, [username, currentzone]);

  function fun25(k) {
     console.log(k)
      setedititem(k);
      navi('editquiz')
  }

  return (
    <div className="unassigned-container">
      <div className="display-upcoming-items">
        {upcoming !== undefined ? (
          upcoming.map((it, index) => (
            <div key={index} className="upcoming-item">
              <h2 className='name-exam'>{it.m.item.k.name}</h2>
              <h3>Date: {it.m.Data?.time1}</h3>
              <h3>Time: {it.m.Data?.date1}</h3>
              <button className='upcoming-view' onClick={() => fun25(it)}>View</button>
            </div>
          ))
        ):(
          <p>No upcoming items found.</p>
        )}
      </div>
    </div>
  );
};

export default Unassigned;
