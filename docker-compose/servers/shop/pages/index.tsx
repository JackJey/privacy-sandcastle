import type { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import Image from "next/image"
import { Item } from "../lib/items"
import Header from "../components/header"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const host = process.env.host || "localhost"
  const port = process.env.port || 3000
  const res = await fetch(`http://${host}:${port}/api/items`)
  const items: Item[] = await res.json()
  return { props: { items } }
}

export const ItemCard = ({ item }: { item: Item }) => {
  return (
    <li key={item.id} className="border shadow rounded flex flex-col text-center justify-between">
      <Link href={`/items/${item.id}`}>
        <a className="flex flex-col pt-8 pb-4 px-4 gap-6 bg-gray-100 hover:bg-gray-200">
          <div className="">
            <Image src={`/image/svg/emoji_u${item.id}.svg`} width={100} height={100} alt={item.name}></Image>
          </div>
          <div>
            <div className="font-bold text-xl text-slate-800">{item.name}</div>
            <div className="font-mono text-slate-600">${item.price}</div>
          </div>
        </a>
      </Link>
    </li>
  )
}

type Props = {
  items: Item[]
}

const Home: NextPage<Props> = ({ items }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <Header />

      <main className="">
        <ul className="grid lg:grid-cols-4 grid-cols-2 gap-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </ul>
      </main>

      <footer className="border-t-2 py-4">
        <p className="underline text-slate-400 text-right">
          Photo by <a href="https://unsplash.com/@bruno_kelzer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Bruno Kelzer</a> on{" "}
          <a href="https://unsplash.com/s/photos/shopping-cart?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        </p>
      </footer>
    </div>
  )
}

export default Home
