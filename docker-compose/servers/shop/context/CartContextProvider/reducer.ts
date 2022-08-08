import { Order } from "../../lib/items"

export const ADD_ORDER = "ADD_ORDER"
export const REMOVE_ORDER = "REMOVE_ORDER"
export const UPDATE_ORDER = "UPDATE_ORDER"

export type CartAction =
  | {
      type: "ADD_ORDER"
      order: Order
    }
  | {
      type: "REMOVE_ORDER"
      order: Order
    }
  | {
      type: "UPDATE_ORDER"
      order: Order
    }

export const addOrder = (order: Order, state: Order[]) => {
  const index = state.findIndex(({ item, size }) => {
    return order.item.id === item.id && order.size === size
  })
  if (index > -1) {
    // update
    state[index] = order
    return [...state]
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

export const cartReducer = (state: Order[], action: CartAction) => {
  switch (action.type) {
    case ADD_ORDER:
      return addOrder(action.order, state)
    case REMOVE_ORDER:
      return removeOrder(action.order, state)
    case UPDATE_ORDER:
      return updateOrder(action.order, state)
    default:
      return state
  }
}
