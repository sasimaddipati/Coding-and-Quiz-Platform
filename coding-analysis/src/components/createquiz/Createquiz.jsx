import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Createquiz.css';
import { MyContext } from '../mycontext/Mycontext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
function Createquiz() {
    const [countque, setCountQue] = useState(1);
    const [countopt, setCountOpt] = useState(0);
    const [options, setOptions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [correctOptions, setCorrectOptions] = useState([]); // Array to store correct options
    const [quizname, setQuizName] = useState("");
    const [errr, setErrr] = useState('');
    const [correctOption, setCorrectOption] = useState(null); // Track current correct option
    const { register, handleSubmit, reset } = useForm();
    const nav = useNavigate();
    const { crequiz, setcrequiz, currentzone, username } = useContext(MyContext);

    function handleOptionsChange(event) {
        const newCountOpt = parseInt(event.target.value, 10);
        if (newCountOpt < 2 || newCountOpt > 5) {
            setErrr("Options must be between 2 to 5.");
            return;
        }
        setErrr('');
        setCountOpt(newCountOpt);
        const newOptions = Array.from({ length: newCountOpt });
        setOptions(newOptions);
        setCorrectOption(null); // Reset correct option when options change
    }

    function handleCorrectOptionChange(index) {
        setCorrectOption(index); // Store the correct option index for the current question
    }

    function onSubmit(formState) {
        if (correctOption === null) {
            Swal.fire({
                title: 'Select Correct Option',
                text: 'Please mark the correct option for this question!',
                icon: 'warning',
                showConfirmButton: true,
            });
            return;
        }

        const newQuestion = {
            question: formState.question,
            options: options.map((_, index) => formState[`option ${index + 1}`]),
        };

        setQuestions([...questions, newQuestion]);
        setCorrectOptions([...correctOptions, correctOption]); // Add correct option to array

        console.log("New Question Added:", newQuestion);
        console.log("Correct Option Index:", correctOption);

        // Reset for next question
        setCountQue(countque + 1);
        setCountOpt(0);
        setOptions([]);
        setCorrectOption(null);
        reset();
    }

    function handleQuizNameChange(e) {
        setQuizName(e.target.value);
    }

    async function handleSaveQuiz() {
        if (quizname.trim().length === 0) {
            console.log("Quiz name is empty");
            return;
        }
        try {
            const quizData = questions.map((q, index) => ({
                ...q,
                correctOption: correctOptions[index], // Attach correct option to each question
            }));

            const response = await fetch(`http://localhost:3300/addto-unassign-quiz/${username}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ zonename: currentzone, name: quizname, quiz: quizData , answers : correctOptions }),
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
            console.error("Error saving quiz:", err);
        }
    }
    return (
        <div className="quiz-containe">
              <button type='button' className='btn1' onClick={handleSaveQuiz}>
                Save Quiz
            </button>
            <input 
                type="text" 
                placeholder='Quiz Name' 
                value={quizname} 
                onChange={handleQuizNameChange} 
            />
          

            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className='questi-name'>Question: {countque}</h1>
                <textarea
                    type="text"
                    className='textarea-quiz'
                    placeholder='Question'
                    {...register("question")}
                    required
                />

                <div className='nooptions'>
                    <p className='nooptions-dis'>Number of options required</p>
                    <input
                        className='optionsinput'
                        type="number"
                        value={countopt}
                        onChange={handleOptionsChange}
                        required
                    />
                </div>
                <p className='display-error'>{errr}</p>
                {options.map((_, index) => (
    <div key={index} className='option-container'>
        <input
            type="radio"
            name={`correctOption${countque}`} // Unique name for each question
            value={index}
            checked={correctOption === index}
            onChange={() => handleCorrectOptionChange(index)}
        />
        <input
            type="text"
            placeholder={`Option ${index + 1}`}
            {...register(`option ${index + 1}`)}
            required
        />
    </div>
))}


                <button type="submit" className='btn'>
                    Add
                </button>
            </form>
        </div>
    );
}

export default Createquiz;
