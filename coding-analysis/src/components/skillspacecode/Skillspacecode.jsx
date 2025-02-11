import React, { useContext, useState, useEffect } from 'react';
import './Skillspacecode.css';
import { useForm } from 'react-hook-form';
import { MyContext } from '../mycontext/Mycontext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Skillspacecode() {
    const [openForm, setOpenForm] = useState(false);
    const [contestName, setContestName] = useState('');
    const [questions, setQuestions] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [contests, setContests] = useState([]);
    const { register, handleSubmit, resetField } = useForm();
    const { crecontest, setcrecontest, username, currentzone , setskillquizattempt} = useContext(MyContext);
    const navigate = useNavigate();

    // Add a new question
    function addQuestion(data) {
        setQuestions([...questions, { description: data.description, testcases: inputs }]);
        setInputs([]);
        resetField("description");
    }

    // Add input/output pair to current question
    function addInputOutput(data) {
        console.log(data);
        setInputs([...inputs, { input: data.input, output: data.output }]);
        resetField("input");
        resetField("output");
    }

    // Fetch contests from the server
    useEffect(() => {
        async function fetchData(){
            try {
                const response = await fetch('http://localhost:3300/get-contest', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                const result = await response.json();
                setContests(result.contest || []);
            } catch (err) {
                console.error("Error fetching contests:", err);
            }
        }
        fetchData();
    }, []);

    // Save a new contest to the server
    async function handleSave() {
        if (contestName.trim() === '' || questions.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Data',
                text: 'Please provide a contest name and at least one question.',
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:3300/contest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: contestName, questions }),
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Contest Created!',
                    text: 'You have successfully created the contest.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    setContestName('');
                    setQuestions([]);
                    setInputs([]);
                    setOpenForm(false);
                });
            } else {
                console.error("Failed to save contest:", response.statusText);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }
    async function fun36(contest){
        navigate('/skillattempt')
       console.log('hi')
       try {
           const response = await fetch('http://localhost:3300/get-contest-question-skillspace', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ name:contest.item.name}),
           });
          const result = await response.json();
          setskillquizattempt(result.contest);
         
       } catch (err) {
           console.error("Error saving quiz:", err);
       }


   }

    return (
        <div className="compiler-container">
            {!openForm ? (
                <button className="button-openform" onClick={() => setOpenForm(true)}>
                    Create Coding Contest
                </button>
            ) : (
                <div className="total-form">
                    <div className="form-header">
                        <input
                            type="text"
                            className="contest-name"
                            placeholder="Contest Name"
                            value={contestName}
                            onChange={(e) => setContestName(e.target.value)}
                        />
                        <button className="add-btn1" onClick={handleSave}>Create</button>
                    </div>
                    <form onSubmit={handleSubmit(addQuestion)}>
                    <button type="submit" className="prev-btn">Add Problem</button>

                        <div className="problem-statement">
                            <label htmlFor="problem-statement">Problem Statement:</label>
                            <textarea
                                id="problem-statement"
                                className="textarea-conte"
                                rows="5"
                                placeholder="Describe the problem here..."
                                {...register("description")}
                            />
                        </div>
                    </form>

                    <form onSubmit={handleSubmit(addInputOutput)}>
                    <button type="submit" className="prev-btn">Add Input/Output</button>
                        <div className="io-section">
                            <div className="input-output">
                                <label htmlFor="input">Input:</label>
                                <textarea
                                    id="input"
                                    className="textarea-conte"
                                    rows="3"
                                    placeholder="Enter input here..."
                                    {...register("input")}
                                />
                            </div>
                            <div className="input-output">
                                <label htmlFor="output">Output:</label>
                                <textarea
                                    id="output"
                                    className="textarea-conte"
                                    rows="3"
                                    placeholder="Enter desired output here..."
                                    {...register("output")}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            )}
    
            {/* Conditionally render the contests list only when the form is closed */}
            {!openForm && (
                <div className="quiz-list">
                   
                    {contests.length > 0 ? (
                        contests.map((contest, index) => (
                            <div key={index} className="item-quiz-skill">
                                <h2>Topic: {contest.item.name}</h2>
                                <p>No of questions: {contest.item.questions.length}</p>
                                <button className='button-attemp-code-skill' onClick={()=>fun36(contest)}>Attempt</button>
                            </div>
                        ))
                    ) : (
                        <p>No contests available.</p>
                    )}
                </div>
            )}
        </div>
    );
    
}
export default Skillspacecode;
