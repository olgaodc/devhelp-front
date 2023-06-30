import React, { FC } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

type QuestionCardProps = {
    id: string;
    text: string;
    description: string;
    answersNumber: [];
    date: string;
}

const QuestionCard: FC<QuestionCardProps> = ({id, text, description, answersNumber, date}) => {
  return (
    <Link className={styles.question} href={`/question/${id}`}>
        <h2 className={styles.questionText}>{text}</h2>
        <p className={styles.questionDescription}>{description}</p>
        <div className={styles.questionInfo}>
            <span className={styles.questionAnswers}>{answersNumber.length} answers</span>
            <span className={styles.questionDate}>Asked {date.slice(0, 10)}</span>
        </div>
    </Link>
  )
}

export default QuestionCard