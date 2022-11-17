import Head from "next/head"
import Link from "next/link"

type Props = {
  title?: string
}

const Header = ({ title = "Shopping DEMO" }: Props) => {
  return (
    <header className="flex flex-col">
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👟</text></svg>"
        ></link>
      </Head>
      <nav className="flex justify-between lg:py-6 py-2 border-b-2">
        <h1 className="text-slate-800 text-4xl font-bold">
          <Link href="/">Shopping DEMO</Link>
        </h1>
        <Link href="/cart" className="text-4xl px-2">
          🛒
        </Link>
      </nav>
    </header>
  )
}

export default Header
