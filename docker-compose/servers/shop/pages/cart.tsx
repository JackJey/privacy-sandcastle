import Link from "next/link"
import Image from "next/image"
import { displayCategory, Order } from "../lib/items"
import { ChangeEvent, MouseEvent } from "react"
import Header from "../components/header"
import { GetServerSideProps } from "next/types"
import { withSessionSsr } from "../lib/withSession"
import useSWR, { KeyedMutator } from "swr"

export const getServerSideProps: GetServerSideProps = withSessionSsr(async ({ req, res }) => {
  const cart: Order[] = req.session.cart || []
  return { props: { cart } }
})

const CartItem = ({ order, mutate }: { order: Order; mutate: KeyedMutator<Order[]> }) => {
  const { item, size, quantity } = order

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const quantity = e.target.value
    const body = new URLSearchParams()
    body.append("size", size)
    body.append("quantity", quantity)
    await fetch(`/api/cart/${item.id}`, {
      method: "post",
      body
    })
    mutate()
  }

  const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const url = new URL(`/api/cart/${order.item.id}`, location.href)
    url.searchParams.append("size", size)
    await fetch(url, { method: `delete` })
    mutate()
  }

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
            <dt className="w-16 font-bold">cat:</dt>
            <dd>{displayCategory(item.category)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 font-bold">size:</dt>
            <dd>{size}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 font-bold">
              <label htmlFor={`${item.id}:${size}`}>qty:</label>
            </dt>
            <dd>
              <select id={`${item.id}:${size}`} name={`${item.id}:${size}`} defaultValue={quantity} onChange={onChange} className="text-slate-800">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </dd>
          </div>
        </dl>
        <div className="absolute top-0 right-0">
          <button type="button" className="flex justify-center items-center text-xl w-8 h-8" onClick={onClick}>
            ✖️
          </button>
        </div>
      </div>
    </li>
  )
}

const fetcher = (url: URL) => fetch(url).then((res) => res.json())

const useCart = (fallbackData: Order[]) => {
  const { data, mutate } = useSWR<Order[], Error>("/api/cart", fetcher, {
    fallbackData
  })
  return {
    cart: data || [],
    mutate
  }
}

const Cart = ({ cart: initialState }: { cart: Order[] }) => {
  const { cart, mutate } = useCart(initialState)

  const subtotal = cart.reduce((sum, { item, quantity }) => {
    return sum + item.price * quantity
  }, 0)
  const shipping = 40

  const disableCheckout = cart.length === 0

  return (
    <div className="flex flex-col gap-6">
      <Header />

      <form className="flex flex-col gap-6" method="post" action="/checkout">
        <ul className="flex flex-col gap-6">
          {cart.map((order) => {
            const key = `${order.item.id}:${order.size}`
            return <CartItem key={key} order={order} mutate={mutate} />
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

        <section className="flex justify-center">
          <button
            type="submit"
            disabled={disableCheckout}
            className="w-60 border border-slate-600 text-slate-600 enabled:hover:bg-slate-400 enalbed:hover:text-white disabled:opacity-40"
          >
            CHECKOUT
          </button>
        </section>
      </form>

      <footer className="border-t-2 py-4">
        <Link href="/" className="underline before:content-['<<']">
          continue shopping
        </Link>
      </footer>
    </div>
  )
}

export default Cart
