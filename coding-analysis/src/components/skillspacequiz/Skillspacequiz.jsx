import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Skillspacequiz.css';
import { MyContext } from '../mycontext/Mycontext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

function Skillspacequiz() {
    const [openform, setopenform] = useState(0);
    const [countque, setCountQue] = useState(1);
    const [countopt, setCountOpt] = useState(0);
    const [options, setOptions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [correctOptions, setCorrectOptions] = useState([]);
    const [quizname, setQuizName] = useState("");
    const [errr, setErrr] = useState('');
    const [correctOption, setCorrectOption] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const [quiz, setQuiz] = useState([]);
    const nav = useNavigate();
    const { crequiz, setcrequiz, currentzone,setskillquizattempt, username} = useContext(MyContext);

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
        setCorrectOption(null);
    }
    function handleCorrectOptionChange(index) {
        setCorrectOption(index);
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
        setCorrectOptions([...correctOptions, correctOption]);

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
    useEffect(() => {
        async function fetchdata() {
            try {
                const response = await fetch('http://localhost:3300/get-quiz', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}),
                });
                const result = await response.json();
                setQuiz(result.quiz);
            } catch (err) {
                console.error("Error fetching quizzes:", err);
            }
        }
        fetchdata();
    }, []);
    async function handleSaveQuiz() {
        setopenform(0);
        setQuizName("");
        if (quizname.trim().length === 0) {
            console.log("Quiz name is empty");
            return;
        }
        try {
            const quizData = questions.map((q, index) => ({
                ...q,
                correctOption: correctOptions[index],
            }));

            const response = await fetch('http://localhost:3300/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: quizname, quiz: quizData, answers: correctOptions }),
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Quiz Saved',
                    text: 'You have successfully saved the quiz!',
                    icon: 'success',
                    showConfirmButton: true,
                });
            } else {
                console.error("Failed to save quiz:", response.statusText);
            }

            // Reset state
            setQuizName("");
            setCorrectOptions([]);
            setQuestions([]);
            setOptions([]);
            setCountOpt(0);
            setCountQue(1);
        } catch (err) {
            console.error("Error saving quiz:", err);
        }
    }
    function fun45() {
        setopenform(1);
    }
    async function fun35(item){
         nav('/skillattempt')
        console.log('hi')
        try {
            const response = await fetch('http://localhost:3300/get-quiz-question-skillspace', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: item.item.name}),
            });
           const result = await response.json();
           setskillquizattempt(result.quiz);
          
        } catch (err) {
            console.error("Error saving quiz:", err);
        }


    }
    return (
        <div className="quiz-contain">
            {openform === 0 ? (
                <button className='button-openform' onClick={fun45}>Create Quiz</button>
            ) : null}
            {openform === 1 ? (
                <div className='create-quiz-skillspace'>
                    <button type='button' className='btn1' onClick={handleSaveQuiz}>
                        Save Quiz
                    </button>
                    <input 
                        type="text" 
                        placeholder='Topic Name' 
                        value={quizname} 
                        onChange={handleQuizNameChange} 
                    />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='questi-name'>Question: {countque}</h1>
                        <textarea
                            className='textarea-quiz'
                            placeholder='Question'
                            {...register("question")}
                            required
                        />
                        <div className='nooptions'>
                            <p className='nooptions-dis'>Number of options required</p>
                            <input
                                className='optioninput'
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
                                    name={`correctOption${countque}`}
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
            ) : (
                <div className='quiz-list'>   
                    {quiz.length > 0 ? (
                   
    quiz.map((item, index) => (
        <div className='item-quiz-skill'>
        <h2 key={index} className='asasasf'>
            Topic: {item.item.name}</h2>
            <p>
            no of questions: {item.item.quiz.length}
        </p>
        <button className='button-attemp-code-skill' onClick={()=>fun35(item)}>Attempt</button>
        </div>
    ))
) : (
    <p>No quizzes available.</p>
)}
</div>
            )
            }
        </div>
    );
}

export default Skillspacequiz;
