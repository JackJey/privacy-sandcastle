import type { NextApiRequest, NextApiResponse } from "next"
import { withSessionRoute } from "../../../lib/withSession"
import { Order } from "../../../lib/items"
import { removeOrder } from "../../../context/CartContextProvider/reducer"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cart: Order[] = req.session.cart || []
  const { url, method, body } = req
  console.log(url, method, body, cart)
  if (method === "DELETE") {
    const { id, size } = req.query
    const order: Order = {
      item: {
        id: id as string,
        icon: "",
        price: 0,
        name: ""
      },
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
