import Link from "next/link"
import "../styles/globals.css"

const Header = () => {
  return (
    <header className="flex flex-col">
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
