import React, { FC, useState } from 'react';
import styles from './styles.module.css';
import deleteIcon from '../../assets/trash_icon.png';
import arrowUpIcon from '../../assets/211648_up_chevron_icon (1).png';
import arrowDownIcon from '../../assets/211645_down_chevron_icon (1).png';
import closeIcon from '../../assets/x_icon.png';

type AnswerCardProps = {
  id: string;
  text: string;
  likes: number;
  date: string;
  onClickDeleteButton: (event: any) => void;
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteAnswer = (event: any) => {
    onClickDeleteButton(event);
    setShowDeleteModal(false);
  }

  return (
    <>
      <div className={styles.answer} key={id}>
        <button
          className={styles.deleteButton}
          onClick={() => setShowDeleteModal(true)}
        >
          <img className={styles.deleteIcon} src={deleteIcon.src} alt="delete icon" />
        </button>

        <div className={styles.buttonsSection}>
          <button
            className={styles.likeButton}
            onClick={onClickLikeButton}
          >
            <img className={styles.arrowIcon} src={arrowUpIcon.src} alt="arrow up icon" />
          </button>

          <span className={styles.likesNumber}>{likes}</span>

          <button
            className={styles.likeButton}
            onClick={onClickDislikeButton}
          >
            <img className={styles.arrowIcon} src={arrowDownIcon.src} alt="arrow down icon" />
          </button>

        </div>

        <div className={styles.answerTextWrapper}>
          <div className={styles.answerDate}>{date.slice(0, 10)}</div>
          <div className={styles.answerText}>{text}</div>
        </div>
      </div>

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
                onClick={deleteAnswer}
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

export default AnswerCard