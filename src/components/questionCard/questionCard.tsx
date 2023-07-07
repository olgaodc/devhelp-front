import React, { FC, useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import answerIcons from '../../assets/answer_icon.png';
import deleteIcon from '../../assets/trash_icon.png';
import closeIcon from '../../assets/x_icon.png';
import { eventNames } from 'process';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteQuestion = (event: any) => {
    onClickDeleteButton(event);
    setShowDeleteModal(false);
  }

  return (
    <>
      <Link className={styles.question} href={`/question/${id}`}>
        <button
          className={styles.deleteButton}
          onClick={(event: any) => { event.preventDefault(); setShowDeleteModal(true) }}
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

      {showDeleteModal && (
        <div
          className={styles.deleteModalWrapper}
          onClick={() => setShowDeleteModal(false)}
        >
          <div className={styles.deleteModal}>
            <button
              className={styles.closeButton}
              onClick={() => setShowDeleteModal(false)}
            >
              <img className={styles.closeIcon} src={closeIcon.src} alt="delete icon" />
            </button>

            <h3 className={styles.deleteModalTitle}>Delete the question?</h3>
            <div className={styles.deleteModalDescription}>The question will be gone forever. Are you sure you want to proceed?</div>
            <div className={styles.buttonsWrapper}>
              <button
                className={styles.modalCancelButton}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.modalDeleteButton}
                onClick={deleteQuestion}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default QuestionCard