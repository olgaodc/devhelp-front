import Navbar from '../components/navbar/navbar';
import styles from './styles.module.css';
import heroImage from '../assets/layered-steps-haikei.svg';
import Link from 'next/link';

export default function HomePage() {
  return (

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
    </div>

  )
}
