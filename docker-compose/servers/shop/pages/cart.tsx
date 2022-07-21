import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import { Item, getItem } from "../lib/items"
import { SessionCart } from "../lib/sessionCart"
import { withSessionSsr } from "../lib/withSession"

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const cart = new SessionCart(req.session)
  const orders = cart.getAll().map(({ id, size, quantity }) => {
    const item = getItem(id)
    return { item, size, quantity }
  })
  console.log({ orders })
  return {
    props: {
      orders
    }
  }
})

const CartItem = (item: Item, size: string, quantity: number) => {
  return (
    <ul key={item.id} className="grid grid-cols-3 border">
      <div className="flex flex-col justify-center bg-green-50">
        <h2 className="font-bold text-xl text-center">{item.name}</h2>
        <Image src={`/image/svg/emoji_u${item.id}.svg`} width={100} height={100} alt={item.name}></Image>
      </div>
      <div className="bg-blue-50 col-span-2">
        <div className="">price: ${item.price}.00</div>
        <div>size: {size}</div>
        <div>quantity: {quantity}</div>
      </div>
    </ul>
  )
}

const Cart = ({ orders }: { orders: Array<{ item: Item; size: string; quantity: number }> }) => {
  const shipping = 20
  const subtotal = orders.reduce((total, { item, quantity }) => total + item.price * quantity, 0)
  return (
    <div className="bg-neutral-50">
      <Head>
        <title>Shopping DEMO</title>
      </Head>
      <div className="max-w-screen-xl p-2 lg:w-10/12 lg:p-0 lg:m-auto flex flex-col gap-6">
        <header className="flex flex-col">
          <nav className="flex justify-between lg:py-6 py-2 border-b-2">
            <h1 className="text-slate-800 text-4xl font-bold">Shopping DEMO</h1>
            <Link href="/cart">
              <a className="text-4xl px-2">🛒</a>
            </Link>
          </nav>
        </header>

        <ul className="flex flex-col gap-6">{orders.map(({ item, size, quantity }) => CartItem(item, size, quantity))}</ul>

        <div>
          <div>Subtotal: ${subtotal}.00</div>
          <div>Shipping: ${shipping}.00</div>
          <div>Total: ${subtotal + shipping}.00</div>
        </div>
        <footer className="border-t-2 py-4">
          <Link href="/">
            <a className="underline before:content-['<<']"> continue shopping</a>
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default Cart
