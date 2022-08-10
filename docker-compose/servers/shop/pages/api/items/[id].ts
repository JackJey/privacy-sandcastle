import type { NextApiRequest, NextApiResponse } from "next"
import { getItem } from "../../../lib/items"
import { withSessionRoute } from "../../../lib/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string
  const item = await getItem(id)
  res.json(item)
}

export default withSessionRoute(handler)
