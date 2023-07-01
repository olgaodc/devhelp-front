import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import AnswerCard from '../../components/answerCard/answerCard';
import styles from './styles.module.css';
import axios from 'axios';

type QuestionProps = {
  id: string;
  text: string;
  description: string;
  answersIds: [];
  questionAnswers: [];
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
  const [question, setQuestion] = useState<QuestionProps>(questionInfo[0]);
  const [answers, setAnswers] = useState<AnswersProps>(questionInfo[0].questionAnswers);

  const deleteAnswer = async () => {
    console.log('delete');
  }

  const likeAnswer = async () => {
    console.log('like');
  }

  const dislikeAnswer = async () => {
    console.log('dislike');
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

                {question.answersIds.length === Number(1) ? (
                  <div className={styles.answersNumber}>{question.answersIds.length} answer</div>
                ) : (
                  <div className={styles.answersNumber}>{question.answersIds.length} answers</div>
                )}

                <div className={styles.answersSection}>
                  {answers && answers.map(answer => 
                    <AnswerCard
                      key={answer.id}
                      id={answer.id}
                      text={answer.text}
                      likes={answer.likesNumber}
                      date={answer.creationDate}
                      onClickDeleteButton={deleteAnswer}
                      onClickLikeButton={likeAnswer}
                      onClickDislikeButton={dislikeAnswer}
                    />  
                  )}
                </div>
              </div>
            )
            }

            <div className={styles.newAnswerSection}>
              <h3 className={styles.newAnswerTitle}>Your Answer</h3>
              <textarea className={styles.newAnswerBox}></textarea>
              <button className={styles.submitButton}>Submit</button>
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
    const response = await axios.get(`http://localhost:8080/question/${ctx.query.id}`);
    const { question } = response.data;
    // console.log(question);
    return { props: { questionInfo: question } };
  } catch (err) {
    // console.log(err);
    return { props: { questionInfo: null } };
  }
}