import React from 'react';
import styles from './styles.module.css';

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.container}>
        <div className={styles.footer}>
          <div className={styles.footerInfo}>DevHelp</div>
        </div>
      </div>
    </div>
  )
}

export default Footer