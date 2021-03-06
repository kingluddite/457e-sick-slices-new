import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const SingleBeerStyles = styled.div`
  padding: 2rem;
  border: 1px solid var(--grey);
  text-align: center;

  img {
    display: grid;
    align-items: center;

    /* object-fit: cover; /* zoom up and crop image */
    object-fit: contain; /* regardless of the width and height of image it will always fit image inside */
    width: 100%;
    height: 200px;

    font-size: 10px;
  }
`;

export default function BeersPage({ data: { beers } }) {
  // console.log(beers);
  return (
    <>
      <SEO title={`Beers! We have ${beers.nodes.length} in stock`} />
      <h2 className="center">We have {beers.nodes.length} beers available. Dine in only!</h2>
      <BeerGridStyles>
        {beers.nodes.map((beer) => {
          // console.log(beer);
          const rating = Math.round(beer.rating.average);

          return (
            <SingleBeerStyles key={beer.id}>
              <h3>{beer.name}</h3>
              <img src={beer.image} alt={beer.name} />
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {'⭐️'.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>{'⭐️'.repeat(5 - rating)}</span>
                <span> ({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
    </>
  );
}

BeersPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        image
        price
        rating {
          average
          reviews
        }
        name
        id
      }
    }
  }
`;
