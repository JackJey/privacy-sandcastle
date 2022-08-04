import type { NextApiRequest, NextApiResponse } from "next"
import { withSessionRoute } from "../../../lib/withSession"
import items from "../../../lib/items.json" assert { type: "json" }

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id
  const item = items.filter((item) => item.id === id).at(0)
  res.json(item)
}

export default withSessionRoute(handler)
