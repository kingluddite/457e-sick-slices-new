import { graphql, Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const SlicemasterGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2rem;
`;

const SliceMasterStyles = styled.div`
  a {
    text-decoration: none;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }

  h2 {
    position: relative;
    z-index: 2;
    margin-bottom: -2rem;
    font-size: 4rem;
    text-align: center;
    transform: rotate(-2deg);
  }

  .description {
    position: relative;
    z-index: 2;
    margin: 2rem;
    margin-top: -6rem;
    padding: 1rem;
    background: var(--yellow);
    text-align: center;
    transform: rotate(1deg);
  }
`;

export default function SlicemastersPage({ data, pageContext }) {
  const slicemasters = data.slicemasters.nodes;

  return (
    <>
      <SEO title={`Slicemasters - Page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemasterGridStyles>
        {slicemasters.map((person) => (
          <SliceMasterStyles key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </SliceMasterStyles>
        ))}
      </SlicemasterGridStyles>
    </>
  );
}

SlicemastersPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
};

export const query = graphql`
  query ($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
