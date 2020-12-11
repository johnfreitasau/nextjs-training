import {GetServerSideProps} from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import {FormEvent, useState} from 'react';

import SEO from '@/components/SEO';
import { client } from '@/libs/prismic';
import { Document } from 'prismic-javascript/types/documents';


interface SearchProps {
  SearchResults: Document[];
}

export default function Search({SearchResults}: SearchProps) {

  const [search, setSearch] = useState('');
  
  const route = useRouter();

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    route.push(`/search?q=${encodeURIComponent(search)}`)

    setSearch('');
  }

  return ( 
    <div>
      <SEO 
      title="DevCommerce, your best e-commerce!"
      image='boost.png'
      shouldExcludeTitleSuffix/>

    <h1>Products</h1>
    <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
        <button>Search</button>
      </form>
      <section>

        <ul>
        
          {SearchResults.map(product => 
            {
              return (
              <li key={product.id}>
                <Link href={`/catalog/products/${product.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(product.data.title)}
                  </a>
                </Link>
              </li>
            )})}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (context) => {
  //const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);

  const { q } = context.query;

  if (!q) {
    return {
      props : {
        SearchResults : []
      }
    }
  }

  const SearchResults = await client().query([
    Prismic.Predicates.at('document.type','product'),
    Prismic.Predicates.fulltext('my.product.title', String(q))
  ])

  return {
    props: {
      SearchResults: SearchResults.results
    }
  }
}
