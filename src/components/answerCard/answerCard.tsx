import React, { FC } from 'react';
import styles from './styles.module.css';

type AnswerCardProps = {
  id: string;
  text: string;
  likes: number;
  date: string;
  onClickDeleteButton: () => void;
  onClickLikeButton: () => void;
  onClickDislikeButton: () => void;
}

const AnswerCard: FC<AnswerCardProps> = ({
  id, 
  text, 
  likes, 
  date, 
  onClickDeleteButton, 
  onClickLikeButton, 
  onClickDislikeButton,
}) => {
  return (
    <div className={styles.answer} key={id}>
      <button className={styles.deleteButton} onClick={onClickDeleteButton}>X</button>
      <div className={styles.buttonsSection}>
        <button className={styles.likeButton} onClick={onClickLikeButton}>+</button>
        <span className={styles.likesNumber}>{likes}</span>
        <button className={styles.dislikeButton} onClick={onClickDislikeButton}>-</button>
      </div>
      <div className={styles.answerTextWrapper}>
        <div className={styles.answerText}>{text}</div>
        <div className={styles.answerDate}>Answered {date.slice(0, 10)}</div>
      </div>
    </div>
  )
}

export default AnswerCard