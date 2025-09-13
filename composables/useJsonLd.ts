interface JsonLdSchema {
  '@context': string
  '@type': string
  [key: string]: any
}

interface OrganizationSchema extends JsonLdSchema {
  '@type': 'Organization'
  name: string
  url?: string
  logo?: string
  description?: string
  sameAs?: string[]
  address?: {
    '@type': 'PostalAddress'
    addressCountry?: string
    addressRegion?: string
  }
  contactPoint?: {
    '@type': 'ContactPoint'
    contactType: string
    url: string
  }[]
}

interface PersonSchema extends JsonLdSchema {
  '@type': 'Person'
  name: string
  url?: string
  image?: string
  description?: string
  sameAs?: string[]
  jobTitle?: string
  worksFor?: {
    '@type': 'Organization'
    name: string
  }
}

interface ProductSchema extends JsonLdSchema {
  '@type': 'Product'
  name: string
  description?: string
  image?: string | string[]
  brand?: {
    '@type': 'Organization' | 'Brand'
    name: string
  }
  category?: string
  offers?: {
    '@type': 'Offer'
    url?: string
    priceCurrency?: string
    price?: string
    availability?: string
    seller?: {
      '@type': 'Organization'
      name: string
    }
  }
  creator?: {
    '@type': 'Person'
    name: string
  }
}

interface WebSiteSchema extends JsonLdSchema {
  '@type': 'WebSite'
  name: string
  url: string
  description?: string
  publisher?: {
    '@type': 'Organization'
    name: string
  }
  potentialAction?: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

interface WebPageSchema extends JsonLdSchema {
  '@type': 'WebPage'
  name: string
  url: string
  description?: string
  isPartOf?: {
    '@type': 'WebSite'
    name: string
    url: string
  }
  about?: {
    '@type': 'Thing'
    name: string
  }
}

interface CreativeWorkSchema extends JsonLdSchema {
  '@type': 'CreativeWork'
  name: string
  description?: string
  image?: string | string[]
  creator?: {
    '@type': 'Person'
    name: string
  }
  about?: string[]
  genre?: string
  keywords?: string
}

export const useJsonLd = () => {
  const { $config } = useNuxtApp()
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  const baseUrl = runtimeConfig.public.NUXT_APP_DOMAIN || 'https://megurumi.com'
  const currentUrl = `${baseUrl}${route.path}`

  const addJsonLd = (schema: JsonLdSchema | JsonLdSchema[]) => {
    const schemas = Array.isArray(schema) ? schema : [schema]

    schemas.forEach((schemaItem, index) => {
      useHead({
        script: [{
          key: `jsonld-${index}`,
          type: 'application/ld+json',
          innerHTML: JSON.stringify(schemaItem, null, 0)
        }]
      })
    })
  }

  // Organization Schema for Megurumi Creative
  const createOrganizationSchema = (): OrganizationSchema => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Megurumi Creative',
    url: baseUrl,
    logo: `${baseUrl}/img/pwa/512.png`,
    description: 'Handmade crochet creations, tutorials, and patterns. Explore unique amigurumi and accessories crafted with love and creativity.',
    sameAs: [
      'https://www.instagram.com/megurumi_creative',
      'https://www.facebook.com/megurumicreative',
      'https://www.youtube.com/@megurumi_creative',
      'https://www.tiktok.com/@megurumi_creative',
      'https://www.etsy.com/ca/shop/MegurumiCreative'
    ],
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://www.etsy.com/ca/shop/MegurumiCreative'
    }]
  })

  // Person Schema for the Creator
  const createPersonSchema = (): PersonSchema => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Megurumi Creative',
    url: baseUrl,
    image: `${baseUrl}/img/landing/hero.png`,
    description: 'Crochet artist and pattern designer creating unique handmade amigurumi and accessories. Teaching crochet through free YouTube tutorials.',
    jobTitle: 'Crochet Artist & Pattern Designer',
    worksFor: {
      '@type': 'Organization',
      name: 'Megurumi Creative'
    },
    sameAs: [
      'https://www.instagram.com/megurumi_creative',
      'https://www.facebook.com/megurumicreative',
      'https://www.youtube.com/@megurumi_creative',
      'https://www.tiktok.com/@megurumi_creative',
      'https://www.etsy.com/ca/shop/MegurumiCreative'
    ]
  })

  // Website Schema
  const createWebSiteSchema = (): WebSiteSchema => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Megurumi Creative',
    url: baseUrl,
    description: 'Discover the art of crochet with handmade creations, free tutorials, and patterns from Megurumi Creative.',
    publisher: {
      '@type': 'Organization',
      name: 'Megurumi Creative'
    }
  })

  // WebPage Schema
  const createWebPageSchema = (page: { title: string, description?: string }): WebPageSchema => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    url: currentUrl,
    description: page.description,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Megurumi Creative',
      url: baseUrl
    },
    about: {
      '@type': 'Thing',
      name: 'Crochet and Amigurumi'
    }
  })

  // Product Schema for Crochet Creations
  const createProductSchema = (product: {
    name: string
    description?: string
    image?: string | string[]
    price?: string
    url?: string
  }): ProductSchema => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Organization',
      name: 'Megurumi Creative'
    },
    category: 'Handicraft',
    creator: {
      '@type': 'Person',
      name: 'Megurumi Creative'
    },
    offers: product.price ? {
      '@type': 'Offer',
      url: product.url || currentUrl,
      priceCurrency: 'CAD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Megurumi Creative'
      }
    } : undefined
  })

  // Creative Work Schema for Tutorials/Patterns
  const createCreativeWorkSchema = (work: {
    name: string
    description?: string
    image?: string | string[]
  }): CreativeWorkSchema => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.name,
    description: work.description,
    image: work.image,
    creator: {
      '@type': 'Person',
      name: 'Megurumi Creative'
    },
    about: ['Crochet', 'Amigurumi', 'Handicraft', 'Tutorial'],
    genre: 'Educational',
    keywords: 'crochet, amigurumi, handmade, tutorial, pattern, craft'
  })

  return {
    addJsonLd,
    createOrganizationSchema,
    createPersonSchema,
    createWebSiteSchema,
    createWebPageSchema,
    createProductSchema,
    createCreativeWorkSchema
  }
}