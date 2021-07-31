import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Pizza Slices`,
    siteURL: `http://example.com`,
    description: `Really good za`,
    twitter: '@example',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-eslint`,
    `gatsby-plugin-styled-components`,
    `@danbruegge/gatsby-plugin-stylelint`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `dcfbuf0i`,
        dataset: `production`,
        watchmode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
