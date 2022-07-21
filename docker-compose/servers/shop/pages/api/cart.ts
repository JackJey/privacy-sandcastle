// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { headers, body, query } = req
  console.log({ body, query })
  res.redirect("/cart")
}
