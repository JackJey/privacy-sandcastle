import Link from "next/link"
import { items, Item, getItem } from "../lib/items"
import { SessionCart } from "../lib/sessionCart"
import { withSessionSsr } from "../lib/withSession";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const cart = new SessionCart(req.session)
    const entries = cart
      .getAll()
      .map(({id, size, quantity}) =>{
        const item = getItem(id)
        return {item, size, quantity}
      })
    console.log({entries})
    return {
      props: {
        entries,
      },
    };
  },
);

const CartItem = (item: Item, size: string, quantity: number) => {
  return (
    <ul key={item.id} className="grid grid-cols-2 border">
      <div className=" text-8xl flex  justify-center h-36 bg-green-50">{item.icon}</div>
      <div className="bg-blue-50">
        <h2 className="font-bold text-xl">{item.name}</h2>
        <div className="">price: ${item.price}.00</div>
        <div>size: {size}</div>
        <div>quantity: {quantity}</div>
      </div>
    </ul>
  )
}

const Cart = ({entries}:{entries: Array<{item: Item, size: string, quantity: number}>}) => {
  return (
    <div>
      <h1>cart</h1>
      <ul>{entries.map(({item, size, quantity}) => CartItem(item, size, quantity))}</ul>
      <footer className="border-t-2 py-4">
          <Link href="/">
            <a className="underline before:content-['<<']"> continue shopping</a>
          </Link>
        </footer>
    </div>
  )
}

export default Cart
