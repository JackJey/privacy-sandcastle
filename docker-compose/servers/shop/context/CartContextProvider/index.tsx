import { useReducer, useContext, createContext, ReactNode, Reducer } from "react"
import { cartReducer, ADD_ORDER, REMOVE_ORDER, UPDATE_ORDER } from "./reducer"
import { Order } from "../../lib/items"

type CartContextType = {
  cartState: Order[]
  addOrder: (order: Order) => void
  removeOrder: (order: Order) => void
  updateOrder: (order: Order) => void
}

type Props = {
  children?: ReactNode
}

const CartContext = createContext<CartContextType>({
  cartState: [],
  addOrder: () => {},
  removeOrder: () => {},
  updateOrder: () => {}
})

export const useCartContext = () => {
  return useContext(CartContext)
}

export const CartContextProvider = ({ children }: Props) => {
  const initialState: Order[] = [
    {
      item: { id: "1f6fc", icon: "🛼", price: 230, name: "Roller Skate" },
      size: "26.0",
      quantity: 1
    },
    {
      item: { id: "1fa74", icon: "🩴", price: 12, name: "Thong Sandal" },
      size: "27.0",
      quantity: 2
    },
    {
      item: { id: "1f6fc", icon: "🛼", price: 230, name: "Roller Skate" },
      size: "26.5",
      quantity: 1
    }
  ]
  const [cartState, dispatch] = useReducer(cartReducer, initialState)

  const addOrder = (order: Order) => dispatch({ type: ADD_ORDER, order })

  const removeOrder = (order: Order) => dispatch({ type: REMOVE_ORDER, order })

  const updateOrder = (order: Order) => dispatch({ type: UPDATE_ORDER, order })

  return (
    <CartContext.Provider
      value={{
        cartState,
        addOrder,
        removeOrder,
        updateOrder
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
