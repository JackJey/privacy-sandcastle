import Link from "next/link"
import Image from "next/image"
import { Order } from "../lib/items"
import { ChangeEvent, FormEvent, MouseEvent } from "react"
import { useCartContext } from "../context/CartContextProvider"
import Header from "../components/header"
import { GetServerSideProps } from "next/types"
import { withSessionSsr } from "../lib/withSession"

export const getServerSideProps: GetServerSideProps = withSessionSsr(async ({ req, res }) => {
  const cart: Order[] = req.session.cart || []
  return { props: { cart } }
})

const CartItem = ({ order }: { order: Order }) => {
  const { item, size, quantity } = order

  return (
    <li className="grid grid-cols-12 lg:gap-8 gap-4 border">
      <div className="lg:col-span-4 col-span-6 flex py-4 flex-col gap-4 bg-slate-200">
        <Image src={`/image/svg/emoji_u${item.id}.svg`} width={100} height={100} alt={item.name}></Image>
        <h2 className="font-bold text-xl text-center text-slate-700 pb-4">{item.name}</h2>
      </div>
      <div className="lg:col-span-8 col-span-6 flex flex-col justify-center gap-2 text-lg text-slate-700 relative">
        <dl className="flex flex-col">
          <div className="flex gap-2">
            <dt className="w-16 font-bold">price:</dt>
            <dd>${item.price}.00</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 font-bold">size:</dt>
            <dd>{size}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 font-bold">qty:</dt>
            <dd>{quantity}</dd>
          </div>
        </dl>
      </div>
    </li>
  )
}

const Cart = () => {
  const { cartState } = useCartContext()

  const subtotal = cartState.reduce((sum, { item, quantity }) => {
    return sum + item.price * quantity
  }, 0)
  const shipping = 40

  return (
    <div className="flex flex-col gap-6">
      <Header />
      <h1 className=" text-2xl font-bold text-center text-slate-700 py-6">Thank you for your purchase !!</h1>
      <div className="flex flex-col gap-6">
        <ul className="flex flex-col gap-6">
          {cartState.map((order) => {
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
        <Link href="/">
          <a className="underline before:content-['<<']"> continue shopping</a>
        </Link>
      </footer>
    </div>
  )
}

export default Cart
