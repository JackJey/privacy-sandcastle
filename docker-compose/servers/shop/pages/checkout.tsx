import Link from "next/link"
import Image from "next/image"
import { displayCategory, fromSize, getItem, Item, Order } from "../lib/items"
import { GetServerSideProps } from "next/types"
import { withSessionSsr } from "../lib/withSession"
import bodyParser from "body-parser"
import { promisify } from "util"

declare module "http" {
  interface IncomingMessage {
    body: Object
  }
}
// parse request body as x-www-form-urlencoded
const getBody = promisify(bodyParser.urlencoded())

export const getServerSideProps: GetServerSideProps = withSessionSsr(async ({ req, res }) => {
  if (req.method === "POST") {
    await getBody(req, res)
    const checkout = await Promise.all(
      Object.entries(req.body).map(async ([k, quantity]) => {
        const [id, size] = k.split(":")
        const item: Item = await getItem(id)
        const order: Order = {
          item,
          size,
          quantity
        }
        return order
      })
    )
    req.session.destroy()
    return { props: { checkout, cart: [] } }
  }
  return {
    redirect: {
      permanent: false,
      destination: "/cart"
    }
  }
})

const RegisterTrigger = ({
  id,
  quantity,
  size,
  category,
  gross
}: {
  id: string
  quantity: number
  size: string
  category: number
  gross: number
}) => {
  const src = new URL("https://privacy-sandcastle-ssp.web.app/register-trigger")
  src.searchParams.append("id", `${id}`)
  src.searchParams.append("category", `${category}`)
  src.searchParams.append("quantity", `${quantity}`)
  src.searchParams.append("size", `${fromSize(size)}`)
  src.searchParams.append("gross", `${gross}`)
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="" width={1} height={1} src={src.toString()} />
  )
}

const CartItem = ({ order }: { order: Order }) => {
  const { item, size, quantity } = order

  return (
    <li className="grid grid-cols-12 lg:gap-8 gap-4 border">
      <div className="lg:col-span-4 col-span-6 flex flex-col items-center py-4 gap-4 bg-slate-200">
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
            <dt className="w-16 font-bold">qty:</dt>
            <dd>{quantity}</dd>
          </div>
        </dl>
        <RegisterTrigger id={item.id} quantity={quantity} size={size} category={item.category} gross={item.price} />
      </div>
    </li>
  )
}

const Cart = ({ checkout }: { checkout: Order[] }) => {
  console.log(checkout)

  const subtotal = checkout.reduce((sum, { item, quantity }) => {
    return sum + item.price * quantity
  }, 0)
  const shipping = 40

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

export default Cart
