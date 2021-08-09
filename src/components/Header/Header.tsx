import React from 'react';
import styles from './Header.module.scss';
import ActiveLink from '../ActiveLink/ActiveLink';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <ActiveLink href="/" activeClassName={styles.active}>
          <a><span className={styles.logo}>LogoDaEmpresa</span></a>
        </ActiveLink>
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Conteúdos</a>
          </ActiveLink>
          <ActiveLink href="/sobre" activeClassName={styles.active}>
            <a>Quem Somos</a>
          </ActiveLink>
        </nav>

        <a className={styles.readyButton} type="button" href="/posts">Começar</a>

      </div>
    </header>
  )
}

export default Header
