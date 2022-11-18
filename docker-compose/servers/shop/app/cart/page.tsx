import { getCart } from "../../lib/getCart"
import { Order } from "../../lib/items"
import Cart from "./Cart"

export default async function Page() {
  const cart: Order[] = await getCart()
  return <Cart cart={cart}></Cart>
}
