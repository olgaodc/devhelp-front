import React, { FC, useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import closeIcon from '../../assets/x_icon.png';

type QuestionModalProps = {
  closeModal: () => void;
  onQuestionAdded: (newQuestion: any) => void;
}

const QuestionModal: FC<QuestionModalProps> = ({ closeModal, onQuestionAdded }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const postQuestion = async () => {
    if (!formValidation()) {
      try {
        const response = await axios.post('https://devhelp-zl8r.onrender.com/question/', {
          text: text,
          description: description,
        }, {
          headers: {
            authorization: localStorage.getItem('token')
          }
        });

        if (response.status === 200) {
          const newQuestion = response.data.question;
          setText('');
          setDescription('');
          closeModal();
          onQuestionAdded(newQuestion);
          console.log(response);
        }

      } catch (err) {
        console.log(err);
      }
    }
  }

  const formValidation = () => {
    if (!text || !description) {
      setMessage('Please fill all fields');
      return true;
    }

    if (text.length < 10) {
      setMessage(`Title can't be less than 10 symbols`);
      return true;
    }

    if (description.length < 20) {
      setMessage(`Details can't be less than 20 symbols`);
      return true;
    }

    return false;
    setMessage('');
  }

  return (
    <div className={styles.questionModalWrapper} onClick={closeModal}>
      <div
        className={styles.questionModal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={closeModal}
        >
          <img className={styles.closeIcon} src={closeIcon.src} alt="delete icon" />
        </button>
        <div>
          <h3 className={styles.modalTitle}>Ask a public question</h3>
          <div className={styles.modalDescription}>Be specific and imagine you’re asking a question to another person.</div>
        </div>
       
        <div className={styles.inputWrapper}>
          {/* <label htmlFor="title">Question title:</label> */}
          <input
            type="text"
            name="title"
            id="title"
            placeholder='Question title'
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <textarea
            name="description"
            id="description"
            placeholder='Describe the details of your problem'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <button
          className={styles.addButton}
          onClick={postQuestion}
        >
          Ask
        </button>
        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  )
}

export default QuestionModal