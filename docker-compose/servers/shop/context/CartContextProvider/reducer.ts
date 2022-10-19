import { Order } from "../../lib/items"

export const addOrder = (order: Order, state: Order[]) => {
  const index = state.findIndex(({ item, size }) => {
    return order.item.id === item.id && order.size === size
  })
  if (index > -1) {
    // increase quantity
    const current = state.at(index) as Order
    const next = { ...order, quantity: order.quantity + current.quantity }
    return [next, ...state.slice(0, index), ...state.slice(index + 1)]
  }
  // append
  return [order, ...state]
}

export const removeOrder = (order: Order, state: Order[]) => {
  return state.reduce((acc: Order[], o: Order) => {
    if (o.item.id === order.item.id && o.size === order.size) return acc
    return [...acc, o]
  }, [])
}

export const updateOrder = (order: Order, state: Order[]) => {
  return state.reduce((acc: Order[], o: Order) => {
    if (order.item.id === o.item.id && order.size === o.size) {
      return [...acc, order]
    }
    return [...acc, o]
  }, [])
}