import { items, Item } from "../lib/items"
import Link from "next/link"

const CartCard = (item: Item) => {
  return (
    <ul key={item.id} className="grid grid-cols-2 border">
      <div className=" text-8xl flex  justify-center h-36 bg-green-50">{item.icon}</div>
      <div className="bg-blue-50">
        <h2 className="font-bold text-xl">{item.name}</h2>
        <div className="">price: ${item.price}.00</div>
        <div>quantity: 2</div>
      </div>
    </ul>
  )
}

const Cart = () => {
  const cart = items.slice(0, 2)
  return (
    <div>
      <h1>cart</h1>
      <ul>{cart.map((item) => CartCard(item))}</ul>
      <footer className="border-t-2 py-4">
          <Link href="/">
            <a className="underline before:content-['<<']"> continue shopping</a>
          </Link>
        </footer>
    </div>
  )
}

export default Cart
