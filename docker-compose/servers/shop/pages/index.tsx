import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { items, Item } from "../model/items"

export const ItemCard = (item: Item) => {
  return (
    <li key={item.id} className="border shadow rounded flex flex-col text-center justify-between">
      <Link href={`/items/${item.id}`}>
        <a className="flex flex-col pt-8 pb-4 px-4 gap-6 bg-gray-100 hover:bg-gray-200">
          <div className="text-9xl">{item.icon}</div>
          <div>
            <div className="font-bold text-xl text-slate-800">{item.name}</div>
            <div className="font-mono text-slate-600">${item.price}</div>
          </div>
        </a>
      </Link>
    </li>
  )
}

const Home: NextPage = () => {
  return (
    <div className="bg-neutral-50">
      <Head>
        <title>Shopping DEMO</title>
      </Head>
      <div className="max-w-screen-xl p-2 lg:w-10/12 lg:p-0 lg:m-auto flex flex-col gap-6">
        <header className="flex flex-col">
          <nav className="flex justify-between lg:py-6 py-2 border-b-2">
            <h1 className="text-slate-800 text-4xl font-bold">Shopping DEMO</h1>
            <Link href="/cart">
              <a className="text-4xl px-2">🛒</a>
            </Link>
          </nav>
          <Image src="/image/shop.webp" alt="Shop Hero Image" width={500} height={300} className="object-cover object-top" />
        </header>

        <main className="">
          <ul className="grid lg:grid-cols-4 grid-cols-2 gap-4">{items.map((item) => ItemCard(item))}</ul>
        </main>

        <footer className="border-t-2 py-4">
          <p className="underline text-slate-400 text-right">
            Photo by <a href="https://unsplash.com/@bruno_kelzer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Bruno Kelzer</a>{" "}
            on <a href="https://unsplash.com/s/photos/shopping-cart?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Home
