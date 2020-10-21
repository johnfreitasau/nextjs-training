import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  shouldExcludeTitleSuffix?: boolean;
  shouldIndexPage?: boolean;
}


export default function SEO({
  title,
  description,
  image,
  shouldExcludeTitleSuffix = false,
  shouldIndexPage = true
}: SEOProps) {

  const pageTitle = `${title} ${!shouldExcludeTitleSuffix ? '| DevCommerce' : ''}`
  const pageImage = image ? `http://localhost:3000/${image}` : null;

  return (
    <Head>
      <title>{title}</title>

      {description && <meta name="description" content={description} /> }
      {pageImage && <meta name="image" content={pageImage} />}
    </Head>
  )
}