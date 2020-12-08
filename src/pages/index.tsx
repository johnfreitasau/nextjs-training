import {useEffect, useState} from 'react';
import Link from 'next/link';
import {GetServerSideProps} from 'next';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
//import math from '../libs/maths';

import {Title} from '@/styles/pages/Home';
import SEO from '@/components/SEO';
import { client } from '@/libs/prismic';
import { Document } from 'prismic-javascript/types/documents';


interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({recommendedProducts}: HomeProps) {

  async function handleSum() {
    alert(process.env.NEXT_PUBLIC_API_URL)
    
  } 

  return ( 
    <div>
      <SEO 
      title="DevCommerce, your best e-commerce!"
      image='boost.png'
      shouldExcludeTitleSuffix/>

      <Title>Hello World 1</Title>

      <section>
        <title>Products</title>

        <ul>
          {recommendedProducts.map(recommendedProduct => 
            {
              console.log('*****recommendedProduct.uid:',recommendedProduct.uid)
              
              return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                    {/* {recommendedProduct.data.title} */}
                  </a>
                </Link>
              </li>
            )})}
        </ul>
      </section>
      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  //const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);


  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type','product')
  ])

  // const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}