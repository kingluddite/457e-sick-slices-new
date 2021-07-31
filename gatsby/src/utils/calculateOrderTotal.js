import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotzal(order, pizzas) {
  // 1. Loop over every single item in the order
  return order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((singlePizza) => singlePizza.id === singleOrder.id);
    // 2. Calculate the total for that pizza
    // 3. Add that total to the running total
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
}
