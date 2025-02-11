
import React, { useContext, useEffect, useState } from 'react';
import './Createzone.css';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { MyContext } from '../mycontext/Mycontext';
function Createzone(){
   const [flag1,setflag1]=useState(0);
   const {handleSubmit,register}=useForm();
   const  navigate = useNavigate();
   const [createdzones,setcreatedzones]=useState();
   const {username,setcurrentzone}=useContext(MyContext);
function fun1(){
      setflag1(1);
}

async function fun2(newzone){
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }
       setflag1(0)
       try{
         const response = await fetch(`http://localhost:3300/add-class-zone/${username}`,{
           method: 'POST',
           headers:{
              'Content-Type':'application/json',
           },
           body: JSON.stringify({ zonename:newzone,code:result }),
         });
         const k = await response.json();
         if(k!==null){
           console.log('sucess');
           setcreatedzones(k.payload.createzone)
           
         }
       }
       catch(err){
         console.log(err);
       }
}

useEffect(() => {
  const fetchCreatedZone = async () => {
    try {
      const response = await fetch(`http://localhost:3300/post-created-zone/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zonename: "sasi" }),
      });
      const result = await response.json();
      if (result !== null) {
        console.log('ki',result.payload.createzone)
        setcreatedzones(result.payload.createzone);
      }
    } catch (err) {
      console.log(err);
    }
  };
  fetchCreatedZone ();
}, [flag1]);



async function fun3(name){
  try {
    const response = await fetch(`http://localhost:3300/delete-created-zone/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ zonename: name }),
    });
    const result = await response.json();
    if (result !== null) {
      console.log(result.payload.createzone)
      setcreatedzones(result.payload.createzone);
    }
  } catch (err) {
    console.log(err);
  }
}
function fun4(name){
  setcurrentzone(name);
  navigate('/Create');
}
  return (
<div className="create-zone-container">
  <div className="create-zone-header" onClick={fun1}>
    <img
      className="create-zone-img"
      src="https://img.icons8.com/?size=48&id=IA4hgI5aWiHD&format=png"
      alt="Create Zone"
    />
    <h1>Create Zone</h1>
  </div>

  {flag1 === 1 && (
    <form className="create-zone-form" onSubmit={handleSubmit(fun2)}>
      <input type="text" placeholder="Enter zone name" {...register("zonename")} />
      <button className='zone-submit'>Create</button>
    </form>
  )}

  <ul className="zone-list">
    {createdzones!==undefined ? (createdzones.map((zone) => (
     <div className="zone-list-item">
      <div className='zone-list-display'  onClick={()=>fun4(zone.zonename.zonename)} key={zone.zonename}>
        <div>
        <p className='zone-name'>{zone.zonename.zonename}</p>
        </div>
        <div>
           <p className='h1-zone-list'>code : {zone.code}</p>
        </div>
      </div>
      <button className="delete-btn" onClick={() => fun3(zone.zonename.zonename)}>
          Delete
        </button>
      </div>
       ) )) : (
        <></>
      )}
  </ul>
</div>
  )
}
export default Createzone;
