import {useRouter} from 'next/router';
import { client } from '@/libs/prismic';
import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';


interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {

  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>


    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  
  const products = await client().query([
    Prismic.Predicates.at('document.type','product')
  ])
  
  const paths = products.results.map(product => {
    return {
      params: {slug: product.uid}
    }
  })

  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  
  const {slug} = context.params;

  const product = await client().getByUID('product', String(slug), {})
  
  return {
    props: {
      product,
    },
    revalidate: 60
  }
}