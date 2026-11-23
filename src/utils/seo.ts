// ==========================================================================
// SEO UTILITIES — Vendo Casas
// Preparado para integração com skills de SEO
// ==========================================================================

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  noFollow?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  twitterCard?: 'summary' | 'summary_large_image';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export interface PropertySEOData {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: 'sale' | 'rent';
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: 'house' | 'apartment' | 'land' | 'commercial';
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  images: string[];
  mainImage: string;
  status: 'available' | 'pending' | 'sold' | 'rented';
  agent?: {
    name: string;
    phone: string;
    email: string;
    creci: string;
  };
}

export interface ListingSEOData {
  title: string;
  description: string;
  city: string;
  neighborhood?: string;
  propertyType?: string;
  transactionType: 'sale' | 'rent';
  totalResults: number;
  priceRange?: { min: number; max: number };
  page: number;
  totalPages: number;
}

/**
 * Gera meta tags básicas para qualquer página
 */
export function generateBaseMeta(props: SEOProps): Record<string, string> {
  const siteUrl = 'https://vendocasas.com.br';
  const pageUrl = props.canonical ? `${siteUrl}${props.canonical}` : siteUrl;
  const fullOgImage = props.ogImage?.startsWith('http') ? props.ogImage : `${siteUrl}${props.ogImage || '/og-default.jpg'}`;

  return {
    title: `${props.title} | Vendo Casas`,
    description: props.description,
    canonical: pageUrl,
    'og:title': props.title,
    'og:description': props.description,
    'og:url': pageUrl,
    'og:image': fullOgImage,
    'og:type': props.ogType || 'website',
    'og:site_name': 'Vendo Casas',
    'og:locale': 'pt_BR',
    'twitter:card': props.twitterCard || 'summary_large_image',
    'twitter:title': props.title,
    'twitter:description': props.description,
    'twitter:image': fullOgImage,
    'robots': `${props.noIndex ? 'noindex' : 'index'}, ${props.noFollow ? 'nofollow' : 'follow'}`,
  };
}

/**
 * Gera JSON-LD para Organization (site-wide)
 */
export function generateOrganizationJSONLD(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    'name': 'Vendo Casas',
    'url': 'https://vendocasas.com.br',
    'logo': 'https://vendocasas.com.br/logo.svg',
    'sameAs': [
      'https://instagram.com/vendocasas',
      'https://linkedin.com/company/vendocasas',
      'https://wa.me/5511999999999',
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'BR',
      'addressRegion': 'SP',
      'addressLocality': 'São Paulo',
      'streetAddress': 'Av. Brigadeiro Faria Lima, 1500 - 10º andar',
      'postalCode': '01452-000',
    },
    'telephone': '+55 11 99999-9999',
    'email': 'contato@vendocasas.com.br',
    'priceRange': '$$$',
    'areaServed': {
      '@type': 'City',
      'name': 'São Paulo',
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Imóveis à venda e aluguel',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Product',
            'name': 'Imóveis à venda',
            'category': 'RealEstateListing',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Product',
            'name': 'Imóveis para alugar',
            'category': 'RealEstateListing',
          },
        },
      ],
    },
  };
}

/**
 * Gera JSON-LD para WebSite (search action)
 */
export function generateWebSiteJSONLD(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Vendo Casas',
    'url': 'https://vendocasas.com.br',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://vendocasas.com.br/busca?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Gera JSON-LD para BreadcrumbList
 */
export function generateBreadcrumbJSONLD(items: Array<{ name: string; url: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : `https://vendocasas.com.br${item.url}`,
    })),
  };
}

/**
 * Gera JSON-LD completo para RealEstateListing (página de detalhe do imóvel)
 */
