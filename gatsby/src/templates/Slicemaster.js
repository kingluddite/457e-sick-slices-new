import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

export default function SingleSlicemasterPage({ data: { slicemaster } }) {
  // console.log({ slicemaster });
  return (
    <>
      <SEO title={slicemaster.name} image={slicemaster?.image?.asset?.src} />
      <div className="center">
        <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
        <h2>
          <span className="mark">{slicemaster.name}</span>
        </h2>
        <p>{slicemaster.description}</p>
      </div>
    </>
  );
}

SingleSlicemasterPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query ($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
