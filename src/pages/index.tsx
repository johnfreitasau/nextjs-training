import {useEffect, useState} from 'react';
import {GetServerSideProps} from 'next';

//import math from '../libs/maths';

import {Title} from '../styles/pages/Home';
import maths from '../libs/maths';

interface IProducts {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProducts[];
}

export default function Home({recommendedProducts}: HomeProps) {
  
  async function handleSum() {
    const math = (await import('../libs/maths')).default;
    
    alert(math.sum(1, 2));
  } 

  return ( 
    <div>
      <Title>Hello World 1</Title>

      <section>
        <title>Products</title>

        <ul>
          {recommendedProducts.map(recommendedProduct => 
            {return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )})}
        </ul>
      </section>
      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts

    }
  }
}