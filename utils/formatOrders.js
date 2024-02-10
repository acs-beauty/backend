const formatOrders = orders =>
  orders.map(order => {
    let total = 0
    order.products.forEach(product => {
      const { price, discount } = product
      total += (price - (price * discount) / 100) * product.OrderProduct.count
      // return { name, price, discount, count: product.OrderProduct.count }
    })
    const { products, ...rest } = order
    return { ...rest, total }
  })

const formatOrder = order => {
  const items = order.products.map(product => {
    const { name, price, discount, images } = product
    return { name, price, discount, count: product.OrderProduct.count, images }
  })
  const { products, ...rest } = order
  return { ...rest, products: items }
}

module.exports = { formatOrders, formatOrder }
