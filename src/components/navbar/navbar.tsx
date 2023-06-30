import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
// import logoImage from '../../assets/';

const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Link className={styles.logoWrapper} href={'/'}>
                    <img className={styles.logoImage} src={'https://cdn0.iconfinder.com/data/icons/computer-223/24/question_support_information_service_advice_inquiry-25-512.png'}/>
                    <span className={styles.logoText}>DevHelp</span>
                </Link>
                <ul className={styles.navbarList}>
                  <li className={styles.navbarListItem}>
                    <Link className={styles.itemLink} href={'/'}>Home</Link>
                  </li>
                  <li className={styles.navbarListItem}>
                    <Link className={styles.itemLink} href={'/'}>Log in</Link>
                  </li>
                  <li className={styles.navbarListItem}>
                    <Link className={styles.itemLink} href={'/'}>Sign up</Link>
                  </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar