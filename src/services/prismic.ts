import Prismic from '@prismicio/client';

export function getPrismicCLient(req?: unknown){
  const prismic = Prismic.client('https://site-blogg.prismic.io/api/v2', {
    req,
  })

  return prismic
}