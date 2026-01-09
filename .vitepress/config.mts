import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Airbeeps',
  description: 'The open-source, self-hosted RAG engine for AI assistants',
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'keywords', content: 'RAG, retrieval augmented generation, AI, LLM, vector database, knowledge base, self-hosted' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/' },
      { text: 'Blog', link: '/blog/' },
    ],

    sidebar: {
      '/docs/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/docs/' },
            { text: 'Quickstart', link: '/docs/getting-started/quickstart' },
            { text: 'Configuration', link: '/docs/getting-started/configuration' },
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Knowledge Bases', link: '/docs/core-concepts/knowledge-bases' },
            { text: 'Ingestion & Chunking', link: '/docs/core-concepts/ingestion-and-chunking' },
            { text: 'Retrieval', link: '/docs/core-concepts/retrieval' },
          ]
        },
        {
          text: 'Admin',
          items: [
            { text: 'System Configuration', link: '/docs/admin/system-configuration' },
          ]
        },
        {
          text: 'Deployment',
          items: [
            { text: 'Distribution', link: '/docs/deployment/distribution' },
          ]
        },
      ],
      '/blog/': [
        {
          text: 'Blog Posts',
          items: [
            { text: 'All Posts', link: '/blog/' },
            { text: 'What is RAG?', link: '/blog/what-is-rag' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/airbeeps/airbeeps' }
    ],

    footer: {
      message: 'MIT License',
      copyright: 'Airbeeps'
    }
  }
})

