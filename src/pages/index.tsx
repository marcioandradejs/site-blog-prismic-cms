import styles from '../styles/home.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import TechsImage from '../../public/images/techs.svg'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <div className={styles.ctaText}>
            <h1>Levando você ao próximo nível!</h1>
            <p>Uma plataforma com cursos que vão do zero até o profissional na pratica, direto ao ponto aplicando o que usamos no mercado de trabalho. 👊</p>
            <a>
              <button>Coemçar agora!</button>
            </a>
          </div>
            <img src="/images/banner-conteudos.png" alt="Conteúdos bla bla" />
        </section>

        <hr className={styles.divisor } />

        <section className={styles.sectionContent}>
          <div>
            <h2>Aprenda criar  aplicativos para Android e iOS</h2>
            <p>Você vai descobrir o jeito mais moderno de desenvolver apps nativos para iOS e Android, construindo aplicativos do zero até aplicativos.</p>
          </div>
          <img src="/images/financasApp.png" alt="smartphone" />
        </section>

        <hr className={styles.divisor } />

        <section className={styles.sectionContent}>
          <img src="/images/webDev.png" alt="Aplicações web" />
          <div>
            <h2>Aprenda criar sistemas web</h2>
            <p>Criar sistemas web, sites usando as tecnologias mais modernas e requisitadas pelo mercado.</p>
          </div>
        </section>

        <section className={styles.nextLevelContent}>
          <Image src={TechsImage} alt="Tecnologias" />
          <h2>Mais de <span>15 mil</span> já levaram sua carreira ao próximo nivel.</h2>
          <p>E você vai perder a chance de evoluir de uma vez por todas?</p>
          <a href="#">
            <button>Acessar turma</button>
          </a>
        </section>


      </main>
    </>
  );
}
