import { cookies } from "next/headers"
import { Order } from "../../lib/items"
import Cart from "./Cart"

async function fetchCart() {
  const host = process.env.host || "localhost"
  const port = process.env.port || "8080"
  const url = `http://${host}:${port}/api/cart`
  const cookie = cookies().get("__session")
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Cookie: `__session=${cookie?.value}`
    }
  })
  const cart = await res.json()
  return cart
}

export default async function Page() {
  const cart: Order[] = await fetchCart()
  return <Cart cart={cart}></Cart>
}
