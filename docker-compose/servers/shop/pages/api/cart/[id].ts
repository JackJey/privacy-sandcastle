import type { NextApiRequest, NextApiResponse } from "next"
import { withSessionRoute } from "../../../lib/withSession"
import { getItem, Order } from "../../../lib/items"
import { removeOrder, updateOrder } from "../../../context/CartContextProvider/reducer"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cart: Order[] = req.session.cart || []
  const { url, method, body } = req
  console.log(url, method, body, cart)

  if (method === "POST") {
    const { size, quantity } = body
    const id = req.query.id as string
    const item = await getItem(id)
    const order: Order = {
      item,
      size,
      quantity
    }
    req.session.cart = updateOrder(order, cart)
    await req.session.save()
    res.status(204)
    res.send("")
  }

  if (method === "DELETE") {
    const { id, size } = req.query
    const item = await getItem(id as string)
    const order: Order = {
      item,
      size: size as string,
      quantity: 0
    }
    req.session.cart = removeOrder(order, cart)
    await req.session.save()
    res.status(204)
    res.send("")
  }
}

export default withSessionRoute(handler)
