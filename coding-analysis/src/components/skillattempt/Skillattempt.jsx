import React, { useState, useEffect, useContext, Children } from 'react';
import { MyContext } from '../mycontext/Mycontext';
import './Skillattempt.css'; // Add relevant styles
import { useNavigate } from 'react-router-dom';

function Skillattempt() {
  const { skillquizattempt, username } = useContext(MyContext);
  const [editque, setEditQue] = useState([]);
  const [editcon, setEditCon] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [acc,setacc] = useState('');
  const[flgacc,setflgacc]=useState(0);
  const [len, setLen] = useState(0);
  const [index, setIndex] = useState(0);
  const [isQuiz, setIsQuiz] = useState(true);
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [quizans, setquizans] = useState([]);
  const [joinzone, setjoinzone] = useState("");
  const [quizname, setquizname] = useState("");
  const [contestresult,setcontestresult]=useState([]);
  const [quizAttemptedMessage, setQuizAttemptedMessage] = useState(''); // State for message
  const nav = useNavigate();
  useEffect(()=>{
    console.log('wellcome')
     console.log(skillquizattempt[0])
    if (skillquizattempt[0]?.item?.quiz) {
      setEditQue(skillquizattempt[0]?.item?.quiz);
      setLen(skillquizattempt[0]?.item?.quiz.length);
      setquizans(skillquizattempt[0]?.item?.answers);
      setAnswers(new Array(skillquizattempt[0]?.item?.quiz.length).fill(null));
     } 
      else if(skillquizattempt[0]?.item?.questions) {
       setEditCon(skillquizattempt[0]?.item?.questions);
      setLen(skillquizattempt[0]?.item?.questions.length);
      setAnswers(new Array(skillquizattempt[0]?.item?.questions.length).fill(''));
      setcontestresult(new Array(skillquizattempt[0]?.item?.questions.length).fill(0));
       setIsQuiz(false); 
     }
  },[editque]);
  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const compileCode = async (questionIndex) => {
    try {
      const response = await fetch('http://localhost:3300/compile-checktestcase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: answers[questionIndex], language,input:editcon[questionIndex]?.testcases[0].input }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.output," ",editcon[questionIndex]?.testcases[0].output);
        if(String(data.output).trim()===String(editcon[questionIndex]?.testcases[0].output)){
        setOutput(data.output);
        contestresult[questionIndex]=1;
        setError('');
        }
        else{
          setError(data.output)
        }
      } else {
        setError(data.message);
        setOutput('');
      }
    } catch (err) {
      setError('Network error or server not responding');
    }
  };

  const handleNext = () => {
    if (index < len - 1) setIndex(index + 1);
  };

  const handlePrevious = () => {
    if (index > 0) setIndex(index - 1);
  };

  async function handleSubmit() {
    if(isQuiz===true){
    console.log('Submitted answers:', answers, quizans);
    let correctCount = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === quizans[i]) correctCount++;
    }
    const score = answers.length > 0 ? (correctCount / answers.length) * 100 : 0;
    console.log(`Score: ${score}%`);
    setacc(score.toFixed(2));
    setflgacc(1);
  }
  else{
    try {
      const response = await fetch(`http://localhost:3300/add-quiz-score/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zone: joinzone, name: quizname,score:contestresult}),
      });
      const re = await response.json();
      console.log(re.sol)
      if(re.sol===0){
         alert("Allready Quiz Attempted")
      }
      else console.log('time fast')
    } catch (error) {
      console.error('Error:', error);
    }
  }
  };

  if (len === 0) return <p>No items available</p>;

  return (
    <div className="quiz-attempt-container-parent">
      <div className="quiz-attempt-container">
        {quizAttemptedMessage && <div className="attempted-message">{quizAttemptedMessage}</div>} {/* Display message */}

        {len === 0 ? (
          <p>No items available</p>
        ) : (
          <>
            {isQuiz ? (
              <div>
                <h2 className="question-header">
                  {index + 1}. {editque[index]?.question}
                </h2>
                <ul className="options-list">
                  {editque[index]?.options.map((option, idx) => (
                    <li key={idx}>
                      <input
                        className="input-radio"
                        type="radio"
                        name={`question-${index}`}
                        value={idx}
                        checked={answers[index] === idx} // Check using option index
                        onChange={() => handleOptionChange(index, idx)} // Pass option index
                      />
                      <label className="label-for-option">{option}</label>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h2 className="question-header">
                  {index + 1}. {editcon[index]?.discription}
                </h2>

                {/* Display the first input-output pair */}
                {editcon[index]?.testcases.length > 0 && (
                  <div className="first-testcase">
                    <p className='intput-output-label-attempt'>
                      <strong>Sample Input:</strong> {editcon[index].testcases[0].input}
                    </p>
                    <p className='intput-output-label-attempt'>
                      <strong>Sample Output:</strong> {editcon[index].testcases[0].output}
                    </p>
                  </div>
                )}

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="language-select"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python3">Python</option>
                  <option value="cpp">C++</option>
                </select>

                <textarea
                  className="textarea-quizattempt"
                  placeholder="Write your code here..."
                  rows={10}
                  cols={50}
                  value={answers[index]}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />

                <button
                  className="compile-run-attempt"
                  onClick={() => compileCode(index)}
                >
                  Compile & Run
                </button>

                {output && (
                  <div className="coding-output">
                    <strong>Output:</strong> {output}
                  </div>
                )}
                {error && <div className="coding-error">{error}</div>}
              </div>
            )}

            <div className="navigation">
              <button
                className="button1"
                onClick={handlePrevious}
                disabled={index === 0}
              >
                Previous
              </button>
              <button
                className="button1"
                onClick={handleNext}
                disabled={index === len - 1}
              >
                Next
              </button>
            </div>

            {index === len - 1 && (
              <button onClick={handleSubmit} className="submit-btn">
                Submit {isQuiz ? 'Quiz' : 'Contest'}
              </button>
              
            )}

          {flgacc === 1 && <div className="accuracy-message">Accuracy is {acc}%</div>}
          </>
        )}
      </div>
     
    </div>
  );
}

export default Skillattempt;
