import React, { use, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import AnswerCard from '../../components/answerCard/answerCard';
import styles from './styles.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

type QuestionProps = {
  id: string;
  text: string;
  description: string;
  answersIds: Array<string>;
  questionAnswers: Array<AnswerProps>;
  creationDate: string;
}

type AnswerProps = {
  id: string;
  text: string;
  likesNumber: number;
  creationDate: string;
}

type AnswersProps = Array<AnswerProps> | null;

const QuestionPage = ({ questionInfo }: any) => {
  const router = useRouter();

  const [question, setQuestion] = useState<QuestionProps>(questionInfo[0]);
  const [answers, setAnswers] = useState<AnswersProps>(questionInfo[0].questionAnswers);
  const [newAnswerText, setNewAnswerText] = useState('');
  const [message, setMessage] = useState('');

  const deleteAnswer = async (answerId: string) => {
    try {
      const response = await axios.delete(`https://devhelp-zl8r.onrender.com/question/${question.id}/answer/${answerId}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        //atvaizduoja visus atsakymus, be istrinto klausimo
        setAnswers(prevState => prevState ? prevState.filter(answer => answer.id !== answerId) : null);
        //istrynus atsakyma atnaujina answers skaiciu
        setQuestion(prevState => ({
          ...prevState,
          answersIds: prevState.answersIds.filter(id => id !== answerId),
        }));
      }

    } catch (error: any) {
      if (error.response.status == 401) {
        router.push('/logIn');
      } else {
        console.log(error);
      }
    }
  }

  const likeAnswer = async (answerId: string) => {
    try {
      //mapinant iesko atsakyma kuri palaikino ir atnaujina laiku skaiciu
      const updatedAnswers = answers ? answers.map((answer) => {
        if (answer.id === answerId) {
          return { ...answer, likesNumber: answer.likesNumber + 1 };
        }
        return answer;
      }) : [];

      const response = await axios.put(`https://devhelp-zl8r.onrender.com/answer/${answerId}`, {
        //funkcijoje suranda atnaujinto atsakymo laiku skaiciu
        likesNumber: updatedAnswers.find((answer) => answer.id === answerId)?.likesNumber,
      }, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      });

      if (response.status === 200) {
        setAnswers(updatedAnswers);
      }

    } catch {
      router.push('/logIn');
    }
  }

  const dislikeAnswer = async (answerId: string) => {
    try {
      //mapinant iesko atsakyma kuri palaikino ir atnaujina laiku skaiciu
      const updatedAnswers = answers ? answers.map((answer) => {
        if (answer.id === answerId) {
          return { ...answer, likesNumber: answer.likesNumber - 1 };
        }
        return answer;
      }) : [];

      const response = await axios.put(`https://devhelp-zl8r.onrender.com/answer/${answerId}`, {
        //funkcijoje suranda atnaujinto atsakymo laiku skaiciu
        likesNumber: updatedAnswers.find((answer) => answer.id === answerId)?.likesNumber,
      }, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      });

      if (response.status === 200) {
        setAnswers(updatedAnswers);
      }

    } catch {
      router.push('/logIn');
    }
  }

  const submitAnswer = async () => {
    if (newAnswerText.length < 10) {
      return setMessage(`Answer can't be less than 10 characters`);
    }
    try {
      const response = await axios.post(`https://devhelp-zl8r.onrender.com/question/${question.id}/answer`, {
        text: newAnswerText,
      }, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      });

      if (response.status === 200) {
        const newAnswer = response.data.answer;
        setMessage('');
        //atvaizduoja visus atsakymus, kartu su nauju
        setAnswers(prevState => prevState ? [...prevState, newAnswer] : [newAnswer]);
        //pridejus nauja atsakyma atnaujina answers skaiciu
        setQuestion(prevState => ({
          ...prevState,
          answersIds: [...prevState.answersIds, newAnswer.id],
        }))
        setNewAnswerText('');
      }

    } catch {
      router.push('/logIn');
    }
  }

  return (
    <>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <div className={styles.questionSectionWrapper}>
            {question && (
              <div className={styles.questionSection}>
                <div className={styles.question}>
                  <h2 className={styles.questionTitle}>{question.text}</h2>
                  <div className={styles.questionDescription}>{question.description}</div>
                  <span className={styles.questionDate}>Asked {question.creationDate.slice(0, 10)}</span>
                </div>

                <div className={styles.answersSection}>
                  {question.answersIds.length === Number(1) ? (
                    <div className={styles.answersNumber}>{question.answersIds.length} answer</div>
                  ) : (
                    <div className={styles.answersNumber}>{question.answersIds.length} answers</div>
                  )}
                  {answers && answers.map(answer =>
                    <AnswerCard
                      key={answer.id}
                      id={answer.id}
                      text={answer.text}
                      likes={answer.likesNumber}
                      date={answer.creationDate}
                      onClickDeleteButton={() => deleteAnswer(answer.id)}
                      onClickLikeButton={() => likeAnswer(answer.id)}
                      onClickDislikeButton={() => dislikeAnswer(answer.id)}
                    />
                  )}
                </div>
              </div>
            )}

            <div className={styles.newAnswerSection}>
              <h3 className={styles.newAnswerTitle}>Your Answer</h3>
              <div>You must be logged in to answer</div>
              <textarea
                name='text'
                value={newAnswerText}
                className={styles.newAnswerBox}
                onChange={(event) => setNewAnswerText(event.target.value)}
              ></textarea>
              <button
                className={styles.submitButton}
                onClick={submitAnswer}
              >
                Submit
              </button>
              <div className={styles.message}>{message}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default QuestionPage

export async function getServerSideProps(ctx: any) {
  try {
    const response = await axios.get(`https://devhelp-zl8r.onrender.com/question/${ctx.query.id}`);
    const { question } = response.data;
    return { props: { questionInfo: question } };
  } catch (err) {
    return { props: { questionInfo: null } };
  }
}