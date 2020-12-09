import {useRouter} from 'next/router';
import { client } from '@/libs/prismic';
import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';


interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {

  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  // console.log('PRODUCT:',product.data);

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>
      
        <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(product.data.description)}} />

        <img src={product.data.thumbnail.url} alt={product.data.thumbnail.alt} width="600" />

        <div>Price: ${product.data.price}</div>

      <p>{}</p>
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