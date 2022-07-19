import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { items } from "../model/items"

export const Item = ({ icon, name, price }: { icon: string; name: string; price: number }) => {
  return (
    <li className="border shadow rounded flex flex-col text-center justify-between">
      <Link href={`/${icon}`}>
        <a className="py-8 px-4 bg-blue-100 hover:bg-blue-50">
          <div className="text-9xl align-tops">{icon}</div>
          <div className="font-bold text-xl text-slate-800">{name}</div>
          <div className="font-mono text-slate-600">${price}</div>
        </a>
      </Link>
    </li>
  )
}

const Home: NextPage = () => {
  return (
    <div className="  bg-neutral-50 ">
      <Head>
        <title>TODO</title>
      </Head>
      <div className="w-10/12 m-auto flex flex-col gap-6">
        <header className="flex justify-between py-6 border-b-2">
          <h1 className="text-4xl">Shopping DEMO</h1>
          <Link href="/">
            <a className="text-4xl px-2">🛒</a>
          </Link>
        </header>

        <main className="">
          <ul className="grid lg:grid-cols-4 grid-cols-2 gap-4">{items.map((item) => Item(item))}</ul>
        </main>

        <footer className="">footer</footer>
      </div>
    </div>
  )
}

export default Home
