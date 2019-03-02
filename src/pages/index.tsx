import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import tw from 'tailwind.macro'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import GitHub from '../images/GitHub'
import CircleCI from '../images/CircleCI'
import Package from '../images/Package'
import Bug from '../images/Bug'

const GlobalStyles = createGlobalStyle`
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ::selection {
    color: #fff;
    background-color: #3490dc;
  }
  body {
    border: 0;
    margin: 0;
    padding: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    font-size: 18px;
    color: #24242d;
    background: #f0f2fd;
  }
`

const Content = styled.div`
  ${tw`max-w-xl mx-auto px-4`};
`

const Heading = styled.h1`
  ${tw`text-3xl sm:text-4xl md:text-5xl mb-2`}
`

const Header = styled.header`
  ${tw`mb-8`};
`

const Stats = styled.div`
  ${tw`flex flex-col sm:flex-row`};
  svg {
    ${tw`w-6 md:w-8 rounded-full p-2 bg-white`};
    .primary {
      ${tw`fill-current text-blue`};
    }
    .secondary {
      ${tw`fill-current text-blue-darker`};
    }
  }
`

const StatItem = styled.div`
  ${tw`flex items-center mr-6 mb-2`};
`

const StatIcon = styled.div`
  ${tw`h-10 md:h-12 z-10`};
`

const StatText = styled.div`
  ${tw`shadow text-blue-darker bg-white px-4 py-2 rounded-lg ml-2 text-sm font-semibold`};
`

const Text = styled.p`
  ${tw`text-grey-darker text-lg sm:text-xl md:text-2xl mt-2 mb-6`};
`

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  ${tw`py-6`};
  @media (max-width: 690px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  ${tw`p-4 bg-white rounded-lg shadow`};
`

const CardTop = styled.div`
  ${tw`flex justify-between items-center`};
  a {
    ${tw`text-grey-darker hover:text-blue no-underline uppercase font-semibold tracking-wide text-sm`};
  }
`

const Icons = styled.div`
  ${tw`flex items-center`};
  svg {
    width: 20px;
    height: 20px;
    ${tw`fill-current`};
  }
  a {
    height: 20px;
    ${tw`text-grey`};
  }
  a:last-child {
    ${tw`ml-2`};
  }
`

const CardBottom = styled.div`
  ${tw`mt-6`};
  a {
    ${tw`mr-2`};
  }
`

const Footer = styled.footer`
  ${tw`text-base text-grey-dark py-8`};
  a {
    ${tw`text-blue no-underline`};
  }
`

interface PageProps {
  data: {
    config: {
      siteMetadata: {
        siteName: string
        siteDescription: string
        siteUrl: string
      }
    }
    sites: {
      totalCount: number
      edges: {
        node: {
          netlify_id: string
          name: string
          url: string
          build_settings: {
            repo_url: string
          }
        }
      }[]
    }
    circleci: {
      edges: {
        node: {
          vcs_url: string
        }
      }[]
    }
    me: {
      num_projects_followed: number
    }
  }
}

const Index: React.FunctionComponent<PageProps> = ({
  data: {
    config: { siteMetadata },
    sites,
    circleci,
    me,
  },
}) => {
  const { siteDescription, siteName, siteUrl } = siteMetadata

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{siteName}</title>
        <meta name="description" content={siteDescription} />
        <meta name="image" content={`${siteUrl}/social.png`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="lekoarts.de" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={`${siteUrl}/social.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@lekoarts.de" />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={`${siteUrl}/social.png`} />
      </Helmet>
      <GlobalStyles />
      <Content>
        <Header>
          <Heading>{siteName}</Heading>
          <Text>{siteDescription}</Text>
          <Stats>
            <StatItem>
              <StatIcon>
                <Package />
              </StatIcon>
              <StatText>{sites.totalCount} Websites</StatText>
            </StatItem>
            <StatItem>
              <StatIcon>
                <Bug />
              </StatIcon>
              <StatText>{me.num_projects_followed} CircleCI Projects</StatText>
            </StatItem>
          </Stats>
        </Header>
        <Main>
          {sites.edges.map(({ node: site }) => {
            const GH_POSTFIX = site.build_settings.repo_url
              .replace('https://github.com/', '')
              .replace('LeKoArts', 'LekoArts')
            const GH_URL = site.build_settings.repo_url.replace('LeKoArts', 'LekoArts')

            const VCS_URLS = circleci.edges.map(p => p.node.vcs_url)
            const isOnCircleCI = VCS_URLS.includes(GH_URL)

            return (
              <Card key={site.netlify_id}>
                <CardTop>
                  <a href={site.url}>{site.name}</a>
                  <Icons>
                    {isOnCircleCI && (
                      <a href={`https://circleci.com/gh/${GH_POSTFIX}`}>
                        <CircleCI />
                      </a>
                    )}
                    <a href={site.build_settings.repo_url}>
                      <GitHub />
                    </a>
                  </Icons>
                </CardTop>
                <CardBottom>
                  <a href={`https://app.netlify.com/sites/${site.name}/deploys`}>
                    <img src={`https://api.netlify.com/api/v1/badges/${site.netlify_id}/deploy-status`} />
                  </a>
                  {isOnCircleCI && <img src={`https://circleci.com/gh/${GH_POSTFIX}.svg?style=svg`} />}
                </CardBottom>
              </Card>
            )
          })}
        </Main>
        <Footer>
          &copy; 2019 <a href="https://www.lekoarts.de">LekoArts</a>. Source on{' '}
          <a href="https://github.com/LekoArts/gatsby-status-dashboard">GitHub</a>. Powered by{' '}
          <a href="https://github.com/LekoArts/gatsby-source-netlify">gatsby-source-netlify</a> &{' '}
          <a href="https://github.com/LekoArts/gatsby-source-circleci">gatsby-source-circleci</a>.
        </Footer>
      </Content>
    </>
  )
}

export default Index

export const query = graphql`
  query IndexQuery {
    config: site {
      siteMetadata {
        siteName
        siteDescription
        siteUrl
      }
    }
    me: circleCiMe {
      num_projects_followed
    }
    circleci: allCircleCiProjects {
      edges {
        node {
          vcs_url
        }
      }
    }
    sites: allNetlifySites(
      filter: { build_settings: { public_repo: { eq: true } } }
      sort: { fields: [name], order: ASC }
    ) {
      totalCount
      edges {
        node {
          netlify_id
          name
          url
          build_settings {
            repo_url
          }
        }
      }
    }
  }
`
