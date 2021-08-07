import { GetStaticProps } from 'next';
import { getPrismicCLient } from '../services/prismic';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';
import styles from '../styles/home.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import TechsImage from '../../public/images/techs.svg';

type Content = {
  title: string;
  titleContent: string;
  linkAction: string;
  mobileTitle: string;
  mobileContent: string;
  mobileBanner: string;
  webTitle: string;
  webContent: string;
  webBanner: string;
}
interface ContentProps{
  content: Content;
}

export default function Home({ content }: ContentProps) {

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
              <button>Começar agora!</button>
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

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicCLient();
  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'home')
  ])

  console.log(response.results[0].data);

  const {
    title, sub_title, link_action, mobile, mobile_content, mobile_banner, web, web_content, web_banner
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    linkAction: link_action.url,
    mobileTitle: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    webTitle: RichText.asText(web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url,
  }

  return {
    props: {
      content
    },
    revalidate: 60 * 60 // revalida a página a cada 1 hora.
  }
}