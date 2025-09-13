interface SitemapRoute {
  url: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  lastmod?: string
  alternates?: Array<{
    hreflang: string
    href: string
  }>
}

export const useSitemap = () => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.NUXT_APP_DOMAIN || 'https://megurumi.com'

  const createRoute = (
    path: string,
    options: {
      changefreq?: SitemapRoute['changefreq']
      priority?: number
      lastmod?: Date | string
      includeFrench?: boolean
    } = {}
  ): SitemapRoute[] => {
    const {
      changefreq = 'weekly',
      priority = 0.5,
      lastmod = new Date(),
      includeFrench = true
    } = options

    const lastmodString = lastmod instanceof Date ? lastmod.toISOString() : lastmod

    const routes: SitemapRoute[] = [
      {
        url: path,
        changefreq,
        priority,
        lastmod: lastmodString,
        alternates: includeFrench ? [
          {
            hreflang: 'en',
            href: `${baseUrl}${path}`
          },
          {
            hreflang: 'fr',
            href: `${baseUrl}/fr${path === '/' ? '' : path}`
          }
        ] : undefined
      }
    ]

    // Add French version if included
    if (includeFrench && path !== '/') {
      routes.push({
        url: `/fr${path}`,
        changefreq,
        priority: priority * 0.8, // Slightly lower priority for translated pages
        lastmod: lastmodString,
        alternates: [
          {
            hreflang: 'en',
            href: `${baseUrl}${path}`
          },
          {
            hreflang: 'fr',
            href: `${baseUrl}/fr${path}`
          }
        ]
      })
    } else if (includeFrench && path === '/') {
      // Special case for French homepage
      routes.push({
        url: '/fr',
        changefreq,
        priority: priority * 0.8,
        lastmod: lastmodString,
        alternates: [
          {
            hreflang: 'en',
            href: `${baseUrl}/`
          },
          {
            hreflang: 'fr',
            href: `${baseUrl}/fr`
          }
        ]
      })
    }

    return routes
  }

  const generateStaticRoutes = (): SitemapRoute[] => {
    const routes: SitemapRoute[] = []

    // Homepage - highest priority, updated weekly
    routes.push(...createRoute('/', {
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date()
    }))

    // Creations page - high priority, updated daily (new posts)
    routes.push(...createRoute('/landing/creations', {
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date()
    }))

    // Legal pages - low priority, updated monthly
    routes.push(...createRoute('/landing/terms', {
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date('2024-01-01') // Update this when terms are actually updated
    }))

    routes.push(...createRoute('/landing/policy', {
      changefreq: 'monthly',
      priority: 0.3,
      lastmod: new Date('2024-01-01') // Update this when policy is actually updated
    }))

    return routes
  }

  const generateDynamicRoutes = async (): Promise<SitemapRoute[]> => {
    const routes: SitemapRoute[] = []

    try {
      // You could add dynamic routes here in the future
      // For example, if you add individual creation detail pages:

      // const { posts } = useInstagram()
      // if (posts?.value?.length) {
      //   posts.value.forEach((post, index) => {
      //     if (post.etsyLink) { // Only include items that have products
      //       routes.push(...createRoute(`/creation/${post.key}`, {
      //         changefreq: 'monthly',
      //         priority: 0.7,
      //         lastmod: new Date(post.timestamp || Date.now())
      //       }))
      //     }
      //   })
      // }

    } catch (error) {
      console.warn('Error generating dynamic sitemap routes:', error)
    }

    return routes
  }

  const generateAllRoutes = async (): Promise<SitemapRoute[]> => {
    const staticRoutes = generateStaticRoutes()
    const dynamicRoutes = await generateDynamicRoutes()

    return [...staticRoutes, ...dynamicRoutes]
  }

  // Helper to generate alternate URLs for hreflang
  const getAlternateUrls = (path: string) => {
    return {
      en: `${baseUrl}${path}`,
      fr: `${baseUrl}/fr${path === '/' ? '' : path}`
    }
  }

  return {
    createRoute,
    generateStaticRoutes,
    generateDynamicRoutes,
    generateAllRoutes,
    getAlternateUrls,
    baseUrl
  }
}