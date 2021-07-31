import { graphql } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import PizzaOrder from '../components/PizzaOrder';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import usePizza from '../utils/usePizza';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrdersPage({ data }) {
  const pizzas = data.pizzas.nodes;
  // console.log(data);
  // You have to explicitly set the default values
  //  for whatever inputs you have

  // CUSTOM HOOKS
  const { values, updateValues } = useForm({
    name: '',
    email: '',
    blackhole: '',
  });
  const { order, addToOrder, removeFromOrder, error, loading, message, submitOrder } = usePizza({
    pizzas,
    values,
  });
  // END CUSTOM HOOKS

  // console.log(values, updateValues);

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <>
      <SEO />
      <OrderStyles onSubmit={(e) => submitOrder(e)}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={values.name} id="name" onChange={updateValues} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={values.email} onChange={updateValues} />
          <input
            className="blackhole"
            type="blackhole"
            name="blackhole"
            id="blackhole"
            value={values.blackhole}
            onChange={updateValues}
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder order={order} removeFromOrder={removeFromOrder} pizzas={pizzas} />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

OrdersPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
