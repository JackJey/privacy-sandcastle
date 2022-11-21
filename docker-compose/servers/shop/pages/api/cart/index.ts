import { Order, Item, getItem, addOrder } from "../../../lib/items"
import type { NextApiRequest, NextApiResponse } from "next"
import { withSessionRoute } from "../../../lib/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cart: Order[] = req.session.cart || []
  const { url, method, body } = req

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
    res.redirect(302, "/cart")
  }

  if (method === "DELETE") {
    req.session.destroy()
    res.status(204)
    res.send("")
  }
}

export default withSessionRoute(handler)
