import React, { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import './Joinzone.css';
import { MyContext } from "../mycontext/Mycontext";
import { useNavigate } from 'react-router-dom';

function Joinzone() {
  const [name, setName] = useState('');
  const [joined, setJoined] = useState([]);
  const [flag1, setFlag1] = useState(0);
  const { register, handleSubmit } = useForm();
  const { username,setzoneid,setcurrentzone,currentzone } = useContext(MyContext);
  const navigate = useNavigate();

  function fun5() {
    setFlag1(1);
  }

  async function fun(user) {
    try {
      const response = await fetch(`http://localhost:3300/join-withcode/${username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: user }),
      });
      const k = await response.json();
      setJoined(k.joined);
      setFlag1(0);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    async function fetchJoinedZones() {
      try {
        const response = await fetch(`http://localhost:3300/get-join-withcode/${username}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: {} }),
        });
        const k = await response.json();
        setJoined(k.joined);
        console.log("hello",k.joined);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchJoinedZones();
  }, []);

  const fun1 = (e) => {
    fun(e.input_code);
  };

  const deleteZone = async (zone) => {
    try {
      const response = await fetch(`http://localhost:3300/delete-join/${username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zone }),
      });
      const result = await response.json();
      setJoined(result.joined);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleZoneClick = async (zoneId) => {
    setcurrentzone(zoneId.zone.zonename.zonename);
    try {
      const response = await fetch(`http://localhost:3300/open-join/${currentzone}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  }),
      });
      const result = await response.json();
      setzoneid(result.open)
    } catch (error) {
      console.error('Error:', error);
    }
    navigate('/joindetails');
  };

  return (
    <div className="joinclass-container">
      <div>
        {flag1 === 1 && (
          <form className="join-zone-form" onSubmit={handleSubmit(fun)}>
            <input type="text" placeholder="Enter zone code" {...register("input_code")} />
            <button className='join-submit'>Join</button>
          </form>
        )}
        <div className="join-zone-header" onClick={fun5}>
          <img
            className="join-zone-img"
            src="https://img.icons8.com/?size=48&id=IA4hgI5aWiHD&format=png"
            alt="Create Zone"
          />
          <h1>Join Zone</h1>
        </div>
      </div>
      <div className="display-join-zones">
        {joined !== undefined && joined.length > 0 ? (
          joined.map((eve, index) => (
            <div
              key={index}
              className="joined-zone"
              onClick={() => handleZoneClick(eve)}
            >
              <p className="zonename-in-join">{eve.zone.zonename.zonename}</p>
              <p className="author-name">Author : {eve.Author}</p>
              <button className="delete-button" onClick={(e) => { e.stopPropagation(); deleteZone(eve); }}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Joinzone;
