import type { NextApiRequest, NextApiResponse } from "next"
import { getItems } from "../../../lib/items"
import { withSessionRoute } from "../../../lib/withSession"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const items = await getItems()
  res.json(items)
}

export default withSessionRoute(handler)
