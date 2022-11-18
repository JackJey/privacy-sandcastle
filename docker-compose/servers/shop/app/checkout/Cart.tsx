"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Order } from "../../lib/items"
import { CartItem } from "./CartItem"

export const Cart = ({ checkout }: { checkout: Order[] }) => {
  const subtotal = checkout.reduce((sum, { item, quantity }) => {
    return sum + item.price * quantity
  }, 0)
  const shipping = 40

  useEffect(() => {
    ;(async () => {
      // TODO: move destroy session to SSR
      const res = await fetch("/api/cart", { method: "DELETE" })
      console.log(res)
      console.log(res.ok)
    })()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <h1 className=" text-2xl font-bold text-center text-slate-700 py-6">Thank you for your purchase !!</h1>
      <div className="flex flex-col gap-6">
        <ul className="flex flex-col gap-6">
          {checkout.map((order) => {
            const key = `${order.item.id}:${order.size}`
            return <CartItem key={key} order={order} />
          })}
        </ul>

        <dl className="flex flex-col">
          <div className="flex justify-end gap-2">
            <dt className="font-bold">Subtotal:</dt>
            <dd>${subtotal}.00</dd>
          </div>
          <div className="flex justify-end gap-2">
            <dt className="font-bold">Shipping:</dt>
            <dd>${shipping}.00</dd>
          </div>
          <div className="flex justify-end gap-2">
            <dt className="font-bold">Total:</dt>
            <dd>${subtotal + shipping}.00</dd>
          </div>
        </dl>
      </div>

      <footer className="border-t-2 py-4">
        <Link href="/" className="underline before:content-['<<']">
          continue shopping
        </Link>
      </footer>
    </div>
  )
}
