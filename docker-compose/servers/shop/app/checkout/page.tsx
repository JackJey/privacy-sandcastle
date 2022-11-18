import { getCart } from "../../lib/getCart"
import { Cart } from "./Cart"

export default async function Page() {
  const cart = await getCart()
  return <Cart checkout={cart}></Cart>
}
