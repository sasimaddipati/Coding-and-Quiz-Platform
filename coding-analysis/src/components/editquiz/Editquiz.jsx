import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../mycontext/Mycontext";
import "./Editquiz.css";

function Editquiz() {
  const { edititem, username } = useContext(MyContext);
  const [editque, seteditque] = useState([]);
  const [editcon, seteditcon] = useState([]);
  const [len, setlen] = useState(0);
  const [index, setindex] = useState(0);
  const [isQuiz, setIsQuiz] = useState(true); 

  useEffect(() => {
    function call() {
      if (edititem.m.item.k.quiz !== undefined) {
        seteditque(edititem.m.item.k.quiz);
        setlen(edititem.m.item.k.quiz.length);
        setIsQuiz(true);
      } else {
        seteditcon(edititem.m.item.k.questions);
        setlen(edititem.m.item.k.questions.length);
        setIsQuiz(false);
      }
    }
    call();
  }, [edititem, username]);

  function handleNext() {
    if (index < len - 1) setindex(index + 1);
  }

  function handlePrevious() {
    if (index > 0) setindex(index - 1);
  }

  return (
  <div className="edit-container-parent">
    <div className="edit-con">
      {len === 0 ? (
        <p className="empty-message">No items available</p>
      ) : (
        <div className="content-wrapper">
          {isQuiz ? (
            <div className="quiz-view">
              <h2 className="question-title">
                {index + 1}. {editque[index]?.question}
              </h2>
              <ul className="options-list">
                {editque[index]?.options.map((option, idx) => (
                  <li key={idx} className="option-item">
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="contest-view">
              <h2 className="question-title">
                {index + 1}. {editcon[index]?.discription}
              </h2>
              <ul className="testcase-list">
                {editcon[index]?.testcases.map((testcase, idx) => (
                  <li key={idx} className="testcase-item">
                    <h1 className="testcase-input">Input : {testcase.input}</h1>
                    <h1 className="testcase-output">Output : {testcase.output}</h1>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={index === 0}>
              Previous
            </button>
            <button onClick={handleNext} disabled={index === len - 1}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default Editquiz;
