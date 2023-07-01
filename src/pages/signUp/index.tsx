import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import logoImage from '../../assets/logo.png';
import styles from './styles.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const SignUpPage = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState('');

  const signUp = async () => {
    if(!formValidation()) {
      try {
        const response = await axios.post('http://localhost:8080/signUp', {
          name: name,
          surname: surname,
          email: email,
          password: password,
        });
  
        if (response.status === 200) {
          clearAllInputs();
          setTimeout(() => {
            router.push('/');
          }, 1000);
        }
  
      } catch(err) {
        setMessage('Error, please try later');
  
        setTimeout(() => {
        }, 1500);
  
        console.log(err);
      }
    }
  }

  const formValidation = () => {
    if (!name || !surname || !email) {
      setMessage('Please fill all fields');
      return true;
    }

    if (name.length < 3) {
      setMessage(`Name can't be less than 3 characters`)
      return true;
    }

    if (surname.length < 3) {
      setMessage(`Surname can't be less than 3 characters`)
      return true;
    }

    if (email.length < 8) {
      setMessage(`Email can't be less than 8 characters`)
      return true;
    }

    if (!email.includes('@')) {
      setMessage(`Email should contain @`);
      return true;
    }

    const passwordPattern = /^(?=.*\d).{6,}$/;

    if (!passwordPattern.test(password)) {
      setMessage(`The password must have a minimum of 6 characters and include at least one number`);
      return true;
    }

    setMessage('');
    return false;
  }

  const clearAllInputs = () => {
    setName('');
    setSurname('');
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
            <h2 className={styles.formTitle}>Welcome to DevHelp</h2>
            {/* <div className={styles.formDescription}>Sign up with your DevHelp account to continue</div> */}
            <div className={styles.nameInputWrapper}>
              <input
                type="text"
                placeholder='Name'
                value={name}
                onChange={(event) => {setName(event.target.value)}}
              />
              <input
                type="text"
                placeholder='Surname'
                value={surname}
                onChange={(event) => { setSurname(event.target.value) }}
              />
            </div>
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(event) => {setEmail(event.target.value)}}
            />
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(event) => {setPassword(event.target.value)}}
            />
            <button 
              className={styles.formButton}
              onClick={() => signUp()}
            >
              Sign up
            </button>
            <div className={styles.message}>{message}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignUpPage