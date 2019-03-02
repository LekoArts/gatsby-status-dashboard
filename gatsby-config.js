require('dotenv').config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
    siteName: process.env.SITE_TITLE,
    siteDescription: process.env.SITE_DESCRIPTION
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-netlify',
      options: {
        apiKey: process.env.NETLIFY_ACCESS_KEY,
      }
    },
    {
      resolve: 'gatsby-source-circleci',
      options: {
        apiKey: process.env.CIRCLECI_KEY,
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: process.env.SITE_URL,
        short_name: 'Status',
        description: process.env.SITE_DESCRIPTION,
        start_url: '/',
        background_color: '#002845',
        theme_color: '#fff9d4',
        display: 'standalone',
        icon: 'src/favicon.png',
      },
    },
    /* Must be placed at the end */
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
  ]
}
