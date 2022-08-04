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

const addOrder = (order: Order, state: Order[]) => {
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

const removeOrder = (order: Order, state: Order[]) => {
  const removedItemIndex = state.findIndex((o) => o.item.id === order.item.id)
  return [...state.splice(removedItemIndex, 1)]
}

const updateOrder = (order: Order, state: Order[]) => {
  const index = state.findIndex(({ item, size }) => {
    return order.item.id === item.id && order.size === size
  })
  // update quantity
  return [...state.slice(0, index), order, ...state.slice(index + 1)]
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
