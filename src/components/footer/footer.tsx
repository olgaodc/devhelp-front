import React from 'react';
import styles from './styles.module.css';
import logoImage from '../../assets/logo.png';
import facebookIcon from '../../assets/facebook_icon.png';
import linkedinIcon from '../../assets/linkedin_icon.png';
import instagramIcon from '../../assets/instagram_icon.png';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.container}>
        <div className={styles.footer}>
          <div className={styles.logoWrapper}>
            <Link className={styles.logoLink} href={'/'}>
              <img className={styles.logoImage} src={logoImage.src} />
              <span className={styles.logoText}>DevHelp</span>
            </Link>
            <div className={styles.logoInfo}>It's all about your code</div>
          </div>

          <div className={styles.socialMediaListWrapper}>
            <div className={styles.socialMediaListTitle}>Follow us</div>
            <ul className={styles.socialMediaList}>
              <li className={styles.socialMediaItem}>
                <Link className={styles.socialMediaItemLink} href={'https://www.facebook.com/'} target='blank'>
                  <img className={styles.socialMediaLinkImage} src={facebookIcon.src} alt='facebook icon' />
                </Link>
              </li>
              <li className={styles.socialMediaItem}>
                <Link className={styles.socialMediaItemLink} href={'https://www.linkedin.com/'} target='blank'>
                  <img className={styles.socialMediaLinkImage} src={linkedinIcon.src} alt='linkedin icon' />
                </Link>
              </li>
              <li className={styles.socialMediaItem}>
                <Link className={styles.socialMediaItemLink} href={'https://www.instagram.com/'} target='blank'>
                  <img className={styles.socialMediaLinkImage} src={instagramIcon.src} alt='instagram icon' />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerInfo}>© 2023 DevHelp Inc. All rights reserved</div>
      </div>
    </div>
  )
}

export default Footer