import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import styles from './styles.module.css';
import heroImage from '../assets/layered-steps-haikei.svg';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';
import QuestionCard from '../components/questionCard/questionCard';
import { useRouter } from 'next/router';

type QuestionProps = {
  id: string;
  text: string;
  description: string;
  answersIds: [];
  creationDate: string;
}

type QuestionsProps = Array<QuestionProps> | null;

export default function HomePage({ questionsData }: any) {
  const router = useRouter(); 
  const [questions, setQuestions] = useState<QuestionsProps>(questionsData);

  const deleteQuestion = async (id: string, event: any) => {
    event.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:8080/question/${id}`, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })

      if (response.status === 200) {
        
        setQuestions(prevState => prevState ? prevState.filter(question => question.id !== id) : null);
      }

    } catch (err) {
      // setTimeout (() => {
      //   router.push('/logIn');
      // }, 500)
      router.push('/logIn');
    }

  }

  return (
    <>
      <Head>
        <title>DevHelp</title>
      </Head>
      <div className={styles.contentWrapper}>
        <Navbar />
        <div className={styles.heroBoxWrapper}>
          <div className={styles.container}>
            <div className={styles.heroBox}>
              <img className={styles.heroImage} src={heroImage.src}></img>
              <h1 className={styles.heroBoxTitle}>A public platform building the definitive collection of coding questions & answers</h1>
              <p className={styles.heroBoxDescription}>A community-based space to find and contribute answers to technical challenges. Whether you're a seasoned developer, a curious learner, or an expert in your field, our platform provides a vibrant community where you can connect with like-minded individuals to tackle technical hurdles. Together, we empower each other to overcome technical challenges and foster continuous learning in the ever-evolving world of technology.</p>
              <Link className={styles.heroBoxButton} href={'/'}>Sign up</Link>
            </div>
          </div>
        </div>
        <div className={styles.questionsSectionWrapper}>
          <div className={styles.container}>
            <div className={styles.questionsSectionNavbar}>
              <div className={styles.questionsNavbarTop}>
                <span className={styles.questionsTitle}>All Questions</span>
                <Link className={styles.addQuestionButton} href={'/'}>Ask Question</Link>
              </div>
              <div className={styles.questionsNavbarBottom}>
                {questions && questions.length === Number(1) ? (
                  <div className={styles.questionsNumber}>
                    {questions.length} question
                  </div>
                ) : (
                  <div className={styles.questionsNumber}>
                    {questions && questions.length} questions
                  </div>
                )}
                <button>Answered</button>
                <button>Unanswered</button>
              </div>
            </div>
            <div className={styles.questionsSection}>
              {questions && questions.sort((a, b) => Date.parse(b.creationDate) - Date.parse(a.creationDate)).map((question) =>
                <QuestionCard
                  key={question.id}
                  id={question.id}
                  text={question.text}
                  description={question.description}
                  answersNumber={question.answersIds}
                  date={question.creationDate}
                  onClickDeleteButton={(event: any) => deleteQuestion(question.id, event)}
                />
              )
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>

  )
}


export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost:8080/questions');
    const { questions } = response.data;
    return { props: { questionsData: questions } };
  } catch (err) {
    console.log(err);
    return { props: { questionsData: null } };
  }
}
