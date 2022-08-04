import type { NextApiRequest, NextApiResponse } from "next"
import { withSessionRoute } from "../../lib/withSession"
import { SessionCart } from "../../lib/sessionCart"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cart = new SessionCart(req.session)

  console.log(req.body)
  const id = req.body.id as string
  const size = req.body.size as string
  const quantity = parseInt(req.body.quantity)
  cart.add(id, size, quantity)
  await cart.save()
  res.redirect("/cart")
}

export default withSessionRoute(handler)
