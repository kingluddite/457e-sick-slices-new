import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center; /* helps vertically align counts */
    padding: 5px;
    border-radius: 2px;
    background: var(--grey);

    .count {
      padding: 2px 5px;
      background: var(--white);
    }

    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // return the pizzas with counts
  // console.log(pizzas);
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // if it is, increment by 1
        existingTopping.count += 1;
      }
      // else create a new entry in our acc and set it to 1
      else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {}); // we set our initial value to an empty object
  // sort them based on their count
  const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count);
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // 1. Get a list of all the toppings
  // 2. Get a list of all the pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  console.clear();
  // count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  console.log(toppingsWithCounts);

  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {/* 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping */}
      {toppingsWithCounts.map((topping) => (
        // 5. Link it up
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}

ToppingsFilter.propTypes = {
  activeTopping: PropTypes.string,
};
