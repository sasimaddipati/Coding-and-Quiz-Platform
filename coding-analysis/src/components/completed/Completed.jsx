import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../mycontext/Mycontext";
import { Outlet, useNavigate } from "react-router-dom";
import "./Completed.css";

function Completed() {
  const [completed, setCompleted] = useState([]);
  const { setupcoming,setcurrentitemname, currentzone, username, setedititem } = useContext(MyContext);
  const navi = useNavigate();

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`http://localhost:3300/get-completed-item/${username}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ zonename: currentzone }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result.expiredItems);
        setCompleted(result.expiredItems);
        setupcoming(result.validItems);
      } catch (err) {
        console.log(err);
      }
    }
    fetchItems();
  }, [setupcoming, currentzone, username]);

  function fun25(item) {
    console.log(item);
    setedititem(item);
    navi('/create/editquiz');
  }
  function fun26(item) {
    console.log(item);
    setcurrentitemname(item.m.item.k.name)
    navi('/analysis');
  }
  return (
    <div className="completed-container">
      {completed.length > 0 ? (
        <ul className="completed-list">
          {completed.map((item) => (
            <li className="completed-item" key={item.m.item.k.name}> {/* Ensure key is unique */}
              <p className="aaasa">{item.m.item.k.name}</p>
              <p className="aaasas">Date: {item.m.Data.date1}</p>
              <button className="completed-view"onClick={() => fun25(item)}>View</button>
              <button className="completed-view"onClick={() => fun26(item)}>analysis</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-items">No items</p>
      )}
    </div>
  );
}

export default Completed;
