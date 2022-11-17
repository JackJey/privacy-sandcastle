import Link from "next/link"
import Image from "next/image"
import { displayCategory, Item } from "../../lib/items"
import { GetServerSideProps } from "next"
import { FormEvent } from "react"
import { useRouter } from "next/router"
import Header from "../../components/header"
import Script from "next/script"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id: string = ctx.params?.id as string
  const host = process.env.host || "localhost"
  const port = process.env.port || "8080"
  const res = await fetch(`http://${host}:${port}/api/items/${id}`)
  const item = await res.json()
  return { props: { item } }
}

const Item = ({ item }: { item: Item }) => {
  const router = useRouter()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const id = data.get("id") as string
    const size = data.get("size") as string
    const quantity = data.get("quantity") as string

    console.assert(item.id === id, item.id, id)
    console.log({ id, size, quantity })

    const res = await fetch("/api/cart", {
      method: "post",
      body: new URLSearchParams(data as URLSearchParams)
    })
    console.assert(res.redirected)
    router.push(res.url)
  }

  return (
    <div className="flex flex-col gap-6">
      <Header />

      <main className="grid lg:grid-cols-2">
        <section className="">
          <Image src={`/image/svg/emoji_u${item.id}.svg`} width={500} height={500} alt={item.name}></Image>
        </section>
        <section className="">
          <h2 className="text-2xl font-bold text-slate-800">{item.name}</h2>
          <div className="flex gap-4 text-slate-500 border-b py-4">
            <span>${item.price}.00</span>
            <span>/</span>
            <span>{displayCategory(item.category)}</span>
          </div>
          <form method="post" action="/api/cart" onSubmit={onSubmit} className="flex flex-col gap-4">
            <section className="flex border-b py-4">
              <input type="hidden" name="id" value={item.id} />
              <label htmlFor="size" className="basis-1/6 text-slate-500">
                Size
              </label>
              <select id="size" name="size" className="basis-5/6 text-slate-800">
                <option value="25.0">25.0cm</option>
                <option value="25.5">25.5cm</option>
                <option value="26.0">26.0cm</option>
                <option value="26.5">26.5cm</option>
                <option value="27.0">27.0cm</option>
                <option value="27.5">27.5cm</option>
                <option value="28.0">28.0cm</option>
                <option value="28.5">28.5cm</option>
              </select>
            </section>
            <section className="flex border-b py-4">
              <label htmlFor="quantity" className="basis-1/6 text-slate-500">
                Quantity
              </label>
              <select id="quantity" name="quantity" className="basis-5/6 text-slate-800">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </section>
            <section>
              <h3 className="font-bold">Description</h3>
              <p className="pt-1 text-sm text-slate-800">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="pt-1 text-sm text-slate-800">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="pt-1 text-sm text-slate-800">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="pt-1 text-sm text-slate-800">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </section>
            <section className="flex justify-center">
              <button type="submit" className="w-60 border border-slate-600 text-slate-600 hover:bg-slate-400 hover:text-white">
                ADD TO CART
              </button>
            </section>
          </form>
        </section>
      </main>

      <footer className="border-t-2 py-4">
        <Link href="/" className="underline before:content-['<<']">
          continue shopping
        </Link>
        <Script
          className="dsp_tag"
          data-advertiser="privacy-sandcastle-shop"
          data-id={item.id}
          src="https://privacy-sandcastle-dsp.web.app/dsp-tag.js"
        ></Script>
      </footer>
    </div>
  )
}

export default Item
