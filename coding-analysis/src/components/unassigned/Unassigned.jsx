import React, { useContext, useEffect, useState } from 'react';
import './Unassigned.css'; 
import { MyContext } from '../mycontext/Mycontext';

const Unassigned = () => {
  const { currentzone, username } = useContext(MyContext);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`http://localhost:3300/get-unassign-item/${username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ zonename: currentzone }),
        });
        const result = await response.json();
        setItems(result.payload);
        console.log(result.payload)
      } catch (err) {
        console.log(err);
      }
    }
    fetchItems();
  }, [username, currentzone]); // Refetch when username or zone changes

  const handleInputChange = (e, itemName) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [itemName]: {
        ...prevData[itemName],
        [name]: value,
      },
    }));
  };
  async function call1(x,y){
  try {
    const response = await fetch(`http://localhost:3300/assign-to-upcoming/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item:x,Data:y}),
    });
    const result = await response.json();
    setItems(result.payload);
  } catch (err) {
    console.log(err);
  }
}
  const handleFormSubmit = (item) => {
    const data = formData[item.k.name];
    console.log("Item:", item);
    console.log("Form Data:", data);
    call1(item,data);
  };

  return (
    <div className="unassigned-containe">
      <div className="unassigned-display">
        {items && items.length > 0 ? (
          items.map((item) => {
            const itemName = item.k.name;
            return (
              <div className="unassigned-item" key={itemName}>
                <h3 className='name'>{itemName}</h3>
                <form
                  className="unassigned-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit(item);
                  }}
                >
                  <input
                    className="unassigned-input unassigned-input-time"
                    type="time"
                    name="time1"
                    value={formData[itemName]?.time1 || ""}
                    onChange={(e) => handleInputChange(e, itemName)}
                  />
                  <input
                    className="unassigned-input unassigned-input-date"
                    type="date"
                    name="date1"
                    value={formData[itemName]?.date1 || ""}
                    onChange={(e) => handleInputChange(e, itemName)}
                  />
                  <button className="unassigned-button" type="submit">Assign</button>
                </form>
              </div>
            );
          })
        ) : (
          <p>No unassigned items found</p>
        )}
      </div>
    </div>
  );
};

export default Unassigned;
