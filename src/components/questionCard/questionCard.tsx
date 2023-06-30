import React, { FC } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

type QuestionCardProps = {
    id: string;
    text: string;
    answersNumber: [];
    date: string;
}

const QuestionCard: FC<QuestionCardProps> = ({id, text, answersNumber, date}) => {
  return (
    <Link className={styles.question} href={`/question/${id}`}>
        <h2 className={styles.questionText}>{text}</h2>
        <div className={styles.questionInfo}>
            <span className={styles.questionAnswers}>{answersNumber.length} answers</span>
            <span className={styles.questionDate}>asked {date.slice(0, 10)}</span>
        </div>
    </Link>
  )
}

export default QuestionCard