import type { NextApiRequest, NextApiResponse } from "next"
import { withSessionRoute } from "../../lib/withSession"
import { SessionCart } from "../../lib/sessionCart"

type AddToCart = {
  id: string
  size: string
  quantity: string
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cart = new SessionCart(req.session)
  const { id, size, quantity }: AddToCart = req.body
  cart.add(id, size, Number(quantity))
  await cart.save()
  res.redirect("/cart")
}

export default withSessionRoute(handler)
