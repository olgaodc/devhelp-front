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
                    <Link className={styles.itemLink} href={'/'}>Home</Link>
                  </li>
                  <li className={styles.navbarListItem}>
                    <Link className={styles.itemLink} href={'/logIn'}>Log in</Link>
                  </li>
                  <li className={styles.navbarListItem}>
                    <Link className={styles.itemLink} href={'/signUp'}>Sign up</Link>
                  </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar