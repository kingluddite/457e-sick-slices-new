import React, { useState } from 'react';
import PropTypes from 'prop-types';

// create an order context
const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  // we need to stick state in here
  const [order, setOrder] = useState([]);

  return <OrderContext.Provider value={[order, setOrder]}>{children}</OrderContext.Provider>;
}

OrderProvider.propTypes = {
  children: PropTypes.object,
};

export default OrderContext;
