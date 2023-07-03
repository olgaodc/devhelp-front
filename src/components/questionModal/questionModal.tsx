import React, { FC, useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

type QuestionModalProps = {
  closeModal: () => void;
  onQuestionAdded: (newQuestion: any) => void;
}

const QuestionModal: FC<QuestionModalProps> = ({ closeModal, onQuestionAdded }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');

  const postQuestion = async () => {
    try {
      const response = await axios.post('http://localhost:8080/question/', {
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
          x
        </button>
        <div>Ask a public question</div>
        <div>Be specific and imagine you’re asking a question to another person.</div>
        <div className={styles.inputWrapper}>
          <label htmlFor="title">Question title</label>
          <input 
            type="text" 
            name="title" 
            id="title"  
            placeholder='Title' 
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="description">What are the details of your problem?</label>
          <textarea 
            name="description"
            id="description" 
            placeholder='Details'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            ></textarea>
        </div>
        <button
          onClick={postQuestion}
        >
          Ask
          </button>
      </div>
    </div>
  )
}

export default QuestionModal