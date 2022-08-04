import type { NextApiRequest, NextApiResponse } from "next"
import { withSessionRoute } from "../../lib/withSession"
import items from "../../lib/items.json" assert { type: "json" }

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json(items)
}

export default withSessionRoute(handler)