export function generatePropertyJSONLD(property: PropertySEOData): Record<string, unknown> {
  const siteUrl = 'https://vendocasas.com.br';
  const pageUrl = `${siteUrl}/imovel/${property.id}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    'name': property.title,
    'description': property.description,
    'url': pageUrl,
    'image': property.images.map(img => img.startsWith('http') ? img : `${siteUrl}${img}`),
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': property.address,
      'addressLocality': property.neighborhood,
      'addressRegion': property.state,
      'postalCode': property.zipCode,
      'addressCountry': 'BR',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -23.5505, // Placeholder - em produção viria do geocoding
      'longitude': -46.6333,
    },
    'offers': {
      '@type': 'Offer',
      'price': property.price,
      'priceCurrency': 'BRL',
      'priceValidUntil': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      'availability': property.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'seller': property.agent ? {
        '@type': 'Person',
        'name': property.agent.name,
        'telephone': property.agent.phone,
        'email': property.agent.email,
        'identifier': property.agent.creci,
      } : undefined,
    },
    'numberOfRooms': property.bedrooms,
    'floorSize': {
      '@type': 'QuantitativeValue',
      'value': property.area,
      'unitCode': 'MTK',
    },
    'numberOfBathroomsTotal': property.bathrooms,
    'numberOfBedrooms': property.bedrooms,
    'propertyType': property.propertyType === 'house' ? 'SingleFamilyResidence' :
                   property.propertyType === 'apartment' ? 'Apartment' :
                   property.propertyType === 'land' ? 'Land' : 'CommercialProperty',
    'amenityFeature': [
      { '@type': 'LocationFeatureSpecification', 'name': 'Quartos', 'value': property.bedrooms },
      { '@type': 'LocationFeatureSpecification', 'name': 'Banheiros', 'value': property.bathrooms },
      { '@type': 'LocationFeatureSpecification', 'name': 'Área', 'value': `${property.area}m²` },
      { '@type': 'LocationFeatureSpecification', 'name': 'Tipo', 'value': property.propertyType },
      { '@type': 'LocationFeatureSpecification', 'name': 'Transação', 'value': property.priceType === 'sale' ? 'Venda' : 'Aluguel' },
    ],
    'containedInPlace': {
      '@type': 'Place',
      'name': `${property.neighborhood}, ${property.city}`,
    },
  };
}

/**
 * Gera JSON-LD para ItemList (páginas de listagem)
 */
export function generateListingJSONLD(data: ListingSEOData): Record<string, unknown> {
  const siteUrl = 'https://vendocasas.com.br';
  const basePath = data.transactionType === 'sale' ? '/comprar' : '/alugar';
  let pageUrl = `${siteUrl}${basePath}`;

  if (data.city) pageUrl += `/${data.city.toLowerCase()}`;
  if (data.neighborhood) pageUrl += `/${data.neighborhood.toLowerCase().replace(/\s+/g, '-')}`;
  if (data.page > 1) pageUrl += `?page=${data.page}`;

  // Em produção, isso viria da API com os imóveis reais da página
  const mockItems = Array.from({ length: Math.min(12, data.totalResults) }, (_, i) => ({
    '@type': 'ListItem',
    'position': (data.page - 1) * 12 + i + 1,
    'item': {
      '@type': 'Product',
      'name': `Imóvel ${(data.page - 1) * 12 + i + 1}`,
      'url': `${siteUrl}/imovel/prop-${(data.page - 1) * 12 + i + 1}`,
      'description': `${data.bedrooms || 2} quartos, ${data.bathrooms || 1} banheiros em ${data.neighborhood || data.city}`,
      'offers': {
        '@type': 'Offer',
        'price': data.priceRange ? data.priceRange.min + (i * 100000) : 500000,
        'priceCurrency': 'BRL',
        'availability': 'https://schema.org/InStock',
      },
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': data.title,
    'description': data.description,
    'url': pageUrl,
    'numberOfItems': data.totalResults,
    'itemListElement': mockItems,
  };
}

/**
 * Gera JSON-LD para Article (blog, noticias, guias)
 */
export function generateArticleJSONLD(props: {
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  section: string;
  tags: string[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': props.title,
    'description': props.description,
    'url': props.url.startsWith('http') ? props.url : `https://vendocasas.com.br${props.url}`,
    'image': props.image.startsWith('http') ? props.image : `https://vendocasas.com.br${props.image}`,
    'author': {
      '@type': 'Person',
      'name': props.author,
      'url': 'https://vendocasas.com.br/sobre',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Vendo Casas',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://vendocasas.com.br/logo.svg',
      },
    },
    'datePublished': props.publishedTime,
    'dateModified': props.modifiedTime || props.publishedTime,
    'articleSection': props.section,
    'keywords': props.tags.join(', '),
    'inLanguage': 'pt-BR',
  };
}

