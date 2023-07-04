import React, { use, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import logoImage from '../../assets/logo.png';
import styles from './styles.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LogInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState('');

  const logIn = async () => {
    try {
      const response = await axios.post('http://localhost:8080/logIn', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.jwt;
        localStorage.setItem('token', token);
        setMessage('');
        clearAllInputs();
        router.push('/');
      }

    } catch {
      setMessage('Invalid email or password');
      // console.log(err);
    }
  }

  const clearAllInputs = () => {
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <Navbar />
      <div className={styles.formWrapper}>
        <div className={styles.container}>
          <div className={styles.form}>
            <img className={styles.logoImage} src={logoImage.src} />
            <h2 className={styles.formTitle}>Welcome back</h2>
            <div className={styles.formDescription}>Log in with your DevHelp account to continue</div>
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(event) => { setEmail(event.target.value) }}
            />
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(event) => { setPassword(event.target.value) }}
            />
            <button className={styles.formButton} onClick={logIn}>Log in</button>
            <div className={styles.formTextWrapper}>
              <span className={styles.formText}>Don't have an account yet? </span>
              <Link className={styles.formTextLink} href={'/signUp'}>Sign Up</Link>
            </div>
            {message && <div className={styles.message}>{message}</div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LogInPage