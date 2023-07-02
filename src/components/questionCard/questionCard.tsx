import React, { FC } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

type QuestionCardProps = {
  id: string;
  text: string;
  description: string;
  answersNumber: [];
  date: string;
  onClickDeleteButton: (event: any) => void;
}

const QuestionCard: FC<QuestionCardProps> = ({ 
  id, 
  text,
  description,
  answersNumber, 
  date, 
  onClickDeleteButton, 
}) => {

  // const deleteQuestion = (e: any) => {
  //   e.preventDefault();
  //   onClickDeleteButton;
  // }

  return (
    <Link className={styles.question} href={`/question/${id}`}>
      <button
        className={styles.deleteButton}
        onClick={onClickDeleteButton}
      >
        X
      </button>
      <h2 className={styles.questionText}>{text}</h2>
      <p className={styles.questionDescription}>{description}</p>
      <div className={styles.questionInfo}>
        {answersNumber.length === Number(1) ? (
          <span className={styles.questionAnswers}>
            {answersNumber.length} answer
          </span>
        ) : (
          <span className={styles.questionAnswers}>{answersNumber.length} answers</span>
        )}
        <span className={styles.questionDate}>Asked {date.slice(0, 10)}</span>
      </div>
    </Link>
  )
}

export default QuestionCard