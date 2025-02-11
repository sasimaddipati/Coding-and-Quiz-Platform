import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../mycontext/Mycontext';
import './Analysis.css';

const QuizStats = () => {
  const [quizData, setQuizData] = useState({ scores: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageAccuracy, setAverageAccuracy] = useState(null);
  const { currentzone, edititem, username, currentitemname } = useContext(MyContext);
  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('http://localhost:3300/analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ zone: currentzone, name: currentitemname }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setQuizData(result.data);
        calculateAverageAccuracy(result.data.scores);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [edititem, currentzone, username]);

  const totalStudents = quizData.scores.length;
  
  const calculateAverageAccuracy = (scores) => {
    if (!Array.isArray(scores[0]?.score)) {
      const total = scores.reduce((acc, student) => acc + student.score, 0);
      setAverageAccuracy(total / scores.length);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='dfg'>
      <div className="quiz-stats-container">
        <p className="total-students">Total Students Joined: {totalStudents}</p>
        <table className="quiz-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Scores</th>
            </tr>
          </thead>
          <tbody>
            {quizData.scores.map((student, index) => (
              <tr key={index}>
                <td>{student.username}</td>
                <td>
                  {Array.isArray(student.score) ? (
                    <div className='display-contest-sol'>
                      {student.score.map((s, i) => (
                        <div className='display-contest-adj' key={i}>
                          {i + 1} - {s === 1 ? 'correct' : 'incorrect'}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>{student.score}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {averageAccuracy !== null && (
          <p className='avg-cal'>Average Accuracy is {averageAccuracy.toFixed(2)}%</p>
        )}
      </div>
    </div>
  );
};

export default QuizStats;
