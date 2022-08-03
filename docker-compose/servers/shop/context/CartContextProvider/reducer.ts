import { Order } from "../../lib/items"

export const ADD_ORDER = "ADD_ORDER"
export const REMOVE_ORDER = "REMOVE_ORDER"

type CartAction =
  | {
      type: "ADD_ORDER"
      order: Order
    }
  | {
      type: "REMOVE_ORDER"
      order: Order
    }

const addOrder = (order: Order, state: Order[]) => {
  const index = state.findIndex(({ item, size }) => {
    return order.item.id === item.id && order.size === size
  })
  if (index > -1) {
    // update quantity
    const current = state.at(index) as Order
    const next = {...order, quantity: order.quantity+current.quantity}
    return [next, ...state.slice(0, index), ...state.slice(index + 1)]
  }
  // append
  return [order, ...state]
}

const removeOrder = (order: Order, state: Order[]) => {
  const removedItemIndex = state.findIndex((o) => o.item.id === order.item.id)
  return [...state.splice(removedItemIndex, 1)]
}

export const cartReducer: React.Reducer<Order[], CartAction> = (state: Order[], action: CartAction) => {
  switch (action.type) {
    case ADD_ORDER:
      return addOrder(action.order, state)
    case REMOVE_ORDER:
      return removeOrder(action.order, state)
    default:
      return state
  }
}
