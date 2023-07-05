import React, { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import logoImage from '../../assets/logo.png';

const DesktopMenu = () => {
  return (
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
  )
}

const MobileMenu = (props: any) => {
  return (
    <div className={`${styles.mobileMenuWrapper} ${props.isMenuOpen ? styles.menuOpened : styles.menuClosed}`}>
      <ul className={styles.mobileMenu}>
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
  )
}

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Link className={styles.logoWrapper} href={'/'}>
            <img className={styles.logoImage} src={logoImage.src} />
            <span className={styles.logoText}>DevHelp</span>
          </Link>
          <DesktopMenu />
          <div onClick={() => {
            setMenuOpen((prevState) => !prevState);
          }} className={styles.hamburgerMenu}>
            <div className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></div>
            <div className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></div>
            <div className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></div>
          </div>
        </div>
        <MobileMenu isMenuOpen={isMenuOpen} />
      </div>
    </div>
  )
}

export default Navbar