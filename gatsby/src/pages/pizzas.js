import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO title={pageContext.topping ? `Pizzas With ${pageContext.topping}` : `All Pizzas`} />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

PizzasPage.propTypes = {
  pageContext: PropTypes.object,
  data: PropTypes.object,
};

export const query = graphql`
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }) {
      nodes {
        id
        name
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
