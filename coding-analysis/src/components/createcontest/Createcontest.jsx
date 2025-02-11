import React, { useContext, useState } from 'react';
import './Createcontest.css';
import { useForm } from 'react-hook-form';
import { MyContext } from '../mycontext/Mycontext';
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom';
function Createcontest() {
    const [contestname,setcontestname]=useState('');
    const [questions, setQuestions] = useState([]);
    const [inputs, setInputs] = useState([]);
    const { register, handleSubmit, resetField } = useForm();
    const nav = useNavigate();
    const {crecontest,setcrecontest,username,currentzone}=useContext(MyContext)
    function addQuestion(data) {
        setQuestions([...questions,{discription:data.description,testcases:inputs}]);
         setInputs([]);
        resetField("description")
    }
    function addInputOutput(data){
        setInputs([...inputs, {input: data.input, output: data.output }]);
        resetField("input");  
        resetField("output");
    }
    async function handleSave(){
        if(contestname.length!==0){
        try {
          const response = await fetch(`http://localhost:3300/addto-unassign-contest/${username}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ zonename:currentzone,name:contestname,questions:questions}),
          });
          const result = await response.json();
          if (response.ok) {
        
            Swal.fire({
                title: 'Quiz Saved',
                text: 'You have successfully saved the quiz!',
                icon: 'success',
                showConfirmButton: true, 
            }).then((result) => {
                if (result.isConfirmed) {
                    nav('/create/unassigned');
                }
            });
        } else {
            console.error("Failed to save quiz:", response.statusText);
        }

        } catch (err) {
          console.log(err);
        }
    }
      }


    function handlecontestname(e){
          setcontestname(e.target.value);
    }

    return (
        <div className="compiler-container">
        <div className='sas'>

            <div className="compiler-header">
                <input
                    type="text"
                    className='contest-name'
                    placeholder='Contest Name'
                    value={contestname}
                    onChange={handlecontestname}
                />
            </div>
            <button type="button" className="add-btn1" onClick={handleSave}>Create</button>
            </div>
            <form onSubmit={handleSubmit(addQuestion)}>
                <div>
                <button type="submit" className="prev-btn">Add Problem</button>
                </div>
                <div className="problem-statement">
                    <label htmlFor="problem-statement">Problem Statement:</label>
                    <textarea
                        id="problem-statement"
                         className='textarea-context-problem'
                        rows="5"
                        placeholder="Describe the problem here..."
                        {...register("description")}
                    ></textarea>
                </div>
            </form>
            <form onSubmit={handleSubmit(addInputOutput)}>
            <button type="submit" className="prev-btn">Add Input/Output</button>
                <div className="io-section">
                   <div className="input-output">
                        <label htmlFor="input">Input:</label>
                        <textarea
                            className='textarea-quiz'
                            id="input"
                            rows="1"
                            placeholder="Enter input here..."
                            {...register("input")}
                        ></textarea>
                    </div>
                    <div className="input-output">
                        <label htmlFor="output">Output:</label>
                        <textarea
                             className='textarea-quiz'
                            id="output"
                            rows="1"
                            placeholder="Enter desired output here..."
                            {...register("output")}
                        ></textarea>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Createcontest;
