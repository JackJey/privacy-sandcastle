import { useReducer, useContext, createContext, ReactNode } from "react"
import { cartReducer, ADD_ORDER, REMOVE_ORDER } from "./reducer"
import { Order } from "../../lib/items"

type CartContextType = {
  cartState: Order[]
  addOrder: (order: Order) => void
  removeOrder: (order: Order) => void
}

const CartContext = createContext<CartContextType>({
  cartState: [],
  addOrder: () => {},
  removeOrder: () => {}
})

export const useCartContext = (): CartContextType => {
  return useContext<CartContextType>(CartContext)
}

export const CartContextProvider = ({ children }: { children?: ReactNode }) => {
  const state: Order[] = []
  const [cartState, dispatch] = useReducer(cartReducer, state)

  const addOrder = (order: Order) => {
    dispatch({ type: ADD_ORDER, order })
  }

  const removeOrder = (order: Order) => {
    dispatch({ type: REMOVE_ORDER, order })
  }

  return (
    <CartContext.Provider
      value={{
        cartState,
        addOrder,
        removeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
