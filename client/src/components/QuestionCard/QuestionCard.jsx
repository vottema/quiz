import React, { useState } from 'react';
import AnswerForm from '../AnswerForm/AnswerForm';
import style from './QuesionCard.module.css';

function QuestionCard({ question }) {
  const [check, setCheck] = useState(false);

  const toCheck = () => {
    setCheck(false);
  };

  const [press, setPress] = useState(false);

  const toPress = () => {
    setPress(true);
  };
  return (
    <>
      <div className="card11">
        <div className={press ? `${style.pressed}` : `${style.questionCard}`}>
          <div className="card-body" onClick={() => setCheck(!check)}>
            <div>
              <h1 className="cardTitle">{question.question_score}</h1>
            </div>
          </div>
        </div>
      </div>
      {check && (
        <AnswerForm
          key={question.id}
          question={question}
          toCheck={toCheck}
          toPress={toPress}
        />
      )}
    </>
  );
}

export default QuestionCard;
