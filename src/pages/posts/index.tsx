import { GetStaticProps } from 'next';
import { getPrismicCLient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom'; 
import Head from 'next/head';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import thumbImg from '../../../public/images/thumb.png';
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight} from 'react-icons/fi';

type Post = {
  slug: string;
  title: string;
  cover: string;
  description: string;
  updatedAt: string
}

interface PostsProps{
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {

  console.log(posts)

  return (
    <>
      <Head>
        <title>Blog | site com blog</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <Link href="/">
            <a>
              <Image 
              src={thumbImg} 
              alt='Titulo Post'
              width={720}
              height={410}
              quality={100}
              />
              <strong>Criando meu primeiro aplicativo</strong>
              <time>14 JUN 2021</time>
              <p>Hoje vamos criar o controle de mostrar a senha no input, uma opção para os nossos formulários de cadastro e login. Mas chega de conversa e bora pro código junto comigo que o vídeo está show de bola!</p>
            </a>
          </Link>

          <div className={styles.buttonNavigate}>
            <div>
              <button>
                <FiChevronsLeft size={25} color="#FFF" />
              </button>
              <button>
                <FiChevronLeft size={25} color="#FFF" />
              </button>
            </div>
            <div>
              <button>
                <FiChevronsRight size={25} color="#FFF" />
              </button>
              <button>
                <FiChevronRight size={25} color="#FFF" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicCLient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    orderings: '[document.last_publication_date desc]', //Ordenar pelo mais recente
    fetch: ['post.title', 'post.description', 'post.cover'],
    pageSize: 3
  })

  console.log(JSON.stringify(response, null, 2))

  const posts = response.results.map( post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
      cover: post.data.cover.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return{
    props:{
      posts
    },
    revalidate: 60 * 30 // Atualiza a cada 30 minutos.
  }
}