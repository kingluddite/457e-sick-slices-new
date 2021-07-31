import React from 'react';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizzaObj = pizzas.find((pizza) => pizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={index}>
            <Img fluid={pizzaObj.image.asset.fluid} />
            <h2>{pizzaObj.name}</h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizzaObj.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizzaObj.name} from Order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}

PizzaOrder.propTypes = {
  order: PropTypes.array,
  pizzas: PropTypes.array,
  removeFromOrder: PropTypes.func,
};
