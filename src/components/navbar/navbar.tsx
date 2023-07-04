import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import logoImage from '../../assets/logo.png';

const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Link className={styles.logoWrapper} href={'/'}>
                    <img className={styles.logoImage} src={logoImage.src}/>
                    <span className={styles.logoText}>DevHelp</span>
                </Link>
                <ul className={styles.navbarList}>
                  <li className={styles.navbarListItem}>
                    <Link className={`${styles.itemLink} ${styles.home}`} href={'/'}>Home</Link>
                  </li>
                  <li className={styles.navbarListItem}>
                    <Link className={`${styles.itemLink} ${styles.logInButton}`} href={'/logIn'}>Log in</Link>
                  </li>
                  <li className={styles.navbarListItem}>
                    <Link className={`${styles.itemLink} ${styles.signUpButton}`} href={'/signUp'}>Sign up</Link>
                  </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar