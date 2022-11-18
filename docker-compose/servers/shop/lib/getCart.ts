import { cookies } from "next/headers"

export async function getCart() {
  const host = process.env.host || "localhost"
  const port = process.env.port || "8080"
  const url = `http://${host}:${port}/api/cart`
  const cookie = cookies().get("__session")
  const Cookie = `__session=${cookie?.value}`
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Cookie
    }
  })
  const cart = await res.json()
  return cart
}
