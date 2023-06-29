import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Link href={'/'}>
                    {/* <img/> */}
                    <span>DevHelp</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar