import { Order, Item, getItem } from "../../../lib/items"
import type { NextApiRequest, NextApiResponse } from "next"
import { withSessionRoute } from "../../../lib/withSession"
import { addOrder } from "../../../context/CartContextProvider/reducer"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cart: Order[] = req.session.cart || []
  const { url, method, body } = req
  console.log(url, method, body, cart)

  if (method === "GET") {
    res.json(cart)
  }

  if (method === "POST") {
    const id = req.body.id as string
    const size = req.body.size as string
    const quantity = parseInt(req.body.quantity)
    const item: Item = (await getItem(id)) as Item
    const order: Order = {
      item,
      size,
      quantity
    }
    req.session.cart = addOrder(order, cart)
    await req.session.save()
    res.redirect("/cart")
  }
}

export default withSessionRoute(handler)