/**
 * Gera JSON-LD para FAQPage
 */
export function generateFAQJSONLD(faqs: Array<{ question: string; answer: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

/**
 * Gera JSON-LD para ContactPage
 */
export function generateContactJSONLD(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Fale Conosco — Vendo Casas',
    'description': 'Entre em contato com a Vendo Casas. Atendimento por WhatsApp, telefone, e-mail ou formulário.',
    'url': 'https://vendocasas.com.br/contato',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Vendo Casas',
      'url': 'https://vendocasas.com.br',
      'telephone': '+55 11 99999-9999',
      'email': 'contato@vendocasas.com.br',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Av. Brigadeiro Faria Lima, 1500 - 10º andar',
        'addressLocality': 'São Paulo',
        'addressRegion': 'SP',
        'postalCode': '01452-000',
        'addressCountry': 'BR',
      },
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': '+55 11 99999-9999',
          'contactType': 'customer service',
          'availableLanguage': ['Portuguese'],
          'hoursAvailable': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'opens': '09:00',
            'closes': '18:00',
          },
        },
        {
          '@type': 'ContactPoint',
          'telephone': '+55 11 99999-9999',
          'contactType': 'customer service',
          'availableLanguage': ['Portuguese'],
          'hoursAvailable': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Saturday'],
            'opens': '09:00',
            'closes': '13:00',
          },
        },
      ],
    },
  };
}

/**
 * Combina múltiplos JSON-LD em um array para inclusão no head
 */
export function combineJSONLD(...schemas: (Record<string, unknown> | Record<string, unknown>[])[]): Record<string, unknown>[] {
  return schemas.flatMap(schema => Array.isArray(schema) ? schema : [schema]).filter(Boolean);
}

/**
 * Gera todas as meta tags e JSON-LD para uma página de imóvel
 */
export function generatePropertyPageSEO(property: PropertySEOData): {
  meta: Record<string, string>;
  jsonLd: Record<string, unknown>[];
} {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: property.priceType === 'sale' ? 'Comprar' : 'Alugar', url: `/${property.priceType === 'sale' ? 'comprar' : 'alugar'}` },
    { name: property.city, url: `/${property.priceType === 'sale' ? 'comprar' : 'alugar'}/${property.city.toLowerCase()}` },
    { name: property.neighborhood, url: `/${property.priceType === 'sale' ? 'comprar' : 'alugar'}/${property.city.toLowerCase()}/${property.neighborhood.toLowerCase().replace(/\s+/g, '-')}` },
    { name: property.title, url: `/imovel/${property.id}` },
  ];

  const priceText = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price) + (property.priceType === 'rent' ? '/mês' : '');

  return {
    meta: generateBaseMeta({
      title: `${property.title} — ${property.neighborhood}, ${property.city}`,
      description: `${property.bedrooms} quartos, ${property.bathrooms} banheiros, ${property.area}m². ${property.description.substring(0, 160)}...`,
      canonical: `/imovel/${property.id}`,
      ogImage: property.mainImage,
      ogType: 'website',
      structuredData: undefined, // Handled separately
    }),
    jsonLd: combineJSONLD(
      generateOrganizationJSONLD(),
      generateWebSiteJSONLD(),
      generateBreadcrumbJSONLD(breadcrumbs),
      generatePropertyJSONLD(property),
    ),
  };
}

/**
 * Gera sitemap URLs para propriedades (para uso no build)
 */
export function generatePropertySitemapUrls(properties: Array<{ id: string; updatedAt: string; priority?: number }>): Array<{
  url: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: number;
}> {
  return properties.map(prop => ({
    url: `https://vendocasas.com.br/imovel/${prop.id}`,
    lastmod: prop.updatedAt,
    changefreq: 'weekly' as const,
    priority: prop.priority || 0.7,
  }));
}