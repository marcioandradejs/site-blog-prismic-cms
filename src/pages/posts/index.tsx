import { GetStaticProps } from 'next';
import { getPrismicCLient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom'; 
import Head from 'next/head';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight} from 'react-icons/fi';
import { useState } from 'react';

type Post = {
  slug: string;
  title: string;
  cover: string;
  description: string;
  updatedAt: string
}

interface PostsProps{
  posts: Post[];
  page: string;
  totalPages: string;
}

export default function Posts({ posts: postsBlog, page, totalPages }: PostsProps) {
  const [posts, setPosts] = useState(postsBlog || []);
  const [currentPage, setCurrentPage] = useState(Number(page));

  //Buscar novos posts
  async function rePost(pageNumber:number) {
    const prismic = getPrismicCLient();
    const response = await prismic.query([
      Prismic.Predicates.at('document.type', 'po')
    ], {
      orderings: '[document.last_publication_date desc]', //Ordenar pelo mais recente
      fetch: ['post.title', 'post.description', 'post.cover'],
      pageSize: 3,
      page: String(pageNumber)
    })
    return response;
  }

  async function navigatePage(pageNumber: number) {
    const response = await rePost(pageNumber);

    if (response.results.length === 0 ) {
      return;
    }

    const getPosts = response.results.map( post => {
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
    setCurrentPage(pageNumber);
    setPosts(getPosts);

  }

  return (
    <>
      <Head>
        <title>Blog | site com blog</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map( post => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <Image 
                src={post.cover} 
                alt={post.title}
                width={720}
                height={410}
                quality={100}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN08vCuBwAC/wFW4Ge3fgAAAABJRU5ErkJggg=="
                />
                <strong>{post.title}</strong>
                <time>{post.updatedAt}</time>
                <p>{post.description}</p>
              </a>
            </Link>
          ))}

          <div className={styles.buttonNavigate}>
            { Number(currentPage) >= 2 && (
              <div>
                <button onClick={ () => navigatePage(1) }>
                  <FiChevronsLeft size={25} color="#FFF" />
                </button>
                <button onClick={ () => navigatePage(Number(currentPage - 1)) }>
                  <FiChevronLeft size={25} color="#FFF" />
                </button>
              </div>
            )}
            { Number(currentPage) < Number(totalPages) && (
              <div>
                <button onClick={ () => navigatePage(Number(currentPage + 1)) }>
                  <FiChevronsRight size={25} color="#FFF" />
                </button>
                <button onClick={ () => navigatePage(Number(totalPages)) }>
                  <FiChevronRight size={25} color="#FFF" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicCLient();

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'po')
  ], {
    orderings: '[document.last_publication_date desc]', //Ordenar pelo mais recente
    fetch: ['post.title', 'post.description', 'post.cover'],
    pageSize: 3
  });

  // console.log(JSON.stringify(response, null, 2))

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
      posts,
      page: response.page,
      totalPages: response.total_pages
    },
    revalidate: 60 * 30 // Atualiza a cada 30 minutos.
  }
}