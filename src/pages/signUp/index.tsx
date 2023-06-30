import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import logoImage from '../../assets/logo.png';
import styles from './styles.module.css';

const SignUpPage = () => {
    
  return (
    <>
    <Navbar />
    <div className={styles.formWrapper}>
      <div className={styles.container}>
        <div className={styles.form}>
          <img className={styles.logoImage} src={logoImage.src} />
          <h2 className={styles.formTitle}>Welcome to DevHelp</h2>
          {/* <div className={styles.formDescription}>Log in with your DevHelp account to continue</div> */}
          <div className={styles.nameInputWrapper}>
            <input
                type="text"
                placeholder='Name'
                // value={name}
                // onChange={(event) => { setName(event.target.value) }}
            />
            <input
                type="text"
                placeholder='Surname'
                // value={surname}
                // onChange={(event) => { setSurname(event.target.value) }}
            />
          </div>
          <input
            type="email"
            placeholder='Email'
            // value={email}
            // onChange={(event) => { setEmail(event.target.value) }}
          />
          <input
            type="password"
            placeholder='Password'
            // value={password}
            // onChange={(event) => { setPassword(event.target.value) }}
          />
          <button>Sign up</button>
          <div className={styles.message}></div>
        </div>
      </div>
    </div>
    <Footer />
  </>
  )
}

export default SignUpPage