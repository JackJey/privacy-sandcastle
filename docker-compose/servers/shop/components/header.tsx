import Link from "next/link"

const Header = () => {
  return (
    <header className="flex flex-col">
      <nav className="flex justify-between lg:py-6 py-2 border-b-2">
        <h1 className="text-slate-800 text-4xl font-bold">
          <Link href="/">
            <a>Shopping DEMO</a>
          </Link>
        </h1>
        <Link href="/cart">
          <a className="text-4xl px-2">🛒</a>
        </Link>
      </nav>
    </header>
  )
}

export default Header
