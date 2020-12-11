import {useEffect, useState} from 'react';
import Link from 'next/link';
import {GetServerSideProps} from 'next';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import {Title} from '@/styles/pages/Home';
import SEO from '@/components/SEO';
import { client } from '@/libs/prismic';
import { Document } from 'prismic-javascript/types/documents';


interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({recommendedProducts}: HomeProps) {

  return ( 
    <div>
      <SEO 
      title="DevCommerce, your best e-commerce!"
      image='boost.png'
      shouldExcludeTitleSuffix/>

    <h1>Products</h1>
      <section>

        <ul>
          {recommendedProducts.map(recommendedProduct => 
            {
              return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            )})}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  //const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);

  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type','product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}