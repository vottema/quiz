import React, { useEffect } from 'react';
import style from './Main.module.css';
import ThemeCard from '../ThemeCard/ThemeCard';
import QuestionCard from '../QuestionCard/QuestionCard';
import { useDispatch, useSelector } from 'react-redux';

function Main(props) {
  const { themes }  = useSelector((state) => state.themesReducer);
  const { questions } = useSelector((state) => state.questionsReducer);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetch('/session')
      .then(res => res.json())
      .then(data => dispatch({ type: "INIT_SCORE", payload: data }))

    fetch('/themes')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'INIT_THEMES', payload: data.themes });
      })
      .catch((err) => console.log(err.message));

    fetch('/questions')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'INIT_QUESTIONS', payload: data.questions });
      })
      .catch((err) => console.log(err.message));
  }, [dispatch]);

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.themesContainer}>
          {themes.length ? (
            themes.map((theme) => <ThemeCard key={theme.id} theme={theme} />)
          ) : (
            <div>No themes</div>
          )}
        </div>
        <div className={style.questionsContainer}>
          <div className={style.questionsCardsRow}>
            {questions.length ? (
              questions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))
            ) : (
              <div>No questions</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
