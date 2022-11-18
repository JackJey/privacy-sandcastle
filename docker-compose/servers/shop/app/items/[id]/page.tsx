import Link from "next/link"
import Image from "next/image"
import { displayCategory, Item } from "../../../lib/items"

import Script from "next/script"
import SubmitForm from "./SubmitForm"

async function fetchItem(id: string) {
  const host = process.env.host || "localhost"
  const port = process.env.port || "8080"
  const url = `http://${host}:${port}/api/items/${id}`
  const res = await fetch(url, { cache: "no-store" })
  const item: Item = await res.json()
  console.log({ item })
  return item
}

type Params = {
  id: string
}

export default async function Page({ params }: { params: Params }) {
  const { id } = params
  const item = await fetchItem(id)

  return (
    <div className="flex flex-col gap-6">
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
          <SubmitForm item={item}></SubmitForm>
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
