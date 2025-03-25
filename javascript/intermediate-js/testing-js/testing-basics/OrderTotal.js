const someOrder = {
  items: [
    { order: 'Dragon food', price: 6, quantity: 20 },
    { order: 'Dragon cage', price: 800, quantity: 1 },
    { order: 'Shipping', price: 40, shipping: true },
  ],
};

function orderTotal(order) {
  return order.items.reduce(
    (prev, curr) => prev + (curr.quantity || 1) * curr.price,
    0
  );
}

const orderTotalWShipping = (order) => {
  const totalItems = order.items
    .filter((x) => !x.shipping)
    .reduce((prev, curr) => prev + curr.quantity * curr.price, 0);

  const shippingItem = order.items.find((x) => !!x.shipping);
  const shippingPrice = totalItems > 1000 ? 0 : shippingItem.price;
  return totalItems + shippingPrice;
};

// export default orderTotal;
module.exports = orderTotal;
