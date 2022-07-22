import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import { Item, getItem } from "../lib/items"
import { SessionCart } from "../lib/sessionCart"
import { withSessionSsr } from "../lib/withSession"

type Order = {
  item: Item
  size: string
  quantity: number
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const cart = new SessionCart(req.session)
  const orders: Array<Order> = cart.getAll().map(({ id, size, quantity }) => {
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

const CartItem = (order: Order) => {
  const { item, size, quantity } = order
  return (
    <li key={item.id} className="grid grid-cols-3 gap-4 border">
      <div className="flex flex-col gap-4 justify-center bg-slate-200">
        <Image src={`/image/svg/emoji_u${item.id}.svg`} width={100} height={100} alt={item.name}></Image>
        <h2 className="font-bold text-xl text-center">{item.name}</h2>
      </div>
      <div className="col-span-2 flex flex-col justify-center gap-4 text-xl">
        <div className="">price: ${item.price}.00</div>
        <div>size: {size}</div>
        <div>
          quantity:
          <select id="quantity" name="quantity" className="text-slate-800">
            {Array(5)
              .fill(0)
              .map((_, i) => {
                if (i === quantity) {
                  return (
                    <option key={i} value={i} selected>
                      {i}
                    </option>
                  )
                }
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                )
              })}
          </select>
        </div>
      </div>
    </li>
  )
}

const Cart = ({ orders }: { orders: Array<Order> }) => {
  const shipping = 20
  const subtotal = orders.reduce((total, { item, quantity }) => total + item.price * quantity, 0)

  return (
    <div className="">
      <Head>
        <title>Shopping DEMO</title>
      </Head>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col">
          <nav className="flex justify-between lg:py-6 py-2 border-b-2">
            <h1 className="text-slate-800 text-4xl font-bold">Shopping DEMO</h1>
            <Link href="/cart">
              <a className="text-4xl px-2">🛒</a>
            </Link>
          </nav>
        </header>

        <ul className="flex flex-col gap-6">{orders.map((order) => CartItem(order))}</ul>

        <dl className="flex flex-col text-2xl">
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
            <dd>${shipping + shipping}.00</dd>
          </div>
        </dl>
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
