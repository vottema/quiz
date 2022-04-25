import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './AnswerForm.module.css';

function AnswerForm({ question, toCheck, toPress }) {
  const answer = useRef();

  const dispatch = useDispatch();
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(0)

  const toAnswer = (event) => {
    event.preventDefault();

    fetch(`/questions/${question.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answer: answer.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message)
        setStatus(data.status)
      });

    toPress();

    setInterval(() => {
      toCheck();
    }, 3000);
  };

  return (
    <div className={style.answerForm}>
      <form onSubmit={toAnswer} className={style.answerFormText} method="post">
        <div className="mb-3">
          <label className="form-label">
            <h3>Вопрос:</h3>
          </label>
          <h1>{question.question_name}</h1>
        </div>
        <div>
          {status === 200 && <div className="alert alert-success" role="alert">
            {message}
          </div>}
          {status === 400 && <div className="alert alert-danger" role="alert">
            {message}
          </div>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            autoComplete="off"
            placeholder="Ваш ответ"
            style={{ margin: '30px 0' }}
            ref={answer}
          />
          <button type="submit" className="btn btn-outline-dark">
            Ответить
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnswerForm;
