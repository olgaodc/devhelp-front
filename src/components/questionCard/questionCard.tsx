import React, { FC } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import answerIcons from '../../assets/answer_icon.png';
import deleteIcon from '../../assets/x_icon.png';

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
        <img className={styles.deleteIcon} src={deleteIcon.src} alt="delete icon" />
      </button>
      <h2 className={styles.questionText}>{text}</h2>
      <p className={styles.questionDescription}>{description}</p>
      <div className={styles.questionInfo}>
        <div className={styles.answersNumberWrapper}>
          <img className={styles.answersImage} src={answerIcons.src} alt="" />
          <span className={styles.answersNumber}>
            {answersNumber.length} 
          </span>
        </div>


        
        <span className={styles.questionDate}>Asked {date.slice(0, 10)}</span>
      </div>
    </Link>
  )
}

export default QuestionCard