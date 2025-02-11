import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../mycontext/Mycontext';
import './Joindetails.css';

function Joindetails() {
  const [completed, setCompleted] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [activeab, setActiveab] = useState('completed');
  const { zoneid, setedititem,username, currentzone } = useContext(MyContext);
  const [results, setResults] = useState({}); // Store results by item name
  const [loading, setLoading] = useState(null); // Track loading for individual items
  const navigate = useNavigate();

  useEffect(() => {
    function fetchZoneDetails() {
      setCompleted(zoneid?.completed || []);
      setOngoing(zoneid?.new || []);
      console.log('Completed:', zoneid?.completed);
      console.log('Ongoing:', zoneid?.new);
    }
    fetchZoneDetails();
  }, [zoneid]);

  const handleView1 = (item) => {
    setedititem(item);
    navigate('/editquiz');
  };

  const handleView2 = (item) => {
    setedititem(item);
    navigate('/quizattempt');
  };

  const handleView3 = async (name) => {
    setLoading(name); // Set loading for the specific item
    try {
      const response = await fetch(`http://localhost:3300/get-result/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zone: currentzone, name }),
      });
      const re = await response.json();
      console.log(re);

      // Store result by item name
      setResults((prevResults) => ({
        ...prevResults,
        [name]: re.sol,
      }));
    } catch (error) {
      console.error('Error:', error);
      setResults((prevResults) => ({
        ...prevResults,
        [name]: 'Error fetching result',
      }));
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  return (
    <div className="full-width">
      <div className="zone-details-container">
        <p className="heading">Participate Details</p>

        {/* Tab Navigation */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveab('completed')}
          >
            Completed
          </button>
          <button
            className={`tab-btn ${activeab === 'ongoing' ? 'active' : ''}`}
            onClick={() => setActiveab('ongoing')}
          >
            Ongoing
          </button>
        </div>

        {/* Completed Section */}
        {activeab === 'completed' ? (
          <div className="completed-section">
            {completed.length > 0 ? (
              completed.map((item, index) => {
                const name = item?.m?.item?.k?.name || 'No Name Available';
                return (
                  <div key={index} className="completed-item">
                    <p className="name-in-joindetails">{name}</p>
                    <p className="date-in-joindetails">
                      {item?.m?.Data?.date1 || 'No Date Available'}
                    </p>
                    <div className='display-buttton-quiz'>
                    <button onClick={() => handleView1(item)} className="view-btn">
                      View
                    </button>
                    <button
                      onClick={() => handleView3(name)}
                      className="view-btn"
                      disabled={loading === name} // Disable button while loading
                    >
                      {loading === name ? 'Loading...' : 'Result'}
                    </button>
                    </div>
                    {/* Display the result for the specific item */}
                    {results[name] && (
                      <p className="result-display">Result: {results[name]}</p>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No completed quizzes or contests yet.</p>
            )}
          </div>
        ) : null}

        {/* Ongoing Section */}
        {activeab === 'ongoing' ? (
          <div className="ongoing-section">
            {ongoing.length > 0 ? (
              ongoing.map((item, index) => (
                <div key={index} className="ongoing-item">
                  <p className="name-in-joindetails">
                    {item?.m?.item?.k?.name || 'No Name Available'}
                  </p>
                  <p className="date-in-joindetails">
                    {item?.m?.Data?.date1 || 'No Date Available'}
                  </p>
                  <p className="date-in-joindetails">
                    {item?.m?.Data?.time1 || 'No Time Available'}
                  </p>
                  <button onClick={() => handleView2(item)} className="view-btn1">
                    Attempt
                  </button>
                </div>
              ))
            ) : (
              <p>No ongoing quizzes or contests.</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Joindetails;
