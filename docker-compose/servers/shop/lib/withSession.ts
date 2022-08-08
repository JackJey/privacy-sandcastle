import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next"
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from "next"
import { Order } from "./items"

const sessionOptions = {
  password: "complex_password_at_least_32_characters_long", // TODO
  cookieName: "iron_session_id",
  secure: process.env.NODE_ENV === "production",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  }
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionSsr<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions)
}

declare module "iron-session" {
  interface IronSessionData {
    cart: Order[]
  }
}
