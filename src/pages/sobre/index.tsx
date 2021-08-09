import { GetStaticProps } from 'next';
import styles from './styles.module.scss';
import Head from 'next/head';
import { getPrismicCLient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { FaYoutube, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';

type Content = {
  title: string;
  description: string;
  banner: string;
  facebook: string;
  instagram: string;
  yoututbe: string;
  linkedin: string;
}

interface ContentProps{
  content: Content
}

export default function Sobre({ content }: ContentProps) {
  return (
    <>
      <Head>
        <title>Quem somo? | Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <p>{content.description}</p>
            <a href={content.yoututbe}>
              <FaYoutube size={40} />
            </a>
            <a href={content.instagram}>
              <FaInstagram size={40} />
            </a>
            <a href={content.facebook}>
              <FaFacebook size={40} />
            </a>
            <a href={content.linkedin}>
              <FaLinkedin size={40} />
            </a>
          </section>

          <img src={content.banner} alt={content.title} />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicCLient();
  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'sobre')
  ])

  const {
    title,
    description,
    banner,
    facebook,
    instagram,
    youtube,
    linkedin
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    description: RichText.asText(description),
    banner: banner.url,
    facebook: facebook.url,
    instagram: instagram.url,
    youtube: youtube.url,
    linkedin: linkedin.url
  }


  return{
    props: {
      content
    },
    revalidate: 60 * 60 // revalidado a cada 1 hora
  }
}