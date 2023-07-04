import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import QuestionModal from '../components/questionModal/questionModal';
import Footer from '../components/footer/footer';
import styles from './styles.module.css';
import heroImage from '../assets/coding-image.webp';
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
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [displayQuestions, setDisplayQuestions] = useState<QuestionsProps>(questionsData);

  const answeredQuestions = () => {
    const filteredQuestions = questions ? questions.filter(question => question.answersIds.length > 0) : [];
    setDisplayQuestions(filteredQuestions);
  }

  const unansweredQuestions = () => {
    const filteredQuestions = questions ? questions.filter(question => question.answersIds.length === 0) : [];
    setDisplayQuestions(filteredQuestions);
  }

  //pridejus nauja klausima, atvaizduoja visus klausimus kartu su nauju
  const addQuestion = (newQuestion: QuestionProps) => {
    setDisplayQuestions(prevState => prevState ? [newQuestion, ...prevState] : [newQuestion]);
  }

  const deleteQuestion = async (id: string, event: any) => {
    event.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:8080/question/${id}`, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })

      if (response.status === 200) {

        setDisplayQuestions(prevState => prevState ? prevState.filter(question => question.id !== id) : null);
      }

    } catch (err) {
      // setTimeout (() => {
      //   router.push('/logIn');
      // }, 500)
      router.push('/logIn');
    }

  }

  const openModal = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/auth`, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })

      if (response.status === 200) {
        setShowQuestionModal(true);
      }
    } catch {
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
              <div className={styles.heroBoxInfo}>
                <h1 className={styles.heroBoxTitle}>Unleash Your Coding Potential</h1>
                <p className={styles.heroBoxDescription}>Connect, learn, and collaborate in our coding Q&A hub. Join developers, learners, and experts in a vibrant community. Tackle technical challenges together and foster continuous learning in the world of technology.</p>
                <Link className={styles.heroBoxButton} href={'/signUp'}>Sign up</Link>
              </div>

              <img className={styles.heroImage} src={heroImage.src}></img>
            </div>
          </div>
        </div>

        <div className={styles.questionsSectionWrapper}>
          <div className={styles.container}>
            <div className={styles.questionsSectionNavbar}>
              <div className={styles.questionsNavbarTop}>
                <span className={styles.questionsTitle}>All Questions</span>
                <button className={styles.addQuestionButton} onClick={openModal}>Ask Question</button>
              </div>

              <div className={styles.questionsNavbarBottom}>
                {displayQuestions &&
                  displayQuestions.length === Number(1) ? (
                  <div className={styles.questionsNumber}>
                    {displayQuestions.length} question
                  </div>
                ) : (
                  <div className={styles.questionsNumber}>
                    {displayQuestions && displayQuestions.length} questions
                  </div>
                )}
                <div className={styles.buttonsWrapper}>
                  <button onClick={answeredQuestions}>Answered</button>
                  <button onClick={unansweredQuestions}>Unanswered</button>
                  <button onClick={() => setDisplayQuestions(questions)}>All Questions</button>
                </div>

              </div>
            </div>
            <div className={styles.questionsSection}>
              {displayQuestions && displayQuestions.sort((a, b) => Date.parse(b.creationDate) - Date.parse(a.creationDate)).map((question) =>
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

        {showQuestionModal &&
          <QuestionModal
            closeModal={() => setShowQuestionModal(false)}
            onQuestionAdded={addQuestion}
          />}
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
