import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import { Order } from "../lib/items"
import { ChangeEvent, MouseEvent } from "react"
import { useCartContext } from "../context/CartContextProvider"
import Header from "../components/header"

// export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
//   const cart = new SessionCart(req.session)
//   const orders: Array<Order> = cart.getAll().map(({ id, size, quantity }) => {
//     const item = getItem(id)
//     return { item, size, quantity }
//   })
//   return {
//     props: {
//       orders
//     }
//   }
// })

const CartItem = ({ order }: { order: Order }) => {
  const { item, size, quantity } = order
  const { removeOrder, updateOrder } = useCartContext()

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(e.target.value)
    updateOrder({ ...order, ...{ quantity } })
  }

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    removeOrder(order)
  }

  return (
    <li key={item.id} className="grid grid-cols-12 lg:gap-8 gap-4 border">
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
            <dd>
              <select id="quantity" name="quantity" className="text-slate-800" defaultValue={quantity} onChange={onChange}>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
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

const Cart = () => {
  const { cartState } = useCartContext()

  const subtotal = cartState.reduce((sum, { item, quantity }) => {
    return sum + item.price * quantity
  }, 0)
  const shipping = 40

  return (
    <div className="">
      <Head>
        <title>Shopping DEMO</title>
      </Head>
      <div className="flex flex-col gap-6">
        <Header />

        <ul className="flex flex-col gap-6">
          {cartState.map((order) => (
            <CartItem key={order.item.id} order={order} />
          ))}
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
