import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  type?: string;
  url?: string;
  image?: string;
}

export default function SEO({ 
  title, 
  description, 
  keywords = "laptop repair rosebank, computer repair johannesburg, phone repair, macbook screen replacement, asetos computers", 
  type = "website",
  url = "https://repairtechrb.co.za",
  image = "https://repairtechrb.co.za/images/banner_casing.jpg"
}: SEOProps) {
  
  const siteTitle = `${title} | RepairTech Rosebank`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph tags for Facebook, LinkedIn, etc. */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
